const axios = require('axios');

const axiosInstance = axios.create({
  timeout: 5000, // 5 seconds timeout
});

// Get available countries from Nager API
const getAvailableCountries = async () => {
  const response = await axiosInstance.get(
    'https://date.nager.at/api/v3/AvailableCountries'
  );
  return response.data;
};

// Get flags for available countries from Countries Now API
const getFlagsForCountries = async (countryNames) => {
  const response = await axiosInstance.post(
    'https://countriesnow.space/api/v0.1/countries/flag/images',
    {
      countries: countryNames,
    }
  );
  return response.data.data;
};

// Get country info (borders, population, flag)
const getCountryInfo = async (countryCode) => {
  const [borderCountriesResponse, populationResponse, flagResponse] =
    await Promise.all([
      axiosInstance.get(
        `https://date.nager.at/api/v3/CountryInfo/${countryCode}`
      ),
      axiosInstance.post(
        'https://countriesnow.space/api/v0.1/countries/population',
        {
          country: countryCode,
        }
      ),
      axiosInstance.post(
        'https://countriesnow.space/api/v0.1/countries/flag/images',
        {
          country: countryCode,
        }
      ),
    ]);

  return {
    borders: borderCountriesResponse.data.borders || [],
    population: populationResponse.data.data.populationCounts || [],
    flagURL: flagResponse.data.data.flag || '',
  };
};

module.exports = {
  getAvailableCountries,
  getFlagsForCountries,
  getCountryInfo,
};
