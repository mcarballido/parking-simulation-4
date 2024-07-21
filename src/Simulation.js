// import { CANTIDAD_DE_FILAS_A_SIMULAR, CANTIDAD_HORAS_A_SIMULAR } from './components/SimulacionFormulario'

// lugaresDeEstacionamiento = [
//    { tipo: utilitario, ocupados: 0 },
//    { tipo: utilitario, ocupados: 0 },
//    { tipo: peque, ocupados: 0 }
// ]

// FinDeEstadia: auto35
// auto35 = { tamaño: peque, lugar: Lugar1{ tipo: utilitario, ocupados: 1 } }
// auto36 = { tamaño: peque, lugar: Lugar1{ tipo: utilitario, ocupados: 2 } }
//
// auto35 = { tamaño: peque, lugar: { tipo: utilitario, ocupados: 0 } }
//
// auto35 = { tamaño: peque, lugar: null }

// LlegadaVehiculo: auto36
// auto36 = { tamaño: utilitario, lugar: { tipo: utilitario, ocupados: 0 }, }

// auto35 = { tamaño: peque, lugar: null }

const CANTIDAD_DE_FILAS_A_SIMULAR = 100
const CANTIDAD_HORAS_A_SIMULAR = 10000

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

class Simulation {
    constructor(stockInicial, cantidadFilasASimular) {

        this.CANTIDAD_DE_FILAS_A_SIMULAR = cantidadFilasASimular
        this.resultados = []
       // this.cantidadLlegadasClientes = 0 // Contador para la cantidad total de llegadas de clientes
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

    console.log(
      `${evento.constructor.name} - t: ${evento.tiempoDeOcurrencia} \nProximos Eventos: ${JSON.stringify(
        colaEventos
      )} \nAutos Ingresados: ${JSON.stringify(autos)} \nCaja Ocupada: ${
        datos.cajaOcupada
      } - Fila en Caja: ${JSON.stringify(
        filaCaja
      )}\nLugares Utilitarios Parcialmente Libres: ${utilitariosParcialmenteLibres} - Lugares Utilitarios Libres: ${utilitariosLibres} - Lugares Utilitarios Ocupados: ${utilitariosOcupados} - Lugares Grandes Libres: ${grandesLibres} - Lugares Grandes Ocupados: ${grandesOcupados} - Lugares Pequeños Libres: ${pequeñosLibres} - Lugares Pequeños Ocupados: ${pequeñosOcupados}`
    )
    console.log()
  }

  extraerEventoProximo(datos) {
    let eventoMasCercano = datos.colaEventos[0]

    datos.colaEventos.forEach(evento => {
      if (evento.tiempoDeOcurrencia < eventoMasCercano.tiempoDeOcurrencia) {
        eventoMasCercano = evento
      }
    })

    // Encontrar el índice del objeto con el tiempoDeOcurrencia específico
    let indice = datos.colaEventos.findIndex(
      evento => evento.tiempoDeOcurrencia === eventoMasCercano.tiempoDeOcurrencia
    )

    // Si se encuentra el objeto, eliminarlo del arreglo
    if (indice !== -1) {
      datos.colaEventos.splice(indice, 1)
    }

    return eventoMasCercano
  }

  comenzarEjecucion() {
    const lugaresPequenos = Array.from({ length: 10 }, () => new Lugar('pequeño', 0))
    const lugaresGrandes = Array.from({ length: 6 }, () => new Lugar('grande', 0))
    const lugaresUtilitarios = Array.from({ length: 4 }, () => new Lugar('utilitario', 0))

    const datos = {
      lugaresDeEstacionamiento: [...lugaresPequenos, ...lugaresGrandes, ...lugaresUtilitarios],
      autosIngresados: [],
      cajaOcupada: false,
      filaCaja: [],
      cantAutosIngresados: 0,
      cantAutosPagaron: 0,
      acumuladorPlata: 0,
      colaEventos: [new EventoLlegadaAuto(0)],
    }
    
    for (let fila = 0; fila < CANTIDAD_DE_FILAS_A_SIMULAR; fila++) {
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

      const eventoProximo = this.extraerEventoProximo(datos)

      if (eventoProximo.tiempoDeOcurrencia > CANTIDAD_HORAS_A_SIMULAR * 60) {
        break
      }

      eventoProximo.ocurreEvento(datos)

      datos.tiempo = eventoProximo.tiempoDeOcurrencia

      this.mostrarDatos(eventoProximo, datos)

      const filaDatos = {
        tiempo: eventoProximo.tiempo,
        evento: eventoProximo.constructor.name,
        utilitariosParcialmenteLibres: utilitariosParcialmenteLibres,
        utilitariosLibres: utilitariosLibres,
        utilitariosOcupados: utilitariosOcupados,
        grandesLibres:grandesLibres,
        grandesOcupados:grandesOcupados,
        pequeñosLibres:pequeñosLibres,
        pequeñosOcupados:pequeñosOcupados,
        autos:autos,

        filaCaja: [...datos.filaCaja],
        eventosCola: datos.colaEventos.map(eventoProximo => ({
          tiempo: eventoProximo.tiempoDeOcurrencia,
          evento: eventoProximo.constructor.name,
         
        })),
      }

      if (fila >= this.FILA_A_SIMULAR_DESDE && fila < this.FILA_A_SIMULAR_DESDE + this.CANTIDAD_FILAS_A_MOSTRAR) {
        this.resultados.push({ ...filaDatos, nroFila: fila })
      }
    }
  }
}

function tamanoDeAuto(random) {
  if (random < 0.6) {
    return 'pequeño'
  } else if (random < 0.85) {
    return 'grande'
  } else {
    return 'utilitario'
  }
}

