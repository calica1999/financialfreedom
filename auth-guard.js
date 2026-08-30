(()=>{'use strict';
const SUPABASE_URL='https://woxdfibdpbsxqhmvmjoz.supabase.co';
const SUPABASE_KEY='sb_publishable_hXBUybGAWLK1FbkK3HIHXA_7cH7vG0m';
const wait=fn=>window.supabase?fn(window.supabase):setTimeout(()=>wait(fn),150);
function patchReload(){
  try{
    if(!window.__ffReloadPatched){
      const original=Location.prototype.reload;
      Object.defineProperty(Location.prototype,'reload',{configurable:true,writable:true,value:function(){window.dispatchEvent(new CustomEvent('ff:cloud-refresh-skipped'));}});
      window.__ffOriginalReload=original;
      window.__ffReloadPatched=true;
    }
  }catch(_){ }
}
function init(api){
  const get=id=>document.getElementById(id);
  const authBtn=get('authBtn'), modal=get('authModal'), form=get('authForm'), close=get('authClose'), sw=get('authSwitch');
  const title=get('authTitle'), copy=get('authCopy'), submit=get('authSubmit'), msg=get('authMessage');
  const email=get('authEmail'), pass=get('authPassword'), save=get('saveBudget'), saveState=get('saveState');
  if(!authBtn||!modal||!form||!save)return;
  let session=null, signup=false, busy=false;
  const cleanButton=authBtn.cloneNode(true); authBtn.replaceWith(cleanButton);
  const cleanForm=form.cloneNode(true); form.replaceWith(cleanForm);
  function paint(){
    const logged=!!session;
    save.hidden=!logged;
    if(logged){
      cleanButton.textContent='Log out';
      saveState.className='save-state saved';
      saveState.innerHTML='<strong>Signed in</strong><span>Click Save budget to store your plan.</span>';
      title.textContent='Account';
      copy.textContent='You are signed in. Your budget can be saved to the cloud.';
      sw.hidden=true;
      submit.textContent='Close';
      msg.textContent=session.user?.email||'';
    }else{
      cleanButton.textContent='Log in';
      saveState.className='save-state';
      saveState.innerHTML='<strong>Local draft</strong><span>Sign in to save your budget.</span>';
      title.textContent=signup?'Create account':'Log in';
      copy.textContent=signup?'Create an account to save your budgets in the cloud.':'Sign in to save your budget across devices.';
      sw.hidden=false;
      submit.textContent=signup?'Sign up':'Log in';
      msg.textContent='';
    }
  }
  function open(){modal.hidden=false;msg.textContent='';if(!session){pass.value='';setTimeout(()=>email.focus(),0)}}
  cleanButton.addEventListener('click',async()=>{
    if(busy)return;
    if(session){busy=true;const {error}=await api.auth.signOut();busy=false;if(error)msg.textContent=error.message;return;}
    signup=false;paint();open();
  });
  close.addEventListener('click',()=>modal.hidden=true);
  sw.addEventListener('click',()=>{signup=!signup;paint()});
  cleanForm.addEventListener('submit',async ev=>{
    ev.preventDefault();
    if(busy)return;
    if(session){modal.hidden=true;return;}
    busy=true;submit.disabled=true;msg.textContent='';
    const em=email.value.trim(),pw=pass.value;
    const res=signup?await api.auth.signUp({email:em,password:pw,options:{emailRedirectTo:location.origin+location.pathname}}):await api.auth.signInWithPassword({email:em,password:pw});
    busy=false;submit.disabled=false;
    if(res.error){msg.textContent=res.error.message;return}
    if(signup&&!res.data.session){msg.textContent='Account created. Check your email, then log in.';return}
    session=res.data.session;modal.hidden=true;paint();
  });
  api.auth.onAuthStateChange((_event,next)=>{session=next;paint()});
  api.auth.getSession().then(({data})=>{session=data.session;paint()});
  paint();
}
patchReload();
wait(supabase=>init(supabase.createClient(SUPABASE_URL,SUPABASE_KEY)));
})();