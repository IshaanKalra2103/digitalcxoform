import { keysPromise } from "./keys.js";

let keys;

keysPromise.then((fetchedKeys) => {
  keys = fetchedKeys;
});

function checkDirect() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if (keys && email === keys.emailId && password === keys.key) {
    window.location.href = "interact.html";
  } else {
    alert("Email/Password Incorrect");
  }
}

// Attach the function to the global scope if it's being used as an event handler in HTML
window.checkDirect = checkDirect;

