// Replace with your own Google Sheets information
const sheetID = '141Ea_xHBXPi6rItn07EiJMrUjVU7m9AFP8HFJi-Dm8I'; // Your Google Sheet ID
const apiKey = 'AIzaSyDXlrcHjC6XKDDelU7PGczBI-Bjvl6Nf_A'; // Your API Key
const range = 'standing!A2:D'; // Your range

// Google Sheets API URL
const sheetURL = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?key=${apiKey}`;

// Function to update the table
async function updateTable() {
  try {
    const response = await fetch(sheetURL);
    const data = await response.json();

    if (!data.values || data.values.length === 0) {
      console.error('No data found in the sheet.');
      return;
    }

    const rows = data.values; // Array of rows from the sheet
    const tbody = document.querySelector("#standing-table tbody");
    tbody.innerHTML = ""; // Clear old rows

    rows.forEach((row, index) => {
      const [teamName, placement, kills, points] = row;

      const tableRow = document.createElement("tr");
      tableRow.innerHTML = `
        <td>${index + 1}</td>
        <td>${teamName}</td>
        <td>${placement || '0'}</td>
        <td>${kills || '0'}</td>
        <td>${points || '0'}</td>
      `;
      tbody.appendChild(tableRow);
    });
  } catch (error) {
    console.error("Error fetching or updating the table:", error);
  }
}

// Sort table when clicking column headers
document.querySelector("thead").addEventListener("click", (event) => {
  const table = document.getElementById("standing-table");
  const rows = Array.from(table.tBodies[0].rows);

  if (event.target.cellIndex === 2) { // Placement Column
    rows.sort((a, b) => {
      const placementA = parseInt(a.cells[2].textContent.replace(/\D/g, "")) || 0;
      const placementB = parseInt(b.cells[2].textContent.replace(/\D/g, "")) || 0;
      return placementA - placementB;
    });
    rows.forEach(row => table.tBodies[0].appendChild(row));
  } else if (event.target.cellIndex === 4) { // Points Column
    rows.sort((a, b) => {
      const pointsA = parseInt(a.cells[4].textContent) || 0;
      const pointsB = parseInt(b.cells[4].textContent) || 0;
      return pointsB - pointsA; // Descending order
    });
    rows.forEach(row => table.tBodies[0].appendChild(row));
  }
});

// Initial fetch and set an interval to refresh every second
updateTable();
setInterval(updateTable, 1000);
