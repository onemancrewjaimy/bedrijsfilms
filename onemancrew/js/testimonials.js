/* Klantreview-slider: autoplay, fade/slide overgang, dots met voortgangsbalk en swipe-support. */
(function () {
  const AUTOPLAY_MS = 6000;

  function initSlider(root) {
    const cards = Array.from(root.querySelectorAll(".testimonial-card"));
    const dotsWrap = root.querySelector("[data-testimonial-dots]");
    const arrows = root.querySelectorAll("[data-testimonial-dir]");
    if (!cards.length || !dotsWrap) return;

    root.style.setProperty("--autoplay-duration", `${AUTOPLAY_MS}ms`);

    let current = Math.max(cards.findIndex((c) => c.classList.contains("is-active")), 0);
    let timer = null;

    cards.forEach((card, i) => {
      card.setAttribute("role", "group");
      card.setAttribute("aria-roledescription", "review");
      card.setAttribute("aria-label", `Review ${i + 1} van ${cards.length}`);
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "testimonial-dot";
      dot.dataset.index = String(i);
      dot.setAttribute("aria-label", `Ga naar review ${i + 1}`);
      dotsWrap.appendChild(dot);
    });

    dotsWrap.addEventListener("click", (e) => {
      const dot = e.target.closest("[data-index]");
      if (!dot) return;
      goTo(parseInt(dot.dataset.index, 10), true);
    });

    function render() {
      cards.forEach((card, i) => card.classList.toggle("is-active", i === current));

      Array.from(dotsWrap.children).forEach((dot, i) => {
        const isActive = i === current;
        dot.classList.toggle("is-active", isActive);
        if (isActive) {
          /* clone om de CSS voortgangsanimatie van de stip te herstarten */
          const fresh = dot.cloneNode(true);
          dot.replaceWith(fresh);
        }
      });
    }

    function goTo(index, userInitiated) {
      current = (index + cards.length) % cards.length;
      render();
      if (userInitiated) restartAutoplay();
    }

    function next() {
      goTo(current + 1);
    }

    function prev() {
      goTo(current - 1);
    }

    function restartAutoplay() {
      if (timer) clearInterval(timer);
      timer = setInterval(next, AUTOPLAY_MS);
    }

    function stopAutoplay() {
      if (timer) clearInterval(timer);
    }

    arrows.forEach((arrow) => {
      arrow.addEventListener("click", () => {
        const dir = parseInt(arrow.dataset.testimonialDir, 10);
        goTo(current + dir, true);
      });
    });

    root.addEventListener("mouseenter", stopAutoplay);
    root.addEventListener("mouseleave", restartAutoplay);
    root.addEventListener("focusin", stopAutoplay);
    root.addEventListener("focusout", restartAutoplay);

    let touchStartX = 0;
    root.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
      stopAutoplay();
    });
    root.addEventListener("touchend", (e) => {
      const delta = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(delta) > 40) {
        delta < 0 ? next() : prev();
      } else {
        restartAutoplay();
      }
    });

    render();
    restartAutoplay();
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-testimonial-slider]").forEach(initSlider);
  });
})();
