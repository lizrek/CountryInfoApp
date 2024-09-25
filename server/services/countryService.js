const axios = require('axios');

require('dotenv').config();

const axiosInstance = axios.create({
  timeout: 5000, // 5 seconds timeout
});

// Get available countries
const getAvailableCountries = async () => {
  const response = await axiosInstance.get(
    `${process.env.AVAILABLE_COUNTRIES_BASE_URL}/AvailableCountries`
  );
  return response.data;
};

// Get country info (borders, population, flag)
const getCountryInfo = async (countryCode, countryName) => {
  try {
    const borderCountriesResponse = await axiosInstance.get(
      `${process.env.AVAILABLE_COUNTRIES_BASE_URL}/CountryInfo/${countryCode}`
    );

    const { commonName, officialName, borders } = borderCountriesResponse.data;

    let populationResponse;
    try {
      populationResponse = await axiosInstance.post(
        `${process.env.COUNTRY_INFO_API_BASE_URL}/countries/population`,
        { country: countryName || commonName }
      );
    } catch {
      console.warn(
        `Population data not found for ${countryName || commonName}. Retrying with official name...`
      );

      populationResponse = await axiosInstance.post(
        `${process.env.COUNTRY_INFO_API_BASE_URL}/countries/population`,
        { country: officialName }
      );
    }

    const flagResponse = await axiosInstance.post(
      `${process.env.COUNTRY_INFO_API_BASE_URL}/countries/flag/images`,
      { iso2: countryCode }
    );

    return {
      borders: borders || [],
      population: populationResponse.data.data.populationCounts || [],
      flagURL: flagResponse.data.data.flag || '',
    };
  } catch (error) {
    console.error('Error fetching country info:', error);
    throw error;
  }
};

module.exports = {
  getAvailableCountries,
  getCountryInfo,
};
