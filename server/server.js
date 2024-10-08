require('dotenv').config();

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const {
  getAvailableCountries,
  getCountryInfo,
} = require('./services/countryService');
const { handleError } = require('./utils/errorHandler');
const { isValidCountryCode } = require('./utils/validation');

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
});
app.use(limiter);

// Endpoint: Get Available Countries with Flags
app.get('/available-countries', async (req, res) => {
  try {
    const countries = await getAvailableCountries();

    const countriesWithFlags = countries.map((country) => {
      return {
        name: country.name,
        code: country.countryCode,
      };
    });

    res.status(200).json(countriesWithFlags);
  } catch (error) {
    handleError(res, error, 'Error fetching countries and their flags');
  }
});

// Endpoint: Get Country Info (Borders, Population, Flag)
app.get('/country-info/:countryCode', async (req, res) => {
  const countryCode = req.params.countryCode;

  if (!isValidCountryCode(countryCode)) {
    return res.status(400).json({ message: 'Invalid country code' });
  }

  try {
    const countries = await getAvailableCountries();
    const country = countries.find((c) => c.countryCode === countryCode);

    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }

    const countryInfo = await getCountryInfo(countryCode, country.name); // Pass countryCode and country.name
    res.status(200).json({
      country: country.name,
      borders: countryInfo.borders,
      population: countryInfo.population,
      flagURL: countryInfo.flagURL,
    });
  } catch (error) {
    handleError(res, error, 'Error fetching country info');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
