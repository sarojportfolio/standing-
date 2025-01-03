// Example: Sort Table by Placement
document.querySelector("thead").addEventListener("click", (event) => {
  const table = document.getElementById("standing-table");
  const rows = Array.from(table.tBodies[0].rows);

  if (event.target.cellIndex === 2) { // Placement Column
    rows.sort((a, b) => {
      const placementA = parseInt(a.cells[2].textContent.replace(/\D/g, ""));
      const placementB = parseInt(b.cells[2].textContent.replace(/\D/g, ""));
      return placementA - placementB;
    });
    rows.forEach(row => table.tBodies[0].appendChild(row));
  } else if (event.target.cellIndex === 4) { // Points Column
    rows.sort((a, b) => {
      return parseInt(b.cells[4].textContent) - parseInt(a.cells[4].textContent);
    });
    rows.forEach(row => table.tBodies[0].appendChild(row));
  }
});

// Fetch or update table dynamically if needed
async function updateTable() {
  const url = "path-to-your-api-or-json"; // Replace with your API/JSON URL
  const response = await fetch(url);
  const data = await response.json();

  const tbody = document.querySelector("#standing-table tbody");
  tbody.innerHTML = ""; // Clear old rows

  data.forEach((team, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${team.name}</td>
      <td>${team.placement}</td> <!-- Placement -->
      <td>${team.kills}</td>
      <td>${team.points}</td> <!-- Points -->
    `;
    tbody.appendChild(row);
  });
}
