/**
 * ARQUIVO JAVASCRIPT PRINCIPAL - JERICOACOARA FÉRIAS
 * ========================================================================
 * ÍNDICE:
 * 1. Inicialização
 * 2. Menu Mobile
 * 3. Navegação Suave
 * 4. Efeitos de Scroll
 * 5. Slider de Parceiros
 * ========================================================================
 */

/**
 * 1. INICIALIZAÇÃO
 * ========================================================================
 * 
 * Executa quando o DOM estiver completamente carregado
 */
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa o menu mobile
    initMobileMenu();
    
    // Inicializa a navegação suave
    initSmoothScroll();
    
    // Inicializa os efeitos de scroll
    initScrollEffects();
    
    // Inicializa o slider de parceiros
    initPartnersSlider();
    
    // Adiciona classe para destacar os links do menu
    initMenuHighlight();
});

/**
 * 2. MENU MOBILE
 * ========================================================================
 * 
 * Controla o comportamento do menu em dispositivos móveis
 */
function initMobileMenu() {
    // Seleciona o botão de toggle do menu
    const menuToggle = document.querySelector('.menu-toggle');
    // Seleciona o menu
    const menu = document.querySelector('.menu');
    
    // Se o botão de toggle existir
    if (menuToggle) {
        // Adiciona um evento de clique
        menuToggle.addEventListener('click', function() {
            // Alterna a classe 'active' no menu
            menu.classList.toggle('active');
            // Alterna o ícone entre hambúrguer e X
            this.innerHTML = menu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' // Ícone X quando menu aberto
                : '<i class="fas fa-bars"></i>'; // Ícone hambúrguer quando menu fechado
        });
    }
    
    // Fecha o menu ao clicar em um link (para mobile)
    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Se o menu estiver ativo (mobile)
            if (menu.classList.contains('active')) {
                // Remove a classe 'active'
                menu.classList.remove('active');
                // Restaura o ícone de hambúrguer
                if (menuToggle) {
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });
}

/**
 * 3. NAVEGAÇÃO SUAVE
 * ========================================================================
 * 
 * Permite rolagem suave para links internos
 */
function initSmoothScroll() {
    // Seleciona todos os links que começam com # (links internos)
    const links = document.querySelectorAll('a[href^="#"]');
    
    // Para cada link
    links.forEach(link => {
        // Adiciona um evento de clique
        link.addEventListener('click', function(e) {
            // Previne o comportamento padrão
            e.preventDefault();
            
            // Obtém o alvo do link (remove o # do href)
            const targetId = this.getAttribute('href').substring(1);
            // Seleciona o elemento alvo
            const targetElement = document.getElementById(targetId);
            
            // Se o elemento alvo existir
            if (targetElement) {
                // Calcula a posição do elemento
                const offsetTop = targetElement.offsetTop - 80; // 80px para compensar o cabeçalho fixo
                
                // Rola suavemente até o elemento
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * 4. EFEITOS DE SCROLL
 * ========================================================================
 * 
 * Adiciona efeitos visuais durante a rolagem
 */
function initScrollEffects() {
    // Seleciona o cabeçalho
    const header = document.querySelector('header');
    
    // Função para verificar a posição do scroll
    function checkScroll() {
        // Se a posição do scroll for maior que 100px
        if (window.scrollY > 100) {
            // Adiciona a classe 'scrolled' ao cabeçalho
            header.classList.add('scrolled');
        } else {
            // Remove a classe 'scrolled' do cabeçalho
            header.classList.remove('scrolled');
        }
    }
    
    // Verifica a posição do scroll ao carregar a página
    checkScroll();
    
    // Adiciona um evento de scroll
    window.addEventListener('scroll', checkScroll);
}

/**
 * 5. SLIDER DE PARCEIROS
 * ========================================================================
 * 
 * Controla o carrossel de logos de parceiros
 */
function initPartnersSlider() {
    // Seleciona o container do slider
    const slider = document.querySelector('.parceiros-slider');
    
    // Se o slider existir
    if (slider) {
        // Seleciona todos os itens do slider
        const items = slider.querySelectorAll('.parceiro-item');
        // Índice atual
        let currentIndex = 0;
        // Número de itens visíveis por vez (responsivo)
        let visibleItems = getVisibleItems();
        
        // Função para obter o número de itens visíveis com base na largura da tela
        function getVisibleItems() {
            if (window.innerWidth < 768) {
                return 1; // Mobile: 1 item
            } else if (window.innerWidth < 992) {
                return 2; // Tablet: 2 itens
            } else {
                return 4; // Desktop: 4 itens
            }
        }
        
        // Função para atualizar o slider
        function updateSlider() {
            // Para cada item
            items.forEach((item, index) => {
                // Se o índice estiver dentro do intervalo visível
                if (index >= currentIndex && index < currentIndex + visibleItems) {
                    // Mostra o item
                    item.style.display = 'block';
                } else {
                    // Esconde o item
                    item.style.display = 'none';
                }
            });
        }
        
        // Função para avançar o slider
        function nextSlide() {
            // Incrementa o índice atual
            currentIndex++;
            // Se o índice for maior que o número de itens menos os visíveis
            if (currentIndex > items.length - visibleItems) {
                // Volta para o início
                currentIndex = 0;
            }
            // Atualiza o slider
            updateSlider();
        }
        
        // Atualiza o slider inicialmente
        updateSlider();
        
        // Configura um intervalo para avançar o slider automaticamente
        setInterval(nextSlide, 3000); // A cada 3 segundos
        
        // Atualiza o número de itens visíveis quando a janela é redimensionada
        window.addEventListener('resize', function() {
            // Atualiza o número de itens visíveis
            visibleItems = getVisibleItems();
            // Atualiza o slider
            updateSlider();
        });
    }
}

/**
 * 6. DESTAQUE DO MENU
 * ========================================================================
 * 
 * Adiciona classe para destacar os links do menu
 */
function initMenuHighlight() {
    // Seleciona todos os links do menu com a classe menu-destacado
    const menuLinks = document.querySelectorAll('.menu-destacado');
    
    // Para cada link
    menuLinks.forEach(link => {
        // Adiciona estilos para destacar o link
        link.style.fontWeight = '600';
        link.style.fontSize = '1.1rem';
        link.style.padding = '10px 20px';
        link.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        
        // Adiciona evento de hover
        link.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-3px)';
                this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
            }
        });
        
        // Remove efeito de hover
        link.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            }
        });
    });
}
