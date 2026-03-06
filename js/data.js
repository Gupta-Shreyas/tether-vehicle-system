// Default vehicle data
const defaultVehicle = {
  owner: "Shreyas",
  number: "TN-09-AB-1234",
  insuranceValid: true,
  pucValid: true,   // ✅ ADD THIS
  stolen: false,
  guest: {
    active: false,
    name: ""
  },
  trustScore: 80,
  history: []
};

// Load or initialize data
function loadVehicle() {
  let data = localStorage.getItem("vehicle");
  if (!data) {
    localStorage.setItem("vehicle", JSON.stringify(defaultVehicle));
    return defaultVehicle;
  }
  return JSON.parse(data);
}

// Save vehicle data
function saveVehicle(vehicle) {
  localStorage.setItem("vehicle", JSON.stringify(vehicle));
}