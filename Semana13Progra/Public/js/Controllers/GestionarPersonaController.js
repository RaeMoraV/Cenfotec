'use strict';

let botonRegistrar = document.getElementById('btnRegistrar');
let inputTipoIdentificacion = document.getElementById('txttipoIdentificacion');
let inputIdentificacion = document.getElementById('txtidentificacion');
let inputNombre= document.getElementById('txtnombre');
let inputApellido1= document.getElementById('txtapellido1');
let inputApellido2 = document.getElementById('txtapellido2');
let inputsSexo = document.getElementsByName('rbtSexo');
let inputEmail= document.getElementById('txtEmail');
let inputPassword1= document.getElementById('txtPass');
let inputPassword2= document.getElementById('txtPass2');
let inputNacimiento= document.getElementById('txtnacimiento');
let inputEdad= document.getElementById('txtedad');
let inputRol= document.getElementById('txtRol');
let inputEstado= document.getElementById('txtestado');
let input_id= document.getElementById('txt_id');
let inputImgUser = document.getElementById('imgUser');

botonRegistrar.addEventListener('click', RegistrarDatos);

let queryString, urlParams, _id;
IdentificarAccion();

async function IdentificarAccion(){
    queryString = window.location.search;

    urlParams = new URLSearchParams(queryString);
    _id = urlParams.get('_id');

    if (_id != null && _id != undefined && _id == 'crear') {
        CargarDatos(null,'btnCrea');
    }else{
        let params = {'_id': _id};
        let result = await ProcessGet('BuscarPersonaPorId', params);
        
        if (result != null && result.resultado == true) {
            CargarDatos(result.PersonaDB,'btnActualiza');            
        }else{
            ImprimirMsjError(result.msj);
        }
    }
}

function CargarDatos(pPersona, pBtn){
    if (pBtn == 'btnCrea') {
        document.getElementById('ttlInicio').innerHTML = 'Registrar Persona';
        document.getElementById('btnRegistrar').value = 'Registrar';
    } else {
        document.getElementById('ttlInicio').innerHTML = 'Actualizar Persona';
        document.getElementById('btnRegistrar').value = 'Actualizar';
        let nacimientoPersona  = pPersona.Nacimiento;
        if(nacimientoPersona != null && nacimientoPersona != undefined){

            var [date, time] = formatDate(new Date(nacimientoPersona.replace('Z',''))).split(' '); 

            inputNacimiento.value = date;
        }
        let inputIntereses = document.querySelectorAll('#intereses input[type=checkbox]');
        for (let i = 0; i < inputIntereses.length; i++) { 
            for (let j = 0; j < pPersona.InteresesPersonales.length; j++) {
                if(pPersona.InteresesPersonales[j].Intereses == inputIntereses[i].value){
                    inputIntereses[i].checked = true;                   
                }                  
            }                     
        }
        
        for (let i = 0; i < inputsSexo.length; i++) {
            if(pPersona.Sexo == inputsSexo[i].value){
                inputsSexo[i].checked = true;
                break;
            }            
        }

        inputTipoIdentificacion.value = pPersona.TipoIdentificacion;
        inputIdentificacion.value = pPersona.Identificacion;
        inputNombre.value = pPersona.Nombre;
        inputApellido1.value = pPersona.Apellido1;
        inputApellido2.value = pPersona.Apellido2;

        inputEmail.value = pPersona.Email;
        inputPassword1.value = pPersona.Password;
        inputPassword2.value = pPersona.Password;
        inputEdad.value = pPersona.Edad;
        inputRol.value = pPersona.Rol;
        inputEstado.value = pPersona.Estado;
        input_id.value = pPersona._id;
        inputImgUser.src = pPersona.FotoPerfil;
    }
}
async function RegistrarDatos(){
    let sTipoIdentificacion = inputTipoIdentificacion.value;
    let sIdentificacion = inputIdentificacion.value;
    let sNombre = inputNombre.value;
    let sApellido1 = inputApellido1.value;
    let sApellido2 = inputApellido2.value;
    let sexo = null;
    for(let i = 0; i< inputsSexo.length; i++){
        if(inputsSexo[i].checked == true){
            sexo = inputsSexo[i].value;
            break;
        }
    }
    let sEmail = inputEmail.value;
    let sPass = inputPassword1.value;
    let sPassConfirmacion = inputPassword2.value;
    let dNacimiento = inputNacimiento.value;
    let sEdad = inputEdad.value;
    let nRol = Number(inputRol.value);
    let nEstado = Number(inputEstado.value);
    let sFotoPerfil = inputImgUser.src;

    //aca manejamos los subdocumentos de los intereses.

    let s_id = input_id.value;

    if (ValidarDatos(sTipoIdentificacion, sIdentificacion, sNombre, sApellido1, sApellido2, sexo, sEmail, sPass, sPassConfirmacion, dNacimiento, sEdad, nRol, nEstado, sFotoPerfil) == false) {
        return;
    }

    let result = null;

    let data = {
        '_id': s_id,
        'TipoIdentificacion': sTipoIdentificacion,
        'Identificacion': sIdentificacion,
        'Nombre': sNombre,
        'Apellido1': sApellido1,
        'Apellido2': sApellido2,
        'Sexo': sexo,
        'Nacimiento': dNacimiento,
        'Edad': sEdad,
        'Estado': nEstado,
        'Email': sEmail,
        'Password': sPass,
        'Rol': nRol,
        'FotoPerfil': sFotoPerfil,
    };

    if (s_id != null && s_id != '' && s_id != undefined) {
        result = await ProcessPut('ModificarPersona', data, null);
    } else {
        result = await ProcessPost('RegistrarPersona', data, null);
    }

    if (result == null || result == undefined) {
        ImprimirMsjError('Ocurrio un error, intente de nuevo');
    } else if (result.resultado == false) {
        ImprimirMsjError(result.msj);
        console.log(result);
    }else{
        swal.fire({
            title: 'Excelente!',
            text: result.msj,
            icon: 'success',
            confirmButtonText: 'Ok'
        }).then(res => {
            location.href = 'AdminPersonas.html';
        });
    }
}


