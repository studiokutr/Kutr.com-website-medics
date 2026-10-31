// Site header for the static pages (markup in each page, styles in site-header.css).
// Same behaviour as the homepage header: dropdown, hamburger menu (stays open until × or a link is tapped),
// shadow once scrolled, and the login button or account pill from the saved login.
(function () {
  var h = document.getElementById("sh");
  if (!h) return;
  var burger = h.querySelector(".sh-burger"), menu = h.querySelector(".sh-menu"), dd = h.querySelector(".sh-dd"), t;
  var user = "", name = "";
  try { user = localStorage.getItem("nikan-user") || ""; var p = JSON.parse(localStorage.getItem("nikan-profile") || "null"); if (p) name = (p.first + " " + p.last).trim(); } catch (e) {}
  // Hamburger menu: logged out shows «ورود و ثبت‌نام»; logged in shows profile and appointments.
  h.querySelectorAll(user ? ".sh-menu [data-guest]" : ".sh-menu [data-auth]").forEach(function (a) { a.hidden = true; });
  if (user) h.querySelectorAll(".sh-navlogin").forEach(function (a) { a.hidden = true; });
  if (user) {
    h.querySelector(".sh-login").hidden = true;
    h.querySelector(".sh-acct").hidden = false;
    if (name) h.querySelector(".sh-name").textContent = name;
  }
  // Profile and appointments need a login; without one they open the login box on the homepage.
  h.querySelectorAll("[data-auth]").forEach(function (a) {
    a.addEventListener("click", function (e) { if (!user) { e.preventDefault(); location.href = h.querySelector(".sh-logo").href + "#login"; } });
  });
  menu.querySelectorAll('a:not([aria-disabled="true"])').forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  h.querySelectorAll('.sh-menu a[aria-disabled="true"]').forEach(function (a) { a.addEventListener("click", function (e) { e.preventDefault(); }); });
  // Dim overlay under the open menu; tapping it closes the menu.
  var dim = document.createElement("div"); dim.className = "sh-dim"; dim.hidden = true; dim.setAttribute("aria-hidden", "true");
  menu.parentNode.insertBefore(dim, menu);
  dim.addEventListener("click", function () { setMenu(false); });
  function setMenu(open) { menu.hidden = !open; dim.hidden = !open; burger.setAttribute("aria-expanded", open ? "true" : "false"); burger.setAttribute("aria-label", open ? "بستن منو" : "منو"); burger.classList.toggle("is-open", open); }
  burger.addEventListener("click", function () { setMenu(menu.hidden); });
  function setDd(open) { dd.classList.toggle("is-open", open); dd.querySelector(".sh-ddbtn").setAttribute("aria-expanded", open ? "true" : "false"); }
  dd.addEventListener("mouseenter", function () { clearTimeout(t); setDd(true); });
  dd.addEventListener("mouseleave", function () { clearTimeout(t); t = setTimeout(function () { setDd(false); }, 120); });
  dd.querySelector(".sh-ddbtn").addEventListener("click", function () { setDd(!dd.classList.contains("is-open")); });
  dd.addEventListener("focusout", function (e) { if (!dd.contains(e.relatedTarget)) setDd(false); });
  function onScroll() {
    var y = window.scrollY;
    h.classList.toggle("is-up", y > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
