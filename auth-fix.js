(()=>{'use strict';
const URL='https://woxdfibdpbsxqhmvmjoz.supabase.co';
const KEY='sb_publishable_hXBUybGAWLK1FbkK3HIHXA_7cH7vG0m';
const STORE='financialFreedomPlannerV6';
function waitForSupabase(cb){if(window.supabase){cb(window.supabase.createClient(URL,KEY));return}setTimeout(()=>waitForSupabase(cb),150)}
function init(sb){
 const get=id=>document.getElementById(id); const authBtn=get('authBtn'), authModal=get('authModal'), authForm=get('authForm'), authClose=get('authClose'), authSwitch=get('authSwitch'), authTitle=get('authTitle'), authCopy=get('authCopy'), authSubmit=get('authSubmit'), authMessage=get('authMessage'), saveBtn=get('saveBudget'), saveState=get('saveState');
 if(!authBtn||!authModal||!authForm||!saveBtn)return;
 let signup=false, session=null;
 function setSaveVisible(){saveBtn.hidden=!session; if(!session){saveState.className='save-state';saveState.innerHTML='<strong>Local draft</strong><span>Sign in to save your budget.</span>'}}
 function openAuth(){authModal.hidden=false;authMessage.textContent='';authPassword.value='';authEmail.focus()}
 const authEmail=get('authEmail'),authPassword=get('authPassword');
 const oldAuthBtn=authBtn.cloneNode(true);authBtn.replaceWith(oldAuthBtn);
 const oldForm=authForm.cloneNode(true);authForm.replaceWith(oldForm);
 const form=get('authForm');
 const switchBtn=get('authSwitch');
 oldAuthBtn.addEventListener('click',async()=>{const {data}=await sb.auth.getSession();session=data.session;openAuth()});
 authClose.addEventListener('click',()=>authModal.hidden=true);
 switchBtn.addEventListener('click',()=>{signup=!signup;authTitle.textContent=signup?'Create account':'Log in';authCopy.textContent=signup?'Create an account to save your budgets in the cloud.':'Sign in to keep your budget across devices.';authSubmit.textContent=signup?'Sign up':'Log in';switchBtn.textContent=signup?'Already have an account? Log in':'Need an account? Sign up';authMessage.textContent=''})
 form.addEventListener('submit',async ev=>{ev.preventDefault();authSubmit.disabled=true;authMessage.textContent='';const email=get('authEmail').value.trim(),password=get('authPassword').value;const res=signup?await sb.auth.signUp({email,password,options:{emailRedirectTo:location.origin+location.pathname}}):await sb.auth.signInWithPassword({email,password});authSubmit.disabled=false;if(res.error){authMessage.textContent=res.error.message;return}if(signup&&!res.session){authMessage.textContent='Account created. Check your email to confirm, then log in.';return}session=res.data.session;authModal.hidden=true;updateSession(session);})
 function updateSession(s){session=s;setSaveVisible();if(s){authBtn.textContent='Log out';saveState.className='save-state saved';saveState.innerHTML='<strong>Signed in</strong><span>Your saved budget is in the cloud.</span>';loadCloud();}else{authBtn.textContent='Log in';setSaveVisible()}}
 oldAuthBtn.addEventListener('contextmenu',e=>e.preventDefault());
 oldAuthBtn.onclick=null;
 oldAuthBtn.addEventListener('click',async()=>{if(session){await sb.auth.signOut();updateSession(null);return}openAuth()});
 async function loadCloud(){const {data:rows,error}=await sb.from('budgets').select('data').order('updated_at',{ascending:false}).limit(1);if(error||!rows?.[0]?.data)return;try{localStorage.setItem(STORE,JSON.stringify(rows[0].data));location.reload()}catch(_){} }
 async function saveCloud(){if(!session){openAuth();authMessage.textContent='Please log in to save your budget.';return}let payload;try{payload=JSON.parse(localStorage.getItem(STORE)||'null')}catch(_){payload=null}if(!payload){authMessage.textContent='Nothing to save yet.';return}saveBtn.disabled=true;saveBtn.textContent='Saving…';const {data:rows}=await sb.from('budgets').select('id').order('updated_at',{ascending:false}).limit(1);let error;if(rows?.[0])({error}=await sb.from('budgets').update({name:'My Budget',data:payload,updated_at:new Date().toISOString()}).eq('id',rows[0].id));else({error}=await sb.from('budgets').insert({user_id:session.user.id,name:'My Budget',data:payload}));saveBtn.disabled=false;saveBtn.textContent='Save budget';if(error){saveState.className='save-state unsaved';saveState.innerHTML='<strong>Save failed</strong><span>Check your connection and try again.</span>';return}saveState.className='save-state saved';saveState.innerHTML='<strong>Saved</strong><span>Saved to your account.</span>'}
 saveBtn.addEventListener('click',saveCloud);
 sb.auth.onAuthStateChange((_e,s)=>updateSession(s));
 sb.auth.getSession().then(({data})=>updateSession(data.session));
}
waitForSupabase(init);
})();