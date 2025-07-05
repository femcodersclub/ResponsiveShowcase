 // Función para actualizar el panel de debug
        function updateDebugPanel() {
            const viewport = window.innerWidth;
            document.getElementById("viewport-size").textContent = viewport + "px";

            let breakpoint = "Desktop";
            if (viewport <= 480) breakpoint = "Mobile Small";
            else if (viewport <= 768) breakpoint = "Mobile/Tablet";
            else if (viewport <= 1024) breakpoint = "Tablet/Laptop";

            document.getElementById("current-breakpoint").textContent = breakpoint;

            const isTouchDevice = "ontouchstart" in window;
            document.getElementById("device-type").textContent = isTouchDevice
                ? "Touch Device"
                : "Desktop";

            const orientation =
                window.innerHeight > window.innerWidth ? "Portrait" : "Landscape";
            document.getElementById("orientation").textContent = orientation;
        }

        // Funcionalidad del menú hamburguesa
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevenir scroll del body cuando el menú está abierto
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Cerrar menú al hacer click en un enlace
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Cerrar menú al hacer click fuera de él
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Cerrar menú al redimensionar la ventana (por si el usuario gira el dispositivo)
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
            updateDebugPanel();
        });

        // Event listeners para el panel de debug
        window.addEventListener("orientationchange", updateDebugPanel);
        
        // Inicializar
        updateDebugPanel();

        // Log de carga
        window.addEventListener("load", () => {
            const loadTime = performance.now();
            console.log(`🚀 ResponsiveShowcase cargado en ${loadTime.toFixed(2)}ms`);
        });

        // Log de clicks en enlaces
        document.querySelectorAll(".example-link").forEach((link) => {
            link.addEventListener("click", (e) => {
                console.log(`🔗 Link clicked: ${link.textContent} -> ${link.href}`);
            });
        });

        // Smooth scroll mejorado para navegación
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Highlight activo en navegación basado en scroll
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

        function highlightActiveNav() {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.style.background = '';
                if (link.getAttribute('href') === '#' + current) {
                    link.style.background = 'rgba(255, 255, 255, 0.2)';
                }
            });
        }

        window.addEventListener('scroll', highlightActiveNav);
        
        // Animación de entrada para las cards
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.example-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(card);
        });
