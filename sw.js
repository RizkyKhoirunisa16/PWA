// Event install: dijalankan saat service worker pertama kali dipasang
self.addEventListener("install", event => {
  event.waitUntil(
    // Membuka (atau membuat) cache bernama 'pwa-assets'
    caches.open("pwa-assets")
      .then(cache => {
        // Menambahkan semua file penting agar bisa digunakan secara offline
        return cache.addAll([
          "./index.html",
          "./skills.html",
          "./hobby.html",
          "./style.css",
          "./app.js",
          "./rizky.jpg",
          "./prau.jpg",
          "./mongkrang1.jpg",

          // Sumber daya eksternal (perlu hati-hati karena bisa gagal jika CORS tidak diizinkan)
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Progressive_Web_Apps_Logo.svg/640px-Progressive_Web_Apps_Logo.svg.png",
          "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css",
          "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js",
          "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        ]);
      })
      .catch(error => {
        // Menangani error saat proses caching (misalnya karena file tidak ditemukan atau CORS)
        console.error("Gagal caching resources saat install:", error);
      })
  );
});

// Event fetch: dijalankan setiap kali permintaan (request) dilakukan oleh aplikasi
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Jika ada di cache, kembalikan file dari cache
        if (cachedResponse) {
          return cachedResponse;
        }

        // Jika tidak ada di cache, ambil dari internet dan log permintaannya
        return fetch(event.request)
          .catch(error => {
            console.error("Gagal mengambil resource dari jaringan:", error);
          });
      })
      .catch(error => {
        // Error saat mencoba mencocokkan dengan cache
        console.error("Gagal mencocokkan request di cache:", error);
      })
  );
});
