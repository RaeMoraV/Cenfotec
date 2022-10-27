'use strict';

const buttonImprimir = document.getElementById('btnImprimir');
buttonImprimir.addEventListener('click', Imprimir);

function Imprimir(){
    const inputNombre = document.getElementById('txtNombre');
    const outputResultado = document.getElementById('outResultado');

    let nombre = inputNombre.value;

    outputResultado.value = nombre;
}