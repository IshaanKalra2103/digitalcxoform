function SubForm() {
  // Get the current date and time
  var timestamp = new Date().toISOString();

  // Collect form data
  var formData = {
    "Email Address": $("#email").val(),
    "Your Name": $("#name").val(),
    "Mobile number": $("#phone").val(),
    "Your LinkedIn link": $("#linkedin").val(),
    "Your current company": $("#company").val(),
    "Your designation or role": $("#role").val(),
    "Functional area": $("#functional-area").val(),
    "Top 3 skills": $("#skills").val(),
    "Any other areas of interest that you want from this forum": $("#other").val(),
    "Timestamp": timestamp // Add the timestamp here
  };

  // Send formData as a single set to the spreadsheet API
  $.ajax({
    url: "https://sheetdb.io/api/v1/2fy3bv2u5r3tn",
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
}
