# horoslinux.github.io

Static GitHub Pages site for HorOS Linux. No build step and no dependencies.

## Pages

- `index.html` — landing page
- `docs.html` — installation guide, technical documentation, and troubleshooting

## Structure

```
assets/
  css/style.css     # light/dark theme, layout
  js/icons.js       # central SVG icon system
  js/wallpapers.js  # cycles the three-image wallpaper strip
  js/main.js        # theme switch, mobile menu, active nav, docs scrollspy
  img/              # logo, favicon, and wallpapers
```

Images were copied from `horcore/airootfs/usr/share/horos/branding` and
`horcore/airootfs/usr/share/backgrounds/horos`.

## Theme and icons

- The default theme is light; visitors can switch to dark based on their system preference.
- The sun/moon button in the header changes the theme; the choice is stored in `localStorage`.
- The dark theme uses neutral black and gray tones, matching the logo.
- All icons are SVG and are loaded through `assets/js/icons.js` with the `data-icon` attribute. No emoji or symbol characters are used.

## Wallpapers

Three images are shown side by side and the strip shifts by one each step: 1-2-3, then 2-3-4, 3-4-5, up to 15 and back around. Hovering does not pause the transition. If `prefers-reduced-motion` is enabled, automatic cycling is disabled.

The 15 JPEGs are copied from the source ISO with their original resolutions and named `horos-wallpaper-01.jpg` through `horos-wallpaper-15.jpg`.

## Publishing

Pushing to `horoslinux/horoslinux.github.io` makes GitHub Pages publish the site automatically at `https://horoslinux.github.io`. The `.nojekyll` file disables Jekyll processing so static files are served directly.

For a local preview:

```bash
python3 -m http.server 8000
# http://localhost:8000
```
