function getStatus(vehicle) {
  if (vehicle.stolen) return "RED";
  if (!vehicle.insuranceValid) return "RED";
  if (vehicle.guest.active) return "YELLOW";
  return "GREEN";
}

function updateTrustScore(vehicle, status) {
  if (status === "GREEN") vehicle.trustScore += 2;
  if (status === "YELLOW") vehicle.trustScore += 1;
  if (status === "RED") vehicle.trustScore -= 5;

  vehicle.trustScore = Math.max(0, Math.min(100, vehicle.trustScore));
}

function addHistory(vehicle, status, eventType = "SCAN") {

  let message = "Verification Scan";

  if (eventType === "STOLEN")
    message = "🚨 Vehicle Reported Stolen";

  if (eventType === "FOUND")
    message = "✅ Vehicle Found";

  if (eventType === "SCAN" && vehicle.stolen)
    message = "Verification Scan (Vehicle Stolen)";

  const record = {
    time: new Date().toLocaleString(),
    status: status,
    event: message,
    driver: vehicle.guest.active ? vehicle.guest.name : vehicle.owner,
    insurance: vehicle.insuranceValid ? "Valid" : "Expired",
    trustScore: vehicle.trustScore
  };

  vehicle.history.unshift(record);
}