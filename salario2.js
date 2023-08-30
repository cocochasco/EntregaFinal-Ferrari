//----------CALCULADOR DE SALARIO------------


//Mensaje de bienvenida.
alert("Bienvenido/a. \n\n Aquí podras calcular y llevar el control de tu salario! \n\n Empecemos!");

//Se crea la funcion constructora Dia, para guardar cada dia trabajado y las horas trabajadas 
class Dia {
    constructor (fecha, horasDiarias)  {
        this.fecha = fecha;
        this.horasDiarias = horasDiarias;
    } 
}

//Creo array de DiasTabajados para guardar todo el mes 
const diasTrabajados = [];

function nuevaEntrada() { //Creo funcion para abstraccion.
    const fecha = prompt("Ingrese fecha");
    const horasDiarias = parseFloat(prompt("Ingrese horas trabajadas"));
    alert("Entrada cargada")
    return new Dia (fecha, horasDiarias);//Creo un nuevo dia con los datos que pedi antes.
}


//------------INGRESO DE DATOS----------

const pregunta = prompt("Deseas agregar nueva entrada? (Responder si o no)")//Pregunto al usuario si quiere agregar un nuevo dia trabajado, si responde que si, vuelve a comenzar el while.
if (pregunta === "Si" || pregunta === "SI" || pregunta === "si") {
    
    let agregarNuevaEntrada = true 
    while (agregarNuevaEntrada) {
        
        const nuevoDia = nuevaEntrada(); //Creo nuevoDia, donde ejecuto la funcion que crea new Dia. 
        /* nuevoDia.horasDiarias; */ //Asi puedo sumar las horas
        
        
        diasTrabajados.push(nuevoDia); //Envio ese objeto (NuevoDia) al array diasTrabajados
        
        const pregunta = prompt("Deseas agregar nueva entrada?")//Pregunto al usuario si quiere agregar un nuevo dia trabajado, si responde que si, vuelve a comenzar el while.
        if (pregunta === "Si" || pregunta === "SI" || pregunta === "si") { //Si responde que si, vuelve a comenzar el while.
            agregarNuevaEntrada = true;
        } else { // Si responde diferente a si termina el while.
            agregarNuevaEntrada = false;
            
        }
        
    }
} 

//--------------PROCESAMIENTO DE DATOS--------------
let totalHorasMes = 0;
const horasTrabajadas = diasTrabajados.map(h => h.horasDiarias) //Creo horasTrabajadas, le digo que tome cada valor de horasDiareias dentro de diasTrabajados, y crea un array con estos valores.


for (const i of horasTrabajadas) { //Para cada indice de horasTrabajas 
    totalHorasMes = totalHorasMes + i //Sumo ese indice al totalHorasMes.
}


//-----------SALIDA DE DATOS----------- 

alert("Este mes has trabajado " + totalHorasMes + " horas!")//Muestro en alert la suma de horas trabajadas en el mes.


//-----------INGRESO DE DATOS---------
const precioHora = parseFloat(prompt("Cuanto cobras por hora?"))

//----------PROCESAMIENTO DE DATOS---------
function calcularSalario (horas, precio) { //Creo funcion para calcular salario
    const salario = horas * precio;
    return salario;//Le digo que me devuelva el resultado de salario
}

//----------SALIDA DE DATOS--------
alert ("Tu salario será de $" + calcularSalario(totalHorasMes, precioHora ))
