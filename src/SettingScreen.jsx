import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { Box, Button, TextField, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConnectWithoutContactOutlinedIcon from '@mui/icons-material/ConnectWithoutContactOutlined';
import './css/layout/MainScreen.css';
function SettingScreen() {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(1);

  return (
    <Box display="flex" height="100vh">
      <Paper
        sx={{
          width: 320,
          maxWidth: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between', // 🔥 penting
        }}
      >
        {/* 🔼 MENU ATAS */}
        <Box>
          <MenuList>
            <MenuItem>
              <ListItemIcon>
                <DnsOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>L3 Server</ListItemText>
            </MenuItem>

            <Divider />
          </MenuList>
        </Box>

        {/* 🔽 MENU BAWAH */}
        <Box>
          <Divider />

          <MenuList>
            <MenuItem>
              <ListItemIcon>
                <CloseOutlinedIcon fontSize="small" color="error" />
              </ListItemIcon>
              <ListItemText>Close Apps</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <ReplayOutlinedIcon fontSize="small" color="warning" />
              </ListItemIcon>
              <ListItemText>Reload Apps</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => navigate(-1)}>
              <ListItemIcon>
                <ArrowBackOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Back</ListItemText>
            </MenuItem>
          </MenuList>
        </Box>
      </Paper>
      <Paper
        sx={{
          p: 5,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between', // 🔥 penting
        }}
      >
        {menu === 1 ? <L3Setting /> : null}
      </Paper>
    </Box>
  );
}

function L3Setting({ handleChange }) {
  const [form, setForm] = useState({
    device_id: 'PACK-MASTER-01',
    ip_server: '127.0.0.1',
    port_server: '3002',
  });
  return (
    <Paper sx={{ p: 3, width: '50%' }}>
      <Typography variant="h6" mb={2}>
        L3 Setting
      </Typography>

      {/* Device ID */}
      <Box display="flex" alignItems="center" mb={2}>
        <Typography sx={{ width: 200 }}>Device ID</Typography>
        <TextField
          size="small"
          fullWidth
          value={form.device_id || ''}
          disabled
        />
      </Box>

      {/* IP Server */}
      <Box display="flex" alignItems="center" mb={2}>
        <Typography sx={{ width: 200 }}>IP Server</Typography>
        <TextField
          size="small"
          fullWidth
          name="ip_server"
          value={form.ip_server || ''}
          onChange={handleChange}
          placeholder="192.168.1.1"
        />
      </Box>

      {/* Port Server */}
      <Box display="flex" alignItems="center" mb={2}>
        <Typography sx={{ width: 200 }}>Port Server</Typography>
        <TextField
          size="small"
          fullWidth
          name="port_server"
          value={form.port_server || ''}
          onChange={handleChange}
          placeholder="3000"
        />
      </Box>

      {/* Connection Timeout */}
      <Box display="flex" alignItems="center" mb={2}>
        <Typography sx={{ width: 200 }}>Connection Timeout</Typography>
        <TextField
          size="small"
          fullWidth
          name="timeout"
          value={form.timeout || ''}
          onChange={handleChange}
          placeholder="5000 (ms)"
        />
      </Box>
      <Box
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          display: 'flex',
        }}
      >
        <Button
          startIcon={<SaveOutlinedIcon fontSize="small" color="success" />}
        >
          Save Changes
        </Button>
        <Button
          startIcon={
            <ConnectWithoutContactOutlinedIcon
              fontSize="small"
              color="warning"
            />
          }
        >
          Test Connection
        </Button>
      </Box>
    </Paper>
  );
}

export default SettingScreen;
