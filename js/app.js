// variables para los campos
const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");

// variables para los botones
const btnEnviar = document.querySelector("#enviar");
const formularioEnviar = document.querySelector("#enviar-mail");
const resetBtn = document.querySelector("#resetBtn");

// event Listener se declara para que llame las funciones dentro de la funcion eventListeners
eventListeners();

function eventListeners() {
  // Inicio de la aplicación y deshabilitar submit
  document.addEventListener("DOMContentLoaded", inicioApp);

  // Campos del formulario con blur que es cuando ingrese con el mouse en el campo y lo saque del campo genere una alerta
  // de que no puede estar vacio
  email.addEventListener("blur", validarFormulario);
  asunto.addEventListener("blur", validarFormulario);
  mensaje.addEventListener("blur", validarFormulario);

  // Boton de enviar en el submit
  formularioEnviar.addEventListener("submit", enviarEmail);

  // Boton de reset
  resetBtn.addEventListener("click", resetFormulario);
}

// funciones
function inicioApp() {
  // deshabilitar el coton de envio y se le coloca una clase de cursor.not-allowed para que no se pueda habilitar
  btnEnviar.disabled = true;
  btnEnviar.classList.add("cursor-not-allowed", "opacity-50");
}

// Valida que el campo tengo algo escrito
function validarFormulario(e) {
  if (e.target.value.length > 0) {
     e.target.classList.add("border", "border-green-500");
     e.target.classList.remove("error");
  } else {
    e.target.classList.add("border", "border-red-500");

    mostrarError('Todos los campos son bligatorios');
  }

  // Validar unicamente el email
  if (this.type === "email") {
    validarEmail(this);
  }

  if (email.value !== "" && asunto.value !== "" && mensaje.value !== "") {

      btnEnviar.disabled = false;
      btnEnviar.classList.remove("opacity-50");
      btnEnviar.classList.remove("cursor-not-allowed");

  }


}

// codigo que muestra el mensaje de error validando que los campos no estan vacios
function mostrarError(mensaje) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = mensaje;
  mensajeError.classList.add(
    "border",
    "border-red-500",
    "background-red-100",
    "text-red-500",
    "p-3",
    "mt-5",
    "text-center",
    "error"
  );

  // length sol existe en querySelectorAll no existe en querySelector
  // por lo tanto querySelectorAll no va retornar una coleccion de elementos por tal motivo podemos utilizar length
  const errores = document.querySelectorAll(".error");

  if (errores.length === 0) {
    formularioEnviar.appendChild(mensajeError);
  }
}


// Resetear el formulario
function resetFormulario(e) {
  formularioEnviar.reset();
  e.preventDefault();
}

// Cuando se envia el correo
function enviarEmail(e) {
  e.preventDefault();

  // Spinner al presionar Enviar
  const spinner = document.querySelector("#spinner");
  spinner.style.display = "flex";

  // Ocultar Spinner y mostrar gif de enviado
  setTimeout(() => {
    spinner.style.display = "none";

    // Gif que envia email
    const enviado = document.createElement("p");

    enviado.textContent = "Mensaje Enviado Correctamente";
    enviado.classList.add( 
    "border",
    "border-green-500",
    "background-green-100",
    "text-green-500",
    "p-3",
    "mt-5");

    document.querySelector("#loaders").appendChild(enviado);

    setTimeout(() => {
      enviado.remove();
      formularioEnviar.reset();
    }, 5000);
  }, 3000);
}

function validarEmail(e) {
  const mensaje = e.value;

  // expresion regular para validacion de Emails
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  if (re.test(mensaje)) {
     e.classList.add("border", "border-green-500");
     e.classList.remove("error");
  } else {
     e.classList.add("border", "border-red-500");
     
    e.classList.add("error");
    mostrarError('El Email no es válido')
  }
}
