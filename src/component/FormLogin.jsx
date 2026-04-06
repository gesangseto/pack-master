import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { login } from '../service/Authentication';
import {
  useAuthStore,
  useAuthStorePanelA,
  useAuthStorePanelB,
} from '../store/authStore';
import { useAlert } from './AlertProvider';
import BaseDialog from './atom/BaseDialog';

export default function FormLogin({ open, onClose, onLogin, panel }) {
  const { showAlert } = useAlert();
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const loginStore = useAuthStore((state) => state.login);
  const loginStoreA = useAuthStorePanelA((state) => state.login);
  const loginStoreB = useAuthStorePanelB((state) => state.login);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!form.username || !form.password) {
      setError('Username dan Password wajib diisi');
      return;
    }
    setError('');
    let submit = await login(form);
    if (submit && !submit.error) {
      onLogin(submit);
      if (panel == 'a') loginStoreA(submit.data[0]);
      else if (panel == 'b') loginStoreB(submit.data[0]);
      else loginStore(submit.data[0]);
      setForm({ username: '', password: '' });
    }
    showAlert(submit.message, submit.error ? 'error' : 'success');
  };

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      title={`User Login ${panel !== 'main' ? `Panel ${panel}` : ''}`}
      actions={
        <Box>
          {/* <Button onClick={onClose}>Batal</Button> */}
          <Button variant="contained" onClick={handleSubmit}>
            Login
          </Button>
        </Box>
      }
    >
      <Paper sx={{ py: 4, px: 2 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box display="flex" alignItems="center" m={1}>
            <Typography sx={{ width: 250 }}>Username</Typography>
            <TextField
              size="small"
              label="username"
              name="username"
              fullWidth
              value={form.username}
              onChange={handleChange}
            />
          </Box>
          <Box display="flex" alignItems="center" m={1}>
            <Typography sx={{ width: 250 }}>Password</Typography>
            <TextField
              size="small"
              fullWidth
              value={form.password}
              label="Password"
              name="password"
              type="password"
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit();
                }
              }}
            />
          </Box>
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
        </Box>
      </Paper>
    </BaseDialog>
  );
}
