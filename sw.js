/* PLC Từ Số 0: chạy ngoại tuyến. Trang chính ưu tiên lấy bản mới từ mạng, mất mạng thì dùng bản đã lưu. */
const C='plc0-v1';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'])))});
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||!r.url.startsWith('http'))return;
 e.respondWith((async()=>{const c=await caches.open(C);
  if(r.mode==='navigate'){try{const res=await fetch(r);if(res.ok)c.put('./index.html',res.clone());return res}catch(_){return (await c.match('./index.html'))||Response.error()}}
  const hit=await c.match(r);const net=fetch(r).then(res=>{if(res&&(res.ok||res.type==='opaque'))c.put(r,res.clone());return res}).catch(()=>hit||Response.error());return hit||net})())});
