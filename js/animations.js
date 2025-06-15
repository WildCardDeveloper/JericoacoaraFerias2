/**
 * ARQUIVO JAVASCRIPT DE ANIMAÇÕES - JERICOACOARA FÉRIAS
 * ========================================================================
 * ÍNDICE:
 * 1. Transições de Página
 * 2. Animações de Texto
 * 3. Animações de Elementos
 * 4. Utilitários
 * ========================================================================
 */

/**
 * 1. TRANSIÇÕES DE PÁGINA
 * ========================================================================
 */

// Classe para gerenciar transições de página
class PageTransition {
    constructor() {
        this.isTransitioning = false;
        this.init();
    }

    init() {
        // Cria o overlay de transição
        this.createOverlay();
        
        // Intercepta cliques em links internos
        this.interceptLinks();
        
        // Adiciona animação de entrada na página atual
        this.animatePageEnter();
    }

    createOverlay() {
        // Cria o elemento overlay se não existir
        if (!document.querySelector('.transition-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'transition-overlay';
            document.body.appendChild(overlay);
        }
    }

    interceptLinks() {
        // Seleciona todos os links internos
        const links = document.querySelectorAll('a[href]:not([href^="#"]):not([href^="mailto"]):not([href^="tel"]):not([target="_blank"])');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                // Verifica se é um link interno do site
                const href = link.getAttribute('href');
                if (this.isInternalLink(href) && !this.isTransitioning) {
                    e.preventDefault();
                    this.transitionToPage(href);
                }
            });
        });
    }

    isInternalLink(href) {
        // Verifica se é um link interno (relativo ou do mesmo domínio)
        return href && (
            href.startsWith('./') || 
            href.startsWith('../') || 
            href.startsWith('/') || 
            href.endsWith('.html') ||
            (!href.includes('://') && !href.includes('mailto:') && !href.includes('tel:'))
        );
    }

    transitionToPage(href) {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        const overlay = document.querySelector('.transition-overlay');
        const body = document.body;

        // Inicia a animação de saída
        body.classList.add('fade-out');
        overlay.classList.add('active');

        // Aguarda a animação e navega para a nova página
        setTimeout(() => {
            window.location.href = href;
        }, 600);
    }

    animatePageEnter() {
        // Adiciona animação de entrada quando a página carrega
        document.body.classList.add('fade-in');
        
        // Remove o overlay após a animação
        setTimeout(() => {
            const overlay = document.querySelector('.transition-overlay');
            if (overlay) {
                overlay.classList.remove('active');
            }
            this.isTransitioning = false;
        }, 600);
    }
}

/**
 * 2. ANIMAÇÕES DE TEXTO
 * ========================================================================
 */

// Classe para gerenciar animações de texto
class TextAnimations {
    constructor() {
        this.init();
    }

