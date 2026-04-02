function hasInvalidData(p) {
  // BP check
  if (!p.blood_pressure || typeof p.blood_pressure !== "string") return true;

  const parts = p.blood_pressure.split("/");
  if (parts.length !== 2) return true;

  const sys = parseInt(parts[0]);
  const dia = parseInt(parts[1]);
  if (isNaN(sys) || isNaN(dia)) return true;

  // Temp check
  if (isNaN(parseFloat(p.temperature))) return true;

  // Age check
  if (isNaN(parseInt(p.age))) return true;

  return false;
}

module.exports = { hasInvalidData };
