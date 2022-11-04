//referencias al DOM
const cedula = document.querySelector("txtIdentificacion");
const correo = document.querySelector("txtCorreo");
const nombre = document.querySelector("txtNombre");

const btnGuardar = document.querySelector("txt-guardar");

function validarCamposVacios() {
    let campos_requeridos = document.querySelectorAll("#frm-registro [required]");
    let error = false;
    for (let i = 0; i < campos_requeridos.length; i++) {
        if (campos_requeridos [i].value == '') {
            campos_requeridos [i].classList.add ("error");
            error = true;
        } else {
            campos_requeridos [i].classList.remove("error");
        }
    }
    return error
}

//funcion de cedula correcta
function validarCedula () {
    let input_usuario = cedula.value;
    let error = false;
    let expresion = /^[1-9]{1}-[0-9]{4}-[0-9]{4}$/ // /^[a-zA-Z0-9.]+\@*[a-zA-Z0-9]*\@{1}[a-zA-Z]+.com$/
    if (expresion.test (input_usuario) == false) {
        cedula.classList.add ("error");
        error = true;
    } else {
        cedula.classList.remove ("error");
    }
}

function obtenerDatos () {
    let validacionVacios = validarCamposVacios ();
    let validacionCedula = validarCedula ();
    if (validacionVacios) {
        Swal.fire ({
            icon: "warning",
            title: "Campos en blacno",
            text: "Revise los campos de senalados",
        })
    } else {
        Swal.fire ({
            icon: "success",
            title: "Formulario completo",
            text: "Informacion registrada correctamente",
        })
    }
}

btnGuardar.addEventListener ("click", obtenerDatos);
