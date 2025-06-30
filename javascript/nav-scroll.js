let lastScrollY = window.scrollY;
let isScrolling;
const header = document.querySelector('.encabezado');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Siempre mostrar si estás arriba del todo
    if (currentScrollY === 0) {
        mostrarEncabezado();
    } else if (currentScrollY > lastScrollY) {
        // Scroll hacia abajo → ocultar encabezado
        ocultarEncabezado();
    } else if (currentScrollY < lastScrollY) {
        // Scroll hacia arriba → mostrar encabezado
        mostrarEncabezado();
    }

    // Al dejar de hacer scroll, volver a mostrar encabezado
    clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
        if (window.scrollY > 0) {
            header.classList.remove('oculto');
            header.classList.add('visible');
        }
    }, 300);

    lastScrollY = currentScrollY;
});