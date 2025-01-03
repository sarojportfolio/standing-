// Example: Sort Table by Points
document.querySelector("thead").addEventListener("click", (event) => {
  const table = document.getElementById("standing-table");
  const rows = Array.from(table.tBodies[0].rows);

  if (event.target.cellIndex === 2) { // Points Column
    rows.sort((a, b) => {
      return parseInt(b.cells[2].textContent) - parseInt(a.cells[2].textContent);
    });
    rows.forEach(row => table.tBodies[0].appendChild(row));
  }
});

// Example: Fetch Data Dynamically (Optional)
// Add your fetch logic here if connecting to a spreadsheet or database.
async function updateTable() {
  const url = "path-to-your-api-or-json"; // Replace with API/JSON URL
  const response = await fetch(url);
  const data = await response.json();

  // Populate table dynamically
  const tbody = document.querySelector("#standing-table tbody");
  tbody.innerHTML = ""; // Clear old rows

  data.forEach((team, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${team.name}</td>
      <td>${team.points}</td>
      <td>${team.kills}</td>
      <td>${team.placement}</td>
    `;
    tbody.appendChild(row);
  });
}
