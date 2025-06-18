// 简单的Service Worker文件，防止浏览器404错误
// 目前不执行任何缓存操作

self.addEventListener('install', function(event) {
  // 立即激活新版本
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  // 声明已激活
  event.waitUntil(self.clients.claim());
});

// 不进行任何缓存，直接使用网络请求
self.addEventListener('fetch', function(event) {
  // 直接返回网络请求，不做任何拦截
  event.respondWith(fetch(event.request));
}); 