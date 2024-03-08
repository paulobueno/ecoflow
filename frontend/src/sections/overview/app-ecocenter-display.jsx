import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import AppWidgetButton from './app-widget-button';
import AppWebsiteVisits from './app-website-visits';
import AppWidgetSummary from './app-widget-summary';

// ----------------------------------------------------------------------

export default function AppEcoCenterDisplay({ center, ...other }) {
  const [fillPercentageHistory, setFillPercentageHistory] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/api/fill-percentage-history/${center.id}`)
      .then(response => response.json())
      .then(data => setFillPercentageHistory(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [center.id]);

  return (
    <Container maxWidth="xl" sx={{ marginTop: 5 }}>
      <Typography variant="h4" sx={{ mb: 5 }}>
        {center.friendly_id}
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="volume ocupado"
            total={`${parseFloat(center.fill_percentage)}%`}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetButton
            inputText="novo volume %"
            centerid={center.id}
          />
        </Grid>

        <Grid xs={12} md={6} lg={12}>
          <AppWebsiteVisits
            title="Histórico"
//             subheader="(+43%) than last year"
            history={fillPercentageHistory}
            centerid={center.id}
            threshold={center.pickup_fill_percentage_threshold}
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
  threshold: PropTypes.number,
  title: PropTypes.string,
};
