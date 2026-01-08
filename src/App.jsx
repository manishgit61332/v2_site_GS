import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import ServiceDetail from './pages/ServiceDetail';
import SmoothScroll from './components/SmoothScroll';
import GlobalAtmosphere from './components/GlobalAtmosphere';
import { ScrollColorProvider, useScrollColor } from './context/ScrollColorContext';
import './index.css';

const App = () => {
  return (
    <ScrollColorProvider>
      <SmoothScroll>
        <GlobalAtmosphere />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/service/:slug" element={<ServiceDetail />} />
          </Routes>
        </div>
      </SmoothScroll>
    </ScrollColorProvider>
  );
};

export default App;
