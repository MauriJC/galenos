import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import './Dashboard.css'

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  maintainAspectRatio: false,
};

const Dashboard = () => {
  const [dataPathologias, setDataPathologias] = useState({
    labels: [],
    datasets: [
      {
        label: 'Número de pacientes',
        data: [],
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
  });

  const [dataUbicaciones, setDataUbicaciones] = useState({
    labels: [],
    datasets: [
      {
        label: 'Número de pacientes',
        data: [],
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
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const diagnosticosResponse = await axios.get('http://localhost:3001/diagnosticos');
        const diagnosticos = diagnosticosResponse.data;

        // Procesar datos para el gráfico de patologías
        const patologias = diagnosticos.reduce((acc, diagnostico) => {
          const patologia = diagnostico.resultado;
          if (!acc[patologia]) {
            acc[patologia] = 0;
          }
          acc[patologia]++;
          return acc;
        }, {});

        const labelsPathologias = Object.keys(patologias);
        const dataPathologiasCount = Object.values(patologias);

        setDataPathologias({
          labels: labelsPathologias,
          datasets: [
            {
              label: 'Número de pacientes',
              data: dataPathologiasCount,
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
        });

        const ubicacionesResponse = await axios.get('http://localhost:3001/altapaciente');
        const altapaciente = ubicacionesResponse.data;

        // Procesar datos para el gráfico de ubicaciones
        const ubicaciones = altapaciente.reduce((acc, paciente) => {
          const ubicacion = paciente.domicilio;
          if (!acc[ubicacion]) {
            acc[ubicacion] = 0;
          }
          acc[ubicacion]++;
          return acc;
        }, {});

        const labelsUbicaciones = Object.keys(ubicaciones);
        const dataUbicacionesCount = Object.values(ubicaciones);

        setDataUbicaciones({
          labels: labelsUbicaciones,
          datasets: [
            {
              label: 'Número de pacientes',
              data: dataUbicacionesCount,
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
        });
      } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-chart">
        <h2>Pacientes y patologías</h2>
        <div className="chart-wrapper">
          <Doughnut data={dataPathologias} options={options} />
        </div>
      </div>
      <div className="dashboard-chart">
        <h2>Pacientes y ubicación en Tucumán</h2>
        <div className="chart-wrapper">
          <Doughnut data={dataUbicaciones} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
