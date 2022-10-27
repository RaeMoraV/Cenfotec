
let padre = document.getElementById('div1');
//console.log(padre);
let hijo = document.getElementById('p1');
var parrafos = document.getElementsByTagName ("p");
var parrafos2 = document.getElementsByName("parrafo");
//console.log(parrafos2);

var enlace = document.getElementById('enlace');
console.log(enlace.href);
enlace.href = 'https://www.youtube.com/';
console.log(enlace.href);

function EsconderElemento() {
    // console.log('EsconderElemento');
    hijo.classList.add('clase2');
}
function MostrarElemento() {
    // console.log('MostrarElemento');
    hijo.classList.remove('clase2');
}
function EliminarElemento(){
    padre.removeChild(hijo);
}
function CrearElemento(){
    let parrafo = document.createElement('p');
    let contenido = document.createTextNode('Lorem ipsum');
    parrafo.classList.add('clase1');
    parrafo.appendChild(contenido);
    padre.appendChild(parrafo);
}
















/*
let nombre = 'Limberth';
let edad = '1';
let edad = 'false';
*/
let fechaNacimiento = '2022-10-7';
let fecha = new Date(fechaNacimiento);
// guardar en bd la edad debe convertise a numero antes de insertarse en bd
/*
console.log('Hola Mundo!!!!');
console.log('llegamos bien a la bd');

let resultado = 50 + 50;
console.log('Resultado es ' + resultado);

document.getElementById('');*/

//console.error('Hubo un error el valor es indefenido');