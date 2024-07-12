import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
} from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { GetExpenseRequest } from '../redux/Reducers/GetExpenseSlice';

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart() {
  const dispatch = useDispatch();
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Expense Distribution',
        data: [],
        backgroundColor: [],
        hoverOffset: 4,
      },
    ],
  });

  const processChartData = (expenses) => {
    const categoryMap = {};
    const backgroundColors = [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)',
      'rgb(155, 105, 86)',
      'rgb(75, 192, 192)',
      'rgb(153, 102, 255)',
      'rgb(163, 162, 255)',
      'rgb(255, 159, 64)',
      'rgb(199, 199, 199)',
      'rgb(109, 109, 199)',
    ];

    if (expenses) {
      expenses.forEach((expense) => {
        if (categoryMap[expense.category]) {
          categoryMap[expense.category] += expense.total_amount;
        } else {
          categoryMap[expense.category] = expense.total_amount;
        }
      });
    }

    const labels = Object.keys(categoryMap);
    const data = Object.values(categoryMap);
    const colors = labels.map(
      (_, index) => backgroundColors[index % backgroundColors.length],
    );

    setChartData({
      labels,
      datasets: [
        {
          label: 'Expense Distribution',
          data,
          backgroundColor: colors,
          hoverOffset: 4,
        },
      ],
    });
  };

  const { expense } = useSelector((state) => state.GetExpense);

  useEffect(() => {
    dispatch(GetExpenseRequest());
  }, [dispatch]);

  useEffect(() => {
    processChartData(expense);
  }, [expense]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label(tooltipItem) {
            return `${tooltipItem.label}: $${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-96">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
}

export default DoughnutChart;
