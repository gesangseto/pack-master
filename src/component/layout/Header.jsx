import { Circle } from '@mui/icons-material';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import FeedIcon from '@mui/icons-material/Feed';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/LogoutOutlined';
import {
  Box,
  Button,
  Divider,
  Grid,
  keyframes,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import mertrackLogo from '../../assets/mertrack.png';
import '../../css/layout/Header.css';
import { useAuthStore } from '../../store/authStore';
import { useConfirm } from '../ConfirmProvider';
import FormLogin from '../FormLogin';

const smallField = {
  '& .MuiInputBase-input': {
    padding: '4px 8px',
    fontSize: '13px',
  },
};
const smallText = {
  width: 150,
  fontSize: 14,
  textAlign: 'right',
  minWidth: 175,
};

const blink = keyframes`
  0% { background-color: #ff8383; }
  50% { background-color: #a30505; }
  100% { background-color: #ff8383; }
`;
function Header() {
  const [open, setOpen] = useState(false);
  const confirm = useConfirm();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <Paper sx={{ borderRadius: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item size={12}>
          {/* IMAGE INFO */}
          <Box display="flex">
            <Box flex={1}>
              <img
                src={mertrackLogo}
                style={{ height: 75, width: 'auto' }}
                loading="lazy"
              />
            </Box>
            {/* PRODUCTION INFO */}
            <Box flex={1} alignContent={'center'} mx={5}>
              <Box
                sx={{
                  width: 450,
                  height: 60,
                  borderRadius: 3,
                  // Properti untuk mengetengahkan teks:
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  // Tambahkan animasi kedap-kedip yang tadi jika mau
                  animation: `${blink} 1s infinite ease-in-out`,
                }}
              >
                PRODUCTION INACTIVE
              </Box>
            </Box>
            {/* DEVICE INFO */}
            <Box flex={1} alignContent={'center'} mx={5}>
              <Box
                sx={{
                  width: 450,
                  height: 60,
                  borderRadius: 3,
                  bgcolor: '#ffffff',
                  border: 1,
                  // Properti untuk mengetengahkan teks:
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  color: 'black', // Agar teks kontras dengan background merah
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                }}
              >
                <span
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <Circle fontSize="small" color="success" /> Scanner 1
                </span>
                <span
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <Circle fontSize="small" color="error" /> Scanner 1
                </span>
                <span
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <Circle fontSize="small" color="error" /> Weigher
                </span>
              </Box>
            </Box>

            {/* LOGIN INFO */}
            <Box flex={1} display="flex" mr={2} alignItems="center">
              {user ? (
                <Box flex={1}>
                  <Typography variant="body2" fontWeight={'bold'}>
                    {user?.full_name}
                  </Typography>
                  <Typography variant="body2">
                    ({user?.department_name} - {user?.section_name})
                  </Typography>
                  <Typography variant="body2">
                    Auto logout in: {9000} seconds
                  </Typography>
                </Box>
              ) : (
                ''
              )}
              <Box
                flex={1}
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
              >
                {user ? (
                  <Tooltip title="Logout">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={async () => {
                        const ok = await confirm('Yakin ingin logout?');
                        if (ok) logout();
                      }}
                    >
                      <LogoutIcon fontSize="large" />
                    </Button>
                  </Tooltip>
                ) : (
                  <Tooltip title="Login">
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => setOpen(true)}
                    >
                      <LoginIcon fontSize="large" />
                    </Button>
                  </Tooltip>
                )}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <FormLogin
        open={open}
        onClose={() => setOpen(false)}
        onLogin={() => setOpen(false)}
      />
    </Paper>
  );
  return (
    <div className="header">
      <div className="header-item-left">
        <a target="_blank"></a>
      </div>

      <div className="header-item"></div>
      <div className="header-item"></div>
      <div className="header-item">
        <Box
          sx={{
            height: 65,
            // Properti untuk mengetengahkan teks:
            display: 'flex',
            alignItems: 'center',
            color: 'black', // Agar teks kontras dengan background merah
            fontWeight: 'bold',
            fontSize: '1.2rem',
          }}
        >
          {user ? (
            <span>
              {user?.username}
              <br />
              {user?.department_name} - {user?.section_name}
            </span>
          ) : null}
        </Box>
      </div>
      <div className="header-item-right">
        {user ? (
          <Tooltip title="Logout">
            <Button
              variant="contained"
              color="error"
              onClick={async () => {
                const ok = await confirm('Yakin ingin logout?');
                console.log(ok);

                if (ok) {
                  logout();
                }
              }}
            >
              <LogoutIcon fontSize="large" />
            </Button>
          </Tooltip>
        ) : (
          <Tooltip title="Login">
            <Button
              variant="contained"
              color="success"
              onClick={() => setOpen(true)}
            >
              <LoginIcon fontSize="large" />
            </Button>
          </Tooltip>
        )}
      </div>
    </div>
  );
}

export default Header;
