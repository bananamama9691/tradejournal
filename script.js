const form = document.getElementById("trade-form");
const tradeList = document.getElementById("trade-list");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const ticker = document.getElementById("ticker").value;
  const pl = document.getElementById("pl").value;
  const date = document.getElementById("date").value;

  const tradeItem = document.createElement("div");
  tradeItem.className = "p-3 bg-gray-50 border rounded shadow";
  tradeItem.innerHTML = `<strong>${ticker}</strong> - $${pl} on ${date}`;

  tradeList.appendChild(tradeItem);
  form.reset();
});
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
