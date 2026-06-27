/* Navigatie, mobiel menu, smooth scroll, header state, lightbox en contactformulier init. */
(function () {
  function headerScrollState() {
    const header = document.getElementById("siteHeader");
    if (!header) return;
    function update() {
      header.classList.toggle("is-scrolled", window.scrollY > 40);
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  function mobileMenu() {
    const hamburger = document.getElementById("hamburger");
    const nav = document.getElementById("mainNav");
    if (!hamburger || !nav) return;

    function close() {
      hamburger.classList.remove("is-open");
      nav.classList.remove("is-open");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }

    hamburger.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      hamburger.classList.toggle("is-open", isOpen);
      hamburger.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", close));
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 900) close();
    });
  }

  function activeNavLink() {
    const links = document.querySelectorAll("[data-nav]");
    const current = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    links.forEach((link) => {
      const href = link.getAttribute("href").toLowerCase();
      const isActive = href === current || (current === "" && href === "index.html");
      link.classList.toggle("is-active", isActive);
    });
  }

  function smoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        const id = link.getAttribute("href");
        if (id.length < 2) return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function lightbox() {
    const triggers = document.querySelectorAll("[data-lightbox-src]");
    const box = document.getElementById("lightbox");
    if (!triggers.length || !box) return;

    const video = box.querySelector("video");
    const closeBtn = box.querySelector(".lightbox-close");

    function open(src) {
      if (video) {
        video.querySelector("source").setAttribute("src", src);
        video.load();
        video.play().catch(() => {});
      }
      box.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }

    function close() {
      box.classList.remove("is-open");
      document.body.style.overflow = "";
      if (video) video.pause();
    }

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", () => open(trigger.dataset.lightboxSrc));
    });
    closeBtn && closeBtn.addEventListener("click", close);
    box.addEventListener("click", (e) => {
      if (e.target === box) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  }

  function portfolioFilter() {
    const buttons = document.querySelectorAll("[data-filter]");
    const items = document.querySelectorAll("[data-category]");
    if (!buttons.length || !items.length) return;

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        const filter = btn.dataset.filter;
        items.forEach((item) => {
          const match = filter === "all" || item.dataset.category === filter;
          item.style.display = match ? "" : "none";
        });
      });
    });
  }

  function contactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    const status = form.querySelector(".form-status");

    function setError(field, message) {
      const wrap = field.closest(".field");
      wrap.classList.toggle("has-error", Boolean(message));
      const errorEl = wrap.querySelector(".field-error");
      if (errorEl) errorEl.textContent = message || "";
    }

    function validate() {
      let valid = true;
      const name = form.querySelector("#name");
      const email = form.querySelector("#email");
      const message = form.querySelector("#message");

      if (!name.value.trim()) {
        setError(name, "Vul je naam in.");
        valid = false;
      } else {
        setError(name, "");
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value.trim())) {
        setError(email, "Vul een geldig e-mailadres in.");
        valid = false;
      } else {
        setError(email, "");
      }

      if (!message.value.trim() || message.value.trim().length < 10) {
        setError(message, "Vertel kort waar je hulp bij zoekt, minimaal 10 tekens.");
        valid = false;
      } else {
        setError(message, "");
      }

      return valid;
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      status.classList.remove("is-success", "is-error");

      if (!validate()) {
        status.textContent = "Controleer de gemarkeerde velden en proberen het opnieuw.";
        status.classList.add("is-error");
        return;
      }

      const submitBtn = form.querySelector('[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = "Versturen...";

      /* TODO: vervangen door echte verzending naar backend of formulierdienst */
      setTimeout(() => {
        status.textContent = "Bedankt. Je aanvraag is verstuurd, je hoort snel van ons.";
        status.classList.add("is-success");
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = "Verstuur aanvraag";
      }, 900);
    });
  }

  function setYear() {
    const el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
  }

  document.addEventListener("DOMContentLoaded", () => {
    headerScrollState();
    mobileMenu();
    activeNavLink();
    smoothAnchors();
    lightbox();
    portfolioFilter();
    contactForm();
    setYear();
  });
})();
