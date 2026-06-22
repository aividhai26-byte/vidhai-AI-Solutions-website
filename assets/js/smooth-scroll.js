// ===== PREMIUM SMOOTH SCROLLING WIDGET (LENIS INTEGRATION) =====
(function () {
    // 1. Inject Lenis CSS styles dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        html.lenis, html.lenis body {
          height: auto !important;
        }
        .lenis-smooth {
          scroll-behavior: initial !important;
        }
        .lenis-smooth [data-lenis-prevent] {
          overscroll-behavior: contain;
        }
        .lenis-stopped {
          overflow: hidden;
        }
        .lenis-scrolling iframe {
          pointer-events: none;
        }
    `;
    document.head.appendChild(style);
    
    // 2. Load Lenis script dynamically from local assets
    const script = document.createElement('script');
    script.src = 'assets/js/lenis.min.js';
    script.onload = () => {
        // Initialize Lenis
        const lenis = new Lenis({
            duration: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1.05,
            smoothTouch: true,
            touchMultiplier: 1.25,
            infinite: false,
        });
        
        // Frame loop
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
        
        // Store instance globally
        window.lenis = lenis;
        
        // 3. Intercept all anchor hash clicks for smooth scrolling
        document.addEventListener('click', (e) => {
            const anchor = e.target.closest('a[href^="#"]');
            if (!anchor) return;
            const href = anchor.getAttribute('href');
            if (href === '#' || href === '#!') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const header = document.querySelector('.header-area') || document.querySelector('.main-header') || document.querySelector('#mainHeader');
                const headerHeight = header ? header.offsetHeight : 80;
                lenis.scrollTo(target, {
                    offset: -headerHeight,
                    duration: 1.4
                });
            }
        });
        
        console.log('✨ Premium Lenis Smooth Scroll initialized successfully!');
    };
    
    document.body.appendChild(script);
})();
