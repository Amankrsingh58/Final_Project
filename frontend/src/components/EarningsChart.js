import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function EarningsChart({ earnings }) {
  const data = {
    labels: earnings.map((item) => item.month), // X-axis labels
    datasets: [
      {
        label: 'Earnings ($)',
        data: earnings.map((item) => item.amount), // Y-axis values
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return <Line data={data} />;
}

export default EarningsChart;
