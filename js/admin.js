import { keysPromise } from "./keys.js";

let keys;

keysPromise.then((fetchedKeys) => {
  keys = fetchedKeys;
  console.log(keys);
});

function checkDirect() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if (email === keys.emailId && password === keys.key) {
    sessionStorage.setItem('authenticated', 'true');
    console.log("reached");
    window.location.href = "interact.html";
  } else {
    alert("Email/Password Incorrect");
  }
}

window.checkDirect = checkDirect;
