/* Hover-glow, magnetische knoppen, parallax hero, hover-tilt cards en proces-tijdlijn vulling. */
(function () {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function cardGlow() {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        card.style.setProperty("--my", `${e.clientY - rect.top}px`);
      });
    });
  }

  function magneticButtons() {
    if (prefersReduced) return;
    const buttons = document.querySelectorAll(".btn-accent, .btn-ghost");
    buttons.forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.3}px)`;
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "";
      });
    });
  }

  function heroParallax() {
    if (prefersReduced) return;
    const media = document.querySelector(".hero-media video, .hero-media img");
    const hero = document.querySelector(".hero");
    if (!media || !hero) return;

    let ticking = false;
    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        if (rect.bottom > 0) {
          const offset = Math.min(Math.max(-rect.top, 0), hero.offsetHeight);
          const move = offset * 0.18;
          media.style.transform = `translateY(${move}px) scale(1.05)`;
        }
        ticking = false;
      });
    });
  }

  function portfolioTilt() {
    if (prefersReduced) return;
    const cards = document.querySelectorAll(".portfolio-card");
    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  function processTimeline() {
    const section = document.querySelector(".process-section");
    const fill = document.querySelector(".timeline-fill");
    const steps = document.querySelectorAll(".timeline-step");
    if (!section || !fill || !steps.length) return;

    const isDesktop = () => window.innerWidth >= 880;

    function update() {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh * 0.5;
      const progressed = Math.min(Math.max(vh * 0.75 - rect.top, 0), total);
      const pct = Math.min((progressed / total) * 100, 100);

      if (isDesktop()) {
        fill.style.width = pct + "%";
      } else {
        fill.style.height = pct + "%";
      }

      steps.forEach((step, i) => {
        const threshold = (i / steps.length) * 100;
        step.classList.toggle("is-active", pct >= threshold + 6);
      });
    }

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  document.addEventListener("DOMContentLoaded", () => {
    cardGlow();
    magneticButtons();
    heroParallax();
    portfolioTilt();
    processTimeline();
  });
})();
