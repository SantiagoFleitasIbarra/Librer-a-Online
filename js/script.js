document.addEventListener('DOMContentLoaded', () => {
  // Función para mostrar la sección correspondiente y ocultar las demás
  function showSection(sectionId) {
    const sections = document.querySelectorAll('main section');
    sections.forEach(section => section.classList.remove('active'));

    const sectionToShow = document.getElementById(sectionId);
    if (sectionToShow) {
      sectionToShow.classList.add('active');
    }
  }

  // Event listeners para el menú lateral
  const navLinks = document.querySelectorAll('aside nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const sectionId = link.dataset.section;
      showSection(sectionId);

      // Close the sidebar if it's open (hamburger menu)
      if (window.innerWidth <= 768) {
        document.querySelector('.sidebar').classList.remove('open');
      }
    });
  });

  // Mostrar la sección de información por defecto
  showSection('info');

  // *** Lógica para Catálogo (simulación) ***
  const catalogoSection = document.getElementById('catalogo');
  const bookGrid = catalogoSection.querySelector('.book-grid');

  const libros = [
    { titulo: "Teoría de los sentimientos", autor: "Agnes Heller", portada: "images/agnes-teorc3ada-de-los-sentimientos-1.jpg", pdf: "pdf/agnes-teorc3ada-de-los-sentimientos.pdf" },
    { titulo: "Antígona González", autor: "Sara Uribe", portada: "images/antigona-gonzalez-1.jpg", pdf: "pdf/antigona-gonzalez.pdf" },
    { titulo: "Antología Poética", autor: "Mario Benedetti", portada: "images/antologc3ada-poc3a9tica-de-benedetti.jpg", pdf: "pdf/benedetti-mario-antologia-poetica.pdf" },
    { titulo: "El hombre que fue jueves", autor: "G. K. Chesterton", portada: "images/el-hombre-que-fue-jueves.gif", pdf: "pdf/el-hombre-que-fue-jueves-chesterton.pdf" },
    { titulo: "Poesía Completa", autor: "Friedrich Hölderlin", portada: "images/holderlin.jpg", pdf: "pdf/holderlin-friedrich-poesia-completa-edicion-bilingue.pdf" }
  ];

  libros.forEach(libro => {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book');

    bookDiv.innerHTML = `
          <img src="${libro.portada}" alt="${libro.titulo}">
          <h3>${libro.titulo}</h3>
          <p>${libro.autor}</p>
          <a href="${libro.pdf}" class="download-button">Descargar PDF</a>
        `;

    bookGrid.appendChild(bookDiv);
  });

  // *** Lógica para Publicaciones (simulación, requiere backend real para almacenamiento) ***
  const uploadForm = document.getElementById('upload-form');
  const publicacionesGrid = document.getElementById('publicaciones-grid');

  // Función para cargar publicaciones desde localStorage
  function loadPublicaciones() {
    const publicaciones = JSON.parse(localStorage.getItem('publicaciones') || '[]');
    publicaciones.forEach(publicacion => {
      addPublicacionToGrid(publicacion);
    });
  }

  // Función para añadir una publicación al grid
  function addPublicacionToGrid(publicacion) {
    const publicacionDiv = document.createElement('div');
    publicacionDiv.classList.add('book'); 

    publicacionDiv.innerHTML = `
          <img src="${publicacion.portada}" alt="${publicacion.titulo}">
          <h3>${publicacion.titulo}</h3>
          <p>${publicacion.autor}</p>
          <p>¡Gracias por tu contribución!</p>
        `;

    publicacionesGrid.appendChild(publicacionDiv);
  }

  uploadForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const titulo = uploadForm.titulo.value;
    const autor = uploadForm.autor.value;
    const portadaFile = uploadForm.portada.files[0];
    const pdfFile = uploadForm.pdf.files[0];

    console.log("Simulando subida:", { titulo, autor, portadaFile, pdfFile });

    const reader = new FileReader();
    reader.onload = function (e) {
      const portadaDataURL = e.target.result;

      const nuevaPublicacion = {
        titulo: titulo,
        autor: autor,
        portada: portadaDataURL
      };

      let publicaciones = JSON.parse(localStorage.getItem('publicaciones') || '[]');
      publicaciones.push(nuevaPublicacion);
      localStorage.setItem('publicaciones', JSON.stringify(publicaciones));

      addPublicacionToGrid(nuevaPublicacion);
    }
    reader.readAsDataURL(portadaFile); 

    uploadForm.reset();
  });

  loadPublicaciones();

  // *** Lógica para el carrusel ***
  const carouselContainer = document.querySelector('.carousel-container');

  function hideCarouselOnMobile() {
    if (window.innerWidth <= 768) {
      carouselContainer.style.display = 'none';
    } else {
      carouselContainer.style.display = 'block';
    }
  }

  hideCarouselOnMobile();
  window.addEventListener('resize', hideCarouselOnMobile);

  const carousel = document.querySelector('.carousel');
  const carouselImages = document.querySelectorAll('.carousel img');
  const prevButton = document.querySelector('.carousel-container .controls button:first-child');
  const nextButton = document.querySelector('.carousel-container .controls button:last-child');

  let counter = 0;
  const size = carouselImages[0].clientWidth + 20; 

  carousel.style.transform = 'translateX(' + (-size * counter) + 'px)';

  nextButton.addEventListener('click', () => {
    if (counter >= carouselImages.length - 1) return;
    carousel.style.transition = "transform 0.4s ease-in-out";
    counter++;
    carousel.style.transform = 'translateX(' + (-size * counter) + 'px)';
  });

  prevButton.addEventListener('click', () => {
    if (counter <= 0) return;
    carousel.style.transition = "transform 0.4s ease-in-out";
    counter--;
    carousel.style.transform = 'translateX(' + (-size * counter) + 'px)';
  });

  carousel.addEventListener('transitionend', () => {
    if (carouselImages[counter].id === 'lastClone') {
      carousel.style.transition = "none";
      counter = carouselImages.length - 2;
      carousel.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }
    if (carouselImages[counter].id === 'firstClone') {
      carousel.style.transition = "none";
      counter = carouselImages.length - counter;
      carousel.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }
  });

  document.querySelector('.hamburger-icon').addEventListener('click', () => {
    document.querySelector('.sidebar').classList.toggle('open');
  });
});