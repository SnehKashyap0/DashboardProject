let fullName = document.querySelector("#fullname");
let email = document.querySelector("#email");
let username = document.querySelector("#username");
let password = document.querySelector("#password");
let confirmPassword = document.querySelector("#confirmPassword");
let form = document.querySelector("form");
let btn = document.querySelector("#btn");
let eyeIcon1 = document.querySelector("#eyeIcon1");
let eyeIcon2 = document.querySelector("#eyeIcon2");
let errname = document.querySelector(".errname");
let errusername = document.querySelector(".errusername");
let errpassword = document.querySelector(".errpassword");
let errconfirmpassword = document.querySelector(".errconfirmpassword");
let erremail = document.querySelector(".erremail");

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

//Mandatory Fields
function checkInputs() {
  if (fullName.value.trim() === "") {
    errname.innerText = "Please enter Your Fullname !";
    errname.style.fontSize = "0.8rem";
    errname.style.color = "red";
    fullName.focus();
    return;
  }

  if (email.value.trim() === "") {
    erremail.innerText = "Please enter Email";
    erremail.style.fontSize = "0.8rem";
    erremail.style.color = "red";
    email.focus();
    return;
  }
  if (username.value.trim() === "") {
    errusername.innerText = "Please enter username !";
    errusername.style.fontSize = "0.8rem";
    errusername.style.color = "red";
    username.focus();
    return;
  }

  if (password.value.trim() === "") {
    errpassword.innerText = "Please enter password !";
    errpassword.style.fontSize = "0.8rem";
    errpassword.style.color = "red";
    eyeIcon1.classList.add("moveUp");

    password.focus();
    return;
  }
  if (confirmPassword.value.trim() === "") {
    errconfirmpassword.innerText = "Please confirm Your password!";
    errconfirmpassword.style.fontSize = "0.8rem";
    errconfirmpassword.style.color = "red";
    confirmPassword.focus();
    return;
  }
}

//Clearing Warnings on user input
fullName.addEventListener("input", () => {
  if (fullName.value.trim() !== "") {
    errname.innerText = "";
  }
});
email.addEventListener("input", () => {
  if (email.value.trim() !== "") {
    erremail.innerText = "";
  }
});
email.addEventListener("blur", () => {
  if (!email.checkValidity()) {
    erremail.innerText = "Please enter a valid email!";
    erremail.style.fontSize = "0.8rem";
    erremail.style.color = "red";
  } else {
    erremail.innerText = "";
  }
});
username.addEventListener("input", () => {
  if (username.value.trim() !== "") {
    errusername.innerText = "";
  }
});
password.addEventListener("input", () => {
  if (password.value.trim() !== "") {
    eyeIcon1.classList.remove("moveUp");
    errpassword.innerText = "";
  }
});
password.addEventListener("input", () => {
  if (password.value.length >= 8) {
    errpassword.innerText = "";
    eyeIcon1.classList.remove("moveUp");
  }
});
confirmPassword.addEventListener("input", () => {
  if (confirmPassword.value.trim() !== "") {
    eyeIcon2.classList.remove("moveUp");
    errconfirmpassword.innerText = "";
  }
});

//Password Visibility on Password Field
eyeIcon1.addEventListener("click", () => {
  if (password.type === "password") {
    password.type = "text";

    eyeIcon1.classList.remove("fa-eye");
    eyeIcon1.classList.add("fa-eye-slash");
  } else {
    password.type = "password";

    eyeIcon1.classList.remove("fa-eye-slash");
    eyeIcon1.classList.add("fa-eye");
  }
});

//Password Visibility on Confirm Password Field
eyeIcon2.addEventListener("click", () => {
  if (confirmPassword.type === "password") {
    confirmPassword.type = "text";

    eyeIcon2.classList.remove("fa-eye");
    eyeIcon2.classList.add("fa-eye-slash");
  } else {
    confirmPassword.type = "password";

    eyeIcon2.classList.remove("fa-eye-slash");
    eyeIcon2.classList.add("fa-eye");
  }
});

//Button On Click Functionality
btn.addEventListener("click", () => {
  if (
    fullName.value.trim() !== "" &&
    email.value.trim() !== "" &&
    username.value.trim() !== "" &&
    password.value.trim() !== "" &&
    confirmPassword.value.trim() !== ""
  ) // Only Valid Mail can be entered
  {
    if (!email.checkValidity()) {
      erremail.innerText = "PLease Enter a Valid Email !";
      erremail.style.fontSize = "0.8rem";
      erremail.style.color = "red";
      email.focus();
      return;
    }
    // Checking Password Length
    else if (password.value.length < 8) {
      errpassword.innerText = "Password must be at least 8 characters !";
      errpassword.style.fontSize = "0.8rem";
      errpassword.style.color = "red";
      eyeIcon1.classList.add("moveUp");
      password.focus();
      return;
    }
    // Matching Password and Confirm Password
    else if (password.value !== confirmPassword.value) {
      errconfirmpassword.innerText = "Passwords do not Match !";
      eyeIcon2.classList.add("moveUp");
      confirmPassword.value = "";
      confirmPassword.focus();
      return;
    }
    //Making Entry
    else {
      //Making Users Collection
      let user = {
        fullname: fullName.value,
        username: username.value,
        email: email.value,
        password: password.value,
      };

      let users = JSON.parse(localStorage.getItem("users")) || [];
      //Checking Existing User
      let existingUsername = users.some((u) => {
        return u.username.trim() === username.value.trim();
      });
      //Checking Existing Email
      let existingEmail = users.some((u) => {
        return u.email.trim() === email.value.trim();
      });

      if (existingUsername) {
        errusername.innerText = "Username Already exists !";
        errusername.style.fontSize = "0.8rem";
        errusername.style.color = "red";
      } else if (existingEmail) {
        erremail.innerText = "Email Already exists !";
        erremail.style.fontSize = "0.8rem";
        erremail.style.color = "red";
      } else {
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", JSON.stringify(user));

        window.location.href = "../Dashboard Home/dashboard-home.html";
        form.reset();
      }
    }
  } else {
    checkInputs();
  }
});
