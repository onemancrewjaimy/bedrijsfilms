(function () {
  const tc = document.getElementById("tc");
  if (!tc) return;
  const t0 = performance.now();
  setInterval(() => {
    const f = Math.floor(((performance.now() - t0) / 1000) * 25);
    const h = String(Math.floor(f / (25 * 3600)) % 24).padStart(2, "0");
    const m = String(Math.floor(f / (25 * 60)) % 60).padStart(2, "0");
    const s = String(Math.floor(f / 25) % 60).padStart(2, "0");
    const fr = String(f % 25).padStart(2, "0");
    tc.textContent = `${h}:${m}:${s}:${fr}`;
  }, 80);
})();
