import { keysPromise } from "./keys.js";

keysPromise.then((keys) => {
  let sheetID = keys.sheetID;
  let emailInput = document.getElementById('email');

  // Define the base API URL
let apiUrl = `https://sheetdb.io/api/v1/${sheetID}`;

// Function to get data for a particular email
async function getData(email) {
    let response = await fetch(`${apiUrl}/search?email=${emailInput}`);
    let data = await response.json();
    return data;
}

// Function to update data for a particular email
// async function updateData(email, newData) {
//     let data = {
//         "data": newData
//     };

//     let response = await fetch(`${apiUrl}/search?email=${email}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     });

//     let result = await response.json();
//     return result;
// }

// Get the HTML elements

let detailContent = document.getElementById('detail-content');
let updateButton = document.getElementById('update');

// When the email input changes, get the data for the new email
// emailInput.addEventListener('change', function() {
//     getData(emailInput.value).then(data => {
//         // Clear the detail content
//         detailContent.innerHTML = '';

//         // Append the data to the detail content
//         for (let key in data[0]) {
//             detailContent.innerHTML += `<p>${key}: ${data[0][key]}</p>`;
//         }
//     });
// });

// When the update button is clicked, update the data for the current email
// updateButton.addEventListener('click', function() {
    // Here you need to define the new data you want to update
    // let newData = { "name": "New Name" }; // replace with the new data you want to update

    // updateData(emailInput.value, newData).then(result => {
    //     console.log(result); // log the result of the update operation
    // });
});


});