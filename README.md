## Overview

This project is a Node.js solution for the DemoMed Healthcare API assessment.

The goal is to:

- Fetch patient data from the assessment API
- Handle pagination, rate limits, and temporary API failures
- Validate inconsistent or malformed patient data
- Calculate patient risk scores based on blood pressure, temperature, and age
- Generate three alert lists:
  - high-risk patients
  - fever patients
  - data quality issues

This project is designed to simulate real-world API integration and data processing challenges.

---


### API Behavior
The assessment API may simulate real-world conditions such as:

- rate limiting with `429`
- intermittent failures like `500`, `502`, `503`
- pagination
- inconsistent response formats
- missing or malformed fields

---

## Project Structure

```text
patient-risk-system/
├── src/
│   ├── api.js
│   ├── processor.js
│   ├── risk.js
│   ├── alerts.js
│   └── index.js
├── package.json
└── README.md
