/* Scroll reveal animaties via IntersectionObserver met gespreide (staggered) timing. */
(function () {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function init() {
    const items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (prefersReduced) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const groups = new Map();
    items.forEach((el) => {
      const group = el.dataset.revealGroup || "default";
      if (!groups.has(group)) groups.set(group, []);
      groups.get(group).push(el);
    });

    groups.forEach((group) => {
      group.forEach((el, i) => {
        const step = parseFloat(el.dataset.revealStep || 0.08);
        const delay = el.dataset.revealDelay !== undefined ? parseFloat(el.dataset.revealDelay) : i * step;
        el.style.setProperty("--delay", `${delay}s`);
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    items.forEach((el) => observer.observe(el));
  }

  document.addEventListener("DOMContentLoaded", init);
})();
