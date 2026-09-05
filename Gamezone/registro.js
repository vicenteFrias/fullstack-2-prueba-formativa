const formRegistro = document.getElementById('formRegistro');
const inputNombre = document.getElementById('nombre');
const inputCorreo = document.getElementById('correo');
const inputPassword = document.getElementById('password');
const inputConfirmPassword = document.getElementById('confirmPassword');
const inputTelefono = document.getElementById('telefono');

const errorNombre = document.getElementById('errorNombre');
const errorCorreo = document.getElementById('errorCorreo');
const errorPassword = document.getElementById('errorPassword');
const errorConfirmPassword = document.getElementById('errorConfirmPassword');
const errorTelefono = document.getElementById('errorTelefono');
const errorGeneros = document.getElementById('errorGeneros');
const mensajeExito = document.getElementById('mensajeExito');

formRegistro.addEventListener('submit', (evento) => {
    evento.preventDefault(); 

    let esValido = true;
    limpiarErrores();

    const nombre = inputNombre.value.trim();
    const correo = inputCorreo.value.trim().toLowerCase();
    const password = inputPassword.value;
    const confirmPassword = inputConfirmPassword.value;
    const telefono = inputTelefono.value.trim();

    const checkboxes = document.querySelectorAll('.check-genero:checked');
    const generosSeleccionados = [];
    for (let i = 0; i < checkboxes.length; i++) {
        generosSeleccionados.push(checkboxes[i].value);
    }

    const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (nombre === '') {
        errorNombre.textContent = 'El nombre completo es obligatorio.';
        inputNombre.classList.add('is-invalid');
        esValido = false;
    } else if (!regexNombre.test(nombre)) {
        errorNombre.textContent = 'El nombre solo debe contener letras y espacios.';
        inputNombre.classList.add('is-invalid');
        esValido = false;
    } else if (nombre.length > 100) {
        errorNombre.textContent = 'El nombre no puede tener más de 100 caracteres.';
        inputNombre.classList.add('is-invalid');
        esValido = false;
    }

    let textoUsuarios = localStorage.getItem('usuariosGamezone');
    let usuarios = JSON.parse(textoUsuarios);
    if (usuarios == null) {
        usuarios = []; 
    }
    let correoExiste = false;
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].correo === correo) {
            correoExiste = true;
            break;
        }
    }
    const regexCorreo = /^[a-zA-Z0-9._%+-]+@duoc\.cl$/;
    if (correo === '') {
        errorCorreo.textContent = 'El correo electrónico es obligatorio.';
        inputCorreo.classList.add('is-invalid');
        esValido = false;
    } else if (!regexCorreo.test(correo)) {
        errorCorreo.textContent = 'Debe ser un correo válido terminado estrictamente en @duoc.cl.';
        inputCorreo.classList.add('is-invalid');
        esValido = false;
    } else if (correo.length > 60) {
        errorCorreo.textContent = 'El correo no puede tener más de 60 caracteres.';
        inputCorreo.classList.add('is-invalid');
        esValido = false;
    } else if (correoExiste) {
        errorCorreo.textContent = 'Este correo ya se encuentra registrado en el sistema.';
        inputCorreo.classList.add('is-invalid');
        esValido = false;
    }
    const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%&*!_\-.]).{10,}$/;
    if (!regexPass.test(password)) {
        errorPassword.textContent = 'Debe tener al menos 10 caracteres, una mayúscula, una minúscula, un número y un símbolo (@#$%).';
        inputPassword.classList.add('is-invalid');
        esValido = false;
    }
    if (confirmPassword !== password || confirmPassword === '') {
        errorConfirmPassword.textContent = 'Las contraseñas no coinciden.';
        inputConfirmPassword.classList.add('is-invalid');
        esValido = false;
    }
    const regexTelefono = /^[0-9]{8,12}$/;
    if (telefono !== '' && !regexTelefono.test(telefono)) {
        errorTelefono.textContent = 'El teléfono debe contener solo números (entre 8 y 12 dígitos).';
        inputTelefono.classList.add('is-invalid');
        esValido = false;
    }
    if (generosSeleccionados.length === 0) {
        errorGeneros.textContent = 'Debes seleccionar al menos un género favorito.';
        esValido = false;
    }

    if (esValido) {
        const nuevoUsuario = {
            nombre: nombre,
            correo: correo,
            password: password,
            telefono: telefono || 'No ingresado',
            generos: generosSeleccionados
        };

        usuarios.push(nuevoUsuario);
        localStorage.setItem('usuariosGamezone', JSON.stringify(usuarios));

        mensajeExito.textContent = '¡Registro completado con éxito! Redirigiendo al Login...';
        mensajeExito.classList.remove('d-none');

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }
});

function limpiarErrores() {
    const mensajes = [errorNombre, errorCorreo, errorPassword, errorConfirmPassword, errorTelefono, errorGeneros];
    mensajes.forEach(elem => elem.textContent = '');

    const inputs = document.querySelectorAll('.form-control');
    inputs.forEach(input => input.classList.remove('is-invalid'));

    mensajeExito.classList.add('d-none');
}