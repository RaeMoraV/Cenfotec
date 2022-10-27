'use strict';

let listaLibros = [
    ['Harry potter', 'Salamandra', 8000],
    ['Harry potter 2', 'Salamandra', 8000],
    ['Harry potter 3', 'Salamandra', 8000]
];

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