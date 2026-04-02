function generateAlerts(patients, calculateTotalRisk, hasInvalidData) {
  const highRisk = [];
  const fever = [];
  const dataIssues = [];

  for (const p of patients) {
    const invalid = hasInvalidData(p);
    const risk = invalid ? 0 : calculateTotalRisk(p);
    const temp = parseFloat(p.temperature);

    if (risk >= 4) {
      highRisk.push(p.patient_id);
    }

    if (!isNaN(temp) && temp >= 99.6) {
      fever.push(p.patient_id);
    }

    if (invalid) {
      dataIssues.push(p.patient_id);
    }
  }

  return {
    high_risk_patients: [...new Set(highRisk)],
    fever_patients: [...new Set(fever)],
    data_quality_issues: [...new Set(dataIssues)],
  };
}

module.exports = { generateAlerts };
