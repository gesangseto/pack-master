import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';

import './css/layout/MainScreen.css';
import Header from './component/layout/Header';
import MainPanel from './component/layout/MainPanel';
import Footer from './component/layout/Footer';
import MenuPanel from './component/layout/MenuPanel';
import InfoPanel from './component/layout/InfoPanel';
import { Box } from '@mui/material';

function App() {
  return (
    <Box display="flex" height="100vh">
      <Box display="flex" flexDirection="column" flex={1}>
        <Header />
        <InfoPanel />
        <Box flex={1}>
          <MainPanel />
        </Box>
        <Footer />
      </Box>

      <MenuPanel />
    </Box>
  );
}

export default App;
