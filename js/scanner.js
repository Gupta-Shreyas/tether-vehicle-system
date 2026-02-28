function scanVehicle() {

  const resultArea = document.getElementById("resultArea");

  // Show scanning animation first
  resultArea.innerHTML = `
    <div class="card">
      <h2>Scanning Vehicle...</h2>
      <div class="scan-box">
        <div class="scan-line"></div>
      </div>
    </div>
  `;

  // Delay to simulate scanning
  setTimeout(() => {

    let vehicle = loadVehicle();

    const status = getStatus(vehicle);

    updateTrustScore(vehicle, status);
    addHistory(vehicle, status);

    saveVehicle(vehicle);

    showResult(vehicle, status);

  }, 1400);
}

function showResult(vehicle, status) {

  let colorClass = "green";
  let statusClass = "status-green";

  if (status === "YELLOW") {
    colorClass = "yellow";
    statusClass = "status-yellow";
  }

  if (status === "RED") {
    colorClass = "red";
    statusClass = "status-red";
  }

  let alertMessage = "";

  if (status === "RED") {
    alertMessage =
      "<h2 class='status-red'>⚠ SECURITY ALERT</h2><p>Vehicle requires attention</p>";
  }

  document.getElementById("resultArea").innerHTML = `
    <div class="card ${colorClass} fade-in">
      ${alertMessage}
      <h2 class="success-title">✔ Vehicle Verification Successful</h2>

      <p><strong>Owner:</strong> ${vehicle.owner}</p>

      <p><strong>Driver:</strong> ${
        vehicle.guest.active
          ? vehicle.guest.name + " (Authorized Guest)"
          : vehicle.owner
      }</p>

      <p><strong>Insurance:</strong> ${
        vehicle.insuranceValid ? "Valid" : "Expired"
      }</p>

      <h2>Status: 
        <span class="${statusClass}">
          ${status}
        </span>
      </h2>

      <h3>Trust Score:</h3>
      <h2 id="scoreNumber" class="score">0 / 100</h2>
    </div>
  `;
  animateScore(vehicle.trustScore);
}
function animateScore(finalScore) {

  let current = 0;
  const element = document.getElementById("scoreNumber");

  const interval = setInterval(() => {
    current += 1;
    element.innerText = current + " / 100";

    if (current >= finalScore) {

      element.classList.remove(
        "score-green",
        "score-yellow",
        "score-red"
      );

      if (finalScore >= 80)
        element.classList.add("score-green");
      else if (finalScore >= 50)
        element.classList.add("score-yellow");
      else
        element.classList.add("score-red");

      clearInterval(interval);
    }

  }, 15);
}