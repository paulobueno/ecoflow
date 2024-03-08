import React, { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';

// ----------------------------------------------------------------------

export default function AppView() {
  const [collectionCenters, setCollectionCenters] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/waste-collection-centers/')
      .then(response => response.json())
      .then(data => {
        setCollectionCenters(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
  <>
    {collectionCenters.map(center => (
    <Container maxWidth="xl" sx={{ marginTop: 5 }}>
      <Typography variant="h4" sx={{ mb: 5 }}>
        {center.friendly_id}
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="% de volume ocupado"
            total={parseFloat(center.fill_percentage)}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="New Users"
            total={1352831}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={12}>
          <AppWebsiteVisits
            title="Histórico"
//             subheader="(+43%) than last year"
            chart={{
              labels: [
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
              ],
              series: [
                {
                  name: 'Total preenchido',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27],
                },
                {
                  name: 'Chamada Automática de Coleta',
                  type: 'line',
                  fill: 'solid',
                  data: [80, 80, 80, 80],
                },
              ],
            }}
          />
        </Grid>
      </Grid>
    </Container>
    ))}
    </>
  );
}
