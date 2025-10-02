// ===== CONFIGURACIÓN Y CONSTANTES =====
const CONFIG = {
    whatsappNumber: "573233570334",
    placeholderService: "dummyimage.com"
};

// Estado de la aplicación
const AppState = {
    currentCategory: 'mugs',
    currentSlide: 0,
    images: [],
    catalogoInicializado: false
};

// ===== BASE DE DATOS DE PRODUCTOS =====
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
    ],
    
    clientes: [
        {
            src: "fotos/clientes/cliente1.jpg",
            alt: "Cliente satisfecho con mug personalizado",
            title: "Ana María - Mug Personalizado",
            description: "Mug con foto familiar para regalo de aniversario",
            testimonio: "¡Quedé encantada con mi mug! La calidad es excelente y el diseño superó mis expectativas.",
            categoria: "Mugs"
        },
        {
            src: "fotos/clientes/cliente2.jpg",
            alt: "Equipo con camisetas personalizadas",
            title: "Tech Solutions - Camisetas Corporativas",
            description: "Lote de 50 camisetas para equipo de trabajo",
            testimonio: "Professionalismo y calidad en cada detalle. Nuestro equipo está muy contento.",
            categoria: "Camisetas"
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
    },
    clientes: {
        title: "⭐ Galería de Clientes Satisfechos",
        description: "Conoce los trabajos que hemos realizado y lo que dicen nuestros clientes"
    }
};

// Nombres de categorías para WhatsApp
const categoryNames = {
    'mugs': 'Mugs y Tazas',
    'termos': 'Termos y Botellas', 
    'camisetas': 'Camisetas y Prendas',
    'accesorios': 'Accesorios',
    'clientes': 'Galería de Clientes'
};

// ===== FUNCIONES DE UTILIDAD =====
const Utils = {
    // Generar URL de placeholder para imágenes faltantes
    getPlaceholderURL(width, height, text) {
        return `https://${CONFIG.placeholderService}/${width}x${height}/3498db/ffffff&text=${encodeURIComponent(text)}`;
    },

    // Codificar mensaje para WhatsApp
    encodeWhatsAppMessage(message) {
        return encodeURIComponent(message);
    },

    // Obtener nombre de categoría
    getCategoryName(category) {
        return categoryNames[category] || category;
    },

    // Validar si hay imágenes disponibles
    hasImages() {
        return AppState.images.length > 0 && AppState.currentSlide < AppState.images.length;
    }
};

// ===== MANEJO DE LA PORTADA =====
const PortadaManager = {
    init() {
        this.mostrarPortada();
    },

    mostrarPortada() {
        document.getElementById('portada').classList.remove('hidden');
        document.getElementById('catalogo').classList.add('hidden');
    },

    irAlCatalogo() {
        console.log('Navegando al catálogo general...');
        
        this.ocultarPortada();
        this.mostrarCatalogo();
        
        if (!AppState.catalogoInicializado) {
            CatalogoManager.init();
            AppState.catalogoInicializado = true;
        }
        
        CatalogoManager.showCategory('mugs');
    },

    irACategoria(categoria) {
        console.log('Navegando a categoría:', categoria);
        
        this.ocultarPortada();
        this.mostrarCatalogo();
        
        if (!AppState.catalogoInicializado) {
            CatalogoManager.init();
            AppState.catalogoInicializado = true;
        }
        
        CatalogoManager.showCategory(categoria);
    },

    ocultarPortada() {
        document.getElementById('portada').classList.add('hidden');
    },

    mostrarCatalogo() {
        document.getElementById('catalogo').classList.remove('hidden');
    },

    contactWhatsAppPortada() {
        const message = `¡Hola Zona Creativa! :)

Estoy interesado/a en conocer más sobre sus productos.

Me gustaría recibir información sobre:
• Catálogo completo de productos
• Precios y disponibilidad
• Opciones de personalización
• Formas de pago y envío

¡Gracias!`;
        
        this.openWhatsApp(message);
    },

    openWhatsApp(message) {
        const encodedMessage = Utils.encodeWhatsAppMessage(message);
        const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    }

    function volverAPortada() {
    // Ocultar el catálogo y mostrar la portada
    document.getElementById('catalogo').classList.add('hidden');
    document.getElementById('portada').classList.remove('hidden');
    
    // Cerrar el menú móvil si está abierto
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}
};

