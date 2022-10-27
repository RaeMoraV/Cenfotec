'use strict';

const Imprimir = () => {
    const listaMonedas = document.getElementById('slt-moneda');
    const outResultado = document.getElementById('out-resultado');

    let moneda = listaMonedas.value;

    outResultado.value = moneda;
};

const buttonImprimir = document.getElementById('btn-imprimir');
buttonImprimir.addEventListener('click', Imprimir);