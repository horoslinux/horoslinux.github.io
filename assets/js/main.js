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
  if (sideLinks.length && "IntersectionObserver" in window) {
    const sections = sideLinks
      .map((link) => document.querySelector(link.getAttribute("href")))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        sideLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`);
        });
        const activeLink = sideLinks.find((link) => link.classList.contains("active"));
        const current = document.querySelector("[data-toc-current]");
        if (activeLink && current) current.textContent = activeLink.textContent.trim();
      },
      { rootMargin: "-90px 0px -65% 0px", threshold: [0, 0.2, 0.6] }
    );

    sections.forEach((section) => observer.observe(section));
  }
});
