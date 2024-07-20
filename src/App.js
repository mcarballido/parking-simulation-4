// src/App.js
import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/simulacion');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
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
