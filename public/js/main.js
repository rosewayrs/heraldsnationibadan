(function () {
  "use strict";

  /* ---------- Mobile menu ---------- */
  var toggle = document.getElementById("menu-toggle");
  var menu = document.getElementById("mobile-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var isOpen = menu.classList.toggle("open");
      document.body.classList.toggle("menu-open", isOpen);
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      menu.setAttribute("aria-hidden", isOpen ? "false" : "true");
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        menu.classList.remove("open");
        document.body.classList.remove("menu-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("open")) {
        menu.classList.remove("open");
        document.body.classList.remove("menu-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  /* ---------- Sticky header shadow on scroll ---------- */
  var header = document.getElementById("site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Scroll to top ---------- */
  var scrollTopBtn = document.getElementById("scroll-top");
  if (scrollTopBtn) {
    var onScrollTopVisibility = function () {
      scrollTopBtn.classList.toggle("visible", window.scrollY > 480);
    };
    window.addEventListener("scroll", onScrollTopVisibility, { passive: true });
    onScrollTopVisibility();
    scrollTopBtn.addEventListener("click", function () {
      var reduceMotion =
        window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("in-view");
    });
  }

  /* ---------- Homepage hero: auto-advancing background slider ---------- */
  var heroSlider = document.querySelector("[data-hero-slider]");
  if (heroSlider) {
    var slides = heroSlider.querySelectorAll(".hero-slide");
    var reduceMotion =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (slides.length > 1 && !reduceMotion) {
      var activeIndex = 0;
      var advance = function () {
        if (document.hidden) return; // don't burn cycles/transitions on a backgrounded tab
        slides[activeIndex].classList.remove("is-active");
        activeIndex = (activeIndex + 1) % slides.length;
        slides[activeIndex].classList.add("is-active");
      };
      window.setInterval(advance, 6000);
    }
  }

  /* ---------- Forms: progressive Netlify-Forms-compatible submission ---------- */
  function encode(data) {
    return Object.keys(data)
      .map(function (k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
      })
      .join("&");
  }

  document.querySelectorAll("form[data-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = form.querySelector("[data-form-note]");
      var submitBtn = form.querySelector('button[type="submit"]');
      var honeypot = form.querySelector('input[name="company"]');
      if (honeypot && honeypot.value) return; // bot trap

      var data = {};
      new FormData(form).forEach(function (v, k) {
        data[k] = v;
      });

      if (submitBtn) {
        submitBtn.disabled = true;
      }

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(data),
      })
        .then(function (res) {
          if (res.ok) {
            showNote(
              form,
              note,
              form.dataset.success || "Thank you — we've received your message!",
              false
            );
            form.reset();
          } else {
            throw new Error("Form endpoint not connected yet");
          }
        })
        .catch(function () {
          showNote(
            form,
            note,
            "This form isn't connected to a mail service yet. Please reach us directly at our Contact page in the meantime.",
            true
          );
        })
        .finally(function () {
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  });

  function showNote(form, note, message, isError) {
    if (!note) return;
    note.textContent = message;
    note.hidden = false;
    note.classList.toggle("error", !!isError);
  }
})();
