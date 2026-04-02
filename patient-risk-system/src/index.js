const { fetchPatients } = require("./api");
const { calculateTotalRisk } = require("./risk");
const { hasInvalidData } = require("./processor");
const { generateAlerts } = require("./alerts");

async function main() {
  let allPatients = [];
  let page = 1;
  let hasNext = true;

  while (hasNext) {
    const data = await fetchPatients(page);

    allPatients = [...allPatients, ...data.data];
    hasNext = data.pagination.hasNext;
    page++;

    await new Promise((r) => setTimeout(r, 300));
  }

  console.log("Total patients:", allPatients.length);

  const alerts = generateAlerts(
    allPatients,
    calculateTotalRisk,
    hasInvalidData,
  );

  console.log("\n===== FINAL OUTPUT =====");

  console.log("\nHigh Risk:", alerts.high_risk_patients.length);
  console.log(alerts.high_risk_patients);

  console.log("\nFever:", alerts.fever_patients.length);
  console.log(alerts.fever_patients);

  console.log("\nData Issues:", alerts.data_quality_issues.length);
  console.log(alerts.data_quality_issues);
}

main();
