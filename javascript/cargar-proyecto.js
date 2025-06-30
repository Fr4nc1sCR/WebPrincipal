// javascript/cargar-proyectos.js
document.addEventListener('DOMContentLoaded', function () {
  const contenedor = document.getElementById('contenedor-proyectos');

  proyectos.forEach(p => {
    const card = document.createElement('div');
    card.className = 'proyecto-card'; // Usá esta clase para darle estilo con CSS
    card.innerHTML = `
      <a href="${p.url}" target="_blank">
        <img src="${p.imagen}" alt="${p.titulo}" class="proyecto-imagen">
        <h3>${p.titulo}</h3>
        <p>${p.descripcion}</p>
      </a>
    `;
    contenedor.appendChild(card);
  });
});
