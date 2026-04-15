// Fix para o link "Não, obrigado" no modal funcionar corretamente
(function() {
    'use strict';
    
    // Aguarda o DOM carregar
    function fixModalLinks() {
        // Procura por links dentro de modais
        const modalLinks = document.querySelectorAll('[role="dialog"] a[href*="checkout"]');
        
        modalLinks.forEach(function(link) {
            // Se o link contém "Não, obrigado" ou é o link do básico
            if (link.textContent.includes('Não, obrigado') || 
                link.textContent.includes('básico') ||
                link.href.includes('LPPicbnsmSlmaxhMVUuW')) {
                
                // Remove event listeners antigos
                const newLink = link.cloneNode(true);
                link.parentNode.replaceChild(newLink, link);
                
                // Adiciona novo listener que força o redirecionamento
                newLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    
                    const url = this.getAttribute('href');
                    
                    // Fecha o modal primeiro
                    const modal = this.closest('[role="dialog"]');
                    if (modal) {
                        modal.style.display = 'none';
                        
                        // Remove o overlay
                        const overlay = document.querySelector('.fixed.inset-0.z-50.bg-black\\/40');
                        if (overlay) {
                            overlay.style.display = 'none';
                        }
                    }
                    
                    // Redireciona imediatamente
                    setTimeout(function() {
                        window.location.href = url;
                    }, 100);
                    
                    return false;
                }, true);
            }
        });
    }
    
    // Executa quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(fixModalLinks, 1000);
            // Continua verificando a cada 2 segundos
            setInterval(fixModalLinks, 2000);
        });
    } else {
        setTimeout(fixModalLinks, 1000);
        setInterval(fixModalLinks, 2000);
    }
    
    // Também observa mudanças no DOM
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === 1) {
                    if (node.getAttribute && node.getAttribute('role') === 'dialog') {
                        setTimeout(fixModalLinks, 500);
                    }
                }
            });
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
})();