function ValidarDatos(pTipoIdentificacion, pIdentificacion, pNombre, pApellido1, pApellido2, psexo, pEmail, pPass, pPassConfirmacion, pNacimiento, pEdad, pRol, pEstado, pFotoPerfil) {
    if (pTipoIdentificacion == '' || pTipoIdentificacion == null || pTipoIdentificacion == undefined) {
        resaltarLabelInvalido('lbltipoIdentificacion');
        resaltarInputInvalido('txttipoIdentificacion');
        ImprimirMsjError('Por favor seleccione tipo de identificacion');
        return false;
    }
    if (pIdentificacion == '' || pIdentificacion == null || pIdentificacion == undefined) {
        resaltarLabelInvalido('lblidentificacion');
        resaltarInputInvalido('txtidentificacion');
        ImprimirMsjError('Por favor ingrese su identificacion');
        return false;
    }
    if (pNombre == '' || pNombre == null || pNombre == undefined) {
        resaltarLabelInvalido('lblnombre');
        resaltarInputInvalido('txtnombre');
        ImprimirMsjError('Por favor ingrese su Nombre');
        return false;
    }
    if (pApellido1 == '' || pApellido1 == null || pApellido1 == undefined) {
        resaltarLabelInvalido('lblapellido1');
        resaltarInputInvalido('txtapellido1');
        ImprimirMsjError('Por favor ingrese su Primer Apellido');
        return false;
    }
    if (psexo == '' || psexo == null || psexo == undefined) {
        resaltarLabelInvalido('lblSexo');
        resaltarInputInvalido('txtsexo');
        ImprimirMsjError('Por favor indique su Sexo');
        return false;
    }
    if (pEmail == null || pEmail == '' || pEmail == undefined) {
        resaltarLabelInvalido('lblEmail');
        resaltarInputInvalido('txtEmail');
        ImprimirMsjError('Por favor ingrese su Correo');
        return false;
    }
    if (pPass == null || pPass == '' || pPass == undefined) {
        resaltarLabelInvalido('lblPass');
        resaltarInputInvalido('txtPass');
        ImprimirMsjError('Por favor ingrese su Contraseña');
        return false;
    }
    if (pPassConfirmacion == null || pPassConfirmacion == '' || pPassConfirmacion == undefined) {
        resaltarLabelInvalido('lblPass2');
        resaltarInputInvalido('txtPass2');
        ImprimirMsjError('Por favor ingrese su Confrimacion de Contraseña');
        return false;
    }
    if (pPass != pPassConfirmacion) {
        resaltarLabelInvalido('lblPass');
        resaltarInputInvalido('txtPass');
        resaltarLabelInvalido('lblPass2');
        resaltarInputInvalido('txtPass2');
        ImprimirMsjError('Por favor ingrese ambas Contraseñas iguales');
        return false;
    }
    if (pNacimiento == '' || pNacimiento == null || pNacimiento == undefined || new Date(pNacimiento) >= new Date()) {
        resaltarLabelInvalido('lblnacimiento');
        resaltarInputInvalido('txtnacimiento');
        ImprimirMsjError('Por favor ingrese una fecha de nacimiento menor a hoy');
        return false;
    }
    if (pEdad == null || pEdad == undefined) {
        ImprimirMsjError('Estimado usuario  la edad es requerido');
        resaltarLabelInvalido('lbledad');
        resaltarInputInvalido('txtedad');
        inputEdad.value = 0;
        return false;
    } else if (pEdad <= 0 || pEdad > 120) {
        ImprimirMsjError('Por favor indique una edad valida entre 1 y 120 años');
        resaltarLabelInvalido('lbledad');
        resaltarInputInvalido('txtedad');
        inputEdad.value = 0;
        return false;
    }
    if (pRol == null || pRol == '' || pRol == undefined || pRol == 0) {
        resaltarLabelInvalido('lblRol');
        resaltarInputInvalido('txtRol');
        ImprimirMsjError('Por favor indique un Rol');
        return false;
    }
    return true;
}