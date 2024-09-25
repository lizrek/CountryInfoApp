import React, { useEffect, useState } from 'react';
import { CountryApi } from '../api/CountiresApi';
import { Link } from 'react-router-dom';

const CountryList = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    CountryApi.getAvailableCountriesWithFlags()
      .then((response) => setCountries(response.data))
      .catch((error) => console.error('Error fetching countries:', error));
  }, []);

  return (
    <div>
      <h1>Available Countries</h1>
      <ul>
        {countries.map((country) => (
          <li key={country.code}>
            <Link to={`/country/${country.code}`}>{country.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryList;
