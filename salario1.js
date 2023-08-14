// Calculador de salario.

// Ingreso de datos
let mes = parseInt(prompt("Ingrese mes en formato numérico (ej: enero: 01)"));

let diasDelMes = 0;
if (mes === 01 || mes === 03 || mes === 05 || mes === 07 || mes === 08 || mes === 10 || mes === 12) {
    diasDelMes = 31;
} else if (mes === 04 || mes === 06 || mes ===  09 || mes === 11) {
    diasDelMes = 30;
} else if (mes === 02) {
    diasDelMes = 28;
} else {
    alert("Elige una opcion correcta!")
}

// Procesamiento de datos
let diasTrabajados = 0;
for (let dias = 1; dias <= diasDelMes; dias++) {
    let respuesta = prompt("Trabajaste el " + dias + "/" + mes + "?");

    if (respuesta === "si") {
        diasTrabajados ++;
    }
    
}

// Salida de datos
alert("Este mes has trabajado " + diasTrabajados + " dias!!");

function calcularSalario (horasDiarias, precioHora) {
    const salarioDiario = horasDiarias * precioHora;
    const salarioMensual = salarioDiario * diasTrabajados;
    return salarioMensual;
}

// Entrada de datos
const horasDiarias = parseFloat(prompt("Cuantas horas trabajas por dia?"));
const precioHora = parseFloat(prompt("Cuanto te pagan la hora?"))

// Procesamiento de datos
const salario = calcularSalario(horasDiarias, precioHora);

//Salida de datos
alert("Tu salario mensual será de: " + salario);



