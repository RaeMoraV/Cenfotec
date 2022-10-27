'use strict';

// let botonRegistrar = document.querySelector('#btnRegistrar');
let botonRegistrar = document.getElementById('btnRegistrar');
let inputTitulo = document.querySelector('#txtTitulo');
let inputPrecio= document.querySelector('#numPrecio');
let inputEditorial = document.querySelector('#txtEditorial');

botonRegistrar.addEventListener('click', ObtenerDatos);

ImprimirListaLibros();

function ValidarInputs(psTitulo, psEditorial, pnPrecio){
    if (psTitulo == '' || psTitulo == null || psTitulo == undefined) {
        ImprimirMsjError('Estimado usuario el Titulo es requerido');
        ResaltarLabelInvalido('lblTitulo');
        ResaltarInputInvalido('txtTitulo');
        return false;
    }
    if (psEditorial == '' || psEditorial == null || psEditorial == undefined) {
        ImprimirMsjError('Estimado usuario la Editorial es requerida');
        ResaltarLabelInvalido('lblEditorial');
        ResaltarInputInvalido('txtEditorial');
        return false;
    }
    if (pnPrecio == '' || pnPrecio == null || pnPrecio == undefined) {
        ImprimirMsjError('Estimado usuario el Precio es requerido');
        ResaltarLabelInvalido('lblPrecio');
        ResaltarInputInvalido('numPrecio');
        return false;
    }
    if (pnPrecio <= 0) {
        ImprimirMsjError('Estimado usuario el Precio debe ser mayor que 0');
        ResaltarLabelInvalido('lblPrecio');
        ResaltarInputInvalido('numPrecio');
        inputPrecio.value = '';
        return false;
    }

    return true;
}
function ImprimirMsjError(pmensaje){
    Swal.fire({
        title:'Error!',
        text:pmensaje,
        icon:'error',
        confirmButtonText:'OK'
    });
}
function ImprimirMsjCorrecto(pmensaje){
    Swal.fire({
        title:'Genial!',
        text:pmensaje,
        icon:'success',
        confirmButtonText:'OK'
    });
}
function ResaltarLabelInvalido(pLabelID){
    let elementLabel = document.getElementById(pLabelID);
    let sytleOrigin = elementLabel.style;

    elementLabel.style = 'color:red;';

    setTimeout(function(){
        elementLabel.style = sytleOrigin;
    }, 5000);
}
function ResaltarInputInvalido(pInputID){
    let elementInput = document.getElementById(pInputID);
    let sytleOrigin = elementInput.style;

    elementInput.style = 'border: 1px solid red;';

    setTimeout(function(){
        elementInput.style = sytleOrigin;
    }, 5000);
}
function ObtenerDatos(){
    let sTitulo = inputTitulo.value;
    let sEditorial = inputEditorial.value;
    let nPrecio = Number(inputPrecio.value);
     
    if (ValidarInputs(sTitulo, sEditorial, nPrecio) == false) {
        return;
    }
    // console.log(sTitulo);
    // console.log(sEditorial);
    // console.log(nPrecio);

    RegistrarLibros(sTitulo, sEditorial, nPrecio);
    ImprimirListaLibros();
    ImprimirMsjCorrecto('Registro exitoso, el libro ' + sTitulo +' se agrego correctamente!');
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