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