// ===== MANEJO DEL CATÁLOGO =====
const CatalogoManager = {
    init() {
        console.log('Inicializando catálogo...');
        AppState.images = categories[AppState.currentCategory];
        this.recreateCarousel();
        MobileMenuManager.init();
    },

    showCategory(category) {
        console.log('Mostrando categoría:', category);
        
        AppState.currentCategory = category;
        AppState.images = categories[category];
        AppState.currentSlide = 0;
        
        this.updateActiveNavButton(category);
        this.updateCategoryInfo(category);
        this.recreateCarousel();
    },

    updateActiveNavButton(category) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeButton = document.querySelector(`[onclick="CatalogoManager.showCategory('${category}')"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }
    },

    updateCategoryInfo(category) {
        document.getElementById('category-title').textContent = categoryInfo[category].title;
        document.getElementById('category-description').textContent = categoryInfo[category].description;
    },

    recreateCarousel() {
        const carouselInner = document.querySelector('.carousel-inner');
        const indicators = document.querySelector('.carousel-indicators');
        const thumbnails = document.querySelector('.thumbnails');
        
        this.clearElements([carouselInner, indicators, thumbnails]);
        this.createCarouselItems();
        this.updateCarousel();
        this.updateImageInfo();
    },

    clearElements(elements) {
        elements.forEach(element => {
            if (element) element.innerHTML = '';
        });
    },

    createCarouselItems() {
        const carouselInner = document.querySelector('.carousel-inner');
        const indicators = document.querySelector('.carousel-indicators');
        const thumbnails = document.querySelector('.thumbnails');

        AppState.images.forEach((image, index) => {
            this.createSlide(carouselInner, image, index);
            this.createIndicator(indicators, index);
            this.createThumbnail(thumbnails, image, index);
        });
    },

    createSlide(container, image, index) {
        const slide = document.createElement('div');
        slide.className = 'carousel-item';
        const placeholderURL = Utils.getPlaceholderURL(400, 400, 'Imagen+No+Disponible');
        slide.innerHTML = `<img src="${image.src}" alt="${image.alt}" onerror="this.src='${placeholderURL}'">`;
        container.appendChild(slide);
    },

    createIndicator(container, index) {
        const indicator = document.createElement('div');
        indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
        indicator.onclick = () => this.goToSlide(index);
        container.appendChild(indicator);
    },

    createThumbnail(container, image, index) {
        const thumbnail = document.createElement('div');
        thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
        const placeholderURL = Utils.getPlaceholderURL(100, 100, 'Imagen+No+Disponible');
        thumbnail.innerHTML = `<img src="${image.src}" alt="${image.alt}" onerror="this.src='${placeholderURL}'">`;
        thumbnail.onclick = () => this.goToSlide(index);
        container.appendChild(thumbnail);
    },

    moveSlide(direction) {
        if (!Utils.hasImages()) return;
        
        AppState.currentSlide += direction;
        
        if (AppState.currentSlide < 0) {
            AppState.currentSlide = AppState.images.length - 1;
        } else if (AppState.currentSlide >= AppState.images.length) {
            AppState.currentSlide = 0;
        }
        
        this.goToSlide(AppState.currentSlide);
    },

    goToSlide(slideIndex) {
        AppState.currentSlide = slideIndex;
        this.updateCarousel();
        this.updateImageInfo();
    },

    updateCarousel() {
        const carouselInner = document.querySelector('.carousel-inner');
        const indicators = document.querySelectorAll('.indicator');
        const thumbnails = document.querySelectorAll('.thumbnail');
        
        if (carouselInner) {
            carouselInner.style.transform = `translateX(-${AppState.currentSlide * 100}%)`;
            
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === AppState.currentSlide);
            });
            
            thumbnails.forEach((thumbnail, index) => {
                thumbnail.classList.toggle('active', index === AppState.currentSlide);
            });
        }
    },

    updateImageInfo() {
        const infoDiv = document.getElementById('image-info');
        if (!Utils.hasImages()) return;
        
        const currentImage = AppState.images[AppState.currentSlide];
        
        if (AppState.currentCategory === 'clientes') {
            infoDiv.innerHTML = this.createClientInfoHTML(currentImage);
        } else {
            infoDiv.innerHTML = this.createProductInfoHTML(currentImage);
        }
    },

    createProductInfoHTML(image) {
        return `
            <h3>${image.title}</h3>
            <p>${image.description}</p>
            <div class="price">${image.price}</div>
        `;
    },

    createClientInfoHTML(image) {
        return `
            <div class="testimonio-cliente">
                <div class="cliente-info">
                    <div>
                        <h4>${image.title}</h4>
                        <span class="cliente-categoria">${image.categoria}</span>
                    </div>
                </div>
                <p class="testimonio-texto">"${image.testimonio}"</p>
                <p><strong>Proyecto:</strong> ${image.description}</p>
            </div>
        `;
    },

    contactWhatsApp() {
        if (!Utils.hasImages()) return;
        
        const currentImage = AppState.images[AppState.currentSlide];
        const message = `¡Hola Zona Creativa! :)

Estoy interesado/a en el siguiente producto:

• *Producto:* ${currentImage.title}
• *Precio:* ${currentImage.price}
• *Categoría:* ${Utils.getCategoryName(AppState.currentCategory)}
• *Referencia:* ${currentImage.description}

Me gustaría recibir más información sobre disponibilidad, colores y formas de pago.

¡Gracias!`;
        
        PortadaManager.openWhatsApp(message);
    }
};

// ===== MENÚ MÓVIL =====
const MobileMenuManager = {
    init() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');

        if (this.hamburger && this.navMenu) {
            this.setupEventListeners();
        }
    },

    setupEventListeners() {
        this.hamburger.addEventListener('click', (e) => this.toggleMenu(e));
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
        window.addEventListener('resize', () => this.handleResize());
    },

    toggleMenu(e) {
        e.stopPropagation();
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        this.toggleBodyScroll();
    },

    closeMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
        this.toggleBodyScroll();
    },

    handleOutsideClick(e) {
        if (!this.navMenu.contains(e.target) && !this.hamburger.contains(e.target)) {
            this.closeMenu();
        }
    },

    handleResize() {
        if (window.innerWidth > 768) {
            this.closeMenu();
        }
    },

    toggleBodyScroll() {
        document.body.style.overflow = this.navMenu.classList.contains('active') ? 'hidden' : '';
    }
};

// ===== NAVEGACIÓN CON TECLADO =====
const KeyboardManager = {
    init() {
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    },

    handleKeyPress(e) {
        if (e.key === 'ArrowLeft') {
            CatalogoManager.moveSlide(-1);
        } else if (e.key === 'ArrowRight') {
            CatalogoManager.moveSlide(1);
        }
    }
};

// ===== INICIALIZACIÓN DE LA APLICACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    PortadaManager.init();
    KeyboardManager.init();
    
    // Exponer funciones globales necesarias
    window.irAlCatalogo = () => PortadaManager.irAlCatalogo();
    window.irACategoria = (categoria) => PortadaManager.irACategoria(categoria);
    window.contactWhatsAppPortada = () => PortadaManager.contactWhatsAppPortada();
    window.showCategory = (category) => CatalogoManager.showCategory(category);
    window.moveSlide = (direction) => CatalogoManager.moveSlide(direction);
    window.contactWhatsApp = () => CatalogoManager.contactWhatsApp();
});

console.log('✅ Catálogo Zona Creativa - Cargado correctamente');

