import { keysPromise } from "./keys.js";

keysPromise.then((keys) => {
  let sheetId = keys.sheetID;
  let serviceID = keys.serviceID;
  let templateID2 = "template_gk677zq";

  let fetchUrl = `https://sheetdb.io/api/v1/${sheetId}`;

  let channelName;
  let channelLink;
  let channelDesc;
  let channelCat;

  // Attach an event listener to the button
  document
    .getElementById("release-button")
    .addEventListener("click", function () {
      channelName = document.getElementById("channel-name").value;
      channelLink = document.getElementById("channel-link").value;
      channelDesc = document.getElementById("channel-desc").value;
      channelCat = document.getElementById("channel-cat").value;

      fetch(fetchUrl)
        .then((response) => response.json())
        .then((data) => {
          let emails = data.map((row) => row.Email); // replace 'email' with your column name
          // call the function to send emails
          sendEmails(emails, channelName, channelLink, channelDesc);
        })
        .catch((error) => console.error("Error:", error));

      fetch("https://digitalcxoapi-2abd74fc33cb.herokuapp.com/db", {
        method: "PUT", // or 'POST'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: channelCat,
          channelName: channelName,
          link: channelLink,
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => {
          console.error("Error:", error);
        });
    });

  // Define the function to send emails
  function sendEmails(emails, channelName, channelLink, channelDesc) {
    const emailBody = `Introducing Our New Social Media Stream and Newsletter!

    Dear User,
    
    We're thrilled to announce our new social media stream and newsletter! 
    
    Stay connected and informed with the latest updates, trends, and valuable content in your field of interest.
    
    Subscribe to our newsletter and join our social media channels for:
    
    ${channelName}: ${channelLink}

    ${channelDesc}
    
    We value your feedback and look forward to your active participation.`;

    // Loop through each email
    emails.forEach((userMail) => {
      if (serviceID && templateID2) {
        var params = {
          email: userMail,
          message: emailBody,
        };

        emailjs
          .send(serviceID, templateID2, params)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
      } else {
        alert(
          "Service ID or Template ID is not ready yet. Please try again later."
        );
      }
    });
  }
});
