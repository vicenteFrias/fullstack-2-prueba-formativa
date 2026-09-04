const formLogin = document.getElementById('formLogin');
const inputCorreo = document.getElementById('loginCorreo');
const inputPassword = document.getElementById('loginPassword');
const errorLogin = document.getElementById('errorLogin');
const exitoLogin = document.getElementById('exitoLogin');

formLogin.addEventListener('submit', (evento) => {
    evento.preventDefault();

    errorLogin.classList.add('d-none');
    exitoLogin.classList.add('d-none');
    inputCorreo.classList.remove('is-invalid');
    inputPassword.classList.remove('is-invalid');
    const correo = inputCorreo.value.trim().toLowerCase();
    const password = inputPassword.value;

    if (correo === '' || password === '') {
        errorLogin.textContent = 'Por favor ingresa tanto el correo como la contraseña.';
        errorLogin.classList.remove('d-none');
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuariosGamezone')) || [];
    const usuarioEncontrado = usuarios.find(u => u.correo === correo);

    if (!usuarioEncontrado) {
        errorLogin.textContent = 'El correo electrónico no se encuentra registrado.';
        inputCorreo.classList.add('is-invalid');
        errorLogin.classList.remove('d-none');
    } else if (usuarioEncontrado.password !== password) {
        errorLogin.textContent = 'Contraseña incorrecta. Inténtalo nuevamente.';
        inputPassword.classList.add('is-invalid');
        errorLogin.classList.remove('d-none');
    } else {
        exitoLogin.textContent = `¡Inicio de sesión exitoso! Bienvenido de vuelta, ${usuarioEncontrado.nombre}.`;
        exitoLogin.classList.remove('d-none');
    }
});