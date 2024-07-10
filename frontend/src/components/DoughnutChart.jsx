import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
} from 'chart.js';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart() {
  const [expenses, setExpenses] = useState([]);
  const [chartData, setChartData] = useState({
    label: [],
    datasets: [{
      label: 'Expense Distribution',
      data: [],
      backgroundColor: [],
      hoverOffset: 4,
    }],
  });

  console.log(chartData);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_BASE_URL}/expense/1/fetchExpense`)
      .then((res) => {
        setExpenses(res.data);
        console.log(res.data);
        processChartData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const processChartData = (expenses) => {
    const categoryMap = {};

    const backgroundColors = [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(153, 102, 255)',
      'rgb(255, 159, 64)',
      'rgb(199, 199, 199)',
    ];

    expenses.forEach((expense) => {
      if (categoryMap[expense.category]) {
        categoryMap[expense.category] += expense.total_amount;
      } else {
        categoryMap[expense.category] = expense.total_amount;
      }
    });
    // console.log(categoryMap)
    const labels = Object.keys(categoryMap);
    const data = Object.values(categoryMap);
    const colors = labels.map((_, index) => backgroundColors[index % backgroundColors.length]);

    setChartData({
      labels,
      datasets: [{
        label: 'Expense Distribution',
        data,
        backgroundColor: colors,
        hoverOffset: 4,
      }],
    });
  };
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
    <div className="w-full p-4 md:w-1/2 ">
      <h2 className="text-lg flex justify-center font-bold mb-4">Expense Distribution</h2>
      <Doughnut data={chartData} options={options} />
    </div>
  );
}

export default DoughnutChart;
