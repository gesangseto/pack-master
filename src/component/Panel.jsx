import AddIcon from '@mui/icons-material/Add';
import AllInboxOutlinedIcon from '@mui/icons-material/AllInboxOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import RemoveIcon from '@mui/icons-material/Remove';
import ToggleOnOutlinedIcon from '@mui/icons-material/ToggleOnOutlined';
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';
import VaccinesOutlinedIcon from '@mui/icons-material/VaccinesOutlined';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { lighten } from '@mui/material/styles';
import { invoke } from '@tauri-apps/api/core';
import { useEffect, useRef, useState } from 'react';
import { SerialPort } from 'tauri-plugin-serialplugin-api';
import color from '../constant/color.json';
import { useAuthStorePanelA, useAuthStorePanelB } from '../store/authStore';
import FormLogin from './FormLogin';
import UserInfo from './UserInfo';

const sxButton = {
  borderRadius: 5,
  minWidth: 75,
  minHeight: 75,
  flexDirection: 'column',
  backgroundColor: color.blueLight,
  color: 'black',
  '&:hover': {
    backgroundColor: lighten(color.blueLight, 0.5),
  },
};
export default function Panel(props) {
  const { title, scannerPort, panel = 'a' } = props;
  const panelUser =
    panel == 'a'
      ? useAuthStorePanelA((state) => state.user)
      : useAuthStorePanelB((state) => state.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const [openUserInfo, setOpenUserInfo] = useState(false);
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
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // set posisi menu
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const processBarcode = (event) => {
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
          pr={3}
          pl={0.3}
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
                onClick={() => setOpenUserInfo(true)}
                sx={{ borderRadius: 2, px: 3 }}
              >
                <ManageAccountsIcon fontSize="medium" />
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
                  {/* MENU Yang punya banyak pilihan */}
                  <Button
                    onClick={handleClick}
                    sx={{
                      ...sxButton,
                      backgroundColor: panelUser
                        ? color.blueLight
                        : color.inherit,
                    }}
                    disabled={panelUser ? false : true}
                  >
                    <WidgetsOutlinedIcon
                      sx={{ fontSize: 45, color: 'white' }}
                    />
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>
                      <ReceiptLongIcon />
                      &nbsp; Show EPC Info
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <DriveFileRenameOutlineIcon />
                      &nbsp; Manual Entry
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <AllInboxOutlinedIcon />
                      &nbsp; Re-Aggregation
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <UnarchiveOutlinedIcon />
                      &nbsp; Break Aggregation
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <PrintOutlinedIcon />
                      &nbsp; Re-Print Label
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <ToggleOnOutlinedIcon />
                      &nbsp; Comm / Decomm
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <DeleteOutlineIcon />
                      &nbsp; Destroy
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <VaccinesOutlinedIcon />
                      &nbsp; Product Sampling
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <LocalOfferOutlinedIcon />
                      &nbsp; Label Sampling
                    </MenuItem>
                  </Menu>
                </Grid>
                {/* Message Board Information */}
                <Grid
                  size={8}
                  sx={{
                    borderRadius: 2,
                    bgcolor: `${panelUser ? 'red' : color.inherit}`,
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
                {/* ADD MODE */}
                <Grid size={2}>
                  <Stack spacing={1} alignItems="center">
                    <Button
                      disabled={!panelUser}
                      variant="contained"
                      color={addMode ? 'success' : 'inherit'}
                      onClick={() => {
                        setAddMode(true);
                      }}
                    >
                      <AddIcon fontSize="small" />
                    </Button>
                    <Button
                      disabled={!panelUser}
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
              {/* Daftar EPC ISI */}
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
              {/* Tombol Dibawah Daftar EPC ISI */}
              <Box display="flex" justifyContent="space-between" mt={2}>
                <Button
                  disabled={panelUser ? false : true}
                  variant="contained"
                  color="error"
                >
                  Close Partial
                </Button>
                <Button variant="contained" disabled={panelUser ? false : true}>
                  Print Label
                </Button>
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
                  <Button
                    variant="contained"
                    color="warning"
                    sx={{ ml: 1 }}
                    disabled={panelUser ? false : true}
                  >
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
              <Button
                fullWidth
                variant="contained"
                sx={{ my: 2 }}
                disabled={panelUser ? false : true}
              >
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
        panel={panel}
      />

      <UserInfo
        open={openUserInfo}
        onClose={() => setOpenUserInfo(false)}
        onLogin={() => setOpenUserInfo(false)}
        panel={panel}
      />
    </Paper>
  );
}
