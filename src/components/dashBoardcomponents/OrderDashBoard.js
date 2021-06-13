import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

import { ColorTwo } from '../../styles/color';
import { Card } from '../../styles/styled';

function OrderDashBoard() {
  const [orderDetail, setOrderDetail] = useState(null);

  useEffect(() => {
    let temp = {
      options: {
        chart: {
          id: 'Order-Chart',
        },
        xaxis: {
          categories: [
            '05/06/21',
            '06/06/21',
            '07/06/21',
            '08/06/21',
            '09/06/21',
          ],
        },
      },
      series: [
        {
          name: 'order',
          data: [4, 3, 1, 5, 7],
        },
      ],
    };
    console.log(window.innerHeight);

    setOrderDetail(temp);
  }, []);
  return (
    <Card nohover>
      {orderDetail != null && (
        <Chart
          options={orderDetail.options}
          series={orderDetail.series}
          type='bar'
          width={'100%'}
          height={window.innerHeight > 450 ? window.innerHeight / 2 : '100%'}
          options={{
            fill: {
              colors: ColorTwo,
            },
            legend: {
              show: true,
            },
            xaxis: {
              type: 'category',
              categories: orderDetail.options.xaxis.categories,
            },
            grid: {
              borderColor: 'none',
            },
          }}
        />
      )}
    </Card>
  );
}
export default OrderDashBoard;
