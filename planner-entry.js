(()=>{'use strict';
const SUPABASE_URL='https://woxdfibdpbsxqhmvmjoz.supabase.co';
const SUPABASE_KEY='sb_publishable_hXBUybGAWLK1FbkK3HIHXA_7cH7vG0m';
const LANDING='./index.html';
const PLANNER_SCRIPT='./planner.js?v=20260830-02';
function loadScript(src){return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.onload=resolve;s.onerror=()=>reject(new Error('Planner could not be loaded.'));document.head.appendChild(s)})}
async function main(){
 const sb=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);
 const {data,error}=await sb.auth.getSession();
 if(error||!data.session){location.replace(LANDING);return}
 await loadScript(PLANNER_SCRIPT);
 const logout=document.getElementById('logout');
 if(logout){
   const fresh=logout.cloneNode(true);logout.replaceWith(fresh);
   const userEmail=document.getElementById('userEmail');if(userEmail)userEmail.textContent=data.session.user.email||'';
   fresh.addEventListener('click',async()=>{
     fresh.disabled=true;
     const {error:signOutError}=await sb.auth.signOut();
     if(signOutError){fresh.disabled=false;return}
     location.replace(LANDING);
   });
 }
 sb.auth.onAuthStateChange((_event,session)=>{if(!session)location.replace(LANDING)});
}
main().catch(()=>location.replace(LANDING));
})();