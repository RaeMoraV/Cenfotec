'use strict';

let inputCalificacionQuiz = document.getElementById('txtCalificacionMoodle');

function CalcularAl333Porciento() {
    let valor = inputCalificacionQuiz.value;
    if (ValidarInputs(valor) == false) {
        return;
    }

    let resultado = ((valor * 3.33) / 100).toFixed(4);
    document.getElementById('Resultado').innerHTML = ' Resultado en base 3.33% es: ' + resultado;
}
function ImprimirMsjError(pmensaje) {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: pmensaje
    });
}
function ValidarInputs(pvalor) {
    if (pvalor == '' || pvalor == null || pvalor == undefined) {
        ImprimirMsjError('Error, ingrese la nota del quiz');
        return false;
    }
    if (pvalor < 0 || pvalor > 100) {
        ImprimirMsjError('Error, ingrese la nota del quiz mayor a 0 y menor 100');
        return false;
    }
    return true;
}

function verOnkeyup(){
    let input = document.getElementById('txtValor2');
    let valor =  input.value;

    document.getElementById('txtResultadoOnkeyup').value = valor;
}

function VerValorOnblur(){
    let input = document.getElementById('txtValor1');
    let valor =  input.value;

    document.getElementById('txtResultadoOnblur').value = valor;
}