function generateAlerts(patients, calculateTotalRisk, hasInvalidData) {
  const highRisk = [];
  const fever = [];
  const dataIssues = [];

  for (const p of patients) {
    const risk = calculateTotalRisk(p);

    if (risk >= 4) highRisk.push(p.patient_id);
    const temp = parseFloat(p.temperature);
    if (!isNaN(temp) && temp >= 99.6) {
      fever.push(p.patient_id);
    }
    if (hasInvalidData(p)) dataIssues.push(p.patient_id);
  }

  return {
    high_risk_patients: [...new Set(highRisk)],
    fever_patients: [...new Set(fever)],
    data_quality_issues: [...new Set(dataIssues)],
  };
}

module.exports = { generateAlerts };
