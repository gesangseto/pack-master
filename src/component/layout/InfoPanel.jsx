import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import FeedIcon from '@mui/icons-material/Feed';
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
  lighten,
} from '@mui/material';
import color from '../../constant/color.json';
import { useBatchStore } from '../../store/batchStore';

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

const sxButton = {
  borderRadius: 5,
  maxWidth: 100,
  minHeight: 100,
  flexDirection: 'column',
  backgroundColor: color.primary,
  color: 'white',
  '&:hover': {
    backgroundColor: lighten(color.primary, 0.5),
  },
};
export default function InfoPanel() {
  const process_order = useBatchStore((state) => state.process_order);
  return (
    <Paper sx={{ my: 0.5, borderRadius: 2 }}>
      <Grid container spacing={2} alignItems="center">
        {/* LEFT FORM */}
        <Grid item size={12}>
          <Box display="flex" height="100%">
            <Box flex={1}>
              <Box display="flex" alignItems="center" gap={2} m={0.5}>
                <Typography sx={smallText}>Process Order ID</Typography>
                <TextField
                  sx={smallField}
                  value={process_order?.id ?? ''}
                  fullWidth
                />
              </Box>
              <Box display="flex" alignItems="center" gap={2} m={0.5}>
                <Typography sx={smallText}>ERP Work Order No</Typography>
                <TextField
                  sx={smallField}
                  value={process_order?.process_order_erp ?? ''}
                  fullWidth
                />
              </Box>
              <Box display="flex" alignItems="center" gap={2} m={0.5}>
                <Typography sx={smallText}>Product Name</Typography>
                <TextField
                  sx={smallField}
                  value={process_order?.product_name ?? ''}
                  fullWidth
                />
              </Box>
              <Box display="flex" alignItems="center" gap={2} m={0.5}>
                <Typography sx={smallText}>Price (HET)</Typography>
                <TextField
                  sx={smallField}
                  value={process_order?.het ?? ''}
                  fullWidth
                />
              </Box>
            </Box>
            {/* RIGHT FORM */}
            <Box flex={1}>
              <Box display="flex" alignItems="center" gap={2} m={0.5}>
                <Typography sx={smallText}>Batch No</Typography>
                <TextField
                  sx={smallField}
                  value={process_order?.batch_no ?? ''}
                  fullWidth
                />
              </Box>
              <Box display="flex" alignItems="center" gap={2} m={0.5}>
                <Typography sx={smallText}>Lot No</Typography>
                <TextField
                  sx={smallField}
                  value={process_order?.lot_no ?? ''}
                  fullWidth
                />
              </Box>
              <Box display="flex" alignItems="center" gap={2} m={0.5}>
                <Typography sx={smallText}>Mfg Date</Typography>
                <TextField
                  sx={smallField}
                  value={process_order?.mfg_date ?? ''}
                  fullWidth
                />
              </Box>
              <Box display="flex" alignItems="center" gap={2} m={0.5}>
                <Typography sx={smallText}>Exp Date</Typography>
                <TextField
                  sx={smallField}
                  value={process_order?.exp_date ?? ''}
                  fullWidth
                />
              </Box>
            </Box>
            <Divider orientation="vertical" flexItem />
            {/* UPDATE ACTION */}
            <Box display="flex" gap={5} alignItems="center" mx={10}>
              <Button sx={sxButton}>
                <FeedIcon sx={{ fontSize: 45 }} />
                <Typography variant="body2">Production Details</Typography>
              </Button>

              <Button sx={sxButton}>
                <BrowserUpdatedIcon sx={{ fontSize: 45 }} />
                <Typography variant="body2">Update Data</Typography>
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
