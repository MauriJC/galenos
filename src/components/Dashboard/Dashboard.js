import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['COVID', 'Neumonia', 'Saludable'],
  datasets: [
    {
      label: 'Numero de pacientes',
      data: [12, 19, 7],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(75, 192, 192, 0.2)',

        'rgba(255, 206, 86, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
};

const Dashboard = () => {
  return (
    <div style={{ width: '30%', height: '400px', margin: '0 auto' }}>
      <h2>Pacientes y patologías</h2>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default Dashboard;
