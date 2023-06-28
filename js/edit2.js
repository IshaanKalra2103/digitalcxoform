import { keysPromise } from "./keys.js";

keysPromise.then((keys) => {
  let sheetID = keys.sheetID;
  let emailInput = document.getElementById("email");
  let searchButton = document.getElementById("search");
  let detailsContent = document.getElementById("details-content");
  let changeModal = document.getElementById("changeModal");
  let closeBtn = document.querySelector(".close-btn");
  let submitBtn = document.querySelector(".submit-btn");
  let applyBtn = document.getElementById("apply-btn");

  let detailContainer = document.getElementById("details-container");

  
  applyBtn.style.visibility = "hidden";

  let varId;

  let changes = {}; // Object to store the changes

  // Add an event listener to the search button
  searchButton.addEventListener("click", function () {
    detailContainer.classList.add("fade-in");
    setTimeout(function () {
      detailContainer.style.visibility = "visible";
    }, 500);

    applyBtn.classList.add("fade-in");
    setTimeout(function () {
      applyBtn.style.visibility = "visible";
    }, 1500);

    // applyBtn.style.visibility = "visible";
    // Define the base API URL
    let apiUrl = `https://sheetdb.io/api/v1/${sheetID}/search?Email=${encodeURIComponent(
      emailInput.value
    )}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Clear the details content
        detailsContent.innerHTML = "";

        // Append the data to the details content
        let count = 0;
        for (let key in data[0]) {
          if (count < 9) {
            detailsContent.innerHTML += `<div class="d-flex justify-content-between"><p class="text-primary">${key}: <span id=s-${key}>${data[0][key]}</span></p><button type="button" class="btn btn-primary change-btn btn-sm ms-6 mt-2" id=${key}>Change</button></div>`;

            count++;
          }
        }

        setTimeout(function () {
          let fadeInElements = document.querySelectorAll(".fade-in");
          fadeInElements.forEach((element) => {
            element.style.visibility = "visible";
          });
        }, 2000);

        // Add click event listeners to the "Change" buttons
        let changeButtons = document.querySelectorAll(".change-btn");
        changeButtons.forEach((button) => {
          button.addEventListener("click", function () {
            document.getElementsByClassName(
              "modal-title"
            )[0].textContent = `Change your ${button.id}`;
            document.getElementById(
              "new"
            ).placeholder = `Enter your new ${button.id}`;
            changeModal.style.display = "flex";
            varId = button.id;
            console.log(varId);
          });
        });
      });
  });

  // Add click event listener to the close button
  closeBtn.addEventListener("click", function () {
    // Hide the modal
    changeModal.style.display = "none";
  });

  // Add click event listener to the submit button
  submitBtn.addEventListener("click", function () {
    // Hide the modal and do something with the new email
    let newContent = document.getElementById("new").value;
    changes[varId] = newContent; // Store the change
    document.getElementById("new").value = "";
    document.getElementById(`s-${varId}`).textContent = newContent;
    changeModal.style.display = "none";
  });

  // Add click event listener to the apply button
  applyBtn.addEventListener("click", function () {
    // Send the changes to the API
    let apiUrl = `https://sheetdb.io/api/v1/${sheetID}/Email/${encodeURIComponent(
      emailInput.value
    )}`;

    fetch(apiUrl, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          Email: emailInput.value,
          ...changes, // Spread the changes object into the data
        },
      }),
    })
      .then((response) => {
        alert("Changes Successful!");
        console.log(response.json());
      })
      .then((data) => console.log(data));
  });
});
