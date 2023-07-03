import { keysPromise } from "./keys.js";

let keys;

keysPromise.then((fetchedKeys) => {
  keys = fetchedKeys;

  document.getElementById("submit-btn").addEventListener("click", () => {
    console.log("success");

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (Object.keys(email).length === 0 || Object.keys(password).length === 0) {
      alert("Please Enter Your Email/Password");
    } else {
      if (email === keys.emailId && password === keys.key) {
        sessionStorage.setItem("authenticated", "true");
        window.location.href = "interact.html";
      } else {
        alert("Email/Password Incorrect");
      }
    }
  });
});
