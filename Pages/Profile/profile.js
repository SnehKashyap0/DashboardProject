// =============================================
// DOM ELEMENT REFERENCES
// =============================================

let profileName = document.querySelector(".Profile-name"); // Name shown in navbar
let popupUsername = document.querySelector("#popupUsername"); // @username in dropdown popup
let displayName = document.querySelector("#displayName"); // Full name on profile card
let displayHandle = document.querySelector("#displayHandle"); // @username on profile card
let fieldName = document.querySelector("#fieldName"); // Editable Full Name field
let fieldUsername = document.querySelector("#fieldUsername"); // Editable Username field
let fieldEmail = document.querySelector("#fieldEmail"); // Editable Email field
let signoutBtn = document.querySelector(".signout-btn"); // (Unused/commented out in HTML)
let editBtn = document.querySelector(".edit-btn"); // Edit Profile / Save button
let deletBtn = document.querySelector(".delete-btn"); // Delete Profile button
let dropdownMenu = document.querySelector(".dropdown-menu"); // Clickable profile area (name + arrow)
let dropdownContent = document.querySelector(".dropdown-content"); // The dropdown panel
let profilePic = document.querySelector(".profile-pic"); // Profile picture in navbar
let popupLogout = document.querySelector("#popup-logout"); // Logout option in dropdown
let menu = document.querySelector(".menu"); // Hamburger icon
let sidebar = document.querySelector(".sidebar"); // Slide-in sidebar panel
let overlay = document.querySelector(".overlay"); // Dark background overlay
let home = document.querySelector(".home-link"); // Open Dashboard Home
let userinfo = document.querySelector(".users-link"); // Open Dashboard Users

// =============================================
// LOAD CURRENT USER FROM LOCAL STORAGE
// =============================================

// Retrieve the logged-in user object saved during the signup/login flow
let user = JSON.parse(localStorage.getItem("currentUser"));

// Keep a copy of the original username so we can find this user later when saving edits
let oldUsername = user.username;

// =============================================
// POPULATE THE UI WITH USER DATA
// =============================================

// Navbar: show the user's name and @username
profileName.innerText = user.fullname;
popupUsername.innerText = "@" + user.username;

// Profile card header
displayName.innerText = user.fullname;
displayHandle.innerText = "@" + user.username;

// Profile card detail fields
fieldName.innerText = user.fullname;
fieldUsername.innerText = user.username;
fieldEmail.innerText = user.email;

// =============================================
// EDIT PROFILE / SAVE BUTTON
// =============================================

let isEditing = false; // Tracks whether we're currently in edit mode

editBtn.addEventListener("click", () => {
  if (!isEditing) {
    // --- Enter Edit Mode ---
    // Make the fields directly editable in the browser
    fieldName.contentEditable = true;
    fieldUsername.contentEditable = true;
    fieldEmail.contentEditable = true;

    // Add visual cue (slight opacity) to show fields are editable
    fieldName.classList.add("edit");
    fieldUsername.classList.add("edit");
    fieldEmail.classList.add("edit");

    fieldName.focus(); // Auto-focus the first field for convenience
    editBtn.innerText = "Save";
    isEditing = true;
  } else {
    // --- Save Changes ---

    // Read the updated values from the editable fields
    user.fullname = fieldName.innerText;
    user.username = fieldUsername.innerText;
    user.email = fieldEmail.innerText;

    // Update the matching user record in the full users array in localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users = users.map((u) => {
      if (u.username === oldUsername) {
        return user; // Replace the old record with the updated one
      }
      return u;
    });

    // Persist the updated users array and current user back to localStorage
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(user));

    // Lock the fields back to read-only
    fieldName.contentEditable = false;
    fieldUsername.contentEditable = false;
    fieldEmail.contentEditable = false;

    // Remove the "editing" visual cue
    fieldName.classList.remove("edit");
    fieldUsername.classList.remove("edit");
    fieldEmail.classList.remove("edit");

    // Refresh the profile card header to reflect the new values
    displayName.innerText = user.fullname;
    displayHandle.innerText = "@" + user.username;

    // Update oldUsername so future saves compare against the latest username
    oldUsername = user.username;

    editBtn.innerText = "Edit Profile";
    isEditing = false;
  }
});

// =============================================
// DELETE PROFILE BUTTON
// =============================================

deletBtn.addEventListener("click", () => {
  // Remove this user from the stored users array
  let users = JSON.parse(localStorage.getItem("users")) || [];
  users = users.filter((u) => u.username !== user.username);
  localStorage.setItem("users", JSON.stringify(users));

  // Clear the active session
  localStorage.removeItem("currentUser");

  // Redirect to the signup page
  window.location.href = "/Pages/Signup/signup.html";
});

// =============================================
// SIDEBAR (HAMBURGER MENU)
// =============================================

// Toggle sidebar open/closed when the hamburger icon is clicked
menu.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
});

// Close the sidebar when the overlay (dark background) is clicked
overlay.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
});
// =============================================
// SIDEBAR OPTIONS
// =============================================

home.addEventListener("click", () => {
  window.location.href = "/Pages/Dashboard Home/dashboard-home.html";
});
userinfo.addEventListener("click", () => {
  window.location.href = "/Pages/Dashboard Users/dashboard-users.html";
});

// =============================================
// PROFILE DROPDOWN
// =============================================

// Toggle the dropdown panel when the profile name/arrow area is clicked
dropdownMenu.addEventListener("click", () => {
  dropdownContent.classList.toggle("active");
  overlay.classList.toggle("active");
});

// Close the dropdown when the overlay is clicked
overlay.addEventListener("click", () => {
  dropdownContent.classList.remove("active");
  overlay.classList.remove("active");
});

// =============================================
// LOGOUT
// =============================================

// Clear the current session and redirect to the login page
popupLogout.addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  window.location.href = "/pages/login/login.html";
});
