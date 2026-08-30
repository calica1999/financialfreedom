(()=>{'use strict';
const SUPABASE_URL='https://woxdfibdpbsxqhmvmjoz.supabase.co';
const SUPABASE_KEY='sb_publishable_hXBUybGAWLK1FbkK3HIHXA_7cH7vG0m';
const LANDING='./index.html';
const PLANNER_SCRIPT='./planner-v2.js?v=20260830-06';
function showError(message){document.body.innerHTML='<main style="min-height:100vh;display:grid;place-items:center;background:#0d1524;color:#f4f7fb;font:16px system-ui;padding:24px"><section style="max-width:560px;background:#172236;border:1px solid #33455f;border-radius:14px;padding:24px"><h1>Financial Freedom</h1><p>'+String(message||'The planner could not be loaded.').replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]))+'</p><a href="./index.html" style="color:#8fb5ff">Return to home</a></section></main>'}
function load(src){return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.onload=resolve;s.onerror=()=>reject(new Error('Planner application failed to load.'));document.head.appendChild(s)})}
async function main(){try{if(!window.supabase)throw new Error('Login service failed to load.');const client=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);const result=await client.auth.getSession();if(result.error)throw result.error;if(!result.data.session){location.replace(LANDING);return}window.__ffSupabase=client;await load(PLANNER_SCRIPT);client.auth.onAuthStateChange((_event,session)=>{if(!session)location.replace(LANDING)})}catch(e){showError(e.message)}}
main();
})();