/* ============================================================
   RenewPath — animations.js
   Scroll reveal (with hard fallback), counters, accordions, tabs.
   ============================================================ */

(function () {
  "use strict";

  // ---------- Scroll reveal ----------
  function initReveal() {
    var targets = document.querySelectorAll(".reveal-up, .reveal-stagger");
    if (!targets.length) return;

    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (el) { el.classList.add("in-view"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });

    targets.forEach(function (el) {
      // Arm only right before observing -- avoids elements getting stuck at opacity:0
      el.classList.add("reveal-armed");
      observer.observe(el);
    });

    // Hard fallback safety net
    setTimeout(function () {
      targets.forEach(function (el) { el.classList.add("in-view"); });
    }, 1200);
  }

  // ---------- Counters ----------
  function initCounters() {
    var counters = document.querySelectorAll("[data-counter]");
    if (!counters.length) return;

    function animateCounter(el) {
      var target = parseFloat(el.getAttribute("data-counter"));
      var prefix = el.getAttribute("data-prefix") || "";
      var suffix = el.getAttribute("data-suffix") || "";
      var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
      var duration = 1200;
      var startTime = null;

      function step(ts) {
        if (!startTime) startTime = ts;
        var progress = Math.min((ts - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var value = target * eased;
        el.textContent = prefix + value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    if (!("IntersectionObserver" in window)) {
      counters.forEach(animateCounter);
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { obs.observe(el); });
  }

  // ---------- Accordion (FAQ etc) ----------
  function initAccordions() {
    document.querySelectorAll("[data-accordion]").forEach(function (group) {
      var items = group.querySelectorAll(".accordion-item");
      items.forEach(function (item) {
        var trigger = item.querySelector(".accordion-trigger");
        var panel = item.querySelector(".accordion-panel");
        if (!trigger || !panel) return;
        trigger.addEventListener("click", function () {
          var isOpen = item.classList.contains("open");
          if (group.getAttribute("data-accordion") === "single") {
            items.forEach(function (i) {
              i.classList.remove("open");
              i.querySelector(".accordion-trigger").setAttribute("aria-expanded", "false");
              i.querySelector(".accordion-panel").style.maxHeight = null;
            });
          }
          if (!isOpen) {
            item.classList.add("open");
            trigger.setAttribute("aria-expanded", "true");
            panel.style.maxHeight = panel.scrollHeight + "px";
          } else {
            item.classList.remove("open");
            trigger.setAttribute("aria-expanded", "false");
            panel.style.maxHeight = null;
          }
        });
      });
    });
  }

  // ---------- Tabs ----------
  function initTabs() {
    document.querySelectorAll("[data-tabs]").forEach(function (tabGroup) {
      var buttons = tabGroup.querySelectorAll("[data-tab-target]");
      var panels = tabGroup.querySelectorAll("[data-tab-panel]");
      buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
          var target = btn.getAttribute("data-tab-target");
          buttons.forEach(function (b) { b.classList.remove("active"); b.setAttribute("aria-selected", "false"); });
          panels.forEach(function (p) { p.classList.remove("active"); });
          btn.classList.add("active");
          btn.setAttribute("aria-selected", "true");
          var panel = tabGroup.querySelector('[data-tab-panel="' + target + '"]');
          if (panel) panel.classList.add("active");
        });
      });
    });
  }

  // ---------- Modal open/close ----------
  function initModals() {
    document.querySelectorAll("[data-modal-open]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-modal-open");
        var modal = document.getElementById(id);
        if (modal) {
          modal.classList.add("open");
          document.body.style.overflow = "hidden";
        }
      });
    });
    document.querySelectorAll("[data-modal-close]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var modal = btn.closest(".modal-backdrop");
        if (modal) {
          modal.classList.remove("open");
          document.body.style.overflow = "";
        }
      });
    });
    document.querySelectorAll(".modal-backdrop").forEach(function (modal) {
      modal.addEventListener("click", function (e) {
        if (e.target === modal) {
          modal.classList.remove("open");
          document.body.style.overflow = "";
        }
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        document.querySelectorAll(".modal-backdrop.open").forEach(function (modal) {
          modal.classList.remove("open");
          document.body.style.overflow = "";
        });
      }
    });
  }

  // ---------- Password visibility toggle ----------
  function initPasswordToggle() {
    document.querySelectorAll("[data-password-toggle]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var input = document.getElementById(btn.getAttribute("data-password-toggle"));
        if (!input) return;
        var isPassword = input.type === "password";
        input.type = isPassword ? "text" : "password";
        btn.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");
        btn.classList.toggle("is-visible", isPassword);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initReveal();
    initCounters();
    initAccordions();
    initTabs();
    initModals();
    initPasswordToggle();
  });
})();
