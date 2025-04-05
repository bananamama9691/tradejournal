document.addEventListener("DOMContentLoaded", function () {
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
      animations: {
        tension: {
          duration: 1000,
          easing: "easeInOutQuad",
          from: 0.1,
          to: 0.3,
          loop: true
        }
      },
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });

  // Function to update chart data
  function updateChartData() {
    if (plChart.data.labels.length === 0) {
      // Placeholder message if no data exists yet
      plChart.data.labels.push("No trades yet");
      plChart.data.datasets[0].data.push(0);
      plChart.update();
    }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const ticker = document.getElementById("ticker").value;
    const pl = parseFloat(document.getElementById("pl").value);
    const date = document.getElementById("date").value;

    // Add to trade list with animation
    const tradeItem = document.createElement("div");
    tradeItem.className = "p-3 bg-gray-50 border rounded shadow transform opacity-0";
    tradeItem.innerHTML = `<strong>${ticker}</strong> - $${pl} on ${date}`;
    tradeList.appendChild(tradeItem);

    // Animate trade item (fade in)
    setTimeout(() => {
      tradeItem.classList.remove("opacity-0");
      tradeItem.classList.add("opacity-100", "transition-opacity", "duration-700");
    }, 100);

    // Add to chart
    plChart.data.labels.push(`${ticker} (${date})`);
    plChart.data.datasets[0].data.push(pl);
    plChart.update();

    updateChartData(); // Check if chart needs a placeholder message
    form.reset();
  });

  // === Win Rate Tracker ===
  let totalTrades = 0;
  let wins = 0;
  let losses = 0;

  document.getElementById("tradeForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const result = document.getElementById("tradeResult").value;

    totalTrades++;
    if (result === "win") {
      wins++;
    } else {
      losses++;
    }

    updateStats();
  });

  function updateStats() {
    const winRate = totalTrades ? ((wins / totalTrades) * 100).toFixed(2) : 0;

    document.getElementById("stats").innerHTML = `
      <p>Total Trades: ${totalTrades}</p>
      <p>Wins: ${wins}</p>
      <p>Losses: ${losses}</p>
      <p>Win Rate: ${winRate}%</p>
    `;
  }

  // === Animations (AOS) ===
  AOS.init({ duration: 800, once: true });
});
