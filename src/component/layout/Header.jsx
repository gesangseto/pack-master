import { Circle } from '@mui/icons-material';
import LoginIcon from '@mui/icons-material/Login';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {
  Box,
  Button,
  Grid,
  keyframes,
  lighten,
  Paper,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import mertrackLogo from '../../assets/mertrack.png';
import '../../css/layout/Header.css';
import { useAuthStore } from '../../store/authStore';
import { useDevice } from '../../store/configStore';
import FormLogin from '../FormLogin';
import UserInfo from '../UserInfo';

const blink = keyframes`
  0% { background-color: #ff8383; }
  50% { background-color: #a30505; }
  100% { background-color: #ff8383; }
`;

const sxButtonLogin = {
  borderRadius: 3,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#378a00',
  color: 'white',
  '&:hover': {
    backgroundColor: lighten('#378a00', 0.5),
  },
};
const sxButtonLogout = {
  borderRadius: 3,
  display: 'flex',
  flexDirection: 'column',
  border: 0.5,
};
function Header() {
  const devices = useDevice((state) => state.devices);
  const [openLogin, setOpenLogin] = useState(false);
  const [openUserInfo, setOpenUserInfo] = useState(false);
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
                  <Circle
                    fontSize="small"
                    color={devices.scanner1.status ? 'success' : 'error'}
                  />
                  Scanner 1
                </span>
                <span
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <Circle
                    fontSize="small"
                    color={devices.scanner2.status ? 'success' : 'error'}
                  />
                  Scanner 1
                </span>
                <span
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <Circle
                    fontSize="small"
                    color={devices.weigher.status ? 'success' : 'error'}
                  />
                  Weigher
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
                  <Button
                    variant="contained"
                    color="inherit"
                    sx={sxButtonLogout}
                    onClick={() => setOpenUserInfo(true)}
                  >
                    <ManageAccountsIcon fontSize="medium" />
                    <Typography variant="caption">{user.username}</Typography>
                  </Button>
                ) : (
                  <Button sx={sxButtonLogin} onClick={() => setOpenLogin(true)}>
                    <LoginIcon fontSize="medium" />
                    <Typography variant="caption">Login</Typography>
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <FormLogin
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        onLogin={() => setOpenLogin(false)}
        panel="main"
      />
      <UserInfo
        open={openUserInfo}
        onClose={() => setOpenUserInfo(false)}
        onLogin={() => setOpenUserInfo(false)}
        panel="main"
      />
    </Paper>
  );
}

export default Header;
