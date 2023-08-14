
let mes = parseInt(prompt("Ingrese mes en formato numérico (ej: enero: 01)"));

let diasDelMes = 0;
if (mes === 01 || mes === 03 || mes === 05 || mes === 07 || mes === 08 || mes === 10 || mes === 12) {
    diasDelMes = 31;
} else if (mes === 04 || mes === 06 || mes ===  09 || mes === 11) {
    diasDelMes = 30;
} else {
    diasDelMes = 28;
}


let diasTrabajados = 0;
for (let dias = 1; dias <= diasDelMes; dias++) {
    let respuesta = prompt("Trabajaste el " + dias + "/" + mes + "?");

    if (respuesta === "si") {
        diasTrabajados ++;
    }
    
}

alert("Este mes has trabajado " + diasTrabajados + " dias!!");
