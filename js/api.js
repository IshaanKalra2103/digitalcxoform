import { keysPromise } from "./keys.js";

let apiUrl;

keysPromise.then((keys) => {
  let sheetID = keys.sheetID;
  apiUrl = `https://sheetdb.io/api/v1/${sheetID}`;
});

function SubForm() {
  // Get the current date and time
  var timestamp = new Date().toISOString();

  // Collect form data
  var formData = {
    "Email": $("#email").val(),
    "Name": $("#name").val(),
    "Mobile": $("#phone").val(),
    "Linkedin": $("#linkedin").val(),
    "Company": $("#company").val(),
    "Role": $("#role").val(),
    "Functional area": $("#functional-area").val(),
    "Skills": $("#skills").val(),
    "Interests":
      $("#other").val(),
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
        alert("Form Data Submitted :)");
      },
      error: function () {
        alert("There was an error :(");
      },
    });

    setTimeout(() => {
      window.location.href = "greeting.html";
    }, 2500);
  } else {
    alert("API URL is not ready yet. Please try again later.");
  }
}

// Attach the function to the global scope if it's being used as an event handler in HTML
window.SubForm = SubForm;
