// src/DataTable.js
import React from 'react';

const DataTable = ({ data }) => {
  // Se asume que data contiene los campos necesarios
  return (
    <div className="container">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Evento</th>
            <th>Tiempo</th>
            <th>Autos Ingresados</th>
            <th>Fila en Caja</th>
            <th>Lugares Utilitarios Parcialmente Libres</th>
            <th>Lugares Utilitarios Libres</th>
            <th>Lugares Utilitarios Ocupados</th>
            <th>Lugares Grandes Libres</th>
            <th>Lugares Grandes Ocupados</th>
            <th>Lugares Pequeños Libres</th>
            <th>Lugares Pequeños Ocupados</th>
            <th>Cantidad Autos que Pagaron</th>
            <th>Total Acumulado</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.evento}</td>
              <td>{row.tiempo}</td>
              <td>{JSON.stringify(row.autos)}</td>
              <td>{JSON.stringify(row.filaCaja)}</td>
              <td>{row.utilitariosParcialmenteLibres}</td>
              <td>{row.utilitariosLibres}</td>
              <td>{row.utilitariosOcupados}</td>
              <td>{row.grandesLibres}</td>
              <td>{row.grandesOcupados}</td>
              <td>{row.pequeñosLibres}</td>
              <td>{row.pequeñosOcupados}</td>
              <td>{row.cantAutosPagaron}</td>
              <td>{row.totalAcumulado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
