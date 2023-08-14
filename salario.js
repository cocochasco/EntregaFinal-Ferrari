
const diasTrabajados = parseInt(prompt("Cuantos dias trabajaste esta semana?"));
const salarioPorHora = parseInt(prompt("Cuantos cobras la hora?"));
const horaExtra = parseInt(prompt("Cuantos cobras la hora extra?"));

for (let cant = 1; cant <= diasTrabajados; cant++) {
    let horasDiarias = parseInt(prompt("Cuantos horas trabajaste el dia " + cant + " ?"));
    
    if (horasDiarias > 8 ) {
        let salarioDiario = (8 - horasDiarias) * horaExtra + 8 * salarioPorHora;
     } else { 
        salarioDiario = horasDiarias * salarioPorHora ;
     }

     let salarioMensual = salarioDiario
    
    }
    
    alert(salarioMensual)
