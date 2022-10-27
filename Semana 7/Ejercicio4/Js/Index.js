'use strict';


const buttonImprimir = document.getElementById('btn-imprimir');
buttonImprimir.addEventListener('click', Imprimir);

function Imprimir(){
    const listaGeneros = document.getElementsByClassName('chk-generos');
    const outputResultado = document.getElementById('out-resultado');

    let generosSeleccionados = '';
    // for (let i = 0; i < listaGeneros.length; i++) {
    //     if (listaGeneros[i].checked == true) {
    //         generosSeleccionados += listaGeneros[i].value + ',';
    //     }
    // }

    Array.from(listaGeneros).forEach( genero => {
        if (genero.checked == true) {
            generosSeleccionados += genero.value + ',';
        }
    });

    outputResultado.value = generosSeleccionados; 
}