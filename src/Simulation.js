import { CANTIDAD_DE_FILAS_A_SIMULAR } from './components/SimulacionFormulario'

class Simulation {
  //Esto estaba en padaderia
  constructor(cantidadFilasASimular) {
    this.CANTIDAD_DE_FILAS_A_SIMULAR = cantidadFilasASimular
    this.resultados = []
    //this.cantidadLlegadasClientes = 0 // Contador para la cantidad total de llegadas de clientes
    //this.porcentajeClientesTristes = 0
  }

  mostrarDatos(evento, datos) {
    const utilitariosParcialmenteLibres = datos.lugaresDeEstacionamiento.filter(
      lugar => lugar.tamano === 'utilitario' && lugar.ocupados === 1
    ).length
    const utilitariosLibres = datos.lugaresDeEstacionamiento.filter(
      lugar => lugar.tamano === 'utilitario' && lugar.ocupados === 0
    ).length
    const utilitariosOcupados = datos.lugaresDeEstacionamiento.filter(
      lugar => lugar.tamano === 'utilitario' && lugar.ocupados === 2
    ).length
    const grandesLibres = datos.lugaresDeEstacionamiento.filter(
      lugar => lugar.tamano === 'grande' && lugar.ocupados === 0
    ).length
    const grandesOcupados = datos.lugaresDeEstacionamiento.filter(
      lugar => lugar.tamano === 'grande' && lugar.ocupados === 1
    ).length
    const pequeñosLibres = datos.lugaresDeEstacionamiento.filter(
      lugar => lugar.tamano === 'pequeño' && lugar.ocupados === 0
    ).length
    const pequeñosOcupados = datos.lugaresDeEstacionamiento.filter(
      lugar => lugar.tamano === 'pequeño' && lugar.ocupados === 1
    ).length
    const autos = datos.autosIngresados.map(auto => {
      return { nro: auto.nro, estado: auto.estado }
    })
    const filaCaja = datos.filaCaja.map(auto => {
      return { nro: auto.nro }
    })
    const colaEventos = datos.colaEventos.map(evento => {
      return { nombre: evento.constructor.name, tiempo: evento.tiempoDeOcurrencia }
    })

    // console.log(
    //   `${evento.constructor.name} - t: ${evento.tiempoDeOcurrencia} \nProximos Eventos: ${JSON.stringify(
    //     colaEventos
    //   )} \nAutos Ingresados: ${JSON.stringify(autos)} \nCaja Ocupada: ${
    //     datos.cajaOcupada
    //   } - Fila en Caja: ${JSON.stringify(
    //     filaCaja
    //   )}\nLugares Utilitarios Parcialmente Libres: ${utilitariosParcialmenteLibres} - Lugares Utilitarios Libres: ${utilitariosLibres} - Lugares Utilitarios Ocupados: ${utilitariosOcupados} - Lugares Grandes Libres: ${grandesLibres} - Lugares Grandes Ocupados: ${grandesOcupados} - Lugares Pequeños Libres: ${pequeñosLibres} - Lugares Pequeños Ocupados: ${pequeñosOcupados}`
    // )
    // console.log()
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

class Auto {
  constructor(nro, tamano, estado, lugar, costo) {
    this.nro = nro
    this.tamano = tamano // pequeño
    this.estado = estado // estacionado, esperando pagar, pagando
    this.lugar = lugar // { tipo: grande }
    this.costo = costo
  }
}

class Lugar {
  constructor(tamano, ocupados) {
    this.tamano = tamano // grande, pequeño, utilitario
    this.ocupados = ocupados // 0, 1, 2
  }
}