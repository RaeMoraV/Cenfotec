'use strict';

let users = [
    { Nombre: 'Limberth', Apellido1: 'Vasquez', Apellido2: 'Quesada', User: 'lvasquez', Password: '12345!', Rol: 'Admin' },

    { Nombre: 'Jose', Apellido1: 'Mora', Apellido2: '', User: 'amora', Password: '8899!', Rol: 'Client' },

    { Nombre: 'Melissa', Apellido1: 'Otarola', Apellido2: '', User: 'motarola', Password: '1234!', Rol: 'Admin' }
];

function AutenticarUsuario(pUser, pPass) {
    let result = null;

    for (let i = 0; i < users.length; i++) {
        if (users[i].Password == pPass && users[i].User == pUser) {
            result = users[i];
            break;
        }
    }

    if (result != null) {
        SetSesionActiva(result);
    }

    return result;
}