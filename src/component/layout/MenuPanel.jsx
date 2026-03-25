import { useEffect, useState } from 'react';
import '../../css/layout/MenuPanel.css';

export default function MenuPanel() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  useEffect(() => {
    formatDate();
    const interval = setInterval(formatDate, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatDate = () => {
    const now = new Date();
    const pad = (n) => n.toString().padStart(2, '0');
    const HH = pad(now.getHours()); //Jam
    const mm = pad(now.getMinutes()); //Menit
    const ss = pad(now.getSeconds()); // Detik

    const dd = pad(now.getDate());
    const MM = pad(now.getMonth()); //Month
    const yyyy = now.getYear();
    const yy = now.toLocaleDateString('en-US', { year: '2-digit' });
    setTime(`${HH}:${mm}:${ss}`);
    setDate(`${dd}/${MM}/${yy}`);
  };
  return (
    <div className="menu-panel">
      <text>{time}</text>
      <text>{date}</text>
      <br />
      <button>Home</button>
      <button>User</button>
      <button>Setting</button>
    </div>
  );
}
