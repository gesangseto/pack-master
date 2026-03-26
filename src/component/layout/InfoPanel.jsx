import React from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Paper,
  Divider,
  Button,
  Tooltip,
} from '@mui/material';
import FeedIcon from '@mui/icons-material/Feed';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';

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

export default function InfoPanel() {
  return (
    <Paper sx={{ my: 1, p: 0.5, borderRadius: 2 }}>
      <Grid container spacing={2} alignItems="center">
        {/* LEFT FORM */}
        <Grid item size={12}>
          <Box display="flex" height="100%">
            <Box flex={1}>
              <Box display="flex" alignItems="center" gap={2} m={1}>
                <Typography sx={smallText}>Process Order ID</Typography>
                <TextField sx={smallField} value="102" fullWidth />
              </Box>
              <Box display="flex" alignItems="center" gap={2} m={1}>
                <Typography sx={smallText}>ERP Work Order No</Typography>
                <TextField sx={smallField} value="XXVII-2023" fullWidth />
              </Box>
              <Box display="flex" alignItems="center" gap={2} m={1}>
                <Typography sx={smallText}>Product Name</Typography>
                <TextField sx={smallField} value="Merindo Mivir" fullWidth />
              </Box>
              <Box display="flex" alignItems="center" gap={2} m={1}>
                <Typography sx={smallText}>Price (HET)</Typography>
                <TextField sx={smallField} value="RP 123.456,-" fullWidth />
              </Box>
            </Box>
            {/* RIGHT FORM */}
            <Box flex={1}>
              <Box display="flex" alignItems="center" gap={2} m={1}>
                <Typography sx={smallText}>Batch No</Typography>
                <TextField sx={smallField} value="TXAMO001" fullWidth />
              </Box>
              <Box display="flex" alignItems="center" gap={2} m={1}>
                <Typography sx={smallText}>Lot No</Typography>
                <TextField sx={smallField} value="TXAMO001" fullWidth />
              </Box>
              <Box display="flex" alignItems="center" gap={2} m={1}>
                <Typography sx={smallText}>Mfg Date</Typography>
                <TextField sx={smallField} value="03-Mar2024" fullWidth />
              </Box>
              <Box display="flex" alignItems="center" gap={2} m={1}>
                <Typography sx={smallText}>Exp Date</Typography>
                <TextField sx={smallField} value="03-Mar2027" fullWidth />
              </Box>
            </Box>
            <Divider orientation="vertical" flexItem />
            {/* UPDATE ACTION */}
            <Box display="flex" gap={5} alignItems="center" mx={10}>
              <Tooltip title="Production Details">
                <Button>
                  <FeedIcon sx={{ fontSize: 75 }} />
                </Button>
              </Tooltip>
              <Tooltip title="Update Data">
                <Button>
                  <BrowserUpdatedIcon sx={{ fontSize: 75 }} />
                </Button>
              </Tooltip>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
