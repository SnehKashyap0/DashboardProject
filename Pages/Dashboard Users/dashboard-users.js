// =============================================
// DOM REFERENCES
// =============================================

const profileName = document.querySelector(".Profile-name");
const popupUsername = document.querySelector("#popupUsername");

const dropdownMenu = document.querySelector(".dropdown-menu");
const dropdownContent = document.querySelector(".dropdown-content");

const popupLogout = document.querySelector("#popup-logout");

const menu = document.querySelector(".menu");
const sidebar = document.querySelector(".sidebar");
const overlay = document.querySelector(".overlay");

const footerItem = document.querySelectorAll(".footer-item");

const tbody = document.querySelector(".table-body");

// Edit Modal
const editModal = document.querySelector(".edit-modal");
const editFirstName = document.querySelector("#editFirstName");
const editLastName = document.querySelector("#editLastName");
const editUsername = document.querySelector("#editUsername");
const editEmail = document.querySelector("#editEmail");
const saveBtn = document.querySelector(".save-btn");
const cancelBtn = document.querySelector(".cancel-btn");

// Profile Modal
const profileModal = document.querySelector("#profileModal");
const profileImage = document.querySelector("#profileImage");
const profileModalName = document.querySelector("#profileModalName");
const profileUsername = document.querySelector("#profileUsername");
const profileEmail = document.querySelector("#profileEmail");
const profilePhone = document.querySelector("#profilePhone");
const profileAge = document.querySelector("#profileAge");
const profileGender = document.querySelector("#profileGender");
const profileBirthDate = document.querySelector("#profileBirthDate");
const profileBloodGroup = document.querySelector("#profileBloodGroup");
const profileHeight = document.querySelector("#profileHeight");
const profileWeight = document.querySelector("#profileWeight");
const profileCompany = document.querySelector("#profileCompany");
const profileAddress = document.querySelector("#profileAddress");
const closeProfileBtn = document.querySelector(".close-profile-btn");

// Pagination
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const pageNumber = document.querySelector(".page-number");

// Search
const searchInput = document.querySelector(".search-input");
const searchBox = document.querySelector(".search-box");
const icon = document.querySelector("#searchIcon");

// Delete Confirmation
const deleteModal = document.querySelector("#deleteModal");
const cancelDeleteBtn = document.querySelector(".cancel-delete-btn");
const confirmDeleteBtn = document.querySelector(".confirm-delete-btn");

//Sorting
const nameHeader = document.querySelector("#name-header");
const sortIcon = document.querySelector("#sort-arrow");

// =============================================
// VARIABLES
// =============================================

let userData = [];
let selectedUserId = null;

let currentPage = 1;
let usersPerPage = 10;

let searchText = "";

let deleteUserId = null;

let sortOrder = "asc";

// =============================================
// SOTING BASED ON NAMES
// =============================================

nameHeader.addEventListener("click", () => {
  if (sortOrder === "asc") {
    userData.sort((a, b) => a.firstName.localeCompare(b.firstName));
    sortIcon.className = "fa-solid fa-arrow-down-z-a";
    sortOrder = "desc";
  } else {
    userData.sort((a, b) => b.firstName.localeCompare(a.firstName));
    sortIcon.className = "fa-solid fa-arrow-up-a-z";
    sortOrder = "asc";
  }
  renderUser();
});

// =============================================
// PAGINATION
// =============================================

nextBtn.addEventListener("click", () => {
  const filteredUsers = userData.filter((u) => {
    return (
      u.firstName.toLowerCase().includes(searchText) ||
      u.lastName.toLowerCase().includes(searchText) ||
      u.username.toLowerCase().includes(searchText)
    );
  });

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  if (currentPage < totalPages) {
    currentPage++;
    renderUser();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderUser();
  }
});

// =============================================
// SEARCH
// =============================================

searchInput.addEventListener("input", (e) => {
  searchText = e.target.value.toLowerCase();

  currentPage = 1;

  renderUser();
});

icon.addEventListener("click", () => {
  searchInput.classList.toggle("active");
  if (searchInput.classList.contains("active")) {
    searchInput.focus();
  }
});

// =============================================
// LOGIN
// =============================================

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
  window.location.href = "/pages/login/login.html";
}

profileName.innerText = currentUser.fullname;
popupUsername.innerText = "@" + currentUser.username;

// =============================================
// LOAD USERS
// =============================================

async function getUsers() {
  const response = await fetch("https://dummyjson.com/users");

  const data = await response.json();
  userData = data.users;

  renderUser();
}

getUsers();

// =============================================
// RENDER USERS
// =============================================

