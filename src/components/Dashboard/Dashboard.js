import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

// Datos para el gráfico de patologías
const dataPathologias = {
  labels: ['COVID', 'Neumonia', 'Saludable'],
  datasets: [
    {
      label: 'Número de pacientes',
      data: [12, 19, 7],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(75, 192, 192, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

// Datos para el gráfico de ubicaciones
const dataUbicaciones = {
  labels: ['San Miguel de Tucumán', 'Yerba Buena', 'Tafí Viejo', 'Concepción', 'Monteros'],
  datasets: [
    {
      label: 'Número de pacientes',
      data: [25, 15, 10, 5, 8],
      backgroundColor: [
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(153, 102, 255, 0.2)',
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(153, 102, 255, 1)',
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
    <div style={{ width: '80%', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
      <div style={{ width: '45%', marginBottom: '20px' }}>
        <h2 style={{ textAlign: 'center' }}>Pacientes y patologías</h2>
        <div style={{ width: '100%', height: '300px' }}>
          <Doughnut data={dataPathologias} options={options} />
        </div>
      </div>
      <div style={{ width: '45%', marginBottom: '20px' }}>
        <h2 style={{ textAlign: 'center' }}>Pacientes y ubicación en Tucumán</h2>
        <div style={{ width: '100%', height: '300px' }}>
          <Doughnut data={dataUbicaciones} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
