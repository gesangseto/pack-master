import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import ProductStockSerial from './models/ProductStockSerial';

import './css/layout/MainScreen.css';
import Header from './component/layout/Header';
import MainPanel from './component/layout/MainPanel';
import Footer from './component/layout/Footer';
import MenuPanel from './component/layout/MenuPanel';
import InfoPanel from './component/layout/InfoPanel';

function App() {
  return (
    <main className="wrapper">
      {/* LEFT */}
      <div className="left">
        <Header />
        <InfoPanel />
        <MainPanel />
        <Footer />
      </div>
      <MenuPanel />
    </main>
  );
}

export default App;
