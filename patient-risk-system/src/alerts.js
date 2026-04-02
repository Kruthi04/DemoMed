function generateAlerts(patients, calculateTotalRisk, hasInvalidData) {
  const highRisk = [];
  const fever = [];
  const dataIssues = [];

  for (const p of patients) {
    const risk = calculateTotalRisk(p);

    const temp = parseFloat(p.temperature);

    // 1. High risk
    if (risk >= 4) {
      highRisk.push(p.patient_id);
    }

    // 2. Fever (independent)
    if (!isNaN(temp) && temp >= 99.6) {
      fever.push(p.patient_id);
    }

    // 3. Data quality
    if (hasInvalidData(p)) {
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
