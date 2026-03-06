function getStatus(vehicle) {
  if (vehicle.stolen) return "RED";
  if (!vehicle.insuranceValid) return "RED";
  if (!vehicle.pucValid) return "RED"; // ✅ NEW RULE
  if (vehicle.guest.active) return "YELLOW";
  return "GREEN";
}

function updateTrustScore(vehicle, status) {
  if (status === "GREEN") vehicle.trustScore += 2;
  if (status === "YELLOW") vehicle.trustScore += 1;
  if (status === "RED") vehicle.trustScore -= 5;

  vehicle.trustScore = Math.max(0, Math.min(100, vehicle.trustScore));
}

function getStatusReason(vehicle) {

  let reasons = [];

  if (vehicle.stolen)
    reasons.push("🚨 Vehicle Reported Stolen");

  if (!vehicle.insuranceValid)
    reasons.push("❌ Insurance Expired");
  else
    reasons.push("✔ Insurance Valid");

  if (!vehicle.pucValid)
    reasons.push("❌ PUC Expired");
  else
    reasons.push("✔ PUC Valid");

  if (vehicle.guest.active && !vehicle.stolen)
    reasons.push("🟡 Authorized Guest Driver");

  return reasons;
}

function addHistory(vehicle, status, eventType = "SCAN", officer="N/A") {

  let message = "Verification Scan";

  if (eventType === "STOLEN")
    message = "🚨 Vehicle Reported Stolen";

  if (eventType === "FOUND")
    message = "✅ Vehicle Found";

  const record = {
    time: new Date().toLocaleString(),
    status: status,
    event: message,
    officer: officer,
    driver: vehicle.guest.active ? vehicle.guest.name : vehicle.owner,
    insurance: vehicle.insuranceValid ? "Valid" : "Expired",
    puc: vehicle.pucValid ? "Valid" : "Expired",
    trustScore: vehicle.trustScore
  };

  vehicle.history.unshift(record);
}