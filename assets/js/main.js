document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;

  // Theme: the small script in head sets data-theme before the page renders.
  const themeBtn = document.querySelector(".theme-btn");

  function applyTheme(theme) {
    root.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === "dark" ? "#111111" : "#ffffff";
    if (!themeBtn) return;
    const label = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
    themeBtn.setAttribute("aria-label", label);
    themeBtn.setAttribute("title", label);
  }

  applyTheme(root.dataset.theme === "dark" ? "dark" : "light");

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const next = root.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem("horos-theme", next); } catch (error) { /* storage may be disabled */ }
    });
  }

  // Mobile menu.
  const toggle = document.querySelector(".menu-btn");
  const nav = document.querySelector(".nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => nav.classList.remove("open"));
    });
  }

  // Mobile table of contents panel.
  const tocToggle = document.querySelector(".toc-toggle");
  const tocWrap = document.querySelector(".docs-toc-mobile");

  if (tocToggle && tocWrap) {
    // Keep the container gutter at the top; go full width once the bar sticks.
    function updateTocStuck() {
      if (getComputedStyle(tocWrap).display === "contents") {
        tocWrap.classList.remove("stuck");
        return;
      }
      const top = parseFloat(getComputedStyle(tocWrap).top) || 64;
      tocWrap.classList.toggle("stuck", tocWrap.getBoundingClientRect().top <= top + 1);
    }

    updateTocStuck();
    window.addEventListener("scroll", updateTocStuck, { passive: true });
    window.addEventListener("resize", updateTocStuck);
    window.addEventListener("load", updateTocStuck);

    function setToc(open) {
      tocWrap.classList.toggle("open", open);
      tocToggle.setAttribute("aria-expanded", String(open));
    }

    tocToggle.addEventListener("click", () => {
      setToc(tocToggle.getAttribute("aria-expanded") !== "true");
    });

    tocWrap.querySelectorAll(".docs-sidebar a").forEach((link) => {
      link.addEventListener("click", () => setToc(false));
    });

    document.addEventListener("click", (event) => {
      if (!tocWrap.contains(event.target)) setToc(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && tocToggle.getAttribute("aria-expanded") === "true") {
        setToc(false);
        tocToggle.focus();
      }
    });
  }

  // Mark the active top-level nav link.
  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a[data-page]").forEach((link) => {
    if (link.dataset.page === page) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  // Docs sidebar: mark the section currently in view.
  const sideLinks = [...document.querySelectorAll(".docs-sidebar a[href^='#']")];
  if (sideLinks.length) {
    const items = sideLinks
      .map((link) => ({ link, section: document.querySelector(link.getAttribute("href")) }))
      .filter((item) => item.section);

    function updateActiveSection() {
      if (!items.length) return;

      const header = document.querySelector(".site-header");
      const toc = document.querySelector(".docs-toc-mobile");
      const stickyBottom = toc && getComputedStyle(toc).display !== "contents"
        ? toc.getBoundingClientRect().bottom
        : header.getBoundingClientRect().bottom;
      const probe = stickyBottom + 16;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

      let active = items[0];
      if (atBottom) {
        active = items[items.length - 1];
      } else {
        for (const item of items) {
          if (item.section.getBoundingClientRect().top <= probe) active = item;
        }
      }

      items.forEach((item) => item.link.classList.toggle("active", item === active));
      const current = document.querySelector("[data-toc-current]");
      if (current) current.textContent = active.link.textContent.trim();
    }

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    window.addEventListener("load", updateActiveSection);
  }
});
