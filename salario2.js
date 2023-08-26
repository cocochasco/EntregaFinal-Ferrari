//----------CALCULADOR DE SALARIO------------
//
//Mensaje de bienvenida.
alert("Bienvenido/a. \n\n Aquí podras calcular y llevar el control de tu salario! \n\n Empecemos!")

//Se crea la funcion constructora Dia, para guardar cada dia trabajado y las horas trabajadas 
class Dia {
    constructor (fecha, horasDiarias)  {
        this.fecha = fecha;
        this.horasDiarias = horasDiarias;
    }
}


//Creo arrays de DiasTabajados y HorasTrabajadas para guardar todo el mes 
const diasTrabajados = [];
const horasTrabajadas = [];

function nuevaEntrada() { //Creo funcion para abstraccion.
    const fecha = prompt("Ingrese fecha");
    const horasDiarias = parseFloat(prompt("Ingrese horas trabajadas"));
    const nuevoDia = new Dia (fecha, horasDiarias);//Creo un nuevo dia con los datos que pedi antes.
    alert("Entrada cargada")
    horasTrabajadas.push(horasDiarias) //Envio las horasDiarias a el array horasTrabajadas
    diasTrabajados.push(nuevoDia) //Envio ese objeto (NuevoDia) a  diasTrabajados
    pregunta = prompt("Deseas agregar nueva entrada?")
}
//----INGRESO DE DATOS------
let pregunta = prompt("Deseas agregar nueva entrada?") //Pregunto al usuario si quiere agregar un nuevo dia trabajado
while (pregunta === "SI" || pregunta === "Si" || pregunta === "si") {
    
} 

let totalHoras = 0;


for (const i of horasTrabajadas) {
    totalHoras = totalHoras + i
}

function sumarHoras ()



alert("Este mes has trabajado " + totalHoras + " horas!")


/* console.log(diasTrabajados);
console.log(horasTrabajadas) */