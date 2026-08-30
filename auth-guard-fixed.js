(()=>{'use strict';
const SUPABASE_URL='https://woxdfibdpbsxqhmvmjoz.supabase.co';
const SUPABASE_KEY='sb_publishable_hXBUybGAWLK1FbkK3HIHXA_7cH7vG0m';
const waitForSupabase=fn=>{if(window.supabase){fn(window.supabase);return}setTimeout(()=>waitForSupabase(fn),150)};
function init(api){
  const get=id=>document.getElementById(id);
  let authBtn=get('authBtn'), authModal=get('authModal'), authForm=get('authForm'), authClose=get('authClose'), authSwitch=get('authSwitch');
  if(!authBtn||!authModal||!authForm||!authClose||!authSwitch)return;
  authBtn=authBtn.cloneNode(true); get('authBtn').replaceWith(authBtn);
  authForm=authForm.cloneNode(true); get('authForm').replaceWith(authForm);
  const title=get('authTitle'), copy=get('authCopy'), submit=get('authSubmit'), msg=get('authMessage');
  const email=get('authEmail'), pass=get('authPassword'), save=get('saveBudget'), saveState=get('saveState');
  let session=null, signup=false, busy=false;
  function setSaveVisibility(){
    if(save) save.hidden=!session;
    if(saveState){
      saveState.className=session?'save-state saved':'save-state';
      saveState.innerHTML=session?'<strong>Signed in</strong><span>Click Save budget to store your plan.</span>':'<strong>Local draft</strong><span>Sign in to save your budget.</span>';
    }
  }
  function paint(){
    setSaveVisibility();
    if(session){
      authBtn.textContent='Log out';
      title.textContent='Account';
      copy.textContent='You are signed in. Your budget can be saved to the cloud.';
      authSwitch.hidden=true;
      submit.textContent='Close';
      msg.textContent=session.user?.email||'';
    }else{
      authBtn.textContent='Log in';
      title.textContent=signup?'Create account':'Log in';
      copy.textContent=signup?'Create an account to save your budgets in the cloud.':'Sign in to save your budget across devices.';
      authSwitch.hidden=false;
      submit.textContent=signup?'Sign up':'Log in';
      msg.textContent='';
    }
  }
  function openModal(){authModal.hidden=false;msg.textContent='';if(!session){email.value='';pass.value='';setTimeout(()=>email.focus(),0)}}
  authBtn.addEventListener('click',async()=>{
    if(busy)return;
    if(session){
      busy=true;
      const {error}=await api.auth.signOut();
      busy=false;
      if(error)msg.textContent=error.message;
      return;
    }
    signup=false;paint();openModal();
  });
  authClose.addEventListener('click',()=>{authModal.hidden=true});
  authSwitch.addEventListener('click',()=>{signup=!signup;paint();email.focus()});
  authForm.addEventListener('submit',async ev=>{
    ev.preventDefault();
    if(busy)return;
    if(session){authModal.hidden=true;return}
    const em=email.value.trim(), pw=pass.value;
    if(!em||!pw){msg.textContent='Enter your email and password.';return}
    busy=true;submit.disabled=true;msg.textContent='';
    try{
      const res=signup
        ?await api.auth.signUp({email:em,password:pw,options:{emailRedirectTo:location.href.split('#')[0]}})
        :await api.auth.signInWithPassword({email:em,password:pw});
      if(res.error){msg.textContent=res.error.message;return}
      if(signup&&!res.data.session){msg.textContent='Account created. Check your email, then log in.';return}
      session=res.data.session||null;authModal.hidden=true;paint();
    }catch(err){msg.textContent=err?.message||'Unable to sign in right now.'}
    finally{busy=false;submit.disabled=false}
  });
  api.auth.onAuthStateChange((_event,next)=>{session=next||null;paint()});
  api.auth.getSession().then(({data})=>{session=data.session||null;paint()});
  paint();
}
waitForSupabase(supabase=>init(supabase.createClient(SUPABASE_URL,SUPABASE_KEY)));
})();