function hasInvalidData(p) {
  if (!p.blood_pressure || typeof p.blood_pressure !== "string") return true;

  const parts = p.blood_pressure.split("/");
  if (parts.length !== 2) return true;

  const sys = parseInt(parts[0], 10);
  const dia = parseInt(parts[1], 10);

  if (isNaN(sys) || isNaN(dia)) return true;
  if (isNaN(parseFloat(p.temperature))) return true;
  if (isNaN(parseInt(p.age, 10))) return true;

  return false;
}

module.exports = { hasInvalidData };
