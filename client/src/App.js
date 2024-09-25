import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use Routes instead of Switch
import CountryListPage from './pages/CountryListPage';
import CountryInfoPage from './pages/CountryInfoPage';

const App = () => (
  <Router>
    <Routes>
      <Route path='/' element={<CountryListPage />} />
      <Route path='/country/:countryCode' element={<CountryInfoPage />} />
    </Routes>
  </Router>
);

export default App;
