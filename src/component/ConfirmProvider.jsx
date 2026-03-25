import React, { createContext, useContext, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

const ConfirmContext = createContext();

export const ConfirmProvider = ({ children }) => {
  const [confirmState, setConfirmState] = useState({
    open: false,
    message: '',
    resolve: null,
  });

  const confirm = (message) => {
    return new Promise((resolve) => {
      setConfirmState({
        open: true,
        message,
        resolve,
      });
    });
  };

  const handleClose = (result) => {
    confirmState.resolve(result);
    setConfirmState({ open: false, message: '', resolve: null });
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}

      <Dialog open={confirmState.open} onClose={() => handleClose(false)}>
        <DialogTitle>Konfirmasi</DialogTitle>

        <DialogContent>
          <Typography>{confirmState.message}</Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => handleClose(false)}>Batal</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleClose(true)}
          >
            Ya
          </Button>
        </DialogActions>
      </Dialog>
    </ConfirmContext.Provider>
  );
};

export const useConfirm = () => useContext(ConfirmContext);
