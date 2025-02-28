import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import WeatherMap from './components/WeatherMap';
import WeatherData from './components/WeatherData';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WeatherMap />} />
        <Route path="/data" element={<WeatherData />} />
      </Routes>
    </Router>
  );
};

export default App;