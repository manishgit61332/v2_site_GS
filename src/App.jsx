import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import ServiceDetail from './pages/ServiceDetail';
import SmoothScroll from './components/SmoothScroll';
import './index.css';

const App = () => {
  return (
    <SmoothScroll>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/service/:slug" element={<ServiceDetail />} />
      </Routes>
    </SmoothScroll>
  );
};

export default App;
