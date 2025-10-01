// ===== CONFIGURACIÓN INICIAL =====
let currentCategory = 'mugs';
let currentSlide = 0;
let images = [];
let catalogoInicializado = false;

// ===== FUNCIONALIDADES DE LA PORTADA =====

// Mostrar portada al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    mostrarPortada();
});

function mostrarPortada() {
    document.getElementById('portada').classList.remove('hidden');
    document.getElementById('catalogo').classList.add('hidden');
}

// Función para ir al catálogo general
function irAlCatalogo() {
    console.log('Navegando al catálogo general...');
    
    // Ocultar portada y mostrar catálogo
    document.getElementById('portada').classList.add('hidden');
    document.getElementById('catalogo').classList.remove('hidden');
    
    // Inicializar el catálogo si no se ha hecho
    if (!catalogoInicializado) {
        initCarousel();
        catalogoInicializado = true;
    }
    
    // Mostrar la primera categoría por defecto
    showCategory('mugs');
}

// Función para ir directamente a una categoría específica
function irACategoria(categoria) {
    console.log('Navegando a categoría:', categoria);
    
    // Ocultar portada y mostrar catálogo
    document.getElementById('portada').classList.add('hidden');
    document.getElementById('catalogo').classList.remove('hidden');
    
    // Inicializar el catálogo si no se ha hecho
    if (!catalogoInicializado) {
        initCarousel();
        catalogoInicializado = true;
    }
    
    // Mostrar la categoría seleccionada
    showCategory(categoria);
}

// WhatsApp desde la portada
function contactWhatsAppPortada() {
    const phoneNumber = "573233570334";
    const message = `¡Hola Zona Creativa! :)

Estoy interesado/a en conocer más sobre sus productos.

Me gustaría recibir información sobre:
• Catálogo completo de productos
• Precios y disponibilidad
• Opciones de personalización
• Formas de pago y envío

¡Gracias!`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
}

// ===== CÓDIGO EXISTENTE DEL CATÁLOGO =====

// Base de datos de productos por categoría
const categories = {
    mugs: [
        {
            src: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400",
            alt: "Mug diseño abstracto",
            title: "Mug Cerámica Premium",
            description: "Mug de cerámica de alta calidad con diseño moderno",
            price: "$15.99",
            category: "mugs"
        },
        {
            src: "https://images.unsplash.com/photo-1577937927139-79eaf8eec95a?w=400",
            alt: "Mug personalizado",
            title: "Mug Personalizado",
            description: "Lleva tu foto o diseño favorito en este mug único",
            price: "$18.99",
            category: "mugs"
        }
    ],
    
    termos: [
        {
            src: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400",
            alt: "Termo acero inoxidable",
            title: "Termo Acero Inoxidable",
            description: "Mantiene la temperatura por 24 horas - 500ml",
            price: "$29.99",
            category: "termos"
        }
    ],
    
    camisetas: [
        {
            src: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
            alt: "Camiseta unisex básica",
            title: "Camiseta Unisex Premium",
            description: "100% algodón, disponible en tallas S-XXL",
            price: "$19.99",
            category: "camisetas"
        }
    ],
    
    accesorios: [
        {
            src: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
            alt: "Mochila laptop",
            title: "Mochila para Laptop",
            description: "Compartimento acolchado para laptop hasta 15\"",
            price: "$45.99",
            category: "accesorios"
        }
    ]
};

// Textos descriptivos para cada categoría
const categoryInfo = {
    mugs: {
        title: "Mugs Personalizados",
        description: "Encuentra el diseño perfecto para tu taza favorita"
    },
    termos: {
        title: "Termos y Botellas", 
        description: "Mantén tus bebidas a la temperatura ideal"
    },
    camisetas: {
        title: "Camisetas y Prendas",
        description: "Viste con estilo y comodidad"
    },
    accesorios: {
        title: "Accesorios Únicos",
        description: "Complementa tu look con nuestros accesorios"
    }
};

// Inicializar el carrusel
function initCarousel() {
    console.log('Inicializando carrusel...');
    images = categories[currentCategory];
    recreateCarousel();
    setupMobileMenu();
}

