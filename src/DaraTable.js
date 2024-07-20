// src/DataTable.js
import React from 'react';

const DataTable = ({ data }) => {
  return (
    <div className="container">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre del Evento</th>
            <th>Tiempo Actual</th>
            <th>Random Llegada</th>
            <th>Próxima Llegada</th>
            <th>Random Fin Estacionamiento</th>
            <th>Tiempo Fin Estacionamiento</th>
            <th>Random Tamaño</th>
            <th>Tamaño Vehículo</th>
            <th>Fin de Cobro</th>
            <th>Estado de Caja</th>
            <th>Cantidad de Autos en Cola para Caja</th>
            <th>Cantidad de Lugares Disponibles</th>
            <th>Cantidad de Autos que Pagaron</th>
            <th>Total Acumulado</th>
            <th>Estado de Autos</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.nombreEvento}</td>
              <td>{row.tiempoActual}</td>
              <td>{row.randomLlegada}</td>
              <td>{row.proximaLlegada}</td>
              <td>{row.randomFinEstacionamiento}</td>
              <td>{row.tiempoFinEstacionamiento}</td>
              <td>{row.randomTamano}</td>
              <td>{row.tamanoVehiculo}</td>
              <td>{row.finDeCobro}</td>
              <td>{row.estadoDeCaja}</td>
              <td>{row.cantidadAutosEnColaParaCaja}</td>
              <td>{row.cantidadLugaresDisponibles}</td>
              <td>{row.cantidadAutosQuePagaron}</td>
              <td>{row.totalAcumulado}</td>
              <td>{row.estadoDeAutos}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
