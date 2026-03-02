function scanVehicle() {
  
  const officerId = document.getElementById("officerId").value;

  if (!officerId) {
    alert("Please enter Officer ID");
    return;
  }

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
    addHistory(vehicle, status, "SCAN", officerId);

    saveVehicle(vehicle);

    showResult(vehicle, status);

  }, 1400);
}

function showResult(vehicle, status) {

  let colorClass = "green";
  const reasons = getStatusReason(vehicle);
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
      <h2 style="font-weight:700; font-size:26px;">
      ✔ VEHICLE VERIFICATION SUCCESSFUL
      </h2>

      <p>
        <span class="label">OFFICER ID:</span>
        <span class="value">${officerId}</span>
      </p>
      
      <p>
        <span class="label">OWNER:</span>
        <span class="value">${vehicle.owner}</span>
      </p>

      <p>
        <span class="label">DRIVER:</span>
        <span class="value">
          ${
            vehicle.guest.active
              ? vehicle.guest.name + " (Authorized Guest)"
              : vehicle.owner
          }
        </span>
      </p>

      <p>
        <span class="label">INSURANCE:</span>
        <span class="value">
          ${vehicle.insuranceValid ? "Valid" : "Expired"}
        </span>
      </p>

      <h2>Status: 
        <span class="${statusClass}">
          ${status}
        </span>
      </h2>

      <div class="card">
        <h3>Verification Details</h3>
        ${reasons.map(reason => `
            <p class="value">${reason}</p>
        `).join("")}
      </div>

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