import api from './ApiClient';

export const CountryApi = {
  getAvailableCountriesWithFlags: () => api.get('/available-countries'),

  getCountryInfo: (countryCode) => api.get(`/country-info/${countryCode}`),
};
