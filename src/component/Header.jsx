import LoginIcon from '@mui/icons-material/Login';
import { Box, Button, keyframes } from '@mui/material';
import mertrackLogo from '../assets/mertrack.png';
import '../css/Header.css';
import { Circle } from '@mui/icons-material';
const blink = keyframes`
  0% { background-color: #e00202; }
  50% { background-color: #a30505; }
  100% { background-color: #e00202; }
`;
function Header() {
  return (
    <div className="header">
      <div className="header-item-left">
        <a target="_blank">
          <img
            src={mertrackLogo}
            className="logo mertrack"
            alt="Mertrack Logo"
          />
        </a>
      </div>

      <div className="header-item">
        <Box
          sx={{
            width: 450,
            height: 65,
            borderRadius: 3,
            bgcolor: '#e00202',
            // Properti untuk mengetengahkan teks:
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white', // Agar teks kontras dengan background merah
            fontWeight: 'bold',
            fontSize: '1.2rem',
            // Tambahkan animasi kedap-kedip yang tadi jika mau
            animation: `${blink} 2s infinite ease-in-out`,
          }}
        >
          PRODUCTION INACTIVE
        </Box>
      </div>
      <div className="header-item">
        <Box
          sx={{
            margin: 5,
            width: 450,
            height: 65,
            borderRadius: 3,
            bgcolor: '#ffffff',
            // Properti untuk mengetengahkan teks:
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            color: 'black', // Agar teks kontras dengan background merah
            fontWeight: 'bold',
            fontSize: '1.2rem',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Circle fontSize="small" color="success" /> Scanner 1
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Circle fontSize="small" color="error" /> Scanner 1
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Circle fontSize="small" color="error" /> Weigher
          </span>
        </Box>
      </div>
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
          <span>
            Gesang Aji Seto
            <br />
            Super Admin
          </span>
        </Box>
      </div>
      <div className="header-item-right">
        <Button color="primary">
          <LoginIcon fontSize="large"></LoginIcon>
        </Button>
      </div>
    </div>
  );
}

export default Header;
