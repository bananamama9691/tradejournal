document.addEventListener("DOMContentLoaded", function () {
  // Log a simple message to check if the script is running
  console.log("script.js is loaded and running");

  // Simple chart setup to test if the chart.js works
  const ctx = document.getElementById("plChart").getContext("2d");
  const plChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      datasets: [{
        label: "Profit/Loss ($)",
        data: [10, 20, 30, 40, 50],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.1)",
        fill: true,
        tension: 0.2
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });
});
