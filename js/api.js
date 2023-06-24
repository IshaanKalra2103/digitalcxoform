function SubForm() {
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
    "Any other areas of interest that you want from this forum":
      $("#other").val(),
  };

  // Send formData as a single set to the spreadsheet API
  $.ajax({
    url: "https://api.apispreadsheets.com/data/xVbeZbneJLZ9oGzA/",
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
