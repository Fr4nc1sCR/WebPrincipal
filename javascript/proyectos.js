// javascript/proyectos.js
// Para agregar un proyecto, copia uno de los objetos y cambia sus datos.
// "tipo" y "aviso" son opcionales.
const proyectos = [
  {
    titulo: "EasySpot AI",
    tipo: "Proyecto universitario",
    url: "https://easyspot.onrender.com/",
    imagen: "img/easyspot-preview.jpg",
    descripcion: "Plataforma de parqueo inteligente que conecta a conductores con espacios disponibles. Recomienda el mejor parqueo según zona, hora y demanda, permite reservar antes de llegar y se alimenta de reportes de la comunidad.",
    destacados: [
      "Reservas validadas: fechas, horarios, cupo disponible y reservas duplicadas",
      "Puntaje de disponibilidad para recomendar la mejor opción",
      "Reportes comunitarios sobre el estado de cada parqueo",
      "Registro, inicio de sesión y gestión de reservas por usuario"
    ],
    etiquetas: ["Java", "Spring Boot", "Bootstrap 5", "SweetAlert2", "Render"],
    aviso: "Alojado en Render: la primera carga puede tardar unos segundos."
  },
  {
    titulo: "PetHome",
    tipo: "Proyecto universitario",
    url: "https://pethome-proyecto-de-desarrollo-de.onrender.com/",
    imagen: "img/pethome-preview.jpg",
    descripcion: "Plataforma para dar una segunda oportunidad a mascotas rescatadas. Reúne rescates, adopciones y donaciones en un solo lugar, con cuentas de usuario y una interfaz disponible en cinco idiomas.",
    destacados: [
      "Autenticación segura con Spring Security y protección CSRF",
      "Interfaz multilenguaje: español, inglés, francés, italiano y alemán",
      "Registro de usuarios y recuperación de contraseña",
      "Alertas personalizadas con la identidad visual del proyecto"
    ],
    etiquetas: ["Java", "Spring Boot", "Spring Security", "Thymeleaf", "Bootstrap 5"],
    aviso: "Alojado en Render: la primera carga puede tardar unos segundos."
  },
  {
    titulo: "Entre Líneas",
    tipo: "Proyecto universitario",
    url: "https://entrelineaslib.netlify.app/",
    imagen: "img/entrelineas-preview.jpg",
    descripcion: "Librería virtual con catálogo dinámico, ficha detallada de cada libro (autor, editorial, ISBN, precio y stock) y carrito de compras guardado por usuario en una base de datos en la nube.",
    destacados: [
      "Registro con confirmación por correo y recuperación de contraseña",
      "Catálogo y carrito conectados a una base de datos PostgreSQL en Supabase",
      "Contador del carrito que se actualiza al agregar libros",
      "Modo oscuro que se recuerda entre visitas"
    ],
    etiquetas: ["HTML", "CSS", "JavaScript", "Supabase", "Netlify"]
  },
  {
    titulo: "Side Street",
    url: "https://sidestreet.netlify.app",
    imagen: "img/sidestreet-preview.jpg",
    descripcion: "Sitio para un local de pizza urbana, con diseño moderno y un enfoque visual minimalista que pone la comida al centro.",
    destacados: [
      "Diseño responsive para celular, tablet y escritorio",
      "Identidad visual propia: tipografía, colores y fotografía"
    ],
    etiquetas: ["HTML", "CSS", "JavaScript", "Netlify"]
  }
];
