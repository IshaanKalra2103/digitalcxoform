import { keysPromise } from "./keys.js";

let serviceID, templateID;

keysPromise.then((keys) => {
  serviceID = keys.serviceID;
  templateID = keys.templateID;
});

function sendMail() {
  const userName = document.getElementById("name").value;
  const userMail = document.getElementById("email").value;

  const emailBody = `Dear ${userName},
  We are thrilled to invite you to the Digital CXO.Live community, where you can connect with like-minded professionals and explore various social media channels tailored to your interests.
  
  // ... rest of the email body ...

  Thank you for joining Digital CXO.Live! We look forward to your active participation in our thriving community.`;

  if (serviceID && templateID) {
    var params = {
      name: userName,
      email: userMail,
      message: emailBody,
    };

    emailjs
      .send(serviceID, templateID, params)
      .then((res) => {
        console.log(res);
        alert("Your message sent successfully!!");
      })
      .catch((err) => console.log(err));
  } else {
    alert(
      "Service ID or Template ID is not ready yet. Please try again later."
    );
  }
}

// Attach the function to the global scope if it's being used as an event handler in HTML
window.sendMail = sendMail;
