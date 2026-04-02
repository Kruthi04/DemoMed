const axios = require("axios");

const API_KEY = "ak_683ccc19786f062f467e7f34f00c13261b5ecfed06f08b3b";
const BASE_URL = "https://assessment.ksensetech.com/api";

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    "x-api-key": API_KEY,
  },
});

function isValidPatientsPayload(body) {
  return (
    body &&
    Array.isArray(body.data) &&
    body.pagination &&
    typeof body.pagination.hasNext === "boolean"
  );
}

async function fetchPatients(page = 1, attempt = 1) {
  const maxShapeAttempts = 5;
  try {
    const res = await client.get(`/patients?page=${page}&limit=5`);
    if (isValidPatientsPayload(res.data)) {
      return res.data;
    }
    if (attempt >= maxShapeAttempts) {
      throw new Error(
        `Invalid /patients response on page ${page} after ${maxShapeAttempts} attempts`,
      );
    }
    await new Promise((r) => setTimeout(r, 300 * attempt));
    return fetchPatients(page, attempt + 1);
  } catch (err) {
    if (err.response && err.response.status === 429) {
      await new Promise((r) => setTimeout(r, 1000));
      return fetchPatients(page);
    }
    if (err.response && [500, 502, 503].includes(err.response.status)) {
      return fetchPatients(page);
    }
    throw err;
  }
}

async function submitResults(payload) {
  const res = await client.post("/submit-assessment", payload);
  return res.data;
}

module.exports = { fetchPatients, submitResults };
