'use strict';

let listaPersonas = [];

/*para filtrar*/
const inputFiltro = document.getElementById('txtFiltro');
inputFiltro.addEventListener('keyup', ImprimirPersonas);

GetListaPersonas();

async function GetListaPersonas() {
    let result = await ProcessGet('ListarPersonas', null);
    if (result != null && result.resultado == true) {
        listaPersonas = result.ListaPersonasDB;
        await ImprimirPersonas();
        console.log(listaPersonas);
    } else {
        ImprimirMsjError(result.msj);
        return;
    }
}

async function ImprimirPersonas() {
    let tbody = document.getElementById('tbdPersonas');
    tbody.innerHTML = '';

    let filtro = inputFiltro.value;

    for (let i = 0; i < listaPersonas.length; i++) {

        if (listaPersonas[i].Nombre.toLowerCase().includes(filtro) ||
            listaPersonas[i].Apellido1.toLowerCase().includes(filtro) ||
            ObtenerEstado(listaPersonas[i].Estado).includes(filtro) ||
            listaPersonas[i].Edad.toString().includes(filtro)
        ) {
            let fila = tbody.insertRow();
            let celdaTipoIdentificacion = fila.insertCell();
            let celdaIdentificacion = fila.insertCell();
            let celdaNombreCompleto = fila.insertCell();
            let celdaEmail = fila.insertCell();
            let celdaSexo = fila.insertCell();
            let celdaNacimiento = fila.insertCell();
            let celdaEdad = fila.insertCell();
            let celdaEstado = fila.insertCell();
            let celdaRol = fila.insertCell();
            let celdaAcciones = fila.insertCell();

            celdaTipoIdentificacion.innerHTML = ObtenerTipoIdentificacion(listaPersonas[i].TipoIdentificacion);
            celdaIdentificacion.innerHTML = listaPersonas[i].Identificacion;
            celdaNombreCompleto.innerHTML = listaPersonas[i].Nombre + ' ' + listaPersonas[i].Apellido1 + ' ' + listaPersonas[i].Apellido2;
            celdaEmail.innerHTML = listaPersonas[i].Email;
            celdaEdad.innerHTML = listaPersonas[i].Edad;
            celdaEstado.innerHTML = ObtenerEstado(listaPersonas[i].Estado);
            celdaRol.innerHTML = ObtenerRol(listaPersonas[i].Rol);
            celdaSexo.innerHTML = listaPersonas[i].Sexo;

            let fechaNac = new Date(listaPersonas[i].Nacimiento.replace('Z', ''));
            celdaNacimiento.innerHTML = fechaNac.getDate() + '/' + (fechaNac.getMonth() + 1) + '/' + fechaNac.getFullYear();

            let btnEdit = document.createElement('button');
            btnEdit.type = 'button';
            btnEdit.innerText = '✎';
            btnEdit.title = 'EDITAR';
            btnEdit.classList.add('btnsTabla');
            btnEdit.onclick = function () {
                location.href = 'GestionarPersona.html?_id=' + listaPersonas[i]._id;
            };


            let btnDelete = document.createElement('button');
            btnDelete.type = 'button';
            btnDelete.innerText = '🗑️';
            btnDelete.title = 'ELIMINAR';
            btnDelete.classList.add('btnsTabla');
            btnDelete.onclick = async function () {
                let confirmacion = false;
                await Swal.fire({
                    title: 'Eliminación de registro',
                    text:'Desea eliminar el registro de ' + listaPersonas[i].Nombre + ' ' + listaPersonas[i].Apellido1 + ' ' + listaPersonas[i].Apellido2 + ' identificación: ' + listaPersonas[i].Identificacion + '?',
                    icon: 'warning',
                    showDenyButton: true,
                    denyButtonText: 'Cancelar',
                    confirmButtonText: 'Confirmar'
                }).then((res) => {
                    confirmacion = res.isConfirmed;
                });

                if (confirmacion == true) {
                    let data = {
                        '_id': listaPersonas[i]._id
                    };
                    let result = await ProcessDelete('EliminarPersona', data);
                    if (result.resultado == true) {
                        ImprimirMsjSuccess(result.msj);
                    } else {
                        ImprimirMsjError(result.msj);
                    }
                    await GetListaPersonas();
                }
            };


            let btnInactivar = document.createElement('button');
            btnInactivar.type = 'button';
            btnInactivar.innerText = '💓off';
            btnInactivar.title = 'INACTIVAR';
            btnInactivar.classList.add('btnsTabla');
            btnInactivar.onclick = async function () {
                let confirmacion = false;
                await Swal.fire({
                    title:'Confirmar inactivar',
                    text: 'Desea inactivar el registro de '  + listaPersonas[i].Nombre + ' ' + listaPersonas[i].Apellido1 + ' ' + listaPersonas[i].Apellido2 + ' identificación: ' + listaPersonas[i].Identificacion + '?',
                    icon: 'warning',
                    showDenyButton: true,
                    denyButtonText: 'Cancelar',
                    confirmButtonText: 'Confirmar'
                }).then((res) => {
                    confirmacion = res.isConfirmed;
                });

                if (confirmacion == true) {
                    let data = {
                        '_id' : listaPersonas[i]._id
                    };
                    let result =  await ProcessPut('DesactivarPersona', data, null);
                    if (result.resultado == true) {
                        ImprimirMsjSuccess(result.msj);
                    } else {
                        ImprimirMsjError(result.msj);
                    }
                    
                    await GetListaPersonas();
                }
            };

            let div = document.createElement('div');
            div.appendChild(btnEdit);
            div.appendChild(btnDelete);
            div.appendChild(btnInactivar);

            celdaAcciones.appendChild(div);
        }

    }
}