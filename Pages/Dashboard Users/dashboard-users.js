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
let editModal = document.querySelector(".edit-modal");
let editFirstName = document.querySelector("#editFirstName");
let editLastName = document.querySelector("#editLastName");
let editUsername = document.querySelector("#editUsername");
let editEmail = document.querySelector("#editEmail");
let saveBtn = document.querySelector(".save-btn");
let cancelBtn = document.querySelector(".cancel-btn");

let userData = [];
let selectedUserId = null;

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
// DELETE USER FROM API
// =============================================

async function deleteUser(id) {
  const response = await fetch(`https://dummyjson.com/users/${id}`, {
    method: "DELETE",
  });
  userData = userData.filter((user) => {
    console.log("Delete Clicked", id);
    return user.id !== id;
  });
  renderUser();
}

// =============================================
// UPDATE USER FROM API
// =============================================

function updateUser(id) {
  selectedUserId = id;
  const user = userData.find((u) => {
    return u.id === id;
  });
  editModal.classList.add("active");
  editFirstName.value = user.firstName;
  editLastName.value = user.lastName;
  editEmail.value = user.email;
  editUsername.value = user.username;
}

// =============================================
// SAVE USER AFTER UPDATE
// =============================================

saveBtn.addEventListener("click", async () => {
  console.log("Save Clicked");
  let newFirstName = editFirstName.value;
  let newLastName = editLastName.value;
  let newEmail = editEmail.value;
  let newUsername = editUsername.value;
  const index = userData.findIndex((u) => {
    return u.id === selectedUserId;
  });
  //Local Array Update
  userData[index].firstName = newFirstName;
  userData[index].lastName = newLastName;
  userData[index].email = newEmail;
  userData[index].username = newUsername;

  // API Update
  await fetch(`https://dummyjson.com/users/${selectedUserId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmail,
      username: newUsername,
    }),
  });

  renderUser();
  console.log(userData);
  editModal.classList.remove("active");
});

// =============================================
// CANCEL UPDATE
// =============================================

cancelBtn.addEventListener("click", () => {
  editModal.classList.remove("active");
});

// =============================================
// RENDER USERS
// =============================================

function renderUser() {
  tbody.innerHTML = userData
    .map(
      (u) => `
      <tr>
        <td>${u.firstName} ${u.lastName}</td>
        <td>${u.username}</td>
        <td>${u.email}</td>
        <td>${u.status || "Active"}</td>
        <td><button class="delete-btn" onclick="deleteUser(${u.id})">Delete</button></td>
        <td><button class="update-btn" onclick="updateUser(${u.id})">Update</button></td>
      </tr>
    `,
    )
    .join("");
}

// =============================================
// LOAD USER FROM API
// =============================================

async function getUsers() {
  const response = await fetch("https://dummyjson.com/users");
  const data = await response.json();
  userData = data.users;
  renderUser();
}
getUsers();

// =============================================
// SIDEBAR
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
    footerItem.forEach((i) => {
      i.classList.remove("active");
    });
    item.classList.add("active");
  });
});
document.querySelector(".footer-profile").addEventListener("click", () => {
  window.location.href = "/pages/profile/profile.html";
});
document.querySelector(".footer-users").addEventListener("click", () => {
  window.location.href = "/pages/Dashboard Users/dashboard-users.html";
});
document.querySelector(".footer-home").addEventListener("click", () => {
  window.location.href = "/pages/Dashboard Home/dashboard-home.html";
});

// =============================================
// LOGOUT
// =============================================

popupLogout.addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  window.location.href = "/pages/login/login.html";
});
