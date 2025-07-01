// Inicializa EmailJS con tu public key
emailjs.init("iE4aiTRMjM_MEMtB0"); // Reemplaza con tu clave pública

// Captura el formulario
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Previene el envío por defecto

    emailjs.sendForm("service_webprincipal", "template_n0dgett", this)
        .then(() => {
            Swal.fire({
                icon: 'success',
                title: '¡Mensaje enviado!',
                text: 'Gracias por contactarme, te responderé pronto.',
                confirmButtonColor: '#007bff',
                customClass: {
                    popup: 'swal-wide',
                    title: 'swal-title-big',
                    htmlContainer: 'swal-text-big'
                }
            });
            this.reset(); // Limpia el formulario
        }, (error) => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un problema al enviar el mensaje. Inténtalo más tarde.',
                confirmButtonColor: '#dc3545',
                customClass: {
                    popup: 'swal-wide',
                    title: 'swal-title-big',
                    htmlContainer: 'swal-text-big'
                }
            });
            console.error(error);
        });
});
