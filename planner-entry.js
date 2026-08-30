(()=>{'use strict';
const PLANNER_SCRIPT='./planner-v2.js?v=20260830-07';
function showError(message){document.body.innerHTML='<main style="min-height:100vh;display:grid;place-items:center;background:#0d1524;color:#f4f7fb;font:16px system-ui;padding:24px"><section style="max-width:560px;background:#172236;border:1px solid #33455f;border-radius:14px;padding:24px"><h1>Financial Freedom</h1><p>'+String(message||'The planner could not be loaded.').replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]))+'</p><a href="./index.html" style="color:#8fb5ff">Return to home</a></section></main>'}
function load(src){return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.onload=resolve;s.onerror=()=>reject(new Error('Budget planner failed to load.'));document.head.appendChild(s)})}
load(PLANNER_SCRIPT).catch(e=>showError(e.message));
})();