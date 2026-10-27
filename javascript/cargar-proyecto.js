// javascript/cargar-proyecto.js
document.addEventListener('DOMContentLoaded', function () {
  const contenedor = document.getElementById('contenedor-proyectos');

  proyectos.forEach((p, i) => {
    const dominio = p.url.replace(/^https?:\/\//, '').replace(/\/$/, '');
    const numero = String(i + 1).padStart(2, '0');
    const tipo = p.tipo ? `<span class="proyecto__tipo">${p.tipo}</span>` : '';
    const destacados = (p.destacados || []).map(d => `<li>${d}</li>`).join('');
    const etiquetas = (p.etiquetas || []).map(e => `<span>${e}</span>`).join('');
    const aviso = p.aviso ? `<small class="proyecto__aviso">${p.aviso}</small>` : '';

    const proyecto = document.createElement('article');
    proyecto.className = 'proyecto revelar';
    proyecto.innerHTML = `
      <a class="proyecto__ventana" href="${p.url}" target="_blank" rel="noopener" aria-label="Abrir ${p.titulo}">
        <div class="proyecto__navegador">
          <div class="proyecto__barra"><i></i><i></i><i></i><span>${dominio}</span></div>
          <div class="proyecto__imagen">
            <img src="${p.imagen}" alt="Vista previa de ${p.titulo}" loading="lazy">
          </div>
        </div>
      </a>
      <div class="proyecto__info">
        <div class="proyecto__cabecera">
          <span class="proyecto__numero">${numero}</span>
          ${tipo}
        </div>
        <h3>${p.titulo}</h3>
        <p>${p.descripcion}</p>
        <ul class="proyecto__destacados">${destacados}</ul>
        <div class="proyecto__etiquetas">${etiquetas}</div>
        <a class="boton boton--contorno" href="${p.url}" target="_blank" rel="noopener">
          Visitar sitio
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9" /></svg>
        </a>
        ${aviso}
      </div>
    `;
    contenedor.appendChild(proyecto);
  });
});
