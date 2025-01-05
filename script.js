const apiKey = "AIzaSyDXlrcHjC6XKDDelU7PGczBI-Bjvl6Nf_A";
const sheetID = "141Ea_xHBXPi6rItn07EiJMrUjVU7m9AFP8HFJi-Dm8I";
const range = "standing!A2:E";

const tableBody = document.querySelector("#standing-table tbody");

async function fetchSheetData() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?key=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    // Check if data is available
    if (!data.values || data.values.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="5">No data available</td></tr>`;
      return;
    }

    // Clear existing table rows
    tableBody.innerHTML = "";

    // Populate table rows
    data.values.forEach((row, index) => {
      const [rank, teamName, placement, kills, points] = row;

      const tableRow = document.createElement("tr");
      tableRow.innerHTML = `
        <td>${rank || index + 1}</td>
        <td>${teamName || '-'}</td>
        <td>${placement || '-'}</td>
        <td>${kills || '0'}</td>
        <td>${points || '0'}</td>
      `;
      tableBody.appendChild(tableRow);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    tableBody.innerHTML = `<tr><td colspan="5">Error loading data</td></tr>`;
  }
}

// Automatically refresh the table every second
setInterval(fetchSheetData, 1000);

// Initial data fetch
fetchSheetData();
