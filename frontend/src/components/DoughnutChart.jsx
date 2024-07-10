import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart() {
  const data = {
    labels: [
      'Red',
      'Blue',
      'Yellow',
      'green',
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100 , 150,],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'green',
      ],
      hoverOffset: 4,
    }],
  };

  return (
    <div className="w-1/2 p-4">
      <h2 className="text-lg font-bold mb-4">Expense Distribution</h2>
      <Doughnut data={data} />
    </div>
  );
}

export default DoughnutChart;
