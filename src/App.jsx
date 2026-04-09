import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainScreen from './MainScreen';
import SettingScreen from './SettingScreen';
import database from './configuration/database';
import './App.css';
import { syncMain, syncBatch } from './models';
import appConfig, { initConfig } from './models/mertrack/AppConfig';
import { useConfig } from './store/configStore';
function App() {
  const setConfig = useConfig((state) => state.setData);
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        // 🔌 INIT MAIN DB
        await database.initMain();
        await syncMain();
        let getData = await appConfig.findOne({ id: 1 });
        if (!getData) {
          await appConfig.create(initConfig());
          getData = await appConfig.findOne({ id: 1 });
        }
        setConfig(getData);
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
