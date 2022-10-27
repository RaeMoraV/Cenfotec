'use strict';

// let botonRegistrar = document.querySelector('#btnRegistrar');
let botonRegistrar = document.getElementById('btnRegistrar');
let inputTitulo = document.querySelector('#txtTitulo');
let inputPrecio= document.querySelector('#numPrecio');
let inputEditorial = document.querySelector('#txtEditorial');

botonRegistrar.addEventListener('click', ObtenerDatos);

function ObtenerDatos(){
    let sTitulo = inputTitulo.value;
    let sEditorial = inputEditorial.value;
    let nPrecio = Number(inputPrecio.value);

    // console.log(sTitulo);
    // console.log(sEditorial);
    // console.log(nPrecio);

    RegistrarLibros(sTitulo, sEditorial, nPrecio);
    ImprimirListaLibros();
}

function ImprimirListaLibros(){
    let tbody = document.getElementById('tbdLibros');
    tbody.innerHTML = '';

    let listaLibros = ObtenerListaLibros();

    for (let i = 0; i < listaLibros.length; i++) {
        let fila = tbody.insertRow();
        let celdaTitulo = fila.insertCell();
        let celdaEditorial = fila.insertCell();
        let celdaPrecio= fila.insertCell();

        celdaTitulo.innerHTML = listaLibros[i][0];//titulo
        celdaEditorial.innerHTML = listaLibros[i][1];//editorial
        celdaPrecio.innerHTML = listaLibros[i][2];//precio
    }
}