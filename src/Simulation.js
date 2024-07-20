import { CANTIDAD_DE_FILAS_A_SIMULAR } from './components/SimulacionFormulario'

class Simulation {
  constructor(cantidadFilasASimular) {
    this.CANTIDAD_DE_FILAS_A_SIMULAR = cantidadFilasASimular
    this.resultados = []
    //this.cantidadLlegadasClientes = 0 // Contador para la cantidad total de llegadas de clientes
    //this.porcentajeClientesTristes = 0
  }

  comenzarEjecucion() {
    const datos = {
      colaEventos: [],
      empleadosLibres: 2,
      colaClientes: [],
      stock: this.STOCK_INICIAL,
      clientes: 0,
      clientesTristes: 0,
    }

    this.inicializarEventos(datos)

    for (let fila = 1; fila < this.CANTIDAD_DE_FILAS_A_SIMULAR; fila++) {
      const eventoInminente = this.encontrarEventoMasProximo(datos)

      eventoInminente.ocurreEvento(datos)

      const filaDatos = {
        tiempo: eventoInminente.tiempo,
        evento: eventoInminente.constructor.name,
        nroCliente: eventoInminente.nroCliente,
        stock: datos.stock,
        empleadosLibres: datos.empleadosLibres,
        colaClientes: [...datos.colaClientes],
        eventosCola: datos.colaEventos.map(evento => ({
          tiempo: evento.tiempo,
          evento: evento.constructor.name,
          nroCliente: evento.nroCliente,
        })),
      }

      if (fila >= this.FILA_A_SIMULAR_DESDE && fila < this.FILA_A_SIMULAR_DESDE + this.CANTIDAD_FILAS_A_MOSTRAR) {
        this.resultados.push({ ...filaDatos, nroFila: fila })
      }
    }
  }

  encontrarEventoMasProximo(datos) {
    const eventoEncontrado = datos.colaEventos.reduce(
      (eventoMinimo, evento) => (evento.tiempo < eventoMinimo.tiempo ? evento : eventoMinimo),
      datos.colaEventos[0]
    )

    datos.colaEventos = datos.colaEventos.filter(evento => evento !== eventoEncontrado)

    return eventoEncontrado
  }

  inicializarEventos(datos) {
    datos.colaEventos.push(new LlegadaCliente(0, 1))

    if (datos.stock === 0) {
      datos.colaEventos.push(new FinCoccionHorno(0, 0))
    } else {
      datos.colaEventos.push(new EncendidoHorno45Minutos(0))
    }
  }

  getResultados() {
    return this.resultados
  }
}

class LlegadaCliente {
  constructor(tiempoActual, nroCliente) {
    this.tiempo = tiempoActual + -3 * Math.log(1 - Math.random())
    this.nroCliente = nroCliente
  }

  ocurreEvento(datos) {
    datos.clientes += 1
    datos.colaEventos.push(new LlegadaCliente(this.tiempo, datos.clientes + 1))

    if (datos.stock === 0) {
      datos.clientesTristes += 1
    } else if (datos.empleadosLibres > 0) {
      datos.colaEventos.push(new FinAtencion(this.tiempo, this.nroCliente))
      datos.empleadosLibres -= 1
    } else {
      datos.colaClientes.push(this.nroCliente)
      datos.colaEventos.push(new ClienteSeRetiraPorTiempo(this.tiempo, this.nroCliente))
    }
  }
}

class FinAtencion {
  constructor(tiempoActual, nroCliente) {
    this.tiempo = tiempoActual + (0.5 + Math.random())
    this.nroCliente = nroCliente
  }

  ocurreEvento(datos) {
    const productosPedidos = Math.floor(Math.random() * 3) + 1

    if (datos.stock === 0) {
      datos.clientesTristes += 1
    } else {
      datos.stock = productosPedidos > datos.stock ? 0 : datos.stock - productosPedidos

      if (datos.stock === 0) {
        datos.clientesTristes += datos.colaClientes.length
        datos.colaClientes = []
        datos.colaEventos = datos.colaEventos.filter(evento => !(evento instanceof EncendidoHorno45Minutos))
        datos.colaEventos.push(new FinCoccionHorno(this.tiempo, 0))
      }
    }

    if (datos.colaClientes.length > 0) {
      const nroCliente = datos.colaClientes.shift()
      datos.colaEventos.push(new FinAtencion(this.tiempo, nroCliente))
      datos.colaEventos = datos.colaEventos.filter(
        evento => !(evento instanceof ClienteSeRetiraPorTiempo && evento.nroCliente === nroCliente)
      )
    } else {
      datos.empleadosLibres += 1
    }
  }
}

class FinCoccionHorno {
  constructor(tiempoActual, stock) {
    if (stock === 0) {
      this.produccion = 45
      this.tiempo = tiempoActual + 10.9
    } else {
      this.produccion = 30
      this.tiempo = tiempoActual + 9.2
    }
  }

  ocurreEvento(datos) {
    datos.stock += this.produccion
    datos.colaEventos.push(new EncendidoHorno45Minutos(this.tiempo))
  }
}

class EncendidoHorno45Minutos {
  constructor(tiempoActual) {
    this.tiempo = tiempoActual + 45
  }

  ocurreEvento(datos) {
    datos.colaEventos.push(new FinCoccionHorno(this.tiempo, datos.stock))
  }
}

class ClienteSeRetiraPorTiempo {
  constructor(tiempoActual, nroCliente) {
    this.tiempo = tiempoActual + 5
    this.nroCliente = nroCliente
  }

  ocurreEvento(datos) {
    datos.colaClientes = datos.colaClientes.filter(cliente => cliente !== this.nroCliente)
  }
}

export default Simulation