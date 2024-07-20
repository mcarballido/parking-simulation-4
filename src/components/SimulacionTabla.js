import React from 'react';
import { Table, Container } from 'react-bootstrap';

const SimulacionTabla = ({ data,porcentajeClientesTristes }) => {
  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Fila</th>
            <th>Tiempo</th>
            <th>Evento</th>
            <th>Nro Cliente</th>
            <th>Stock</th>
            <th>Empleados Libres</th>
            <th>Cola Clientes</th>
            <th>Eventos en Cola</th>
            <th>Cantidad Llegadas</th> {/* Nueva columna para la cantidad de llegadas */}
            <th>Abandonos</th> 
          </tr>
        </thead>
        <tbody>
          {data.map((fila, index) => (
            <tr key={index}>
              <td>{fila.nroFila}</td>
              <td>{fila.tiempo}</td>
              <td>{fila.evento}</td>
              <td>{fila.nroCliente}</td>
              <td>{fila.stock}</td>
              <td>{fila.empleadosLibres}</td>
              <td>{fila.colaClientes.join(', ')}</td>
              <td>
                {fila.eventosCola.map((evento, idx) => (
                  <div key={idx}>
                    {evento.evento} (Tiempo: {evento.tiempo}, Cliente: {evento.nroCliente})
                  </div>
                ))}
              </td>
              <td>{fila.cantidadLlegadas}</td> {/* Mostrar la cantidad de llegadas en esta iteración */}
              <td>{fila.clientesTristes}</td> {/* Mostrar la cantidad de clientes tristes en esta iteración */}
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Mostrar el porcentaje de clientes tristes al finalizar la simulación */}
      <p>Porcentaje de clientes tristes: {porcentajeClientesTristes.toFixed(2)}%</p>
    </Container>
   
  );
};

export default SimulacionTabla;