    init() {
        // Aguarda o carregamento completo da página
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupScrollAnimations();
            });
        } else {
            this.setupScrollAnimations();
        }
    }

    setupScrollAnimations() {
        // Observa elementos que devem ser animados no scroll
        const elementsToAnimate = document.querySelectorAll('h1, h2, h3, p, .servico-card, .galeria-item, .btn, .btn-secondary, .btn-submit');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    if (element.tagName === 'H1') {
                        this.animateLetterByLetter(element);
                    } else if (element.tagName === 'H2' || element.tagName === 'H3') {
                        this.animateWordByWord(element);
                    } else if (element.tagName === 'P') {
                        element.classList.add('line-animation');
                    } else if (element.classList.contains('servico-card') || element.classList.contains('galeria-item')) {
                        element.classList.add('card-enter');
                    } else if (element.classList.contains('btn') || element.classList.contains('btn-secondary') || element.classList.contains('btn-submit')) {
                        element.classList.add('button-enter');
                    }
                    observer.unobserve(element); // Para animar apenas uma vez
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elementsToAnimate.forEach(el => observer.observe(el));
    }

    animateLetterByLetter(element, delay = 0) {
        const text = element.textContent;
        element.innerHTML = '';
        element.classList.add('animated-text');

        // Divide o texto em letras
        const letters = text.split('');
        
        letters.forEach((letter, index) => {
            const span = document.createElement('span');
            span.textContent = letter === ' ' ? '\u00A0' : letter; // Preserva espaços
            span.classList.add('letter-animation', `delay-${Math.min(index + 1, 10)}`);
            element.appendChild(span);
        });

        // Inicia a animação após o delay
        setTimeout(() => {
            element.querySelectorAll('.letter-animation').forEach((letter, index) => {
                setTimeout(() => {
                    letter.style.animationDelay = `${index * 0.05}s`;
                }, index * 20);
            });
        }, delay);
    }

    animateWordByWord(element, delay = 0) {
        const text = element.textContent;
        element.innerHTML = '';
        element.classList.add('animated-text');

        // Divide o texto em palavras
        const words = text.split(' ');
        
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word;
            span.classList.add('word-animation', `delay-${Math.min(index + 1, 10)}`);
            element.appendChild(span);
            
            // Adiciona espaço entre palavras (exceto na última)
            if (index < words.length - 1) {
                element.appendChild(document.createTextNode(' '));
            }
        });

        // Inicia a animação após o delay
        setTimeout(() => {
            element.querySelectorAll('.word-animation').forEach((word, index) => {
                setTimeout(() => {
                    word.style.animationDelay = `${index * 0.1}s`;
                }, index * 50);
            });
        }, delay);
    }

    // Método para criar efeito typewriter em elementos específicos
    createTypewriterEffect(element, speed = 50) {
        const text = element.textContent;
        element.textContent = '';
        element.classList.add('typewriter');

        let index = 0;
        const timer = setInterval(() => {
            element.textContent += text[index];
            index++;
            
            if (index >= text.length) {
                clearInterval(timer);
                // Remove o cursor após completar
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        }, speed);
    }

    // Método para criar efeito de onda
    createWaveEffect(element, delay = 0) {
        const text = element.textContent;
        element.innerHTML = '';
        element.classList.add('wave-text');

        const letters = text.split('');
        letters.forEach((letter, index) => {
            const span = document.createElement('span');
            span.textContent = letter === ' ' ? '\u00A0' : letter;
            span.classList.add('letter');
            span.style.animationDelay = `${delay + (index * 0.1)}s`;
            element.appendChild(span);
        });
    }
}

/**
 * 3. ANIMAÇÕES DE ELEMENTOS
 * ========================================================================
 */

// Classe para animações de elementos específicos
class ElementAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupHoverEffects();
    }

    setupScrollAnimations() {
        // Cria observer para animações baseadas em scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in-view');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observa elementos que devem ser animados no scroll
        const elementsToAnimate = document.querySelectorAll('.servico-card, .sobre-content, .footer-content');
        elementsToAnimate.forEach(el => observer.observe(el));
    }

    setupHoverEffects() {
        // Adiciona efeitos de hover para cards
        const cards = document.querySelectorAll('.servico-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
                card.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
            });
        });
    }
}

/**
 * 4. UTILITÁRIOS
 * ========================================================================
 */

// Utilitários para animações
class AnimationUtils {
    // Adiciona delay a um elemento
    static addDelay(element, delay) {
        element.style.animationDelay = `${delay}ms`;
    }

    // Remove todas as classes de animação de um elemento
    static resetAnimations(element) {
        const animationClasses = [
            'letter-animation', 'word-animation', 'line-animation',
            'card-enter', 'button-enter', 'image-enter',
            'fade-in', 'fade-out', 'page-enter', 'page-exit'
        ];
        
        animationClasses.forEach(className => {
            element.classList.remove(className);
        });
    }

    // Verifica se o usuário prefere movimento reduzido
    static prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    // Desabilita animações se o usuário preferir movimento reduzido
    static respectMotionPreferences() {
        if (this.prefersReducedMotion()) {
            const style = document.createElement('style');
            style.textContent = `
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            `;
            document.head.appendChild(style);
        }
    }
}

/**
 * 5. INICIALIZAÇÃO
 * ========================================================================
 */

// Inicializa todas as animações quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Respeita preferências de movimento
    AnimationUtils.respectMotionPreferences();
    
    // Inicializa as classes de animação
    new PageTransition();
    new TextAnimations();
    
    console.log('🎬 Animações do Jericoacoara Férias carregadas com sucesso!');
});

// Exporta as classes para uso externo se necessário
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PageTransition,
        TextAnimations,
        ElementAnimations,
        AnimationUtils
    };
}

