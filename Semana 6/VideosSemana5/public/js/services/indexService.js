'use strict';

let listaLibros = [];

function RegistrarLibros(psTitulo, psEditorial, pnPrecio) {
    let nuevoLibro = [];

    //aca creamos el libro
    nuevoLibro.push(psTitulo, psEditorial, pnPrecio);

    //aca guardamos el libro en la lista de libros
    listaLibros.push(nuevoLibro);
}

function ObtenerListaLibros() {
    return listaLibros;
}