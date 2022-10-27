'use strict';

let inputUser = document.getElementById('txtUser');
let inputPass = document.getElementById('txtPass');

function IniciarSesion(){
    let user = inputUser.value;
    let pass = inputPass.value;

    if(ValidarInputs(user, pass) == false){
        return;
    }

    let result = AutenticarUsuario(user, pass);

    if (result != null) {
        RedireccionarUsuario(result);
    }else{
        Swal.fire({
            icon:'error',
            title:'Error',
            text:'Usuario y Contraseña incorrectos!'
        });
    }
}

function ValidarInputs(pUser, pPass){
    if (pUser == null || pUser == undefined || pUser == '') {        
        Swal.fire({
            icon:'error',
            title:'Error',
            text:'Usuario es requerido!'
        });
        return false;
    }
    if (pPass == null || pPass == undefined || pPass == '') {        
        Swal.fire({
            icon:'error',
            title:'Error',
            text:'Contraseña es requerida!'
        });
        return false;
    }
    return true;
}
function RedireccionarUsuario(pUsuario) {
    let rol = pUsuario.Rol;
    if (rol == 'Admin') {
        location.href = 'IndexAdmin.html'
    }
    if (rol == 'Client') {
        location.href = 'IndexCliente.html'
    }
}