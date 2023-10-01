// DOM - ENTRADA DE DATOS
const registroHoras = document.querySelector('#registroHoras') 
const btnConfirmarPrecioHora = document.querySelector('#confirmarPrecioHora')
const inputFecha = document.querySelector('#inputFecha')
const inputHoraEntrada = document.querySelector('#inputHoraEntrada')
const inputHoraSalida = document.querySelector('#inputHoraSalida')
const divPrecioHora = document.querySelector('#divPrecioHora') 
const btnModificarPrecioHora = document.querySelector('#btnModificarPrecioHora')

//DOM - SALIDA DE DATOS
const horasMensuales = document.querySelector('#horasMensuales')
const salarioMensual = document.querySelector('#salarioMensual')
const pHorasSinCargar = document.querySelector('#pHorasSinCargar')
const pSalarioSinCargar = document.querySelector('#pSalarioSinCargar')
const tablaResumen = document.querySelector('#tablaResumen')
const tBody = document.querySelector('#tBody')
const main = document.querySelector('#main')

class Dia {
    constructor ({fecha, horasDiarias})  {
        this.fecha = fecha;
        this.horasDiarias = horasDiarias;
    } 
} 

const diasTrabajados = JSON.parse(localStorage.getItem('diasTrabajados')) || [];

let submit = JSON.parse(localStorage.getItem('submit')) || 0;


//------EVENTOS------
btnConfirmarPrecioHora.addEventListener ('click', e => {
    e.preventDefault()
    
    confirmarPrecioHora()
    mostrarPrecioFijado()
    if(diasTrabajados.length > 0){
        mostrarSalarioMensual()
    }
})

btnModificarPrecioHora.addEventListener ('click', e => {
    e.preventDefault()

    modificarPrecioHora()
})

registroHoras.addEventListener ('submit', e => {
    e.preventDefault()
    
    const fecha = inputFecha.value 
    const horaEntrada = inputHoraEntrada.value
    const horaSalida = inputHoraSalida.value
    
    const horasDiarias = parseFloat(calcularHorasDiarias(horaEntrada, horaSalida))
    const nuevoDia = new Dia({ fecha, horasDiarias }) 
   
    if ( horaSalida >  horaEntrada){
        sumarSubmit() 
        cargarNuevoDia(nuevoDia)
        ordenarResumen()
        sumarHorasTrabajadas()
        actualizarInformacion()

        inputFecha.value='' 
        inputHoraEntrada.value=''
        inputHoraSalida.value=''
    }else {
        alertarError()
    }
}) 


//-----EJECUCION DE FUNCIONES-----

mostrarPrecioFijado()
mostrarResumenMensual()

if(diasTrabajados.length > 0 ) { 
    ordenarResumen()
    actualizarInformacion()
}


//-----FUNCIONES-----

function confirmarPrecioHora() {
    const inputPrecioHora = document.querySelector('#inputPrecioHora')
    const precioHora = parseFloat(inputPrecioHora.value)
    localStorage.setItem('precioHora', JSON.stringify(precioHora));

    return precioHora
}

function modificarPrecioHora() {
    const inputPrecioHora = document.querySelector('#parrafoPrecioHora') 
    divPrecioHora.removeChild(inputPrecioHora)

    const nuevoHoras = document.createElement('input')
    nuevoHoras.type = 'number'
    nuevoHoras.id = 'inputPrecioHora'

    divPrecioHora.appendChild(nuevoHoras)
}

function calcularHorasDiarias(horaEntrada, horaSalida) {
    const Interval = luxon.Interval
    const DateTime = luxon.DateTime

    const hora1 = DateTime.fromISO(horaEntrada)
    const hora2 = DateTime.fromISO(horaSalida)

    const i = Interval.fromDateTimes(hora1, hora2)
    const horasDiarias = (i.length('hours')).toFixed(2)
    
    return horasDiarias
}

function alertarError() {
    Swal.fire(
        'Hora de Salida mas temprano que hora de Ingreso',
        'Si has terminado de trabajar el dia siguiente al que comenzaste, debes crear una entrada para cada dia.',
        'question'
      )
}

function cargarNuevoDia(nuevoDia) {
    diasTrabajados.push(nuevoDia)
    localStorage.setItem('diasTrabajados', JSON.stringify(diasTrabajados))
}

function sumarSubmit() { 
    submit = submit + 1;
    localStorage.setItem('submit', JSON.stringify(submit))
}

function ordenarResumen() {
    diasTrabajados.sort(compararFechas)
}

function compararFechas(a, b) { 
  const fechaA = a.fecha;
  const fechaB = b.fecha;
  if (fechaA < fechaB) {
    return -1;
  }
  if (fechaA > fechaB) {
    return 1;
  }
  return 0;
}

function sumarHorasTrabajadas() {
        const horasTrabajadas = diasTrabajados.map(h => h.horasDiarias).reduce((a,b) => a+b) 
        return horasTrabajadas
}

function mostrarHorasTrabajadas() {
    const horasTrabajadas = sumarHorasTrabajadas()
    const dias = diasTrabajados.length
    if (submit===0){
        horasMensuales.removeChild(pHorasSinCargar)
    }else {
        horasMensuales.innerHTML =`${horasTrabajadas} horas y ${dias} dias!`
    }
}

function mostrarSalarioMensual() {
    const horasTrabajadas = sumarHorasTrabajadas()
    const precioHora = JSON.parse(localStorage.getItem('precioHora'))
    const salario = (precioHora*horasTrabajadas).toFixed(2)
    if (submit===0){
        salarioMensual.removeChild(pSalarioSinCargar)
    } else {
        salarioMensual.innerHTML = `$ ${salario}`
    } 
}

function mostrarResumenMensual() {
    if ( diasTrabajados.length > 0) {
        tBody.innerHTML = ''
        for (let i = 0; i < diasTrabajados.length; i++) {
            const resumen = document.createElement('tr')
            tBody.appendChild(resumen)

            const itemFecha = document.createElement('td')
            itemFecha.innerHTML = diasTrabajados[i].fecha
            resumen.appendChild(itemFecha)

            const itemHoras = document.createElement('td')
            itemHoras.innerHTML = diasTrabajados[i].horasDiarias
            resumen.appendChild(itemHoras)

            resumen.className = 'tr'
            itemHoras.className = 'td'
            itemFecha.className = 'td'
        }
    } else {
        main.removeChild(tablaResumen)
    }
} 

function actualizarInformacion() {
    mostrarHorasTrabajadas()
    mostrarSalarioMensual()
    mostrarResumenMensual()
}

function mostrarPrecioFijado() { 
     if (JSON.parse(localStorage.getItem('precioHora'))) {
        const inputPrecioHora = document.querySelector('#inputPrecioHora')//
        const precioHora = JSON.parse(localStorage.getItem('precioHora'))|| parseFloat(inputPrecioHora.value)
        divPrecioHora.removeChild(inputPrecioHora)
        const parrafoPrecioHora = document.createElement('p')
        parrafoPrecioHora.innerHTML = `${precioHora}`
        parrafoPrecioHora.id = 'parrafoPrecioHora'
        divPrecioHora.appendChild(parrafoPrecioHora)
     }
}
