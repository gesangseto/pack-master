import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainScreen from './MainScreen';
import SettingScreen from './SettingScreen';
import database from './configuration/database';
import './App.css';
import { syncMain, syncBatch } from './models';
function App() {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        // 🔌 INIT MAIN DB
        await database.initMain();
        await syncMain();
        console.log('✅ App Ready');
        setReady(true);
      } catch (err) {
        console.error('❌ Init error:', err);
      }
    };

    init();
  }, []);

  if (!ready) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainScreen user={user} />} />
        <Route path="/setting" element={<SettingScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
