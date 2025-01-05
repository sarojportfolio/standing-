// Google Sheets API Details
const sheetID = '141Ea_xHBXPi6rItn07EiJMrUjVU7m9AFP8HFJi-Dm8I';
const apiKey = 'AIzaSyDXlrcHjC6XKDDelU7PGczBI-Bjvl6Nf_A';
const range = 'standing!A2:E'; // Columns: Rank, Team Name, Placement, Kills, Points

// Function to fetch and update the table
async function updateTable() {
  const sheetURL = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?key=${apiKey}`;

  try {
    const response = await fetch(sheetURL);
    const data = await response.json();

    const tbody = document.querySelector("#standing-table tbody");
    tbody.innerHTML = ""; // Clear old rows

    if (!data.values || data.values.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5">No data available</td></tr>`;
      return;
    }

    const rows = data.values; // Array of rows from the sheet
    for (let i = 0; i < 12; i++) {
      const row = rows[i] || ["-", "-", "-", "0", "0"]; // Fill with empty/default values if no data
      const [rank, teamName, placement, kills, points] = row;

      const tableRow = document.createElement("tr");
      tableRow.innerHTML = `
        <td>${rank || i + 1}</td>
        <td>${teamName || '-'}</td>
        <td>${placement || '-'}</td>
        <td>${kills || '0'}</td>
        <td>${points || '0'}</td>
      `;
      tbody.appendChild(tableRow);
    }
  } catch (error) {
    console.error("Error fetching or updating the table:", error);
  }
}

// Initial fetch and auto-update every second
updateTable();
setInterval(updateTable, 1000);
