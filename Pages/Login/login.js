let username = document.querySelector("#username");
let password = document.querySelector("#password");
let button = document.querySelector("#btn");
let form = document.querySelector("form");
let eyeIcon = document.querySelector("#eyeIcon");
let errname = document.querySelector(".errname");
let errpassword = document.querySelector(".errpassword");
let signUpTxt = document.querySelector(".signUpTxt");

//Getting User info from local Storage
let users = JSON.parse(localStorage.getItem("users")) || [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

//Mandatory Fields
function checkInputs() {
  if (username.value.trim() === "") {
    errname.innerText = "Please enter username !";
    errname.style.fontSize = "0.8rem";
    errname.style.color = "red";
    username.focus();
    return;
  }

  if (password.value.trim() === "") {
    errpassword.innerText = "Please enter password";
    errpassword.style.fontSize = "0.8rem";
    errpassword.style.color = "red";
    eyeIcon.classList.add("moveUp");
    password.focus();
    return;
  }
}

//Clearing Warnings on user input
username.addEventListener("input", () => {
  if (username.value.trim() !== "") {
    errname.innerText = "";
  }
});
password.addEventListener("input", () => {
  if (password.value.trim() !== "") {
    eyeIcon.classList.remove("moveUp");
    errpassword.innerText = "";
  }
});

//Password Visibility
eyeIcon.addEventListener("click", () => {
  if (password.type === "password") {
    password.type = "text";
    eyeIcon.classList.remove("fa-eye");
    eyeIcon.classList.add("fa-eye-slash");
  } else {
    password.type = "password";
    eyeIcon.classList.remove("fa-eye-slash");
    eyeIcon.classList.add("fa-eye");
  }
});

//Button On Click Functionality
button.addEventListener("click", () => {
  if (username.value.trim() !== "" && password.value.trim() !== "") {
    // Checking Password Length
    if (password.value.length < 8) {
      errpassword.innerText = "Password Should be 8 character long";
      errpassword.style.fontSize = "0.8rem";
      errpassword.style.color = "red";
      eyeIcon.classList.add("moveUp");
      password.focus();
    } else {
      let userByUsername = users.find(
        (u) => u.username === username.value.trim(),
      );

      if (!userByUsername) {
        errname.innerText = "Invalid Username !";
        errname.style.fontSize = "0.8rem";
        errname.style.color = "red";
      } else if (userByUsername.password !== password.value.trim()) {
        errpassword.innerText = "Invalid Password !";
        errpassword.style.fontSize = "0.8rem";
        errpassword.style.color = "red";
        eyeIcon.classList.add("moveUp");
      } else {
        localStorage.setItem("currentUser", JSON.stringify(userByUsername));

        window.location.href = "/Pages/Profile/profile.html";
      }
    }
  } else {
    checkInputs();
  }
});
