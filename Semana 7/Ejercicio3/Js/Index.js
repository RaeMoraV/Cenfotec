'use strict';


const buttonImprimir = document.getElementById('btn-imprimir');
buttonImprimir.addEventListener('click', Imprimir);

function Imprimir(){
    const listaMonedas = document.getElementById('slt-moneda');
    const outputResultado = document.getElementById('out-resultado');
    const inputMonto = document.getElementById('txt-monto');

    let monto = inputMonto.value;
    let moneda = listaMonedas.value;
    
    // outputResultado.value = moneda + monto;
    outputResultado.value = `${moneda}${monto}`;
}