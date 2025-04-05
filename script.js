document.addEventListener("DOMContentLoaded", function () {
  // === Trade Logging + Chart Update ===
  const form = document.getElementById("trade-form");
  const tradeHistory = document.getElementById("trade-history");

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

    // Add to trade history list
    const tradeItem = document.createElement("div");
    tradeItem.className = "p-3 bg-gray-50 border rounded shadow";
    tradeItem.innerHTML = `<strong>${ticker}</strong> - $${pl} on ${date} <button class="text-red-600 ml-4" onclick="deleteTrade(this)">Delete</button>`;
    tradeHistory.appendChild(tradeItem);

    // Add to chart
    plChart.data.labels.push(`${ticker} (${date})`);
    plChart.data.datasets[0].data.push(pl);
    plChart.update();

    form.reset();
  });

  // Delete trade functionality
  window.deleteTrade = function(button) {
    const tradeItem = button.parentElement;
    tradeHistory.removeChild(tradeItem);

    // Remove corresponding chart data
    const tradeIndex = Array.from(tradeHistory.children).indexOf(tradeItem);
    plChart.data.labels.splice(tradeIndex, 1);
    plChart.data.datasets[0].data.splice(tradeIndex, 1);
    plChart.update();
  };
});
