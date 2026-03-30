import { useEffect, useState } from 'react';
import { Box, Typography, Button, Divider, Stack } from '@mui/material';
import { darken, lighten } from '@mui/material/styles';
import { invoke } from '@tauri-apps/api/core';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import SettingsIcon from '@mui/icons-material/Settings';
import ListAltIcon from '@mui/icons-material/ListAlt';
import HistoryIcon from '@mui/icons-material/History';
import AppsIcon from '@mui/icons-material/Apps';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useConfirm } from '../ConfirmProvider';

export default function MenuPanel() {
  const confirm = useConfirm();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const defaultColor = '#aaaaaa';
  const sxButton = (props = {}) => {
    const { disabled } = props;
    return {
      borderRadius: 3,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: disabled ? lighten(defaultColor, 1) : defaultColor,
      border: disabled ? null : 2,
      color: 'white',
      '&:hover': {
        backgroundColor: disabled ? null : darken(defaultColor, 0.5),
      },
    };
  };
  useEffect(() => {
    formatDate();
    const interval = setInterval(formatDate, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatDate = () => {
    const now = new Date();
    const pad = (n) => n.toString().padStart(2, '0');

    const HH = pad(now.getHours());
    const mm = pad(now.getMinutes());
    const ss = pad(now.getSeconds());

    const dd = pad(now.getDate());
    const MM = pad(now.getMonth() + 1); // 🔥 fix month
    const yy = now.toLocaleDateString('en-US', { year: '2-digit' });

    setTime(`${HH}:${mm}:${ss}`);
    setDate(`${dd}/${MM}/${yy}`);
  };

  return (
    <Box
      sx={{
        width: 100,
        height: '96.7vh',
        bgcolor: '#070069',
        color: 'white',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      {/* TIME */}
      <Box textAlign="center">
        <Typography variant="h5" fontWeight="bold">
          {time}
        </Typography>
        <Typography variant="body2">{date}</Typography>
      </Box>

      <Divider sx={{ bgcolor: '#555' }} />

      {/* BUTTON GROUP */}
      <Stack spacing={1}>
        <Button disabled sx={sxButton({ disabled: true })}>
          <PlayArrowIcon />
          Start Production
        </Button>

        <Button sx={sxButton()}>
          <StopIcon />
          Stop Production
        </Button>
      </Stack>

      <Divider sx={{ bgcolor: '#555' }} />

      <Stack spacing={1}>
        <Button sx={sxButton()}>
          <ListAltIcon />
          Production Mgmt
        </Button>

        <Button sx={sxButton()}>
          <HistoryIcon />
          Audit Trail
        </Button>

        <Button sx={sxButton()}>
          <SettingsIcon />
          Settings
        </Button>
      </Stack>

      <Divider sx={{ bgcolor: '#555' }} />

      <Stack spacing={1} mt="auto">
        <Button sx={sxButton()}>
          <AppsIcon />
          Switch App
        </Button>

        <Button
          sx={sxButton()}
          onClick={async () => {
            const ok = await confirm('Anda yakin ingin Shutdown PC?');
            if (ok) await invoke('shutdown');
          }}
        >
          <PowerSettingsNewIcon />
          Shutdown
        </Button>
      </Stack>
    </Box>
  );
}
