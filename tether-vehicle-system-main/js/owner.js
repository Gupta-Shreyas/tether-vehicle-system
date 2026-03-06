let vehicle = loadVehicle();

function refreshUI() {

  const status = getStatus(vehicle);

  document.getElementById("vehicleNumber").innerText =
    "Vehicle: " + vehicle.number;

  document.getElementById("ownerName").innerText =
    "Owner: " + vehicle.owner;

  // Trust Score
  const scoreElement = document.getElementById("trustScore");

  scoreElement.innerText = vehicle.trustScore + " / 100";

// remove old color classes
  scoreElement.classList.remove(
    "score-green",
    "score-yellow",
    "score-red"
);

// apply new color
  if (vehicle.trustScore >= 80) {
    scoreElement.classList.add("score-green");
  } else if (vehicle.trustScore >= 50) {
    scoreElement.classList.add("score-yellow");
  } else {
    scoreElement.classList.add("score-red");
  }

  let message = "Reliable Vehicle";
  if (vehicle.trustScore < 50) message = "High Risk";
  else if (vehicle.trustScore < 80) message = "Needs Monitoring";

  document.getElementById("scoreMessage").innerText = message;

  // Status badge
  const badge = document.getElementById("statusBadge");
  badge.innerText = status;

  badge.className = "";
  if (status === "GREEN") badge.classList.add("green");
  if (status === "YELLOW") badge.classList.add("yellow");
  if (status === "RED") badge.classList.add("red");
  const foundBtn = document.getElementById("foundBtn");

  if (vehicle.stolen) {
    foundBtn.style.display = "inline-block";
  } else {
    foundBtn.style.display = "none";
  }
}

function toggleInsurance() {
  vehicle.insuranceValid = !vehicle.insuranceValid;
  saveVehicle(vehicle);
  refreshUI();
}

function authorizeGuest() {
  const name = document.getElementById("guestName").value;

  if (!name) {
    alert("Enter guest name");
    return;
  }

  vehicle.guest.active = true;
  vehicle.guest.name = name;

  saveVehicle(vehicle);
  refreshUI();
}

function removeGuest() {
  vehicle.guest.active = false;
  vehicle.guest.name = "";

  saveVehicle(vehicle);
  refreshUI();
}

function reportStolen() {

  const confirmAction = confirm(
    "Are you sure you want to report this vehicle as stolen?"
  );

  if (!confirmAction) return;

  vehicle.stolen = true;

  const status = getStatus(vehicle);
  addHistory(vehicle, status, "STOLEN");

  saveVehicle(vehicle);
  refreshUI();
}

function vehicleFound() {

  vehicle.stolen = false;

  const status = getStatus(vehicle);
  addHistory(vehicle, status, "FOUND");

  saveVehicle(vehicle);
  refreshUI();
}

function togglePUC() {
  vehicle.pucValid = !vehicle.pucValid;
  saveVehicle(vehicle);
  refreshUI();
}
refreshUI();