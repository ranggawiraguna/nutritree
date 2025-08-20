import { Fragment } from 'react';
import { Box } from '@mui/material';
import Chart from 'react-apexcharts';

export default function ChartSingle({ id, type, name, xtitle, ytitle, label, data, stroke, largeSize, color, colors }) {
  return (
    <Fragment>
      <Chart
        options={
          type === 'pie'
            ? {
                chart: {
                  id: id
                },
                dataLabels: {
                  enabled: false
                },
                legend: {
                  show: false
                },
                labels: label,
                colors: colors
              }
            : {
                chart: {
                  id: id
                },
                plotOptions: {
                  bar: {
                    borderRadius: 6,  
                    horizontal: false,
                  }
                },
                xaxis: { title: { text: xtitle ?? "", style: { fontFamily:'Folks', fontWeight: 400 } } , categories: label },
                yaxis: { title: { text: ytitle ?? "", style: { fontFamily:'Folks', fontWeight: 400 } } },
                markers: {
                  size: 6,
                  strokeColors: '#B7B7B7',
                  strokeWidth: 2
                },
                dataLabels: {
                  enabled: false
                },
                legend: {
                  show: false
                },
                colors: [color],
                stroke: stroke
                  ? {
                      curve: stroke
                    }
                  : {}
              }
        }
        series={type === 'pie' ? data : [{ name: name || 'Jumlah', data: data }]}
        type={type}
        height={type === 'pie' ? (largeSize ? '225' : '200') : '250'}
        width={type === 'pie' ? (largeSize ? '225' : '200') : undefined}
      />
      {type === 'pie' ? <></> : <Box sx={{ height: '10px' }} />}
    </Fragment>
  );
}
