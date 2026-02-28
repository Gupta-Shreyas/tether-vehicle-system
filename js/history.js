let vehicle = loadVehicle();

function loadHistory() {

  const container = document.getElementById("historyList");

  // If no scans yet
  if (vehicle.history.length === 0) {
    container.innerHTML = "<p>No scans recorded yet.</p>";
    return;
  }

  let html = "";

  vehicle.history.forEach(record => {

    let colorClass = "green";
    if (record.status === "YELLOW") colorClass = "yellow";
    if (record.status === "RED") colorClass = "red";

    html += `
      <div class="card ${colorClass}">
        <p><strong>${record.event}</strong></p>
        <p><strong>Time:</strong> ${record.time}</p>
        <p><strong>Status:</strong> ${record.status}</p>
        <p><strong>Driver:</strong> ${record.driver}</p>
        <p><strong>Insurance:</strong> ${record.insurance}</p>
        <p><strong>Trust Score:</strong> ${record.trustScore}</p>
      </div>
    `;
  });

  container.innerHTML = html;
}

loadHistory();