import { useEffect, useState } from 'react';
import MainScreen from './MainScreen';
import database from './configuration/database';

function App() {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      database.init();
      setReady(true);
    })();
  }, []);

  if (!ready) return <div>Loading...</div>;

  return <MainScreen user={user} />;
}

export default App;
