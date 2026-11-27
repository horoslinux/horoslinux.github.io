(() => {
	const root = document.querySelector("[data-wallpaper-strip]");
	if (!root) return;

	const TOTAL = 15;
	const INTERVAL = 3200;
	const FADE = 220;

	const shots = [...root.querySelectorAll(".shot")];
	if (shots.length !== 3) return;

	const reduceMotion = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
	const pad = (n) => String(n).padStart(2, "0");
	const source = (n) => `assets/img/horos-wallpaper-${pad(((((n - 1) % TOTAL) + TOTAL) % TOTAL) + 1)}.jpg`;

	const loaded = new Map();
	let start = 0;

	function numbersFrom(offset) {
		return shots.map((_, slot) => (((offset + slot) % TOTAL) + TOTAL) % TOTAL + 1);
	}

	// Cache the load promise so a batch is fetched only once, then kept in browser cache.
	function preload(number) {
		if (!loaded.has(number)) {
			loaded.set(number, new Promise((resolve) => {
				const image = new Image();
				image.onload = image.onerror = () => {
					// decode() avoids a blank frame on the first paint of a cached file.
					if (image.decode) image.decode().then(resolve, resolve);
					else resolve();
				};
				image.src = source(number);
			}));
		}
		return loaded.get(number);
	}

	function preloadBatch(offset) {
		return Promise.all(numbersFrom(offset).map(preload));
	}

	function wait(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	function nextFrame() {
		return new Promise((resolve) => {
			if (typeof requestAnimationFrame !== "function") return resolve();
			requestAnimationFrame(() => requestAnimationFrame(resolve));
		});
	}

	// Resolve when the actual <img> can paint its new source.
	function ready(img) {
		if (img.decode) return img.decode().catch(() => {});
		if (img.complete && img.naturalWidth) return Promise.resolve();
		return new Promise((resolve) => {
			img.addEventListener("load", resolve, { once: true });
			img.addEventListener("error", resolve, { once: true });
		});
	}

	function render(numbers) {
		shots.forEach((img, slot) => {
			const number = numbers[slot];
			img.src = source(number);
			img.alt = `HorOS wallpaper ${number}`;
		});
	}

	async function advance() {
		const next = (start + 1) % TOTAL;
		const numbers = numbersFrom(next);

		// Fetch the incoming batch first so the current wallpapers stay visible while loading.
		await preloadBatch(next);

		if (!reduceMotion) {
			// Account for the staggered fade of the third image.
			shots.forEach((img) => img.classList.add("is-changing"));
			await wait(FADE + 100);
		}

		render(numbers);
		await Promise.all(shots.map(ready));
		// Let the browser paint the new sources at low opacity before fading them in.
		await nextFrame();
		shots.forEach((img) => img.classList.remove("is-changing"));

		start = next;
		preloadBatch((start + 1) % TOTAL);
		if (!reduceMotion) setTimeout(advance, INTERVAL);
	}

	render(numbersFrom(start));
	preloadBatch((start + 1) % TOTAL).then(() => {
		if (!reduceMotion) setTimeout(advance, INTERVAL);
	});
})();
