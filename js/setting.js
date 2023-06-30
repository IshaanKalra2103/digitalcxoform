import { keysPromise } from "./keys.js";

let emailId, key;
let changeModal = document.getElementById("changeModal");
let closeBtn = document.querySelector(".close-btn");
let submitBtn = document.querySelector(".submit-btn");
let applyBtn = document.getElementById("apply-btn");

let varId;

let changes = {};

keysPromise.then((keys) => {
  emailId = keys.emailId;
  key = keys.key;

  let email = document.getElementById("email");
  let password = document.getElementById("password");

  email.textContent = emailId;
  password.textContent = key;
});

let changeButtons = document.querySelectorAll(".change-btn");
changeButtons.forEach((button) => {
  button.addEventListener("click", function () {
    document.getElementsByClassName(
      "modal-title"
    )[0].textContent = `Change your ${button.id}`;
    document.getElementById("new").placeholder = `Enter your new ${button.id}`;
    changeModal.style.display = "flex";
    varId = button.id;
    console.log(varId);
  });
});

closeBtn.addEventListener("click", function () {
  // Add the fade-out-custom class to trigger the animation
  changeModal.classList.add("fade-out-custom");

  // Wait for the animation to finish before hiding the modal
  // Assuming the animation duration is 500ms, adjust as needed
  setTimeout(function () {
    changeModal.style.display = "none";
    // Remove the class after the animation to be ready for the next one
    changeModal.classList.remove("fade-out-custom");
  }, 2000);
});

// Add click event listener to the submit button
submitBtn.addEventListener("click", function () {
  // Hide the modal and do something with the new email or password
  let newContent = document.getElementById("new").value;
  if (varId === "email" || varId === "password") {
    // Only store changes for email and password
    changes[varId] = newContent;
    document.getElementById(`${varId}`).textContent = newContent;
  }
  document.getElementById("new").value = "";
  changeModal.style.display = "none";
});

applyBtn.addEventListener("click", function () {
  // Send the changes to the API
  let apiUrl = "https://digitalcxoapi-2abd74fc33cb.herokuapp.com/keys";

  fetch(apiUrl, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      emailId: changes["email"] ? changes["email"] : emailId, // If there is a new email in changes, use it. Otherwise, use the current email
      key: changes["password"] ? changes["password"] : key, // If there is a new password in changes, use it. Otherwise, use the current key
    }),
  })
    .then((response) => {
      alert("Changes Successful!");
      console.log(response.json());
    })
    .then((data) => console.log(data));
});
