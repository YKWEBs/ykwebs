const catchName = 'v2';
const catchAssest = [
    'index.html',
    'blog-details.html',
    'frame.html',
    'videoroom.html',
    'js/boostrapmin.js',
    'js/custom.js',
    'js/jquery.js',
    'js/jquery-magnific-popup.min.js',
    'js/jquery-stellar.min.js',
    'js/smoothscroll.js',
    'css/boostrap.min.css',
    'css/templatemo-style.css',
    




];

 






if('serviceWorker' in navigator) {
    console.log('Service Worker Supported');
    window.addEventListener('load',()=> {
        navigator.serviceWorker
        .register('js/sw.js')
        .then(reg => console.log("ServiceWorker: Registered"))
        .catch(err => console.log(`Servies Worker: Error:${err}`))
    })
    

    
}



// Call Install Event 
self.addEventListener('Install', (e) =>{
    console.log('Service Worker: Installed');

    e.waitUntil(
        cache
        .open(cacheName)
        .then(  cache  => {
            console.log('Service Worker Caching Files');
            cache.addAll(cacheAssests);
            
        })
        .then(()=> self.skipWaiting())
    );
    




 });


 // Call Install Event 
self.addEventListener('Activeted', (e) =>{
    console.log('Service Worker: Activeted');
    //Remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames =>{
            return Promise.all(
                cacheNames.map(cache =>{
                    if(cache !== cacheName){
                        console.log('ServiceWorker: Clearing Old Cache');

                    }
                })
            )
        } )
    );


 });


 //Call fetch Event 

 self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching');
    e.respondingWith(fetch(e.request).catch(() => caches.match(e.request)))
 });