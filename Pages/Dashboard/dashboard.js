let profileName = document.querySelector(".Profile-name");
let popupUsername = document.querySelector("#popupUsername");
let displayName = document.querySelector("#displayName");
let displayHandle = document.querySelector("#displayHandle");
let fieldName = document.querySelector("#fieldName");
let fieldUsername = document.querySelector("#fieldUsername");
let fieldEmail = document.querySelector("#fieldEmail");
let signoutBtn = document.querySelector(".signout-btn");
let editBtn = document.querySelector(".edit-btn");
let deletBtn = document.querySelector(".delete-btn");

let dropdownMenu = document.querySelector(".dropdown-menu");
let dropdownContent = document.querySelector(".dropdown-content");

let profilePic = document.querySelector(".profile-pic");
let popupLogout = document.querySelector("#popup-logout");

let menu = document.querySelector(".menu");
let sidebar = document.querySelector(".sidebar");
let overlay = document.querySelector(".overlay");

//Getting User info from localstorage stored using Signup page
let user = JSON.parse(localStorage.getItem("currentUser"));

let oldUsername = user.username;

profileName.innerText = user.fullname;
popupUsername.innerText = "@" + user.username;
//profile
displayName.innerText = user.fullname;
displayHandle.innerText = "@" + user.username;

//Fields
fieldName.innerText = user.fullname;
fieldUsername.innerText = user.username;
fieldEmail.innerText = user.email;

//Edit Profile Button
let isEditing = false;

editBtn.addEventListener("click", () => {
  if (!isEditing) {
    fieldName.contentEditable = true;
    fieldUsername.contentEditable = true;
    fieldEmail.contentEditable = true;

    fieldName.classList.add("edit");
    fieldUsername.classList.add("edit");
    fieldEmail.classList.add("edit");

    fieldName.focus();

    editBtn.innerText = "Save";
    isEditing = true;
  } else {
    user.fullname = fieldName.innerText;
    user.username = fieldUsername.innerText;
    user.email = fieldEmail.innerText;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    users = users.map((u) => {
      if (u.username === oldUsername) {
        return user;
      }
      return u;
    });

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(user));

    fieldName.contentEditable = false;
    fieldUsername.contentEditable = false;
    fieldEmail.contentEditable = false;

    fieldName.classList.remove("edit");
    fieldUsername.classList.remove("edit");
    fieldEmail.classList.remove("edit");

    displayName.innerText = user.fullname;
    displayHandle.innerText = "@" + user.username;

    oldUsername = user.username;

    editBtn.innerText = "Edit Profile";
    isEditing = false;
  }
});

//Delete Button
deletBtn.addEventListener("click", () => {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  users = users.filter((u) => u.username !== user.username);
  localStorage.setItem("users", JSON.stringify(users));

  localStorage.removeItem("currentUser");
  window.location.href = "/Pages/Signup/signup.html";
});

//Sign-Out button

//Sidebar Action
menu.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
});

//overlay Action
overlay.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
});

// Popup Click Actions
dropdownMenu.addEventListener("click", () => {
  dropdownContent.classList.toggle("active");
  overlay.classList.toggle("active");
});
//Overlay Action
overlay.addEventListener("click", () => {
  dropdownContent.classList.remove("active");
  overlay.classList.remove("active");
});
popupLogout.addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  window.location.href = "/pages/login/login.html";
});