function renderUser() {
  const filteredUsers = userData.filter((u) => {
    return (
      u.firstName.toLowerCase().includes(searchText) ||
      u.lastName.toLowerCase().includes(searchText) ||
      u.username.toLowerCase().includes(searchText)
    );
  });

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  if (currentPage > totalPages && totalPages > 0) {
    currentPage = totalPages;
  }

  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;

  const userCount = document.querySelector(".user-count");

  const showingStart = filteredUsers.length === 0 ? 0 : startIndex + 1;
  const showingEnd = Math.min(endIndex, filteredUsers.length);

  userCount.innerHTML = `
  Showing <span>${showingStart}-${showingEnd}</span> of <span>${filteredUsers.length}</span> users
`;

  tbody.innerHTML = filteredUsers
    .slice(startIndex, endIndex)
    .map(
      (u, index) => `
<tr>
<td>${startIndex + index + 1}</td>
<td>${u.firstName} ${u.lastName}</td>
<td>${u.username}</td>
<td>${u.email}</td>
<td>${u.status || "Active"}</td>

<td class="action-btns">

<button class="profile-btn" onclick="profileUser(${u.id})">
<i class="fa-solid fa-user"></i>
</button>

<button class="update-btn" onclick="updateUser(${u.id})">
<i class="fa-solid fa-pen-to-square"></i>
</button>

<button class="delete-btn" onclick="openDeleteModal(${u.id})">
<i class="fa-solid fa-trash"></i>
</button>

</td>

</tr>
`,
    )
    .join("");

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages || totalPages === 0;
}
// =============================================
// UPDATE USER
// =============================================

function updateUser(id) {
  selectedUserId = id;

  const user = userData.find((u) => u.id === id);

  editModal.classList.add("active");

  editFirstName.value = user.firstName;
  editLastName.value = user.lastName;
  editUsername.value = user.username;
  editEmail.value = user.email;
}

// =============================================
// SAVE UPDATED USER
// =============================================

saveBtn.addEventListener("click", async () => {
  const index = userData.findIndex((u) => u.id === selectedUserId);

  const updatedUser = {
    firstName: editFirstName.value,
    lastName: editLastName.value,
    username: editUsername.value,
    email: editEmail.value,
  };

  Object.assign(userData[index], updatedUser);

  await fetch(`https://dummyjson.com/users/${selectedUserId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUser),
  });

  editModal.classList.remove("active");

  renderUser();
});

// =============================================
// CANCEL EDIT
// =============================================

cancelBtn.addEventListener("click", () => {
  editModal.classList.remove("active");
});

// =============================================
// DELETE USER
// =============================================
async function deleteUser(id) {
  await fetch(`https://dummyjson.com/users/${id}`, {
    method: "DELETE",
  });

  userData = userData.filter((u) => u.id !== id);

  deleteModal.classList.remove("active");

  renderUser();
}

function openDeleteModal(id) {
  deleteUserId = id;
  deleteModal.classList.add("active");
}

// =============================================
// DELETE CONFIRMATION
// =============================================

confirmDeleteBtn.addEventListener("click", () => {
  deleteUser(deleteUserId);
  deleteModal.classList.remove("active");
});

// =============================================
// CANCEL EDIT
// =============================================

cancelDeleteBtn.addEventListener("click", () => {
  deleteModal.classList.remove("active");
});

// =============================================
// PROFILE MODAL
// =============================================

function profileUser(id) {
  const user = userData.find((u) => u.id === id);

  profileModal.classList.add("active");

  profileImage.src = user.image;

  profileModalName.innerText = `${user.firstName} ${user.lastName}`;

  profileUsername.innerText = `@${user.username}`;

  profileEmail.innerText = user.email;

  profilePhone.innerText = user.phone;

  profileAge.innerText = `${user.age} Years`;

  profileGender.innerText = user.gender;

  profileBirthDate.innerText = user.birthDate;

  profileBloodGroup.innerText = user.bloodGroup;

  profileHeight.innerText = `${user.height} cm`;

  profileWeight.innerText = `${user.weight} kg`;

  profileCompany.innerText = user.company.name;

  profileAddress.innerText = `${user.address.address}, ${user.address.city}`;
}

// =============================================
// CLOSE PROFILE MODAL
// =============================================

closeProfileBtn.addEventListener("click", () => {
  profileModal.classList.remove("active");
});

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
});

// =============================================
// NAVIGATION
// =============================================

document.querySelector("#popupProfile")?.addEventListener("click", () => {
  window.location.href = "/pages/profile/profile.html";
});

document.querySelector(".home-link")?.addEventListener("click", () => {
  window.location.href = "/pages/dashboard home/dashboard-home.html";
});

document.querySelector(".profile-link")?.addEventListener("click", () => {
  window.location.href = "/pages/profile/profile.html";
});

document.querySelector(".footer-home")?.addEventListener("click", () => {
  window.location.href = "/pages/Dashboard Home/dashboard-home.html";
});

document.querySelector(".footer-users")?.addEventListener("click", () => {
  window.location.href = "/pages/Dashboard Users/dashboard-users.html";
});

document.querySelector(".footer-profile")?.addEventListener("click", () => {
  window.location.href = "/pages/profile/profile.html";
});

// =============================================
// FOOTER ACTIVE
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
