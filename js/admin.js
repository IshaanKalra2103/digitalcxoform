function checkDirect() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
  
    if (
      email === "digitalcxo43@gmail.com" &&
      password === "Digital123456@"
    ) {
      window.location.href = "interact.html";
    } else {
      alert("Email/Password Incorrect");
    }
  }
  