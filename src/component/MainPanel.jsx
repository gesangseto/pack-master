import { invoke } from '@tauri-apps/api/core';
import { useEffect, useState } from 'react';
import { SerialPort } from 'tauri-plugin-serialplugin-api';
import ProductStockSerial from '../models/ProductStockSerial';

function MainPanel() {
  const [greetMsg, setGreetMsg] = useState('');
  const [barcode, setBarcode] = useState('');
  const [allBarcode, setAllBarcode] = useState([]);
  const [menu, setMenu] = useState('home');

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke('greet', { barcode }));
  }

  useEffect(() => {
    connectScanner();
    loadDataBarcode();
  }, []);

  useEffect(() => {
    loadDataBarcode();
  }, [barcode]);

  const handleSubmit = async () => {
    if (!barcode) return;
    await ProductStockSerial.create({
      barcode: barcode,
    });
    setBarcode('');
  };

  const handleDelete = async (id) => {
    console.log('delete:', id);

    await ProductStockSerial.delete({
      where: {
        id: id,
      },
    });
    loadDataBarcode();
  };

  const loadDataBarcode = async () => {
    setAllBarcode(await ProductStockSerial.findAll());
  };

  const connectScanner = async () => {
    try {
      const port = new SerialPort({ path: 'COM4', baudRate: 9600 });
      await port.open();
      // Sesuaikan 'path' dengan COM port scanner Anda (misal: "COM3")
      await invoke('plugin:serialplugin|write_data_terminal_ready', {
        path: 'COM4',
        level: true, // Ganti 'value' menjadi 'level'
      });
      // Zebra biasanya juga butuh RTS (Request To Send) agar stabil
      await invoke('plugin:serialplugin|write_request_to_send', {
        path: 'COM4',
        level: true,
      });
      await port.startListening();
      await port.listen((event) => {
        setBarcode(event);
        console.log('Data Barcode:', event);
      });
    } catch (err) {
      console.error('Koneksi gagal:', err);
    }
  };

  return (
    <main className="main-panel">
      {/* RIGHT MENU */}
      <input
        id="greet-input"
        value={barcode}
        onChange={(e) => setBarcode(e.currentTarget.value)}
        placeholder="Enter a barcode..."
      />
      <button
        type="submit"
        onClick={() => {
          handleSubmit();
        }}
      >
        Save to Database
      </button>
      {allBarcode.map((bc) => (
        <div key={bc.id}>
          <br />
          <button onClick={() => handleDelete(bc.id)}>delete</button>&nbsp;
          {bc.barcode}
        </div>
      ))}
    </main>
  );
}

export default MainPanel;
const styles = {
  wrapper: {
    display: 'flex',
    height: '100vh',
  },

  // KIRI (HEADER + CONTENT + FOOTER)
  left: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },

  header: {
    height: 60,
    background: '#1e293b',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    padding: '0 20px',
  },

  center: {
    flex: 1,
    background: '#f1f5f9',
    padding: 20,
  },

  footer: {
    height: 40,
    background: '#1e293b',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // KANAN (FULL HEIGHT)
  rightMenu: {
    width: 200,
    background: '#334155',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    gap: 10,
  },
};
