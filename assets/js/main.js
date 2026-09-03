/* ============================================================
   RenewPath — main.js
   Injects header/footer, handles theme, RTL, mobile nav, toasts.
   ============================================================ */

(function () {
  "use strict";

  // ---------- Path helpers ----------
  // Detect whether current page lives inside /dashboard/ to compute relative asset paths.
  var path = window.location.pathname;
  var inDashboard = path.indexOf("/dashboard/") !== -1;
  var root = inDashboard ? "../" : "";

  var NAV_ITEMS = [
    { label: "Home", href: root + "index.html", match: "index.html" },
    { label: "Home 2", href: root + "home-2.html", match: "home-2.html" },
    { label: "How It Works", href: root + "how-it-works.html", match: "how-it-works.html" },
    { label: "Policy Types", href: root + "policy-types.html", match: "policy-types.html" },
    { label: "Claims", href: root + "claims.html", match: "claims.html" },
    { label: "Insurers", href: root + "insurers.html", match: "insurers.html" },
    { label: "Renew", href: root + "renewal.html", match: "renewal.html" },
    { label: "FAQ", href: root + "faq.html", match: "faq.html" },
    { label: "Contact", href: root + "contact.html", match: "contact.html" }
  ];

  function currentFile() {
    var f = path.split("/").pop();
    return f === "" ? "index.html" : f;
  }

  // ---------- SVG icon strings ----------
  var ICONS = {
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>'
  };

  // ---------- Build header ----------
  function buildHeader() {
    var header = document.getElementById("main-header");
    if (!header) return;

    var file = currentFile();
    var navHtml = NAV_ITEMS.map(function (item) {
      var active = item.match === file ? " active" : "";
      return '<a href="' + item.href + '" class="' + active.trim() + '">' + item.label + "</a>";
    }).join("");

    var mobileNavHtml = NAV_ITEMS.map(function (item) {
      var active = item.match === file ? " active" : "";
      return '<a href="' + item.href + '" class="' + active.trim() + '">' + item.label + "</a>";
    }).join("");

    header.className = "site-header";
    header.innerHTML =
      '<div class="container header-inner">' +
        '<a href="' + root + 'index.html" class="brand">' +
          '<span class="brand-mark">' +
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 13l1.5-4.5A2 2 0 0 1 6.4 7h11.2a2 2 0 0 1 1.9 1.5L21 13"/><path d="M3 13h18v4a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4z"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/></svg>' +
          "</span>" +
          "<span>RenewPath</span>" +
        "</a>" +
        '<nav class="main-nav" aria-label="Primary">' + navHtml + "</nav>" +
        '<div class="header-actions">' +
          '<button type="button" class="toggle-btn" id="theme-toggle" aria-label="Toggle dark mode">' +
            '<span class="icon-sun">' + ICONS.sun + "</span>" +
            '<span class="icon-moon">' + ICONS.moon + "</span>" +
          "</button>" +
          '<button type="button" class="rtl-text-btn" id="rtl-toggle" aria-label="Toggle right-to-left layout">RTL</button>' +
          '<a href="' + root + 'login.html" class="btn btn-secondary btn-sm header-login-btn">Login</a>' +
          '<a href="' + root + 'dashboard/index.html" class="btn btn-primary btn-sm">Dashboard</a>' +
          '<button type="button" class="nav-toggle" id="nav-toggle" aria-label="Open menu" aria-expanded="false">' + ICONS.menu + "</button>" +
        "</div>" +
      "</div>" +
      '<div class="mobile-panel" id="mobile-panel">' +
        '<div class="mobile-panel-head">' +
          '<a href="' + root + 'index.html" class="brand"><span class="brand-mark">' +
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 13l1.5-4.5A2 2 0 0 1 6.4 7h11.2a2 2 0 0 1 1.9 1.5L21 13"/><path d="M3 13h18v4a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4z"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/></svg>' +
          "</span><span>RenewPath</span></a>" +
          '<button type="button" class="nav-toggle" id="nav-close" aria-label="Close menu">' + ICONS.close + "</button>" +
        "</div>" +
        '<div class="mobile-panel-toggles">' +
          '<button type="button" class="toggle-btn" id="theme-toggle-m" aria-label="Toggle dark mode">' +
            '<span class="icon-sun">' + ICONS.sun + "</span><span class=\"icon-moon\">" + ICONS.moon + "</span>" +
          "</button>" +
          '<button type="button" class="rtl-text-btn" id="rtl-toggle-m" aria-label="Toggle right-to-left layout">RTL</button>' +
        "</div>" +
        '<nav aria-label="Mobile">' + mobileNavHtml + "</nav>" +
        '<div class="mobile-panel-actions">' +
          '<a href="' + root + 'login.html" class="btn btn-secondary btn-block">Login</a>' +
          '<a href="' + root + 'dashboard/index.html" class="btn btn-primary btn-block">Dashboard</a>' +
        "</div>" +
      "</div>";

    // Scroll shadow
    window.addEventListener("scroll", function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    }, { passive: true });

    // Mobile panel
    var panel = document.getElementById("mobile-panel");
    var openBtn = document.getElementById("nav-toggle");
    var closeBtn = document.getElementById("nav-close");
    function openPanel() {
      panel.classList.add("open");
      document.body.style.overflow = "hidden";
      openBtn.setAttribute("aria-expanded", "true");
    }
    function closePanel() {
      panel.classList.remove("open");
      document.body.style.overflow = "";
      openBtn.setAttribute("aria-expanded", "false");
    }
    if (openBtn) openBtn.addEventListener("click", openPanel);
    if (closeBtn) closeBtn.addEventListener("click", closePanel);
    panel.querySelectorAll("nav a").forEach(function (a) {
      a.addEventListener("click", closePanel);
    });

    // Theme + RTL toggles (desktop + mobile duplicates)
    ["theme-toggle", "theme-toggle-m"].forEach(function (id) {
      var btn = document.getElementById(id);
      if (btn) btn.addEventListener("click", toggleTheme);
    });
    ["rtl-toggle", "rtl-toggle-m"].forEach(function (id) {
      var btn = document.getElementById(id);
      if (btn) btn.addEventListener("click", toggleRTL);
    });
  }

  // ---------- Build footer ----------
  function buildFooter() {
    var footer = document.getElementById("main-footer");
    if (!footer) return;

    var year = new Date().getFullYear();

    footer.innerHTML =
      '<div class="container">' +
        '<div class="footer-grid">' +
          '<div class="footer-brand">' +
            '<a href="' + root + 'index.html" class="brand" style="color:#fff">' +
              '<span class="brand-mark"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 13l1.5-4.5A2 2 0 0 1 6.4 7h11.2a2 2 0 0 1 1.9 1.5L21 13"/><path d="M3 13h18v4a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4z"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/></svg></span>' +
              "<span>RenewPath</span>" +
            "</a>" +
            "<p>Renew smarter, compare better and manage every car insurance document from one connected place.</p>" +
            '<div class="footer-social">' +
              '<a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z"/></svg></a>' +
              '<a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg></a>' +
              '<a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-.9 1.8-1.9 3.7-1.9 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21H9z"/></svg></a>' +
            "</div>" +
          "</div>" +
          '<div class="footer-col"><h4>Insurance</h4><ul>' +
            '<li><a href="' + root + 'renewal.html">Renew Insurance</a></li>' +
            '<li><a href="' + root + 'policy-types.html">Policy Types</a></li>' +
            '<li><a href="' + root + 'insurers.html">Compare Quotes</a></li>' +
            '<li><a href="' + root + 'claims.html">Claims Assistance</a></li>' +
          "</ul></div>" +
          '<div class="footer-col"><h4>Customers</h4><ul>' +
            '<li><a href="' + root + 'login.html">Login</a></li>' +
            '<li><a href="' + root + 'signup.html">Sign Up</a></li>' +
            '<li><a href="' + root + 'dashboard/policies.html">My Policies</a></li>' +
            '<li><a href="' + root + 'dashboard/documents.html">Documents</a></li>' +
            '<li><a href="' + root + 'dashboard/reminders.html">Renewal Reminders</a></li>' +
          "</ul></div>" +
          '<div class="footer-col"><h4>Company</h4><ul>' +
            '<li><a href="' + root + 'how-it-works.html">How It Works</a></li>' +
            '<li><a href="' + root + 'insurers.html">Partner Insurers</a></li>' +
            '<li><a href="' + root + 'faq.html">FAQ</a></li>' +
            '<li><a href="' + root + 'contact.html">Contact</a></li>' +
          "</ul></div>" +
        "</div>" +
        '<p class="footer-disclaimer">RenewPath is a frontend product demonstration. Insurer names, quotes, premiums, policy numbers and claim records shown throughout this site are illustrative sample data for prototype purposes only and do not represent real insurance offers, transactions or coverage.</p>' +
        '<div class="footer-bottom">' +
          "<span>&copy; " + year + " RenewPath Insurance Advisory. All rights reserved.</span>" +
          '<div class="footer-bottom-links">' +
            '<a href="' + root + 'faq.html">Privacy</a><a href="' + root + 'faq.html">Terms</a><a href="' + root + 'faq.html">Insurance Disclaimer</a>' +
          "</div>" +
        "</div>" +
      "</div>";
  }

  // ---------- Theme ----------
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("rp-theme", theme);
  }
  function toggleTheme() {
    var current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    applyTheme(current === "dark" ? "light" : "dark");
  }

  // ---------- RTL ----------
  function applyRTL(isRTL) {
    document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
    localStorage.setItem("rp-rtl", isRTL ? "1" : "0");
  }
  function toggleRTL() {
    var isRTL = document.documentElement.getAttribute("dir") === "rtl";
    applyRTL(!isRTL);
  }

  // Apply stored preferences immediately (before header builds) to avoid flash
  (function initPrefs() {
    var theme = localStorage.getItem("rp-theme") || "light";
    var rtl = localStorage.getItem("rp-rtl") === "1";
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("dir", rtl ? "rtl" : "ltr");
  })();

  // ---------- Toast system ----------
  window.RenewPath = window.RenewPath || {};
  window.RenewPath.toast = function (message) {
    var stack = document.querySelector(".toast-stack");
    if (!stack) {
      stack = document.createElement("div");
      stack.className = "toast-stack";
      document.body.appendChild(stack);
    }
    var toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = ICONS.check + "<span>" + message + "</span>";
    stack.appendChild(toast);
    requestAnimationFrame(function () {
      toast.classList.add("show");
    });
    setTimeout(function () {
      toast.classList.remove("show");
      setTimeout(function () { toast.remove(); }, 350);
    }, 3200);
  };

  // ---------- Back to top ----------
  function initBackToTop() {
    var btn = document.createElement("button");
    btn.className = "back-to-top";
    btn.setAttribute("aria-label", "Back to top");
    btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
    document.body.appendChild(btn);
    window.addEventListener("scroll", function () {
      btn.classList.toggle("show", window.scrollY > 500);
    }, { passive: true });
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ---------- Extra FAQ Accordion Helper ----------
  function initExtraFaq() {
    document.addEventListener("click", function (e) {
      var btn = e.target.closest(".extra-faq-btn");
      if (!btn) return;
      var item = btn.closest(".extra-faq-item");
      if (!item) return;
      var isOpen = item.classList.contains("open");
      item.classList.toggle("open", !isOpen);
      btn.setAttribute("aria-expanded", String(!isOpen));
    });
  }

  // ---------- Init ----------
  document.addEventListener("DOMContentLoaded", function () {
    buildHeader();
    buildFooter();
    initBackToTop();
    initExtraFaq();

    // Hard fallback: ensure nothing stays invisible if observers misfire
    setTimeout(function () {
      document.querySelectorAll(".reveal-armed:not(.in-view)").forEach(function (el) {
        el.classList.add("in-view");
      });
    }, 1200);
  });
})();