class EventoLlegadaAuto {
  constructor(tiempoActual) {
    // constructor es cuando creamos el evento
    this.randomTiempo = Math.random()
    this.tiempoEntreLlegadas = 12 + this.randomTiempo * (14 - 12)
    this.tiempoDeOcurrencia = tiempoActual + this.tiempoEntreLlegadas
  }

  ocurreEvento(datos) {
    const nroAuto = datos.cantAutosIngresados + 1
    const randomTamano = Math.random()
    const tamano = tamanoDeAuto(randomTamano) // grande, pequeño, utilitario

    const autoQueLlega = new Auto(nroAuto, tamano)

    if (tamano === 'grande') {
      for (let i = 0; i < datos.lugaresDeEstacionamiento.length; i++) {
        const lugarEstacionamiento = datos.lugaresDeEstacionamiento[i]

        if (lugarEstacionamiento.tamano === 'grande' && lugarEstacionamiento.ocupados === 0) {
          lugarEstacionamiento.ocupados += 1
          autoQueLlega.lugar = lugarEstacionamiento
          break
        }
      }
    }

    if (tamano == 'utilitario') {
      for (let i = 0; i < datos.lugaresDeEstacionamiento.length; i++) {
        const lugarEstacionamiento = datos.lugaresDeEstacionamiento[i]

        if (lugarEstacionamiento.tamano === 'utilitario' && lugarEstacionamiento.ocupados === 0) {
          lugarEstacionamiento.ocupados += 2
          autoQueLlega.lugar = lugarEstacionamiento
          break
        }
      }
    }

    if (tamano == 'pequeño') {
      let encontroLugar = false

      for (let i = 0; i < datos.lugaresDeEstacionamiento.length; i++) {
        const lugarEstacionamiento = datos.lugaresDeEstacionamiento[i]

        if (lugarEstacionamiento.tamano === 'pequeño' && lugarEstacionamiento.ocupados === 0) {
          lugarEstacionamiento.ocupados += 1
          autoQueLlega.lugar = lugarEstacionamiento
          encontroLugar = true
          break
        }
      }

      if (!encontroLugar) {
        for (let i = 0; i < datos.lugaresDeEstacionamiento.length; i++) {
          const lugarEstacionamiento = datos.lugaresDeEstacionamiento[i]

          if (lugarEstacionamiento.tamano === 'utilitario' && lugarEstacionamiento.ocupados < 2) {
            lugarEstacionamiento.ocupados += 1
            autoQueLlega.lugar = lugarEstacionamiento
            break
          }
        }
      }
    }

    if (autoQueLlega.lugar) {
      autoQueLlega.estado = 'estacionado'
      datos.cantAutosIngresados += 1
      datos.autosIngresados.push(autoQueLlega)

      datos.colaEventos.push(new EventoFinEstacionamiento(this.tiempoDeOcurrencia, autoQueLlega))
    }

    datos.colaEventos.push(new EventoLlegadaAuto(this.tiempoDeOcurrencia))
  }
}

function calcularTiempoDeEstadia(random) {
  if (random < 0.5) {
    return 60
  } else if (random < 0.8) {
    return 120
  } else if (random < 0.95) {
    return 180
  } else {
    return 240
  }
}

function calcularCostoEstadia(tiempoDeEstadia, tamanoDeAuto) {
  if (tamanoDeAuto === 'utilitario') {
    return 1.5 * tiempoDeEstadia
  } else if (tamanoDeAuto === 'grande') {
    return 1.2 * tiempoDeEstadia
  } else {
    return 1 * tiempoDeEstadia
  }
}

// evento
// constructor ( new ... )
// this.tiempoDeOcurrencia
// ocurreEvento()

class EventoFinEstacionamiento {
  constructor(tiempoDeLlegada, autoEstacionado) {
    this.randomTiempo = Math.random()

    const tiempoDeEstadia = calcularTiempoDeEstadia(this.randomTiempo)

    this.tiempoDeOcurrencia = tiempoDeLlegada + tiempoDeEstadia

    autoEstacionado.costo = calcularCostoEstadia(tiempoDeEstadia, autoEstacionado.tamano)

    this.auto = autoEstacionado
  }

  ocurreEvento(datos) {
    if (this.auto.tamano === 'utilitario') {
      this.auto.lugar.ocupados -= 2
    } else {
      this.auto.lugar.ocupados -= 1
    }

    if (datos.filaCaja.length > 0) {
      this.auto.estado = 'esperando pagar'
      datos.filaCaja.push(this.auto)
    } else {
      if (datos.cajaOcupada) {
        this.auto.estado = 'esperando pagar'
        datos.filaCaja.push(this.auto)
      } else {
        this.auto.estado = 'pagando'
        datos.cajaOcupada = true

        datos.colaEventos.push(new EventoFinCobro(this.tiempoDeOcurrencia, this.auto))
      }
    }
  }
}

class EventoFinCobro {
  constructor(tiempoActual, auto) {
    this.tiempoDeOcurrencia = tiempoActual + 2
    this.auto = auto
  }

  ocurreEvento(datos) {
    datos.cantAutosPagaron += 1
    datos.acumuladorPlata += this.auto.costo

    let indice = datos.autosIngresados.findIndex(auto => auto.nro === this.auto.nro)

    // Si se encuentra el objeto, eliminarlo del arreglo (-1 significa que no encontro nada)
    if (indice !== -1) {
      datos.autosIngresados.splice(indice, 1)
    }

    delete this.auto

    if (datos.filaCaja.length > 0) {
      const proximoAuto = datos.filaCaja.shift() // saca el primero de la fila

      datos.colaEventos.push(new EventoFinCobro(this.tiempoDeOcurrencia, proximoAuto))
    } else {
      datos.cajaOcupada = false
    }
  }
}

//new TrabajoPractico().comenzarEjecucion()
export default Simulation