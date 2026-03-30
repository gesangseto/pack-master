import React, { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';

import {
  Box,
  Stack,
  Grid,
  Typography,
  Paper,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import { invoke } from '@tauri-apps/api/core';
import { SerialPort } from 'tauri-plugin-serialplugin-api';
import { useAuthStorePanelA } from '../store/authStore';
import { useAuthStorePanelB } from '../store/authStore';
import FormLogin from './FormLogin';

export default function Panel(props) {
  const { title, scannerPort, panelType = 'a' } = props;
  const panelUser =
    panelType == 'a'
      ? useAuthStorePanelA((state) => state.user)
      : useAuthStorePanelB((state) => state.user);
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const [listBarcode, setListBarcode] = useState([]);
  const [addMode, setAddMode] = useState(true);
  const addModeRef = useRef(addMode);
  const isConnected = useRef(false);

  useEffect(() => {
    addModeRef.current = addMode;
  }, [addMode]);

  useEffect(() => {
    if (isConnected.current) return;
    isConnected.current = true;
    connectScanner();
  }, []);

  const connectScanner = async () => {
    try {
      const port = new SerialPort({
        path: `COM${scannerPort}`,
        baudRate: 9600,
      });
      await port.open();
      // Sesuaikan 'path' dengan COM port scanner Anda (misal: "COM3")
      await invoke('plugin:serialplugin|write_data_terminal_ready', {
        path: `COM${scannerPort}`,
        level: true, // Ganti 'value' menjadi 'level'
      });
      // Zebra biasanya juga butuh RTS (Request To Send) agar stabil
      await invoke('plugin:serialplugin|write_request_to_send', {
        path: `COM${scannerPort}`,
        level: true,
      });
      await port.startListening();
      await port.listen((event) => {
        processBarcode(event);
      });
    } catch (err) {
      console.error('Koneksi gagal:', err);
    }
  };

  const processBarcode = (event) => {
    console.log(addModeRef.current);

    if (addModeRef.current) {
      setListBarcode((prev) => [...prev, event]);
    } else {
      setListBarcode(
        (prev) => prev.filter((item) => item !== event), // 🔥 hapus yang sama
      );
    }
    console.log(`Data Barcode PORT ${scannerPort}: `, event);
  };

  return (
    <Paper sx={{ p: 0 }} minHeight="100vh">
      {/* TOP PANEL */}
      <Box display="flex" gap={0.1}>
        {/* TOP LEFT PANEL */}
        <Box
          flex={1}
          maxHeight={45}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          bgcolor="#0d1fa6"
          color="white"
          px={3}
          borderRadius={2}
        >
          {' '}
          <Box sx={{ textAlign: 'center', maxHeight: 45 }}>
            <Typography variant="caption">LEVEL</Typography>
            <Typography
              variant="h6"
              fontWeight={'bold'}
              sx={{ pb: 1, lineHeight: 0.5 }}
            >
              2
            </Typography>
          </Box>
          <Typography variant="h5" fontWeight="bold">
            Master Box
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            {title}
          </Typography>
        </Box>
        {/* TOP RIGHT PANEL */}
        <Box
          maxHeight={45}
          flex={1}
          display="flex"
          bgcolor="#8a8a8a"
          color="white"
          px={3}
          borderRadius={2}
        >
          {/* LOGIN BUTTON */}
          {panelUser ? (
            <Box
              flex={1}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Button
                variant="contained"
                color="info"
                sx={{ borderRadius: 2, px: 3 }}
              >
                Info
              </Button>
              <Typography variant="h5">{panelUser.full_name}</Typography>
              <Box sx={{ textAlign: 'center', maxHeight: 45 }}>
                <Typography variant="caption">Auto Logout in:</Typography>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ pb: 1, lineHeight: 0.5 }}
                >
                  12000
                </Typography>
              </Box>
            </Box>
          ) : (
            <Box display="flex" alignItems="center">
              <Button
                onClick={() => setOpenLoginForm(true)}
                variant="contained"
                color="info"
                sx={{ borderRadius: 2, px: 3 }}
              >
                Login
              </Button>
            </Box>
          )}

          {/* LEVEL */}
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1 }} p={0.5}>
        <Grid container spacing={1}>
          {/* LEFT PANEL */}
          <Grid size={8}>
            <Box p={1}>
              <Grid container spacing={1}>
                <Grid
                  size={2}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Button>
                    <CenterFocusStrongIcon fontSize="large" />
                  </Button>
                </Grid>
                <Grid
                  size={8}
                  sx={{
                    borderRadius: 2,
                    bgcolor: 'red',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'error.contrastText',
                  }}
                >
                  <Typography variant="h6" textAlign="center">
                    Silakan login {title}
                  </Typography>
                </Grid>
                <Grid size={2}>
                  <Stack spacing={1} alignItems="center">
                    <Button
                      variant="contained"
                      color={addMode ? 'success' : 'inherit'}
                      onClick={() => {
                        setAddMode(true);
                      }}
                    >
                      <AddIcon fontSize="small" />
                    </Button>
                    <Button
                      variant="contained"
                      color={addMode ? 'inherit' : 'error'}
                      onClick={() => {
                        setAddMode(false);
                      }}
                    >
                      <RemoveIcon fontSize="small" />
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Box
                sx={{
                  borderRadius: 1,
                  bgcolor: 'grey',
                  display: 'flex',
                  justifyContent: 'center',
                  color: 'error.contrastText',
                }}
              >
                <Typography variant="h6">DAFTAR EPC ISI (Dus)</Typography>
              </Box>
              <Box
                height={280}
                border="1px solid #ccc"
                borderRadius={2}
                bgcolor="#fafafa"
                overflow="auto" // 🔥 penting biar bisa scroll
              >
                <List dense>
                  {listBarcode.map((item, index) => (
                    <ListItem key={index} divider>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              </Box>
              <Box display="flex" justifyContent="space-between" mt={2}>
                <Button variant="contained" color="error">
                  Close Partial
                </Button>

                <Button variant="contained">Print Label</Button>
              </Box>
            </Box>
          </Grid>

          {/* RIGHT PANEL */}
          <Grid size={4} pt={0}>
            {/* Progress */}
            <Typography textAlign="center" mb={1}>
              Progres berjalan
            </Typography>

            <Box display="flex" justifyContent="center" gap={2} mb={2}>
              <Box bgcolor="#cfe2f3" px={3} py={1}>
                <Typography variant="h5">{listBarcode.length}</Typography>
              </Box>
              <Typography variant="h5">/</Typography>
              <Box bgcolor="#cfe2f3" px={3} py={1}>
                <Typography variant="h5">6</Typography>
              </Box>
            </Box>

            <Box p={1} border="1px solid #ccc" borderRadius={2}>
              {/* Kriteria */}
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h6">Kriteria Bobot</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography
                  variant="h6"
                  sx={{ bgcolor: 'grey', px: 1, color: 'white' }}
                >
                  Average 5 MB
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ ml: 1, bgcolor: 'grey', px: 1, color: 'white' }}
                >
                  0/0
                </Typography>
              </Box>

              {/* Range */}
              <Box sx={{ mt: 1, p: 1, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Typography variant="h6">Rentang Bobot (kg)</Typography>
                  <Button variant="contained" color="warning" sx={{ ml: 1 }}>
                    <EditSquareIcon />
                  </Button>
                </Box>
                <Box display="flex" gap={1} alignItems="center" mt={1}>
                  <TextField size="small" label="Min." fullWidth />
                  <Typography>~</Typography>
                  <TextField size="small" label="Max." fullWidth />
                </Box>
              </Box>
              {/* Timbang */}
              <Button fullWidth variant="contained" sx={{ my: 2 }}>
                Timbang
              </Button>

              {/* Result */}
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography>Hasil Timbang (kg)</Typography>
              </Box>
              <Box
                bgcolor="#eee"
                textAlign="center"
                py={2}
                mt={1}
                borderRadius={1}
              >
                <Typography variant="h4" color="blue">
                  0.000
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <FormLogin
        open={openLoginForm}
        onClose={() => setOpenLoginForm(false)}
        onLogin={() => setOpenLoginForm(false)}
        saveTo={`panel-${panelType}`}
      />
    </Paper>
  );
}
