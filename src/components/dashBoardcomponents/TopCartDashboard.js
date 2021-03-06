import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { Card } from '../../styles/styled';

function TopCartDashBoard() {
  const [series, setSeries] = useState(null);
  useEffect(() => {
    let tempSeries = {
      options: {
        series: [44, 55, 13, 33, 44],
        labels: [
          'Redmi 3s poppp',
          'Mango',
          'Orange',
          'Watermelon',
          'mmanfoxzkvnkjsdbf',
        ],
      },
    };
    setSeries(tempSeries);
  }, []);

  return (
    <Card nohover style={{ padding: '5%' }}>
      {series != null && (
        <Chart
          series={series.options.series}
          type='donut'
          width={'100%'}
          height={window.innerHeight > 450 ? window.innerHeight / 3 : '100%'}
          options={{
            ...series.options,
            dataLabels: { enabled: true },
            legend: { show: true, position: 'right', fontSize: '8px' },
            plotOptions: { pie: { size: 100, donut: { size: '60%' } } },
          }}
        />
      )}
    </Card>
  );
}
export default TopCartDashBoard;
