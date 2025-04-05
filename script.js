document.addEventListener("DOMContentLoaded", function () {
  console.log("Page loaded");

  // === Trade Logging + Chart Update ===
  const form = document.getElementById("trade-form");
  const tradeList = document.getElementById("trade-list");

  // Chart.js setup
  const ctx = document.getElementById("plChart").getContext("2d");
  const plChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [],
      datasets: [{
        label: "Profit/Loss ($)",
        data: [],
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

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const ticker = document.getElementById("ticker").value;
    const pl = parseFloat(document.getElementById("pl").value);
    const date = document.getElementById("date").value;

    // Add to trade list
    const tradeItem = document.createElement("div");
    tradeItem.className = "p-3 bg-gray-50 border rounded shadow";
    tradeItem.innerHTML = `<strong>${ticker}</strong> - $${pl} on ${date}`;
    tradeList.appendChild(tradeItem);

    // Add to chart
    plChart.data.labels.push(`${ticker} (${date})`);
    plChart.data.datasets[0].data.push(pl);
    plChart.update();

    form.reset();
  });
});
