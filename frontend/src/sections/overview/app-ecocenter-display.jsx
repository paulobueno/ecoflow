import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import AppWidgetButton from './app-widget-button';
import AppWebsiteVisits from './app-website-visits';
import AppWidgetSummary from './app-widget-summary';
import AppWidgetCallButton from './app-widget-call-button';

// ----------------------------------------------------------------------

export default function AppEcoCenterDisplay({ center, ...other }) {
  const [historicalData, setHistoricalData] = useState([]);
  const [centerState, setCenterState] = useState(center);

  useEffect(() => {
    fetchHistoricalData(centerState.id);
  }, [centerState.id]);

  const fetchHistoricalData = centerId => {
    fetch(`http://localhost:8000/api/fill-percentage-history/${centerId}`)
      .then(response => response.json())
      .then(data => setHistoricalData(data))
      .catch(error => console.error('Error fetching data:', error));
  };

  const fetchData = centerId => {
    fetch(`http://localhost:8000/api/waste-collection-centers/${centerId}`)
      .then(response => response.json())
      .then(data => setCenterState(data))
      .catch(error => console.error('Error fetching data:', error));
  };

  const fetchDataFromAPIs = centerId => {
    fetchHistoricalData(centerId);
    fetchData(centerId);
  };

  return (
    <Container maxWidth="xl" sx={{ marginTop: 5 }}>
      <Typography variant="h4" sx={{ mb: 5 }}>
        {centerState.friendly_id}
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="volume ocupado"
            total={`${parseFloat(centerState.fill_percentage)}%`}
            color="success"
            icon={<img alt="icon" src="/assets/icons/recyclingbin.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetButton
            inputText="volume ocupado % "
            centerId={centerState.id}
            onClick={fetchDataFromAPIs}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetCallButton
            centerId={centerState.id}
            pickupRequested={centerState.pickup_requested}
            onClick={fetchDataFromAPIs}
          />
        </Grid>

        <Grid xs={12} md={6} lg={12}>
          <AppWebsiteVisits
            title="Histórico"
//             subheader="(+43%) than last year"
            history={historicalData}
            centerid={centerState.id}
            threshold={parseFloat(centerState.pickup_fill_percentage_threshold)}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

AppEcoCenterDisplay.propTypes = {
  chart: PropTypes.object,
  center: PropTypes.object,
  subheader: PropTypes.string,
  centerid: PropTypes.number,
  title: PropTypes.string,
};
