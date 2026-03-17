import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import { invoke } from '@tauri-apps/api/core';
import { SerialPort } from 'tauri-plugin-serialplugin-api';
import ProductStockSerial from './models/ProductStockSerial';

import './App.css';

function App() {
  const [greetMsg, setGreetMsg] = useState('');
  const [barcode, setBarcode] = useState('');
  const [allBarcode, setAllBarcode] = useState([]);

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke('greet', { barcode }));
  }

  useEffect(() => {
    connectScanner();
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
    <main className="container">
      <h1>Welcome to Tauri + React</h1>

      <div className="row">
        <a href="https://vite.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

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

export default App;
