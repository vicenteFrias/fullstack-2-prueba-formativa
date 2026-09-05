# GameZone - Sistema de Registro y Login

Proyecto desarrollado para la Evaluación Formativa 1 de la asignatura FullStack II.

## Descripción del proyecto

Implementación de registro e inicio de sesión para la tienda web GameZone. El diseño está adaptado para funcionar de forma correcta tanto en dispositivos móviles como en computadores, resolviendo problemas de usabilidad mediante validaciones en tiempo real.

## Tecnologías utilizadas

* HTML5
* CSS3
* Bootstrap (vía CDN)
* JavaScript 
* LocalStorage para persistencia de datos

## Validaciones implementadas en el registro

* **Nombre Completo:** Obligatorio, solo caracteres alfabéticos y espacios, con un límite de 100 caracteres.
* **Correo Electrónico:** Formato estándar válido, dominio restringido exclusivamente a `@duoc.cl`, máximo 60 caracteres y validación de unicidad en el sistema.
* **Contraseña:** Mínimo 10 caracteres, requiriendo al menos una letra mayúscula, una minúscula, un número y un símbolo especial (`@#$%&*!_-.`).
* **Confirmar Contraseña:** Debe coincidir exactamente con el campo de contraseña.
* **Teléfono:** Campo opcional; si se completa, solo admite formato numérico de 8 a 12 dígitos.
* **Géneros favoritos:** Selección obligatoria de al menos una opción del listado.

## Funcionamiento del Login

* Valida las credenciales contra los registros almacenados.
* Muestra mensajes de error diferenciados si el correo no está registrado o si la contraseña ingresada no corresponde.
* Despliega mensaje de bienvenida al autenticar correctamente.

## Estructura del repositorio

```text
├── index.html          # Vista de Login
├── registro.html       # Vista de Formulario de Registro
│── estilo.css      # Estilos personalizados complementarios
├── registro.js     # Validaciones y guardado de usuarios
└── login.js        # Lógica de inicio de sesión
