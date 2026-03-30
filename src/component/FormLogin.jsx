import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
} from '@mui/material';
import { login } from '../service/Authentication';
import { useAlert } from './AlertProvider';
import {
  useAuthStore,
  useAuthStorePanelA,
  useAuthStorePanelB,
} from '../store/authStore';

export default function FormLogin({ open, onClose, onLogin, saveTo }) {
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
      if (saveTo) {
        if (saveTo == 'panel-a') loginStoreA(submit.data[0]);
        if (saveTo == 'panel-b') loginStoreB(submit.data[0]);
      } else {
        loginStore(submit.data[0]);
      }
      setForm({ username: '', password: '' });
    }
    showAlert(submit.message, submit.error ? 'error' : 'success');
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Login</DialogTitle>

      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}

          <TextField
            label="username"
            name="username"
            fullWidth
            value={form.username}
            onChange={handleChange}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            value={form.password}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmit();
              }
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Batal</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
}
