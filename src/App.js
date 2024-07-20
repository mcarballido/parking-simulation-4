// src/App.js
import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Aquí puedes realizar una llamada a una API o simplemente simular datos
    const fetchData = async () => {
      // Simulación de datos
      const simulatedData = [
        {
          nombreEvento: 'Evento1',
          tiempoActual: '10:00',
          randomLlegada: 0.5,
          proximaLlegada: '10:05',
          randomFinEstacionamiento: 0.8,
          tiempoFinEstacionamiento: '10:30',
          randomTamano: 0.3,
          tamanoVehiculo: 'Pequeño',
          finDeCobro: '10:35',
          estadoDeCaja: 'Libre',
          cantidadAutosEnColaParaCaja: 2,
          cantidadLugaresDisponibles: 5,
          cantidadAutosQuePagaron: 10,
          totalAcumulado: 200,
          estadoDeAutos: 'Estacionado'
        },
        // Más datos aquí...
      ];
      setData(simulatedData);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Simulación de Estacionamiento</h1>
      <DataTable data={data} />
    </div>
  );
};

export default App;
