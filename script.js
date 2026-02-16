// ========================================
// NEW PORTFOLIO - OPTIMIZED JAVASCRIPT
// ========================================

(function() {
    'use strict';
    
    // ========================================
    // UTILITY FUNCTIONS
    // ========================================
    
    const throttle = (func, limit = 100) => {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };
    
    const debounce = (func, wait = 250) => {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    };
    
    // ========================================
    // SMOOTH SCROLL
    // ========================================
    
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href === '#' || href === '#!') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                    
                    window.scrollTo({
                        top: targetPosition - 50,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };
    
    // ========================================
    // BACK TO TOP BUTTON
    // ========================================
    
    const initBackToTop = () => {
        const btn = document.getElementById('backToTop');
        if (!btn) return;
        
        const toggleButton = throttle(() => {
            btn.classList.toggle('visible', window.scrollY > 400);
        }, 100);
        
        window.addEventListener('scroll', toggleButton, { passive: true });
        
        btn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        toggleButton();
    };
    
    // ========================================
    // LAZY LOADING ENHANCEMENT
    // ========================================
    
    const initLazyLoading = () => {
        if ('loading' in HTMLImageElement.prototype) {
            return;
        }
        
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                        }
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
    };
    
    // ========================================
    // PROJECT CARDS ANIMATION
    // ========================================
    
    const initProjectsAnimation = () => {
        if (!('IntersectionObserver' in window)) return;
        
        const cards = document.querySelectorAll('.project-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Only observe cards beyond the first 6
        cards.forEach((card, index) => {
            if (index >= 6) {
                card.style.opacity = '0';
                card.style.transform = 'translateY(40px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(card);
            }
        });
    };
    
    // ========================================
    // IMAGE LOADING STATE
    // ========================================
    
    const initImageLoading = () => {
        const cards = document.querySelectorAll('.project-card');
        
        cards.forEach(card => {
            const img = card.querySelector('.project-image');
            if (!img) return;
            
            card.setAttribute('data-loading', 'true');
            
            if (img.complete) {
                card.setAttribute('data-loading', 'false');
            } else {
                img.addEventListener('load', () => {
                    card.setAttribute('data-loading', 'false');
                });
                
                img.addEventListener('error', () => {
                    card.setAttribute('data-loading', 'false');
                    console.warn('Image failed to load:', img.src);
                });
            }
        });
    };
    
    // ========================================
    // KEYBOARD NAVIGATION
    // ========================================
    
    const initKeyboardNavigation = () => {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
        
        const cards = document.querySelectorAll('.project-card');
        cards.forEach(card => {
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            });
        });
    };
    
    // ========================================
    // VIEWPORT HEIGHT FIX (Mobile)
    // ========================================
    
    const fixViewportHeight = () => {
        const setVH = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        
        setVH();
        window.addEventListener('resize', debounce(setVH, 250));
    };
    
    // ========================================
    // PRELOAD IMAGES
    // ========================================
    
    const preloadImages = () => {
        const images = document.querySelectorAll('.project-image[loading="lazy"]');
        const imageUrls = Array.from(images).map(img => img.src);
        
        imageUrls.slice(0, 6).forEach(url => {
            const img = new Image();
            img.src = url;
        });
    };
    
    // ========================================
    // DETECT SLOW CONNECTION
    // ========================================
    
    const detectSlowConnection = () => {
        if ('connection' in navigator) {
            const connection = navigator.connection;
            const slowConnection = connection.effectiveType === 'slow-2g' || 
                                   connection.effectiveType === '2g' || 
                                   connection.saveData;
            
            if (slowConnection) {
                console.log('⚠️ Slow connection detected - optimizing...');
                document.documentElement.classList.add('slow-connection');
            }
        }
    };
    
    // ========================================
    // EXTERNAL LINKS
    // ========================================
    
    const initExternalLinks = () => {
        const externalLinks = document.querySelectorAll('a[target="_blank"]');
        
        externalLinks.forEach(link => {
            if (!link.hasAttribute('rel')) {
                link.setAttribute('rel', 'noopener');
            }
        });
    };
    
    // ========================================
    // ANALYTICS TRACKING (Optional)
    // ========================================
    
    const initAnalytics = () => {
        document.querySelectorAll('.project-card').forEach((card, index) => {
            card.addEventListener('click', () => {
                const projectNumber = card.querySelector('.project-number')?.textContent || index + 1;
                const projectUrl = card.getAttribute('href');
                
                console.log('Project clicked:', {
                    number: projectNumber,
                    url: projectUrl
                });
                
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'project_click', {
                        'event_category': 'engagement',
                        'event_label': projectUrl,
                        'value': projectNumber
                    });
                }
            });
        });
    };
    
    // ========================================
    // PERFORMANCE MONITORING
    // ========================================
    
    const logPerformanceMetrics = () => {
        if (!('performance' in window)) return;
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                
                if (perfData) {
                    const metrics = {
                        'DNS Lookup': Math.round(perfData.domainLookupEnd - perfData.domainLookupStart),
                        'TCP Connection': Math.round(perfData.connectEnd - perfData.connectStart),
                        'Request Time': Math.round(perfData.responseStart - perfData.requestStart),
                        'Response Time': Math.round(perfData.responseEnd - perfData.responseStart),
                        'DOM Processing': Math.round(perfData.domComplete - perfData.domInteractive),
                        'Total Load Time': Math.round(perfData.loadEventEnd - perfData.fetchStart)
                    };
                    
                    console.log('⚡ Performance Metrics:', metrics);
                }
                
                if ('PerformanceObserver' in window) {
                    const observer = new PerformanceObserver((list) => {
                        const entries = list.getEntries();
                        const lastEntry = entries[entries.length - 1];
                        console.log('⚡ LCP:', Math.round(lastEntry.renderTime || lastEntry.loadTime), 'ms');
                    });
                    observer.observe({ entryTypes: ['largest-contentful-paint'] });
                }
            }, 0);
        });
    };
    
    // ========================================
    // PARALLAX EFFECT (Light)
    // ========================================
    
    const initParallax = () => {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        const handleScroll = throttle(() => {
            const scrolled = window.pageYOffset;
            const heroContent = hero.querySelector('.hero-content');
            
            if (heroContent && scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = 1 - (scrolled / 600);
            }
        }, 16);
        
        window.addEventListener('scroll', handleScroll, { passive: true });
    };
    
    // ========================================
    // INITIALIZE ALL
    // ========================================
    
    const init = () => {
        initSmoothScroll();
        initBackToTop();
        initLazyLoading();
        initProjectsAnimation();
        initImageLoading();
        initKeyboardNavigation();
        initAnalytics();
        fixViewportHeight();
        preloadImages();
        detectSlowConnection();
        initExternalLinks();
        initParallax();
        
        // Performance monitoring (only in development)
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            logPerformanceMetrics();
        }
        
        console.log('✅ New Portfolio initialized successfully');
    };
    
    // ========================================
    // DOM READY
    // ========================================
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // ========================================
    // PAGE VISIBILITY
    // ========================================
    
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            console.log('👀 Page is visible');
        }
    });
    
    // ========================================
    // ONLINE/OFFLINE STATUS
    // ========================================
    
    window.addEventListener('online', () => {
        console.log('✅ Connection restored');
    });
    
    window.addEventListener('offline', () => {
        console.log('⚠️ Connection lost');
    });
    
})();
