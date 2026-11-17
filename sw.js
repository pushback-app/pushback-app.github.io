self.addEventListener("install",function(e){self.skipWaiting();});
self.addEventListener("activate",function(e){e.waitUntil(self.clients.claim());});
self.addEventListener("push",function(e){
  var d={};try{d=e.data?e.data.json():{};}catch(x){d={body:e.data?e.data.text():""};}
  e.waitUntil(self.registration.showNotification(d.title||"Pushback",{body:d.body||"",tag:d.tag||undefined,renotify:!!d.tag,icon:"icon-192.png",badge:"icon-192.png",data:{url:d.url||"/"}}));
});
self.addEventListener("notificationclick",function(e){
  e.notification.close();
  var url=(e.notification.data&&e.notification.data.url)||"/";
  e.waitUntil(clients.matchAll({type:"window",includeUncontrolled:true}).then(function(ws){
    for(var i=0;i<ws.length;i++){var w=ws[i];if(w.url.indexOf(self.registration.scope)===0){return w.focus().then(function(c){return c.navigate?c.navigate(url):c;});}}
    return clients.openWindow(url);
  }));
});
