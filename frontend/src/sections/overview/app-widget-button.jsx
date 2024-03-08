import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


// ----------------------------------------------------------------------

export default function AppWidgetButton({ inputText, centerId, onClick, sx, ...other }) {
  const [fillPercentage, setFillPercentage] = useState('');

  const handleButtonClick = async () => {
    const postData = {
      fill_percentage: parseFloat(fillPercentage),
    };

    try {
      const response = await fetch(`http://localhost:8000/api/fill-percentage-history/${centerId}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();
      console.log('POST response:', data);

      await onClick(centerId);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <Card
      component={Stack}
      spacing={3}
      direction="row"
      sx={{
        px: 3,
        py: 5,
        borderRadius: 2,
        ...sx,
      }}
      {...other}
    >
      <TextField id="standard-basic"
      label={inputText} variant="standard"
      onChange={(e) => setFillPercentage(e.target.value)}
      />
      <Button variant="contained" onClick={handleButtonClick}>Registrar</Button>
    </Card>
  );
}

AppWidgetButton.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  inputText: PropTypes.string,
  onClick: PropTypes.func,
  centerId: PropTypes.number,
  total: PropTypes.number,
};
