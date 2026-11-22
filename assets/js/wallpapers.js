(() => {
  const root = document.querySelector("[data-wallpaper-strip]");
  if (!root) return;

  const TOTAL = 20;
  const INTERVAL = 3200;
  const FADE = 220;

  const shots = [...root.querySelectorAll(".shot")];
  if (shots.length !== 3) return;

  const reduceMotion = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pad = (n) => String(n).padStart(2, "0");
  const source = (n) => `assets/img/wallpaper-${pad(((n - 1) % TOTAL + TOTAL) % TOTAL + 1)}.jpg`;

  let start = 0;

  function render() {
    shots.forEach((img, slot) => {
      const number = ((start + slot) % TOTAL) + 1;
      img.src = source(number);
      img.alt = `HorOS wallpaper ${number}`;
    });
  }

  function preloadAhead() {
    const image = new Image();
    image.src = source(start + 3);
  }

  function advance() {
    shots.forEach((img) => img.classList.add("is-changing"));

    setTimeout(() => {
      start = (start + 1) % TOTAL;
      render();
      preloadAhead();
      shots.forEach((img) => img.classList.remove("is-changing"));
    }, reduceMotion ? 0 : FADE);
  }

  render();
  preloadAhead();
  if (!reduceMotion) setInterval(advance, INTERVAL);
})();
