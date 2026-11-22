# horoslinux.github.io

HorOS Linux için GitHub Pages statik sitesi. Derleme adımı veya bağımlılık yoktur.

## Sayfalar

- `index.html` — tanıtım / ana sayfa
- `docs.html` — kurulum rehberi, teknik belgeler ve sorun giderme

## Yapı

```
assets/
  css/style.css     # açık/koyu tema, düzen
  js/icons.js       # merkezi SVG ikon sistemi
  js/wallpapers.js  # üçlü duvar kağıdı şeridini sırayla kaydırma
  js/main.js        # tema anahtarı, mobil menü, aktif nav, docs scrollspy
  img/              # logo, favicon ve duvar kağıtları
```

Görseller `horcore/airootfs/usr/share/horos/branding` ve
`horcore/airootfs/usr/share/backgrounds/horos` dizinlerinden kopyalanmıştır.

## Tema ve ikonlar

- Varsayılan tema açıktır; ziyaretçi sistem tercihine göre koyu temaya geçebilir.
- Üst çubuktaki güneş/ay düğmesi temayı değiştirir; seçim `localStorage` içinde saklanır.
- Koyu tema logodaki gibi nötr siyah ve gri tonlarını kullanır.
- Tüm ikonlar SVG’dir ve `data-icon` özniteliğiyle `assets/js/icons.js` üzerinden yüklenir. Emoji veya sembol karakter kullanılmaz.

## Duvar kağıtları

Üç görsel yan yana gösterilir ve şerit her adımda bir kayar: 1-2-3, ardından 2-3-4, 3-4-5 ... 20'ye kadar döner. Fare hareketi geçişi etkilemez. `prefers-reduced-motion` etkinse otomatik geçiş kapalıdır.

Görseller kaynak ISO’daki 1920 px üzeri dosyalardan 1600 px genişliğe ölçeklenip JPEG olarak yeniden kaydedilmiştir.

## Yayın

Depoyu `horoslinux/horoslinux.github.io` adresine push ettiğinde GitHub Pages
otomatik olarak `https://horoslinux.github.io` adresinde yayınlar. `.nojekyll`
dosyası Jekyll işlemini devre dışı bırakır; statik dosyalar doğrudan sunulur.

Yerel önizleme için:

```bash
python3 -m http.server 8000
# http://localhost:8000
```
