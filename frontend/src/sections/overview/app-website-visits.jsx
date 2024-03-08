import PropTypes from 'prop-types';
// import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import Chart, { useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

export default function AppWebsiteVisits({ title, subheader, chart, history, threshold, ...other }) {

  const labels = history.map(item => {
      const dateObject = new Date(item.modification_date);
      const formattedDate = new Intl.DateTimeFormat('en-GB').format(dateObject);
      return formattedDate;
});
  const datapoints = history.map(item => parseFloat(item.fill_percentage));
  const series = [
  {
    name: 'Total preenchido',
    type: 'column',
    fill: 'solid',
    data: datapoints,
  },
  {
    name: 'Chamada Automática de Coleta',
    type: 'line',
    fill: 'solid',
    data: Array(datapoints.length).fill(threshold),
  },
];

  const chartOptions = useChart({
    plotOptions: {
      bar: {
        columnWidth: '20%',
      },
    },
    fill: {
      type: series.map((i) => i.fill),
    },
    labels,
    xaxis: {
      type: 'category',
    },
    yaxis: {
      min: 0,
      max: 100
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value) => {
          if (typeof value !== 'undefined') {
            return `${value.toFixed(0)}%`;
          }
          return value;
        },
      },
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }}>
        <Chart
          dir="ltr"
          type="line"
          series={series}
          options={chartOptions}
          width="100%"
          height={364}
        />
      </Box>
    </Card>
  );
}

AppWebsiteVisits.propTypes = {
  chart: PropTypes.object,
  history: PropTypes.object,
  subheader: PropTypes.string,
  threshold: PropTypes.number,
  title: PropTypes.string,
};
