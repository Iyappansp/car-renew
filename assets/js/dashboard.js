/* ============================================================
   RenewPath — dashboard.js
   Injects sidebar + topbar shell for all dashboard pages.
   Reads data-dash-page on <body> to set active nav + page title.
   ============================================================ */

(function () {
  "use strict";

  var PAGE_TITLES = {
    overview: "Dashboard",
    renewal: "Renew Insurance",
    quotes: "Quote Comparison",
    "quote-details": "Quote Details",
    policies: "My Policies",
    "policy-details": "Policy Details",
    claims: "My Claims",
    documents: "My Documents",
    receipts: "Tax & Payment Receipts",
    reminders: "Renewal Reminders",
    payments: "Payment History",
    profile: "My Profile",
    settings: "Account Settings"
  };

  var NAV_ITEMS = [
    { key: "overview", label: "Dashboard", href: "index.html", icon: '<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>' },
    { key: "renewal", label: "Renew Insurance", href: "renewal.html", icon: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>' },
    { key: "quotes", label: "Quote Comparison", href: "quotes.html", icon: '<path d="M3 3v18h18"/><path d="M18 17V9M13 17V5M8 17v-3"/>' },
    { key: "policies", label: "My Policies", href: "policies.html", icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>' },
    { key: "claims", label: "Claims", href: "claims.html", icon: '<path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9 2 18a2 2 0 0 0 1.7 3h16.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/>' },
    { key: "documents", label: "Documents", href: "documents.html", icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 15h6M9 11h6"/>' },
    { key: "receipts", label: "Receipts", href: "receipts.html", icon: '<path d="M4 2h16v20l-3-2-3 2-3-2-3 2-3-2-1 2z"/><path d="M8 8h8M8 12h8"/>' },
    { key: "reminders", label: "Reminders", href: "reminders.html", icon: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>' },
    { key: "payments", label: "Payments", href: "payments.html", icon: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>' },
    { key: "profile", label: "Profile", href: "profile.html", icon: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-1a8 8 0 0 1 16 0v1"/>' },
    { key: "settings", label: "Settings", href: "settings.html", icon: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>' }
  ];

  var ICON_CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>';

  function buildSidebar(activeKey) {
    var wrap = document.getElementById("dash-shell-root");
    if (!wrap) return;

    var navHtml = NAV_ITEMS.map(function (item) {
      var active = item.key === activeKey ? " active" : "";
      return '<a href="' + item.href + '" class="dash-nav-link' + active + '"' + (item.key === activeKey ? ' aria-current="page"' : '') + '>' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + item.icon + '</svg>' +
        '<span>' + item.label + '</span></a>';
    }).join("");

    var pageTitle = PAGE_TITLES[activeKey] || "Dashboard";

    wrap.innerHTML =
      '<div class="dash-sidebar-backdrop" id="dash-backdrop"></div>' +
      '<aside class="dash-sidebar" id="dash-sidebar">' +
        '<div class="dash-sidebar-head">' +
          '<a href="../index.html" class="brand" aria-label="RenewPath Home">' +
            '<img src="../assets/images/logo1.png" alt="RenewPath" class="brand-logo-img">' +
          '</a>' +
        '</div>' +
        '<nav class="dash-sidebar-nav" aria-label="Dashboard">' + navHtml + '</nav>' +
        '<div class="dash-sidebar-foot">' +
          '<button type="button" class="dash-logout-btn" id="dash-logout-btn">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>' +
            '<span>Logout</span>' +
          '</button>' +
        '</div>' +
      '</aside>' +
      '<div class="dash-main">' +
        '<header class="dash-topbar">' +
          '<div class="dash-topbar-left">' +
            '<button type="button" class="toggle-btn dash-sidebar-toggle" id="dash-sidebar-toggle" aria-label="Open sidebar">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>' +
            '</button>' +
            '<h1 class="dash-page-title">' + pageTitle + '</h1>' +
          '</div>' +
          '<div class="dash-topbar-right">' +
            '<div class="dash-search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg><input type="text" placeholder="Search..." aria-label="Search"></div>' +
            '<button type="button" class="toggle-btn" id="theme-toggle" aria-label="Toggle dark mode">' +
              '<span class="icon-sun"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg></span>' +
              '<span class="icon-moon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg></span>' +
            '</button>' +
            '<button type="button" class="toggle-btn" id="rtl-toggle" aria-label="Toggle right-to-left layout"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z"/></svg></button>' +
            '<div style="position:relative">' +
              '<button type="button" class="toggle-btn dash-notif-btn" id="dash-notif-btn" aria-label="Notifications" aria-expanded="false">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>' +
                '<span class="dash-notif-dot"></span>' +
              '</button>' +
              '<div class="dash-notif-panel" id="dash-notif-panel">' +
                '<div class="dash-notif-panel-head">Notifications</div>' +
                '<div class="dash-notif-item"><span class="dash-notif-item-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg></span><div><p>Renewal due in 12 days</p><span>2 hours ago</span></div></div>' +
                '<div class="dash-notif-item"><span class="dash-notif-item-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg></span><div><p>Quote from Bluewave Insurer ready</p><span>1 day ago</span></div></div>' +
                '<div class="dash-notif-item"><span class="dash-notif-item-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg></span><div><p>Policy document downloaded</p><span>3 days ago</span></div></div>' +
              '</div>' +
            '</div>' +
            '<a href="profile.html" class="dash-profile-btn" aria-label="My Profile"><span class="dash-avatar">P</span></a>' +
          '</div>' +
        '</header>' +
        '<div class="dash-content"><div class="dash-content-inner" id="dash-content-inner"></div></div>' +
      '</div>' +
      '<div class="toast-stack"></div>' +
      '<div class="modal-backdrop" id="logout-modal">' +
        '<div class="modal-box">' +
          '<h3 class="h4" style="margin-bottom:10px">Sign out of RenewPath?</h3>' +
          '<p class="text-muted" style="margin-bottom:var(--space-6)">Are you sure you want to sign out?</p>' +
          '<div class="flex gap-3">' +
            '<button type="button" class="btn btn-ghost w-100" data-modal-close>Cancel</button>' +
            '<button type="button" class="btn btn-danger w-100" id="confirm-logout-btn">Logout</button>' +
          '</div>' +
        '</div>' +
      '</div>';

    // Move page-authored content into the shell's content slot
    var pending = document.getElementById("dash-page-content");
    if (pending) {
      document.getElementById("dash-content-inner").appendChild(pending);
      pending.removeAttribute("id");
      pending.style.display = "block";
    }

    initShellBehavior();
  }

  function initShellBehavior() {
    var sidebar = document.getElementById("dash-sidebar");
    var backdrop = document.getElementById("dash-backdrop");
    var toggleBtn = document.getElementById("dash-sidebar-toggle");

    function openSidebar() { sidebar.classList.add("open"); backdrop.classList.add("open"); }
    function closeSidebar() { sidebar.classList.remove("open"); backdrop.classList.remove("open"); }
    if (toggleBtn) toggleBtn.addEventListener("click", openSidebar);
    if (backdrop) backdrop.addEventListener("click", closeSidebar);

    var themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) themeBtn.addEventListener("click", function () {
      var current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
      var next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("rp-theme", next);
    });
    var rtlBtn = document.getElementById("rtl-toggle");
    if (rtlBtn) rtlBtn.addEventListener("click", function () {
      var isRTL = document.documentElement.getAttribute("dir") === "rtl";
      document.documentElement.setAttribute("dir", isRTL ? "ltr" : "rtl");
      localStorage.setItem("rp-rtl", isRTL ? "0" : "1");
    });

    var notifBtn = document.getElementById("dash-notif-btn");
    var notifPanel = document.getElementById("dash-notif-panel");
    if (notifBtn) {
      notifBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        notifPanel.classList.toggle("open");
        notifBtn.setAttribute("aria-expanded", notifPanel.classList.contains("open"));
      });
      document.addEventListener("click", function (e) {
        if (!notifPanel.contains(e.target) && e.target !== notifBtn) notifPanel.classList.remove("open");
      });
    }

    var logoutBtn = document.getElementById("dash-logout-btn");
    var logoutModal = document.getElementById("logout-modal");
    if (logoutBtn) logoutBtn.addEventListener("click", function () {
      logoutModal.classList.add("open");
      document.body.style.overflow = "hidden";
    });
    var confirmLogout = document.getElementById("confirm-logout-btn");
    if (confirmLogout) confirmLogout.addEventListener("click", function () {
      window.location.href = "../login.html";
    });
    logoutModal.querySelectorAll("[data-modal-close]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        logoutModal.classList.remove("open");
        document.body.style.overflow = "";
      });
    });
    logoutModal.addEventListener("click", function (e) {
      if (e.target === logoutModal) { logoutModal.classList.remove("open"); document.body.style.overflow = ""; }
    });

    window.RenewPath = window.RenewPath || {};
    window.RenewPath.toast = function (message) {
      var stack = document.querySelector(".toast-stack");
      var toast = document.createElement("div");
      toast.className = "toast";
      toast.innerHTML = ICON_CHECK + "<span>" + message + "</span>";
      stack.appendChild(toast);
      requestAnimationFrame(function () { toast.classList.add("show"); });
      setTimeout(function () {
        toast.classList.remove("show");
        setTimeout(function () { toast.remove(); }, 350);
      }, 3200);
    };
  }

  (function initPrefs() {
    var theme = localStorage.getItem("rp-theme") || "light";
    var rtl = localStorage.getItem("rp-rtl") === "1";
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("dir", rtl ? "rtl" : "ltr");
  })();

  document.addEventListener("DOMContentLoaded", function () {
    var body = document.body;
    var page = body.getAttribute("data-dash-page") || "overview";
    buildSidebar(page);

    setTimeout(function () {
      document.querySelectorAll(".reveal-armed:not(.in-view)").forEach(function (el) {
        el.classList.add("in-view");
      });
    }, 1200);
  });
})();
