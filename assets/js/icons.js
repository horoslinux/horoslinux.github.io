(() => {
  // Merkezi SVG ikon kayıtları. HTML'de <span data-icon="ad"></span> kullanılır.
  const ICONS = {
    menu:
      '<line x1="4" y1="7" x2="20" y2="7"/>' +
      '<line x1="4" y1="12" x2="20" y2="12"/>' +
      '<line x1="4" y1="17" x2="20" y2="17"/>',

    sun:
      '<circle cx="12" cy="12" r="4"/>' +
      '<line x1="12" y1="2" x2="12" y2="4"/>' +
      '<line x1="12" y1="20" x2="12" y2="22"/>' +
      '<line x1="4.9" y1="4.9" x2="6.3" y2="6.3"/>' +
      '<line x1="17.7" y1="17.7" x2="19.1" y2="19.1"/>' +
      '<line x1="2" y1="12" x2="4" y2="12"/>' +
      '<line x1="20" y1="12" x2="22" y2="12"/>' +
      '<line x1="4.9" y1="19.1" x2="6.3" y2="17.7"/>' +
      '<line x1="17.7" y1="6.3" x2="19.1" y2="4.9"/>',

    moon:
      '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"/>',

    "arrow-right":
      '<line x1="4" y1="12" x2="19" y2="12"/>' +
      '<polyline points="13 6 19 12 13 18"/>',

    "chevron-down":
      '<polyline points="6 9 12 15 18 9"/>',

    sparkles:
      '<path d="M12 3l1.7 4.6L18.3 9l-4.6 1.7L12 15l-1.7-4.3L5.7 9l4.6-1.4L12 3Z"/>' +
      '<path d="M18.5 15l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z"/>',

    terminal:
      '<polyline points="5 7 10 12 5 17"/>' +
      '<line x1="12" y1="17" x2="19" y2="17"/>',

    box:
      '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3Z"/>' +
      '<polyline points="4 7.5 12 12 20 7.5"/>' +
      '<line x1="12" y1="12" x2="12" y2="21"/>',

    grid:
      '<rect x="4" y="4" width="7" height="7" rx="1"/>' +
      '<rect x="13" y="4" width="7" height="7" rx="1"/>' +
      '<rect x="4" y="13" width="7" height="7" rx="1"/>' +
      '<rect x="13" y="13" width="7" height="7" rx="1"/>',

    shield:
      '<path d="M12 3l7 3v5c0 4.4-2.8 7.9-7 10-4.2-2.1-7-5.6-7-10V6l7-3Z"/>' +
      '<polyline points="9 12 11.5 14.5 15.5 10"/>',

    bolt:
      '<polygon points="13 3 5 14 11 14 10 21 19 9 13 9 13 3"/>',

    book:
      '<path d="M4 5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2V5Z"/>' +
      '<line x1="8" y1="7" x2="15" y2="7"/>',

    external:
      '<path d="M14 4h6v6"/>' +
      '<line x1="20" y1="4" x2="11" y2="13"/>' +
      '<path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>'
  };

  function buildIcon(name, extraClass) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("class", ["icon", extraClass].filter(Boolean).join(" "));
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    svg.innerHTML = ICONS[name] || "";
    return svg;
  }

  function mountIcons() {
    document.querySelectorAll("[data-icon]").forEach((slot) => {
      const icon = buildIcon(slot.dataset.icon, slot.className);
      slot.replaceWith(icon);
    });
  }

  document.addEventListener("DOMContentLoaded", mountIcons);
})();
