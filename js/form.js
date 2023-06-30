import { keysPromise } from "./keys.js";

let serviceID, templateID, apiUrl, sheetID;

keysPromise.then((keys) => {
  sheetID = keys.sheetID;
  serviceID = keys.serviceID;
  templateID = keys.templateID;

  apiUrl = `https://sheetdb.io/api/v1/${sheetID}`;
});

let email = $("#email").val();
let name = $("#name").val();
let mobile = $("#phone").val();
let linkedin = $("#linkedin").val();
let company = $("#company").val();
let role = $("#role").val();
let functional = $("#functional-area").val();
let skills = $("#skills").val();
let interests = $("#other").val();

function SubForm() {
  // Get the current date and time
  var timestamp = new Date().toISOString();

  // Collect form data
  var formData = {
    Email: email,
    Name: name,
    Mobile: mobile,
    Linkedin: linkedin,
    Company: company,
    Role: role,
    "Functional area": functional,
    Skills: skills,
    Interests: interests,
    Timestamp: timestamp, // Add the timestamp here
  };

  // Check if apiUrl is defined
  if (apiUrl) {
    // Send formData as a single set to the spreadsheet API
    $.ajax({
      url: apiUrl,
      type: "post",
      data: JSON.stringify(formData), // Convert to JSON string
      contentType: "application/json", // Set content type to JSON
      success: function () {
        showAlert("Form Data Submitted :)");
      },
      error: function () {
        showAlert("There was an error :(");
      },
    });

    setTimeout(() => {
      window.location.href = "greeting.html";
    }, 2500);
  } else {
    showAlert("API URL is not ready yet. Please try again later.");
  }
}

// Attach the function to the global scope if it's being used as an event handler in HTML
window.SubForm = SubForm;

function sendMail() {
  const userName = document.getElementById("name").value;
  const userMail = document.getElementById("email").value;

  const emailBody = `Dear ${userName},
  We are thrilled to invite you to the Digital CXO.Live community, where you can connect with like-minded professionals and explore various social media channels tailored to your interests.
  
  This page serves as a gateway to join our vibrant social media channels. Feel free to join any of the channels listed below:
  
  1. Core Industry channels:
  - Digital Transformation: WhatsApp Group Link - https://chat.whatsapp.com/Hsxnb3pepn5767bz7vDAo1
  - Digital Transformation on Facebook: Facebook Group Link - https://www.facebook.com/groups/DigitalCXO/
  - Retail Tech: WhatsApp Group Link - https://chat.whatsapp.com/J5APi6odPa8JwxfP7mNFjz
  - Fintech: WhatsApp Group Link - https://chat.whatsapp.com/HTPyRL6kGJiEZuPj9ehru6
  - Manufacturing Tech: WhatsApp Group Link - https://chat.whatsapp.com/DVIbGDAnKh8D8Mbpytxk9v
  - Supply chain Tech: WhatsApp Group Link - https://chat.whatsapp.com/DYlt7zUAqS7E8ikkarlT0d
  - Health Tech: WhatsApp Group Link - https://chat.whatsapp.com/EbHEZkp9XRw2hs0ctyFonW
  
  2. Core Technologies:
  - Artificial Intelligence (AI): WhatsApp Group Link - https://chat.whatsapp.com/GP7TKDbQZXk3GGNBfXu81O
  - Cloud: WhatsApp Group Link - https://chat.whatsapp.com/B6VKWOEYmyRAjULHSP8PtH
  - Data Analytics: WhatsApp Group Link - https://chat.whatsapp.com/KRetlLLo2e8Ik0XgMBhwTb
  - Tech Architecture: WhatsApp Group Link - https://chat.whatsapp.com/ByGjJru1VPJJWRJ4CGtRq2
  - Coding: WhatsApp Group Link - https://chat.whatsapp.com/I25YSnDIGR58YlrmQAwvas
  
  3. Lifestyle for Tech Leaders:
  - Travel: Goa-for-techies: WhatsApp Group Link - https://chat.whatsapp.com/CHk8Yku1wrp6i0vJudoCoQ
  - Travel: Himalayas-for-techies: WhatsApp Group Link - https://chat.whatsapp.com/DsNM8c0RziAGtnhFBOdioA
  
  4. Personal enrichment:
  - Career: WhatsApp Group Link - https://chat.whatsapp.com/JMQFkjIp2rCJ8lzTYS0ldT
  
  We are continuously expanding and enhancing our channels to provide valuable resources and foster meaningful connections. If you have any feedback or suggestions, please don't hesitate to reach out to the Digital CXO.Live 
  forum founders at digitalcxolive@gmail.com.
  
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
        showAlert("Your message sent successfully!!");
      })
      .catch((err) => console.log(err));
  } else {
    showAlert(
      "Service ID or Template ID is not ready yet. Please try again later."
    );
  }
}

// Attach the function to the global scope if it's being used as an event handler in HTML
window.sendMail = sendMail;

function showAlert(message) {
  $("#alert-message").text(message);
  $("#alert-box").removeClass("hide").addClass("fade-in-custom");
}

$("#alert-close").click(function () {
  $("#alert-box").addClass("fade-out-custom");
  setTimeout(function () {
    $("#alert-box").addClass("hide");
  }, 2000); // delay equal to the duration of the fade-out animation
});

$("#sbmt-btn").click(function () {
  if (
    email.length === 0 ||
    name.length === 0 ||
    mobile.length === 0 ||
    linkedin.length === 0 ||
    company.length === 0 ||
    role.length === 0 ||
    functional.length === 0 ||
    skills.length === 0 ||
    interests.length === 0
  ) {
    showAlert("Please fill all the details!");
  } else {
    SubForm();
    sendMail();
  }
});
