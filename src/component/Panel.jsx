import React from 'react';
import { Box, Grid, Typography, Paper, Button, TextField } from '@mui/material';

export default function Panel(props) {
  const { title } = props;
  return (
    <Box p={2} bgcolor="#e6e6e6" minHeight="100vh">
      {/* HEADER */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        bgcolor="#0d1fa6"
        color="white"
        px={2}
        py={1}
        borderRadius={2}
      >
        <Typography variant="h6">Level 2</Typography>
        <Typography variant="h5" fontWeight="bold">
          {title}
        </Typography>
        <Button variant="contained" disabled>
          Login
        </Button>
      </Box>

      <Grid container spacing={2} mt={1}>
        {/* LEFT PANEL */}
        <Grid item xs={8}>
          <Paper sx={{ p: 2 }}>
            <Box bgcolor="#666" color="white" textAlign="center" py={2} mb={2}>
              <Typography variant="h6">Silakan login panel A</Typography>
            </Box>

            <Typography variant="h6" mb={1}>
              DAFTAR EPC ISI ()
            </Typography>

            <Box
              height={300}
              border="1px solid #ccc"
              borderRadius={2}
              bgcolor="#fafafa"
            />
          </Paper>

          {/* FOOTER BUTTON */}
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="contained" color="error">
              Close Partial
            </Button>

            <Button variant="contained">Print Label</Button>
          </Box>
        </Grid>

        {/* RIGHT PANEL */}
        <Grid item xs={4}>
          <Paper sx={{ p: 2 }}>
            {/* Progress */}
            <Typography textAlign="center" mb={1}>
              Progres berjalan
            </Typography>

            <Box display="flex" justifyContent="center" gap={2} mb={2}>
              <Box bgcolor="#cfe2f3" px={3} py={1}>
                <Typography variant="h5">0</Typography>
              </Box>
              <Typography variant="h5">/</Typography>
              <Box bgcolor="#cfe2f3" px={3} py={1}>
                <Typography variant="h5">0</Typography>
              </Box>
            </Box>

            {/* Kriteria */}
            <Typography>Kriteria Bobot</Typography>
            <Typography>Average 0 | 0/0</Typography>

            {/* Range */}
            <Typography mt={2}>Rentang Bobot (kg)</Typography>
            <Box display="flex" gap={1} alignItems="center" mt={1}>
              <TextField size="small" label="Min" fullWidth />
              <Typography>~</Typography>
              <TextField size="small" label="Max" fullWidth />
            </Box>

            {/* Timbang */}
            <Button fullWidth variant="contained" sx={{ mt: 2 }} disabled>
              Timbang
            </Button>

            {/* Result */}
            <Typography mt={2}>Hasil Timbang ()</Typography>
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
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
