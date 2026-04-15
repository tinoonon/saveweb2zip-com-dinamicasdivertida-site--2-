// Fix para prevenir que o accordion role a página para o topo
(function() {
    'use strict';
    
    function preventAccordionScroll() {
        // Encontra todos os botões do accordion
        const accordionButtons = document.querySelectorAll('[data-orientation="vertical"] button');
        
        accordionButtons.forEach(function(button) {
            // Remove qualquer listener anterior
            button.removeEventListener('click', handleAccordionClick);
            // Adiciona o novo listener
            button.addEventListener('click', handleAccordionClick);
        });
    }
    
    function handleAccordionClick(e) {
        // Previne o comportamento padrão que causa o scroll
        e.preventDefault();
        e.stopPropagation();
        
        const button = e.currentTarget;
        const accordionItem = button.closest('[data-state]');
        
        if (accordionItem) {
            const currentState = accordionItem.getAttribute('data-state');
            
            // Simula o toggle do accordion sem causar scroll
            if (currentState === 'closed') {
                accordionItem.setAttribute('data-state', 'open');
                button.setAttribute('data-state', 'open');
                button.setAttribute('aria-expanded', 'true');
                
                // Encontra e mostra o conteúdo
                const content = accordionItem.querySelector('[role="region"]');
                if (content) {
                    content.setAttribute('data-state', 'open');
                    content.style.display = 'block';
                }
            } else {
                accordionItem.setAttribute('data-state', 'closed');
                button.setAttribute('data-state', 'closed');
                button.setAttribute('aria-expanded', 'false');
                
                // Encontra e esconde o conteúdo
                const content = accordionItem.querySelector('[role="region"]');
                if (content) {
                    content.setAttribute('data-state', 'closed');
                }
            }
        }
        
        return false;
    }
    
    // Executa quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', preventAccordionScroll);
    } else {
        preventAccordionScroll();
    }
    
    // Também observa mudanças no DOM para novos accordions
    const observer = new MutationObserver(function(mutations) {
        let shouldUpdate = false;
        
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === 1 && 
                    (node.hasAttribute('data-orientation') || 
                     node.querySelector('[data-orientation="vertical"]'))) {
                    shouldUpdate = true;
                }
            });
        });
        
        if (shouldUpdate) {
            preventAccordionScroll();
        }
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
})();
