import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CountryApi } from '../api/CountiresApi';
import PopulationChart from './PopulationChart';

const CountryInfo = () => {
  const { countryCode } = useParams();
  const [countryInfo, setCountryInfo] = useState(null);

  useEffect(() => {
    CountryApi.getCountryInfo(countryCode)
      .then((response) => setCountryInfo(response.data))
      .catch((error) => console.error('Error fetching country info:', error));
  }, [countryCode]);

  if (!countryInfo) return <div>Loading...</div>;

  const { country, flagURL, borders, population } = countryInfo;

  return (
    <div>
      <h1>{country}</h1>
      <img src={flagURL} alt={`${country} flag`} width={100} />

      <h2>Border Countries</h2>
      <ul>
        {borders && borders.length > 0 ? (
          borders.map((border) => (
            <li key={border.countryCode}>
              <Link to={`/country/${border.countryCode}`}>
                {border.commonName} ({border.officialName})
              </Link>
            </li>
          ))
        ) : (
          <p>No bordering countries.</p>
        )}
      </ul>

      <h2>Population Over Time</h2>
      <PopulationChart populationData={population} />
    </div>
  );
};

export default CountryInfo;
