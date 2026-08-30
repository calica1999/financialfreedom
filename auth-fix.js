(()=>{'use strict';
const SUPABASE_URL='https://woxdfibdpbsxqhmvmjoz.supabase.co';
const SUPABASE_KEY='sb_publishable_hXBUybGAWLK1FbkK3HIHXA_7cH7vG0m';
function waitForSupabase(cb){if(window.supabase){cb(window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY));return}setTimeout(()=>waitForSupabase(cb),120)}
function init(sb){
 const $=id=>document.getElementById(id);
 const authModal=$('authModal'),authClose=$('authClose'),authEmail=$('authEmail'),authPassword=$('authPassword'),authTitle=$('authTitle'),authCopy=$('authCopy'),authSwitch=$('authSwitch'),authSubmit=$('authSubmit'),authMessage=$('authMessage');
 let authBtn=$('authBtn'),saveBtn=$('saveBudget'),saveState=$('saveState');
 if(!authModal||!authBtn||!saveBtn)return;
 authBtn=authBtn.cloneNode(true);$('authBtn').replaceWith(authBtn);
 const oldForm=$('authForm');if(oldForm){const freshForm=oldForm.cloneNode(true);oldForm.replaceWith(freshForm)}
 const authForm=$('authForm');
 saveBtn=saveBtn.cloneNode(true);$('saveBudget').replaceWith(saveBtn);
 let signup=false,session=null;
 function setMessage(text){authMessage.textContent=text||''}
 function openAuth(){authModal.hidden=false;setMessage('');authPassword.value='';requestAnimationFrame(()=>authEmail.focus())}
 function setSaveVisible(){
   saveBtn.hidden=!session;
   if(session){saveState.className='save-state saved';saveState.innerHTML='<strong>Signed in</strong><span>Click Save budget to save this version.</span>'}
   else{saveState.className='save-state';saveState.innerHTML='<strong>Local draft</strong><span>Sign in to save your budget.</span>'}
 }
 function collectBudget(){
   const payoutType=$('payoutType')?.value||'biweekly';
   const payouts=[...document.querySelectorAll('#payoutList input[type="number"]')].map((el,i)=>({label:`Payout ${i+1}`,amount:Math.max(0,Number(el.value)||0)}));
   const selected=document.querySelector('input[name="rule"]:checked')?.value||'503020';
   const custom={needs:Math.max(0,Math.min(100,Number($('customNeeds')?.value)||0)),wants:Math.max(0,Math.min(100,Number($('customWants')?.value)||0)),savings:Math.max(0,Math.min(100,Number($('customSavings')?.value)||0))};
   const items={needs:[],wants:[],savings:[]};
   [...document.querySelectorAll('.expense-group')].forEach((group,i)=>{const key=['needs','wants','savings'][i];[...group.querySelectorAll('.expense-row')].forEach(row=>{const fields=row.querySelectorAll('input');if(fields.length>=2)items[key].push({name:fields[0].value||'Untitled',amount:Math.max(0,Number(fields[1].value)||0)})})});
   return {payoutType,payouts,rule:selected,custom,items};
 }
 async function loadCloud(){
   const {data,error}=await sb.from('budgets').select('data').eq('user_id',session.user.id).order('updated_at',{ascending:false}).limit(1);
   if(error||!data?.[0]?.data)return;
   try{localStorage.setItem('financialFreedomPlannerV6',JSON.stringify(data[0].data));location.reload()}catch(_){}
 }
 async function saveCloud(){
   if(!session){openAuth();setMessage('Please log in to save your budget.');return}
   const payload=collectBudget();
   saveBtn.disabled=true;saveBtn.textContent='Saving…';let error=null;
   const {data:rows}=await sb.from('budgets').select('id').eq('user_id',session.user.id).order('updated_at',{ascending:false}).limit(1);
   if(rows?.[0])({error}=await sb.from('budgets').update({name:'My Budget',data:payload,updated_at:new Date().toISOString()}).eq('id',rows[0].id).eq('user_id',session.user.id));
   else({error}=await sb.from('budgets').insert({user_id:session.user.id,name:'My Budget',data:payload,updated_at:new Date().toISOString()}));
   saveBtn.disabled=false;saveBtn.textContent='Save budget';
   if(error){saveState.className='save-state unsaved';saveState.innerHTML='<strong>Save failed</strong><span>Please try again.</span>';return}
   try{localStorage.setItem('financialFreedomPlannerV6',JSON.stringify(payload))}catch(_){}
   saveState.className='save-state saved';saveState.innerHTML='<strong>Saved</strong><span>Saved to your account.</span>';
 }
 function updateSession(s){
   session=s;
   if(s){authBtn.textContent='Log out';authTitle.textContent='Account';authCopy.textContent='Your budget can be saved to the cloud with the Save budget button.';authSwitch.hidden=true;setSaveVisible();loadCloud()}
   else{authBtn.textContent='Log in';authTitle.textContent=signup?'Create account':'Log in';authCopy.textContent=signup?'Create an account to save your budgets in the cloud.':'Sign in to keep your budget across devices.';authSwitch.hidden=false;authSubmit.textContent=signup?'Sign up':'Log in';setSaveVisible()}
 }
 authBtn.addEventListener('click',async()=>{if(session){await sb.auth.signOut();updateSession(null)}else openAuth()});
 authClose?.addEventListener('click',()=>authModal.hidden=true);
 authSwitch?.addEventListener('click',()=>{signup=!signup;authTitle.textContent=signup?'Create account':'Log in';authCopy.textContent=signup?'Create an account to save your budgets in the cloud.':'Sign in to keep your budget across devices.';authSubmit.textContent=signup?'Sign up':'Log in';authSwitch.textContent=signup?'Already have an account? Log in':'Need an account? Sign up';setMessage('')});
 authForm?.addEventListener('submit',async ev=>{ev.preventDefault();authSubmit.disabled=true;setMessage('');const email=authEmail.value.trim(),password=authPassword.value;const res=signup?await sb.auth.signUp({email,password,options:{emailRedirectTo:location.origin+location.pathname}}):await sb.auth.signInWithPassword({email,password});authSubmit.disabled=false;if(res.error){setMessage(res.error.message);return}if(signup&&!res.data.session){setMessage('Account created. Check your email to confirm, then log in.');return}authModal.hidden=true;updateSession(res.data.session)});
 saveBtn.addEventListener('click',saveCloud);
 sb.auth.onAuthStateChange((_event,s)=>updateSession(s));
 sb.auth.getSession().then(({data})=>updateSession(data.session));
}
waitForSupabase(init);
})();