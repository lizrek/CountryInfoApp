import React from 'react';
import CountryInfo from '../components/CountryInfo';
import { Link } from 'react-router-dom';

const CountryInfoPage = () => {
  return (
    <div className='country-info-page'>
      <div style={{ marginBottom: '20px' }}>
        <Link to='/'>
          <button style={{ padding: '10px 20px', fontSize: '16px' }}>
            Home
          </button>
        </Link>
      </div>
      <h1>Country Information</h1>
      <CountryInfo />
    </div>
  );
};

export default CountryInfoPage;
