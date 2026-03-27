import { invoke } from '@tauri-apps/api/core';
import { useEffect, useState } from 'react';
import { SerialPort } from 'tauri-plugin-serialplugin-api';
import ProductStockSerial from '../../models/ProductStockSerial';
import Panel from '../Panel';
import { Grid } from '@mui/material';

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
    <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid size={6}>
        <Panel title="Panel A" scannerPort={24} />
      </Grid>
      <Grid size={6}>
        <Panel title="Panel B" scannerPort={26} />
      </Grid>
    </Grid>
  );
}

export default MainPanel;
