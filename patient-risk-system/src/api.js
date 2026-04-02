require("dotenv").config();
const axios = require("axios");

const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.BASE_URL;

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    "x-api-key": API_KEY,
  },
});

async function fetchPatients(page = 1, retries = 5) {
  try {
    const res = await client.get(`/patients?page=${page}&limit=5`);

    if (!res.data || !Array.isArray(res.data.data)) {
      throw new Error("Invalid response shape");
    }

    return res.data;
  } catch (err) {
    if (retries <= 0) throw err;

    const status = err.response?.status;

    if (status === 429) {
      const wait = err.response?.data?.retry_after || 2;
      console.log(`⏳ Rate limited... waiting ${wait}s`);
      await new Promise((r) => setTimeout(r, wait * 1000));
      return fetchPatients(page, retries - 1);
    }

    if ([500, 502, 503].includes(status)) {
      await new Promise((r) => setTimeout(r, 1000));
      return fetchPatients(page, retries - 1);
    }

    await new Promise((r) => setTimeout(r, 500));
    return fetchPatients(page, retries - 1);
  }
}

async function submitResults(payload) {
  return client.post("/submit-assessment", payload);
}

module.exports = { fetchPatients, submitResults };
