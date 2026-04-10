import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainScreen from './MainScreen';
import SettingScreen from './SettingScreen';
import database from './configuration/database';
import { syncStructureMain } from './models';
import { useConfig } from './store/configStore';
import {
  syncAppConfig,
  syncMstMenu,
  syncMstSectionRole,
  syncMstUser,
} from './sync/mertrackDb';

function App() {
  const setConfig = useConfig((state) => state.setData);
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        // 🔌 INIT MAIN DB
        await database.initMain();
        await syncStructureMain();
        // Syncron base data Pack Master
        setConfig(await syncAppConfig());
        // Syncron data dengan server L3
        await syncMstUser();
        await syncMstMenu();
        await syncMstSectionRole();

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
