'use strict';

const apiUrl = 'http://localhost:3000/api/';

function ImprimirMsjError(pMsj){
    Swal.fire({
        title: 'Error!',
        text: pMsj,
        icon: 'error',
        confirmButtonText: 'Ok'
    });
}
function ImprimirMsjSuccess(pMsj){
    Swal.fire({
        title: 'Excelente!',
        text: pMsj,
        icon: 'success',
        confirmButtonText: 'Ok'
    });
}

function ObtenerTipoIdentificacion(PTipo){
    switch (Number(PTipo)) {
        case 1:
            return 'Física';
        case 2:
            return 'Jurídica';
        case 3:
            return 'Dimex';
        case 4:
            return 'Pasaporte';
        default:
            return 'Sin Identificación';
    }
}

function ObtenerEstado(pEstado){
    switch (Number(pEstado)) {
        case 1:
            return 'Activo';
        case 0:
            return 'Inactivo';
    }
}
function ObtenerRol(pRol) {
    switch (Number(pRol)) {
        case 1:
            return 'Administrador';
        case 2:
            return 'Cliente';
        case 3:
            return 'Secretaria';
    }

}


function resaltarLabelInvalido(plabelID) {
    var obj = document.getElementById(plabelID);
    var orig = obj.style;
    obj.style = 'color:red;'

    setTimeout(function () {
        obj.style = orig;
    }, 5000);
}
function resaltarInputInvalido(pinputID) {
    var obj = document.getElementById(pinputID);
    var orig = obj.style;
    obj.style = 'border: 1px solid red;'

    setTimeout(function () {
        obj.style = orig;
    }, 5000);
}

function formatDate(date) {
    return (
        [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
        ].join('-') +
        ' ' +
        [
            padTo2Digits(date.getHours()),
            padTo2Digits(date.getMinutes()),
            // padTo2Digits(date.getSeconds()),  // 👈️ can also add seconds
        ].join(':')
    );
}
function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}