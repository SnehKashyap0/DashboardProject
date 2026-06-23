// =============================================
// DOM REFERENCES
// =============================================

let profileName = document.querySelector(".Profile-name");
let popupUsername = document.querySelector("#popupUsername");
let dropdownMenu = document.querySelector(".dropdown-menu");
let dropdownContent = document.querySelector(".dropdown-content");
let popupLogout = document.querySelector("#popup-logout");
let menu = document.querySelector(".menu");
let sidebar = document.querySelector(".sidebar");
let overlay = document.querySelector(".overlay");
let footerItem = document.querySelectorAll(".footer-item");
let tbody = document.querySelector(".table-body");

// =============================================
// CHECK LOGIN
// =============================================

let currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
  window.location.href = "/pages/login/login.html";
}

// =============================================
// USER INFO
// =============================================

profileName.innerText = currentUser.fullname;
popupUsername.innerText = "@" + currentUser.username;

// =============================================
// LOAD USERS TABLE
// =============================================

let users = JSON.parse(localStorage.getItem("users")) || [];

tbody.innerHTML = users
  .map(
    (u) => `
      <tr>
        <td>${u.fullname}</td>
        <td>${u.username}</td>
        <td>${u.email}</td>
        <td>${u.status || "Active"}</td>
      </tr>
    `,
  )
  .join("");

// =============================================
// SIDEBAR
// =============================================

menu.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
});

overlay.addEventListener("click", () => {
  sidebar.classList.remove("active");
  dropdownContent.classList.remove("active");
  overlay.classList.remove("active");
});

// =============================================
// DROPDOWN
// =============================================

dropdownMenu.addEventListener("click", (e) => {
  e.stopPropagation();
  dropdownContent.classList.toggle("active");
  overlay.classList.toggle("active");
});
// =============================================
// DROPDOWN OPTIONS
// =============================================

document.querySelector("#popupProfile").addEventListener("click", () => {
  window.location.href = "/pages/profile/profile.html";
});

// =============================================
// NAVIGATION LINKS
// =============================================

document.querySelector(".home-link")?.addEventListener("click", () => {
  window.location.href = "/pages/dashboard home/dashboard-home.html";
});

document.querySelector(".profile-link")?.addEventListener("click", () => {
  window.location.href = "/pages/profile/profile.html";
});

// =============================================
// FOOTER
// =============================================

footerItem.forEach((item) => {
  item.addEventListener("click", () => {
    footerItem.forEach((i) => i.classList.remove("active"));
    item.classList.add("active");
  });
});

// =============================================
// LOGOUT
// =============================================

popupLogout.addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  window.location.href = "/pages/login/login.html";
});
