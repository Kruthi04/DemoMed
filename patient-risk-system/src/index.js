const { fetchPatients, submitResults } = require("./api");
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
  }

  console.log("Total patients:", allPatients.length);

  const alerts = generateAlerts(
    allPatients,
    calculateTotalRisk,
    hasInvalidData,
  );

  console.log("Submitting:", alerts);

  const result = await submitResults(alerts);

  console.log("Result:", result);
}

main();
