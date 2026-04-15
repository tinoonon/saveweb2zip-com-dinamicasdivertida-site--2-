// Fix para remover a scrollbar amarela quando o modal abre
(function() {
    'use strict';
    
    // Função para bloquear o scroll
    function blockScroll() {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = scrollbarWidth + 'px';
        document.documentElement.style.overflow = 'hidden';
    }
    
    // Função para desbloquear o scroll
    function unblockScroll() {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        document.documentElement.style.overflow = '';
    }
    
    // Observer para detectar quando o modal abre/fecha
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === 1) {
                    // Verifica se é o overlay do modal (fundo escuro) E tem o atributo data-state
                    if (node.classList && (
                        node.classList.contains('fixed') && 
                        node.classList.contains('inset-0') &&
                        node.classList.contains('z-50') &&
                        node.classList.contains('bg-black/40')
                    )) {
                        blockScroll();
                    }
                    
                    // Verifica se é o conteúdo do modal (não accordion)
                    if (node.getAttribute && 
                        node.getAttribute('role') === 'dialog' &&
                        !node.closest('[data-orientation="vertical"]')) {
                        blockScroll();
                    }
                }
            });
            
            mutation.removedNodes.forEach(function(node) {
                if (node.nodeType === 1) {
                    // Verifica se o modal foi removido
                    if (node.classList && (
                        node.classList.contains('fixed') && 
                        node.classList.contains('inset-0') &&
                        node.classList.contains('z-50') &&
                        node.classList.contains('bg-black/40')
                    )) {
                        unblockScroll();
                    }
                    
                    if (node.getAttribute && 
                        node.getAttribute('role') === 'dialog' &&
                        !node.closest('[data-orientation="vertical"]')) {
                        unblockScroll();
                    }
                }
            });
        });
    });
    
    // Inicia o observer quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    } else {
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // Também adiciona listeners para os botões que abrem o modal
    document.addEventListener('click', function(e) {
        const target = e.target;
        const button = target.closest('button');
        
        // Ignora cliques em accordions
        if (target.closest('[data-orientation="vertical"]')) {
            return;
        }
        
        if (button && button.textContent.includes('QUERO COMPRAR')) {
            // Aguarda um pouco para o modal abrir
            setTimeout(function() {
                const modal = document.querySelector('[role="dialog"]');
                if (modal && !modal.closest('[data-orientation="vertical"]')) {
                    blockScroll();
                }
            }, 100);
        }
    });
    
})();

