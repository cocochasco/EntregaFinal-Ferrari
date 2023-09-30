// DOM - ENTRADA DE DATOS
const registroHoras = document.querySelector('#registroHoras') //
const btnConfirmarPrecioHora = document.querySelector('#confirmarPrecioHora')
const inputFecha = document.querySelector('#inputFecha')//
const inputHoraEntrada = document.querySelector('#inputHoraEntrada')//
const inputHoraSalida = document.querySelector('#inputHoraSalida')//
const formInformacion = document.querySelector('#formInformacion') //
const btnModificarPrecioHora = document.querySelector('#btnModificarPrecioHora')

//DOM - SALIDA DE DATOS
const horasMensuales = document.querySelector('#horasMensuales')
/* const resumenMensualFecha = document.querySelector('#resumenMensualFecha')
const resumenMensualHoras = document.querySelector('#resumenMensualHoras') */
const salarioMensual = document.querySelector('#salarioMensual')
const pHorasSinCargar = document.querySelector('#pHorasSinCargar')
const pSalarioSinCargar = document.querySelector('#pSalarioSinCargar')
const tablaResumen = document.querySelector('#tablaResumen')
const tBody = document.querySelector('#tBody')

//Creo constante diasTrabajados, donde le digo que si ya tiene informacion en el localStorage, la parsee y la utilice, y sino que sea un array vacio
const diasTrabajados = JSON.parse(localStorage.getItem('diasTrabajados')) || [];

//Creo clase Dia, para guardar cada dia trabajado con su fecha y horasDiarias
class Dia {
    constructor ({fecha, horasDiarias})  {
        this.fecha = fecha;
        this.horasDiarias = horasDiarias;
    } 
} 

//Creo variable submit para saber si ya se ha guardado alguna informacion o no, y segun esto aplicar diferentes funciones luego.
let submit = JSON.parse(localStorage.getItem('submit')) || 0;

btnConfirmarPrecioHora.addEventListener ('click', e => {
    e.preventDefault()
    
    sumarSubmit() 
    if (submit === 1) {
        mostrarPrecioFijado() //Para que mostrarPrecioFijado se ejecute solo la primera vez que envio el formulario. Sino se ejecuta siempre y tira un error porque no puede removerChild de un elemento que ya no existe
    }
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


//Creo evento para el submit
registroHoras.addEventListener ('submit', e => {
    e.preventDefault()
    const fecha = inputFecha.value //Transformo valores de datos ingresados en HTML en variables
    const horaEntrada = inputHoraEntrada.value
    const horaSalida = inputHoraSalida.value
    
    
    const horasDiarias = parseFloat(calcularHorasDiarias(horaEntrada, horaSalida))
    
    
    const nuevoDia = new Dia({ fecha, horasDiarias }) //Utilizo el valor de esas variables para crear nuevo Dia
    
    // EJECUCION DE FUNCIONES DENTRO DEL EVENTO
    if ( horaSalida >  horaEntrada){
    cargarNuevoDia(nuevoDia)
    
    ordenarResumen()
    
    sumarHorasTrabajadas()
    
    actualizarInformacion()
    tablaResumen.style.display = 'block'
    
    inputFecha.value='' //Reseteo valores a 0
    inputHoraEntrada.value=''
    inputHoraSalida.value=''
}else {
    alertarError()
}
}
) 

//-----EJECUCION DE FUNCIONES-----

mostrarPrecioFijado()

if(diasTrabajados.length > 0 ) { //Porque si dias trabajados esta vacio, estaria intentando ejecutar una funcion trabajando sobre un array vacio, y me tira error
    ordenarResumen()
    actualizarInformacion()
}

//-----FUNCIONES-----

function confirmarPrecioHora() {
    const inputPrecioHora = document.querySelector('#inputPrecioHora')//
    const precioHora = parseFloat(inputPrecioHora.value)
    localStorage.setItem('precioHora', JSON.stringify(precioHora));

    return precioHora
}

function modificarPrecioHora() {
    const inputPrecioHora = document.querySelector('#ninputPrecioHora')  //
    formInformacion.removeChild(inputPrecioHora)

    const nuevoHoras = document.createElement('input')
    nuevoHoras.type = 'number'
    nuevoHoras.id = 'inputPrecioHora'

    formInformacion.appendChild(nuevoHoras)

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

function compararFechas(a, b) { //FUNCION DE COMPARACION: Comparo las fechas dentro de los objetos dentro del array, para despues poder aplciar el .sort
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
        console.log(horasTrabajadas)
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

        tBody.innerHTML = ''

        const resumenFecha = diasTrabajados.map(d => d.fecha)
        const resumenHoras = diasTrabajados.map(d => d.horasDiarias)
        
        const resumen = document.createElement('tr')
        
        for (const fecha of resumenFecha) {
            const itemFecha = document.createElement('td')
            itemFecha.innerHTML = fecha
            resumen.appendChild(itemFecha)


            resumen.className = 'lista'//Creo clase para darle estilo en css
            itemFecha.className = 'item'
          
        }
    
        

       
        
        for (const horas of resumenHoras) {
        
           
            const itemHoras = document.createElement('td')
            itemHoras.innerHTML = horas
            resumen.appendChild(itemHoras)
            resumen.className = 'lista'
            itemHoras.className = 'item'
            
        }
        
        tBody.style.display = 'block'
        
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
        formInformacion.removeChild(inputPrecioHora)
        const ninputPrecioHora = document.createElement('p')
        ninputPrecioHora.innerHTML = `${precioHora}`
        ninputPrecioHora.id = 'ninputPrecioHora'
        formInformacion.appendChild(ninputPrecioHora)
     }
}



/*?????????????

-const horasTrabajadas = sumarHorasTrabajadas()// PORQUE NO LOGRO DECLARARLO AFUERA DE LAS FUNCIONES Y TENGO QUE DECLARARLO DENTRO DE CADA FUNCION QUE QUIERO APLICAR??

-Como hacer que presionando un boton aparezca el formulario de un nuevo dia?

Solucionar el ok cuando no modifique las horas...

Que resumen mensual se vea solo cuando cargo info y que sea tabla

??????????*/
