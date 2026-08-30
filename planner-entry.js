(()=>{'use strict';
const SUPABASE_URL='https://woxdfibdpbsxqhmvmjoz.supabase.co';
const SUPABASE_KEY='sb_publishable_hXBUybGAWLK1FbkK3HIHXA_7cH7vG0m';
const LANDING='./index.html';
const PLANNER_SCRIPT='./planner.js?v=20260830-05';
function showError(message){const safe=String(message||'The planner could not be loaded.').replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]));document.body.innerHTML=`<main style="min-height:100vh;display:grid;place-items:center;background:#0d1524;color:#f4f7fb;font:16px system-ui;padding:24px"><section style="max-width:520px;background:#172236;border:1px solid #33455f;border-radius:14px;padding:24px"><h1 style="margin-top:0">Financial Freedom</h1><p style="color:#aab6c8">${safe}</p><a href="./index.html" style="color:#8fb5ff">Return to home</a></section></main>`}
function loadScript(src){return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.onload=resolve;s.onerror=()=>reject(new Error('Planner script could not be loaded.'));document.head.appendChild(s)})}
async function main(){if(!window.supabase){showError('Login service is still loading. Please refresh and try again.');return}const sb=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);const {data,error}=await sb.auth.getSession();if(error){showError(error.message);return}if(!data.session){location.replace(LANDING);return}window.__ffSupabase=sb;try{await loadScript(PLANNER_SCRIPT)}catch(err){showError(err.message);return}sb.auth.onAuthStateChange((_event,session)=>{if(!session)location.replace(LANDING)})}
main().catch(err=>showError(err.message));
})();