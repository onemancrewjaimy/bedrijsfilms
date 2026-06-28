/* Geanimeerde SVG grafieken: lijnen die zich tekenen, balken die groeien, getriggerd bij in-view. */
(function () {
  function init() {
    const charts = document.querySelectorAll(".chart-animate");
    if (!charts.length) return;

    charts.forEach((chart) => {
      const bars = chart.querySelectorAll(".chart-bar-fill");
      bars.forEach((bar, i) => {
        bar.style.transitionDelay = `${i * 0.09}s`;
      });

      const points = chart.querySelectorAll(".chart-point");
      points.forEach((point, i) => {
        point.style.transitionDelay = `${0.8 + i * 0.12}s`;
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-charted");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );

    charts.forEach((chart) => observer.observe(chart));
  }

  document.addEventListener("DOMContentLoaded", init);
})();
