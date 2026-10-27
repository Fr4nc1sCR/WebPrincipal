// javascript/contacto.js
// Envía el formulario de contacto con EmailJS y muestra el resultado con SweetAlert2.

const EMAILJS_PUBLIC_KEY = "iE4aiTRMjM_MEMtB0";
const EMAILJS_SERVICIO = "service_webprincipal";
const EMAILJS_PLANTILLA = "template_n0dgett";

// Estilo común para todas las alertas, a juego con la página
const estiloAlerta = {
  buttonsStyling: false,
  customClass: {
    popup: 'alerta',
    confirmButton: 'boton boton--primario'
  }
};

function mostrarAlerta(opciones) {
  if (typeof Swal !== 'undefined') {
    return Swal.fire({ ...estiloAlerta, ...opciones });
  }
  // Respaldo por si SweetAlert2 no cargó
  alert(`${opciones.titleText}\n\n${opciones.text}`);
}

document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.getElementById('contactForm');
  const boton = formulario.querySelector('.formulario__enviar');
  const textoBoton = boton.querySelector('.formulario__texto');
  const campos = formulario.querySelectorAll('.campo input, .campo textarea');

  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  // Quita el estado de error cuando la persona corrige el campo
  campos.forEach(campo => {
    campo.addEventListener('input', () => {
      if (campo.checkValidity()) campo.parentElement.classList.remove('invalido');
    });
  });

  function validar() {
    let primeroInvalido = null;
    campos.forEach(campo => {
      const valido = campo.value.trim() !== '' && campo.checkValidity();
      campo.parentElement.classList.toggle('invalido', !valido);
      if (!valido && !primeroInvalido) primeroInvalido = campo;
    });

    if (primeroInvalido) {
      primeroInvalido.focus();
      return false;
    }
    return true;
  }

  function estadoEnviando(activo) {
    boton.classList.toggle('enviando', activo);
    boton.disabled = activo;
    textoBoton.textContent = activo ? 'Enviando...' : 'Enviar mensaje';
  }

  formulario.addEventListener('submit', e => {
    e.preventDefault();

    if (!validar()) {
      mostrarAlerta({
        icon: 'warning',
        iconColor: '#ffc107',
        titleText: 'Faltan algunos datos',
        text: 'Revisa los campos marcados en rojo. El correo debe tener un formato válido.',
        confirmButtonText: 'Entendido'
      });
      return;
    }

    if (typeof emailjs === 'undefined') {
      mostrarAlerta({
        icon: 'error',
        iconColor: '#e5484d',
        titleText: 'No se pudo enviar',
        text: 'El servicio de correo no está disponible en este momento. Inténtalo más tarde.',
        confirmButtonText: 'Cerrar'
      });
      return;
    }

    const datos = new FormData(formulario);
    const nombre = datos.get('nombre').trim();
    const servicio = datos.get('servicio');

    // Se envían los mismos campos que espera la plantilla de EmailJS.
    // El servicio elegido va al inicio del mensaje para no tener que cambiar la plantilla.
    const parametros = {
      nombre,
      telefono: datos.get('telefono').trim(),
      correo: datos.get('correo').trim(),
      servicio,
      mensaje: `Servicio de interés: ${servicio}\n\n${datos.get('mensaje').trim()}`
    };

    estadoEnviando(true);

    emailjs.send(EMAILJS_SERVICIO, EMAILJS_PLANTILLA, parametros)
      .then(() => {
        mostrarAlerta({
          icon: 'success',
          iconColor: '#0097a7',
          titleText: `¡Gracias, ${nombre.split(' ')[0]}!`,
          text: 'Tu mensaje llegó correctamente. Te responderé lo antes posible.',
          confirmButtonText: 'Perfecto'
        });
        formulario.reset();
      })
      .catch(error => {
        console.error(error);
        mostrarAlerta({
          icon: 'error',
          iconColor: '#e5484d',
          titleText: 'Algo salió mal',
          text: 'Ocurrió un problema al enviar el mensaje. Por favor, inténtalo de nuevo en unos minutos.',
          confirmButtonText: 'Cerrar'
        });
      })
      .finally(() => estadoEnviando(false));
  });
});
