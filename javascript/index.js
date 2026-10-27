// javascript/index.js
// Interacciones del index: menú móvil, encabezado, progreso, enlace activo, animaciones y efectos de luz.
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  const encabezado = document.getElementById('encabezado');
  const progreso = document.getElementById('progreso');
  const toggleBtn = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- Menú móvil ----------
  function cerrarMenu() {
    navMenu.classList.remove('abierta');
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.setAttribute('aria-label', 'Abrir menú');
  }

  toggleBtn.addEventListener('click', () => {
    const abierto = navMenu.classList.toggle('abierta');
    toggleBtn.setAttribute('aria-expanded', abierto);
    toggleBtn.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
  });

  navMenu.querySelectorAll('a').forEach(enlace => enlace.addEventListener('click', cerrarMenu));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') cerrarMenu();
  });

  // Cierra el menú al tocar fuera de él
  document.addEventListener('click', e => {
    if (navMenu.classList.contains('abierta') && !navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
      cerrarMenu();
    }
  });

  // ---------- Encabezado y barra de progreso ----------
  function alHacerScroll() {
    encabezado.classList.toggle('con-fondo', window.scrollY > 20);

    const total = document.documentElement.scrollHeight - window.innerHeight;
    progreso.style.setProperty('--avance', total > 0 ? window.scrollY / total : 0);
  }
  alHacerScroll();
  window.addEventListener('scroll', alHacerScroll, { passive: true });

  // ---------- Enlace activo según la sección visible ----------
  const enlaces = [...navMenu.querySelectorAll('a[href^="#"]:not(.boton)')];
  const secciones = enlaces.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

  if ('IntersectionObserver' in window) {
    const observadorSecciones = new IntersectionObserver(entradas => {
      entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
          enlaces.forEach(a => a.classList.toggle('activo', a.getAttribute('href') === `#${entrada.target.id}`));
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    secciones.forEach(s => observadorSecciones.observe(s));
  }

  // ---------- Animación al aparecer ----------
  // Los elementos de un mismo grupo entran escalonados
  const elementos = document.querySelectorAll('.revelar');
  elementos.forEach(el => {
    const hermanos = [...el.parentElement.children].filter(h => h.classList.contains('revelar'));
    el.style.setProperty('--retraso', `${hermanos.indexOf(el) * 0.09}s`);
  });

  function mostrar(el) {
    el.classList.add('visible');
    // Al terminar la entrada, el elemento recupera sus transiciones normales de hover
    setTimeout(() => el.classList.add('listo'), 1200);
    el.querySelectorAll('[data-contar]').forEach(contar);
  }

  if ('IntersectionObserver' in window) {
    const observador = new IntersectionObserver(entradas => {
      entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
          mostrar(entrada.target);
          observador.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    elementos.forEach(el => observador.observe(el));
  } else {
    elementos.forEach(mostrar);
  }

  // ---------- Contador animado para las cifras ----------
  function contar(el) {
    const objetivo = parseFloat(el.dataset.contar);
    const decimales = parseInt(el.dataset.decimales || '0', 10);
    if (sinMovimiento) return;

    const duracion = 1400;
    const inicio = performance.now();

    function paso(ahora) {
      const t = Math.min((ahora - inicio) / duracion, 1);
      const suavizado = 1 - Math.pow(1 - t, 3);
      el.textContent = (objetivo * suavizado).toFixed(decimales);
      if (t < 1) requestAnimationFrame(paso);
    }
    requestAnimationFrame(paso);
  }

  // ---------- Efectos de luz que siguen al mouse ----------
  if (window.matchMedia('(hover: hover)').matches && !sinMovimiento) {
    const hero = document.querySelector('.hero');
    const foco = document.querySelector('.hero__foco');

    hero.addEventListener('pointermove', e => {
      const r = hero.getBoundingClientRect();
      foco.style.setProperty('--mx', `${e.clientX - r.left}px`);
      foco.style.setProperty('--my', `${e.clientY - r.top}px`);
    });

    document.querySelectorAll('.brillo').forEach(tarjeta => {
      tarjeta.addEventListener('pointermove', e => {
        const r = tarjeta.getBoundingClientRect();
        tarjeta.style.setProperty('--mx', `${e.clientX - r.left}px`);
        tarjeta.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    });
  }

  // ---------- Año actual en el pie de página ----------
  document.getElementById('anio').textContent = new Date().getFullYear();
});
