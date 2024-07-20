import React, { useState } from 'react'
import SimulacionTabla from './components/SimulacionTabla'
import SimulacionFormulario from './components/SimulacionFormulario'
import TrabajoPractico from './simulacion'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [datos, setDatos] = useState([])
  const [porcentajeClientesTristes, setPorcentajeClientesTristes] = useState(0)

  const handleSimulacion = formValues => {
    const { stockInicial, cantidadFilasASimular, filaASimularDesde, cantidadFilasAMostrar, pasoH } = formValues
    const tp = new TrabajoPractico()
    tp.STOCK_INICIAL = stockInicial
    tp.CANTIDAD_DE_FILAS_A_SIMULAR = cantidadFilasASimular
    tp.FILA_A_SIMULAR_DESDE = filaASimularDesde
    tp.CANTIDAD_FILAS_A_MOSTRAR = cantidadFilasAMostrar
    tp.PASO_H = pasoH
    tp.comenzarEjecucion()
    const resultados = tp.getResultados()
    setDatos(resultados)

    // Calcular el porcentaje de clientes tristes
    const clientesTotales = resultados.length
    const clientesTristes = resultados.filter(fila => fila.evento === 'FinCoccionHorno').length
    const porcentaje = (clientesTristes / clientesTotales) * 100
    setPorcentajeClientesTristes(porcentaje)
  }

  return (
    <div className="App">
      <h1>Simulación de Panadería</h1>
      <SimulacionFormulario onSubmit={handleSimulacion} />
      {datos.length > 0 && <SimulacionTabla data={datos} porcentajeClientesTristes={porcentajeClientesTristes} />}
    </div>
  )
}

export default App