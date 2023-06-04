
var nombre = document.getElementById('nombres');
var correo = document.getElementById('correo');
var telefono = document.getElementById('telefono');
var mensaje = document.getElementById('mensaje');



function enviarFormulario() {
    console.log("Enviando Formulario...");
    if(nombre.value == null || nombre.value === ''){
        swal("error", "Falta ingresar Nombre", "Ok");
    } else if(correo.value == null || correo.value === ''){
        swal("error", "Falta ingresar tu Correo", "Ok");
    } else if(telefono.value == null || telefono.value === ''){
        swal("error", "Falta ingresar tu Telefono", "Ok");
    } else if(mensaje.value == null || mensaje.value === ''){
        swal("error", "Falta ingresar tu mensaje", "Ok");
    } else {
        swal("Gracias", "Tu Mensaje fue recibido", "Ok");
        nombre.value = '';
        correo.value = '';
        telefono.value = '';
        mensaje.value = '';
        $('#demo').removeClass('show');
        return false;
    }
    
}

var inputs = document.getElementsByClassName('formulario__input');

for (var i=0;i < inputs.length; i++){
    inputs[i].addEventListener('keyup', function() {
        if(this.value.length>=1) {
            this.nextElementSibling.classList.add('fijar')
        } else {
            this.nextElementSibling.classList.remove('fijar')
        }
    });
}