// Mostrar categoría específica
function showCategory(category) {
    console.log('Mostrando categoría:', category);
    currentCategory = category;
    images = categories[category];
    currentSlide = 0;
    
    // Actualizar botones activos
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Actualizar título y descripción
    document.getElementById('category-title').textContent = categoryInfo[category].title;
    document.getElementById('category-description').textContent = categoryInfo[category].description;
    
    // Recrear el carrusel
    recreateCarousel();
}

// Recrear el carrusel con nuevas imágenes
function recreateCarousel() {
    const carouselInner = document.querySelector('.carousel-inner');
    const indicators = document.querySelector('.carousel-indicators');
    const thumbnails = document.querySelector('.thumbnails');
    
    // Limpiar contenido existente
    carouselInner.innerHTML = '';
    indicators.innerHTML = '';
    thumbnails.innerHTML = '';
    
    // Crear nuevos slides e indicadores
    images.forEach((image, index) => {
        // Slide principal
        const slide = document.createElement('div');
        slide.className = 'carousel-item';
        slide.innerHTML = `<img src="${image.src}" alt="${image.alt}" onerror="this.src='https://via.placeholder.com/400x400/3498db/ffffff?text=Imagen+No+Disponible'">`;
        carouselInner.appendChild(slide);
        
        // Indicadores
        const indicator = document.createElement('div');
        indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
        indicator.onclick = () => goToSlide(index);
        indicators.appendChild(indicator);
        
        // Miniaturas
        const thumbnail = document.createElement('div');
        thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
        thumbnail.innerHTML = `<img src="${image.src}" alt="${image.alt}" onerror="this.src='https://via.placeholder.com/100x100/3498db/ffffff?text=Imagen+No+Disponible'">`;
        thumbnail.onclick = () => goToSlide(index);
        thumbnails.appendChild(thumbnail);
    });
    
    updateCarousel();
    updateImageInfo();
}

// Configurar menú móvil
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
}

// Actualizar información de la imagen
function updateImageInfo() {
    const infoDiv = document.getElementById('image-info');
    if (images.length > 0 && currentSlide < images.length) {
        const currentImage = images[currentSlide];
        infoDiv.innerHTML = `
            <h3>${currentImage.title}</h3>
            <p>${currentImage.description}</p>
            <div class="price">${currentImage.price}</div>
        `;
    }
}

// Mover el carrusel
function moveSlide(direction) {
    if (images.length === 0) return;
    
    currentSlide += direction;
    
    if (currentSlide < 0) {
        currentSlide = images.length - 1;
    } else if (currentSlide >= images.length) {
        currentSlide = 0;
    }
    
    goToSlide(currentSlide);
}

// Ir a slide específico
function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateCarousel();
    updateImageInfo();
}

// Actualizar carrusel
function updateCarousel() {
    const carouselInner = document.querySelector('.carousel-inner');
    const indicators = document.querySelectorAll('.indicator');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    if (carouselInner) {
        // Mover carrusel
        carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Actualizar indicadores
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
        
        // Actualizar miniaturas
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.classList.toggle('active', index === currentSlide);
        });
    }
}

// Contactar por WhatsApp desde el catálogo
function contactWhatsApp() {
    if (images.length === 0 || currentSlide >= images.length) return;
    
    const currentImage = images[currentSlide];
    const phoneNumber = "573233570334";
    
    const message = `¡Hola Zona Creativa! :)

Estoy interesado/a en el siguiente producto:

• *Producto:* ${currentImage.title}
• *Precio:* ${currentImage.price}
• *Categoría:* ${getCategoryName(currentCategory)}
• *Referencia:* ${currentImage.description}

Me gustaría recibir más información sobre disponibilidad, colores y formas de pago.

¡Gracias!`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
}

// Función auxiliar para obtener nombres de categoría
function getCategoryName(category) {
    const categoryNames = {
        'mugs': 'Mugs y Tazas',
        'termos': 'Termos y Botellas', 
        'camisetas': 'Camisetas y Prendas',
        'accesorios': 'Accesorios'
    };
    return categoryNames[category] || category;
}

// Navegación con teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        moveSlide(-1);
    } else if (e.key === 'ArrowRight') {
        moveSlide(1);
    }
});