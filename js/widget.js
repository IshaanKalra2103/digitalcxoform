import { keysPromise } from "./keys.js";

keysPromise.then((keys) => {
  let sheetID = keys.sheetID;

  // Construct the API URL
  let apiUrl = `https://sheetdb.io/api/v1/${sheetID}`;

  // Fetch data from the API
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Get the table body
      // Sort the data in descending order based on the timestamp
      data.sort((a, b) => new Date(b.Timestamp) - new Date(a.Timestamp));

      // Get the last five entries
      let lastFiveEntries = data.slice(0, 5);

      // Get the table body
      let tbody = document.querySelector(".table tbody");

      // Loop through the last five entries
      lastFiveEntries.forEach((row) => {
        let tr = document.createElement("tr");
        [
          "Your Name",
          "Email Address",
          "Mobile number",
          "Your LinkedIn link",
          "Your current company",
          "Your designation or role",
          "Top 3 skills",
          "Functional area",
          "Any other areas of interest that you want from this forum",
          "Timestamp",
        ].forEach((field) => {
          let td = document.createElement("td");
          if (field === "Timestamp") {
            // Create a new Date object from the timestamp
            let date = new Date(row[field]);

            // Format the date
            let formattedDate = `${date.getDate()}-${
              date.getMonth() + 1
            }-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

            td.textContent = formattedDate;
          } else {
            td.textContent = row[field];
          }
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });

      // Prepare labels and data for the chart
      let functionalAreaCounts = data.reduce((counts, row) => {
        let area = row["Functional area"];
        if (!counts[area]) {
          counts[area] = 0;
        }
        counts[area]++;
        return counts;
      }, {});

      let labels = Object.keys(functionalAreaCounts);
      let chartData = Object.values(functionalAreaCounts);

      // Define an array of colors
      let colors = [];

      // Generate random colors for each data point
      chartData.forEach(() => {
        let randomColor = generateRandomColor();
        while (colors.includes(randomColor)) {
          randomColor = generateRandomColor();
        }
        colors.push(randomColor);
      });

      // Function to generate a random color
      function generateRandomColor() {
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        const opacity = (Math.random() * 0.3 + 0.5).toFixed(1);
        return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
      }

      // Create a chart in the "worldwide-sales" canvas
      var ctx = document.getElementById("worldwide-sales").getContext("2d");
      var chart = new Chart(ctx, {
        type: "doughnut", // Change this to the type of chart you want
        data: {
          labels: labels,
          datasets: [
            {
              label: "Functional Areas",
              data: chartData,
              backgroundColor: colors, // Use the colors array here
              borderColor: colors.map((color) => color.replace("0.5", "0.8")), // Use the colors array here, but replace the opacity with 1
              borderWidth: 1, // Change this as needed
            },
          ],
        },
        options: {
          responsive: true,
        },
      });

      let signedUpCount = data.length;

      // Update the DOM element with id "signedUp"
      let signedUpElement = document.getElementById("signedUp");
      signedUpElement.textContent = signedUpCount;

      let activityStatus = document.getElementById("formActivity");

      if (signedUpCount > 20) {
        activityStatus.textContent = "Positive";
        activityStatus.style.color = "#a2ff86";
      } else {
        activityStatus.style.color = "#FC2947";
      }

      // Prepare labels and data for the activity chart
      let activityCounts = data.reduce((counts, row) => {
        // Parse the timestamp and format it as yyyy-mm-dd
        let date = new Date(row["Timestamp"]);
        let formattedDate = `${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()}`;

        // Increment the count for this date
        if (!counts[formattedDate]) {
          counts[formattedDate] = 0;
        }
        counts[formattedDate]++;
        return counts;
      }, {});

      // Sort the dates
      let dates = Object.keys(activityCounts).sort();

      // Get the counts for the sorted dates
      let activityData = dates.map((date) => activityCounts[date]);

      // Create a line chart in the "activity" canvas
      var ctxActivity = document.getElementById("activity").getContext("2d");
      var activityChart = new Chart(ctxActivity, {
        type: "line",
        data: {
          labels: dates,
          datasets: [
            {
              label: "Form Submissions",
              data: activityData,
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              type: "time",
              time: {
                unit: "month",
              },
            },
            y: {
              beginAtZero: true,
              display: true,
              ticks: {
                display: false,
              },
            },
          },
        },
      });
    })
    .catch((error) => console.error("Error:", error));
});

function redirect() {
  window.location.href = "index.html";
}
