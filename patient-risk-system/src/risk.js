function getBPScore(bp) {
  if (!bp || typeof bp !== "string" || !bp.includes("/")) return 0;

  const parts = bp.split("/");
  if (parts.length !== 2) return 0;

  const sys = parseInt(parts[0]);
  const dia = parseInt(parts[1]);

  if (isNaN(sys) || isNaN(dia)) return 0;

  // Apply rules
  if (sys < 120 && dia < 80) return 1;

  if (sys >= 120 && sys <= 129 && dia < 80) return 2;

  if ((sys >= 130 && sys <= 139) || (dia >= 80 && dia <= 89)) return 3;

  if (sys >= 140 || dia >= 90) return 4;

  return 0;
}

function getTempScore(temp) {
  const t = parseFloat(temp);
  if (isNaN(t)) return 0;

  if (t <= 99.5) return 0;
  if (t <= 100.9) return 1;
  return 2;
}

function getAgeScore(age) {
  const a = parseInt(age);
  if (isNaN(a)) return 0;

  if (a <= 65) return 1;
  return 2;
}

function calculateTotalRisk(patient) {
  return (
    getBPScore(patient.blood_pressure) +
    getTempScore(patient.temperature) +
    getAgeScore(patient.age)
  );
}

module.exports = { calculateTotalRisk };
