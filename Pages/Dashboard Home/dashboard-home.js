// =============================================
// DOM REFERENCES
// =============================================

let profileName = document.querySelector(".Profile-name");
let popupUsername = document.querySelector("#popupUsername");
let welcomeMsg = document.querySelector("#welcomeMsg");
let dropdownMenu = document.querySelector(".dropdown-menu");
let dropdownContent = document.querySelector(".dropdown-content");
let popupLogout = document.querySelector("#popup-logout");
let menu = document.querySelector(".menu");
let sidebar = document.querySelector(".sidebar");
let overlay = document.querySelector(".overlay");
let footerItem = document.querySelectorAll(".footer-item");

// =============================================
// LOAD USER FROM LOCALSTORAGE
// =============================================

let user = JSON.parse(localStorage.getItem("currentUser"));

// If no user is logged in, redirect to login
if (!user) {
  window.location.href = "/pages/login/login.html";
}

// =============================================
// POPULATE USER INFO
// =============================================

// Navbar name and dropdown username
profileName.innerText = user.fullname;
popupUsername.innerText = "@" + user.username;

// Time-based greeting in the welcome banner
let hour = new Date().getHours();
let greeting =
  hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

welcomeMsg.innerText = greeting + ", " + user.fullname + "!";

// =============================================
// SIDEBAR (HAMBURGER MENU)
// =============================================

menu.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
});

overlay.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
});

// =============================================
// PROFILE DROPDOWN
// =============================================

dropdownMenu.addEventListener("click", () => {
  dropdownContent.classList.toggle("active");
  overlay.classList.toggle("active");
});

overlay.addEventListener("click", () => {
  dropdownContent.classList.remove("active");
  overlay.classList.remove("active");
});

// =============================================
// SIDEBAR NAV LINKS
// =============================================

document.querySelector(".profile-link").addEventListener("click", () => {
  window.location.href = "/pages/profile/profile.html";
});

// =============================================
// FOOTER
// =============================================

footerItem.addEventListener("click", () => {
  footerItem.forEach((item), () => {
    item.addEventListener("click", () => {
      footerItem.forEach((i), () => {
        i.classList.remove("active");
      });
      item.classList.add("active");
    });
  });
});

// =============================================
// LOGOUT
// =============================================

popupLogout.addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  window.location.href = "/pages/login/login.html";
});
