import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import SettingsApplicationsOutlinedIcon from '@mui/icons-material/SettingsApplicationsOutlined';
import SettingsInputHdmiOutlinedIcon from '@mui/icons-material/SettingsInputHdmiOutlined';
import PlayForWorkIcon from '@mui/icons-material/PlayForWork';
import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import { exit, relaunch } from '@tauri-apps/plugin-process';
import { useConfirm } from './component/ConfirmProvider';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AppSetting from './component/setting/AppSetting';
import ServerSetting from './component/setting/ServerSetting';
import ScannerSetting from './component/setting/ScannerSetting';
import WeigherSetting from './component/setting/WeigherSetting';

function SettingScreen() {
  const navigate = useNavigate();
  const { confirm: showConfirm } = useConfirm();
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
            <MenuItem onClick={() => setMenu(1)}>
              <ListItemIcon>
                <SettingsApplicationsOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>App Config</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => setMenu(2)}>
              <ListItemIcon>
                <DnsOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Server Setting</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => setMenu(3)}>
              <ListItemIcon>
                <SettingsInputHdmiOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Scanner Setting</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => setMenu(4)}>
              <ListItemIcon>
                <PlayForWorkIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Weigher Setting</ListItemText>
            </MenuItem>
          </MenuList>
        </Box>

        {/* 🔽 MENU BAWAH */}
        <Box>
          <Divider />

          <MenuList>
            <MenuItem
              onClick={async () => {
                const ok = await showConfirm({
                  title: 'Application Confirmation',
                  message: 'Anda akan menutup Packmaster. Lanjutkan?',
                  severity: 'error',
                });
                if (ok) {
                  await exit(0);
                }
              }}
            >
              <ListItemIcon>
                <CloseOutlinedIcon fontSize="small" color="error" />
              </ListItemIcon>
              <ListItemText>Close Apps</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={async () => {
                const ok = await showConfirm({
                  title: 'Application Confirmation',
                  message: 'Anda akan memuat ulang Packmaster. Lanjutkan?',
                  severity: 'error',
                });
                if (ok) {
                  await relaunch();
                }
              }}
            >
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
        {menu === 1 ? (
          <AppSetting />
        ) : menu === 2 ? (
          <ServerSetting />
        ) : menu === 3 ? (
          <ScannerSetting />
        ) : menu === 4 ? (
          <WeigherSetting />
        ) : null}
      </Paper>
    </Box>
  );
}

export default SettingScreen;
