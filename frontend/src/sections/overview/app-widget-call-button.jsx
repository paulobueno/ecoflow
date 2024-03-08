import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LensIcon from '@mui/icons-material/Lens';
import Typography from '@mui/material/Typography';



// ----------------------------------------------------------------------

export default function AppWidgetCallButton({centerId, pickupRequested, onClick, sx, ...other }) {
  const iconColor = pickupRequested ? "success" : "disabled";

  const handleButtonClick = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/fill-percentage-history/${centerId}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({fill_percentage: 0,}),
      });

      const data = await response.json();
      console.log('POST response:', data);

      await onClick(centerId);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <Card component={Stack}
          spacing={3}
          direction="row"
          sx={{px: 3, py: 5, borderRadius: 2, ...sx,}}
          {...other}>
       <Stack spacing={0.5}>
           <Typography>Coleta Solicitada:</Typography>
           <Box sx={{ width: 30, height: 30 }}><LensIcon color={iconColor} /></Box>
       </Stack>



      <Button variant="contained" onClick={handleButtonClick}>Coleta Realizada</Button>
    </Card>
  );
}

AppWidgetCallButton.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  onClick: PropTypes.func,
  centerId: PropTypes.number,
  pickupRequested: PropTypes.bool,
  total: PropTypes.number,
};
