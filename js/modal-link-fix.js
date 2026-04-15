// Fix para o link "Não, obrigado" no modal funcionar corretamente
(function() {
    'use strict';
    
    // Intercepta TODOS os cliques no documento
    document.addEventListener('click', function(e) {
        const target = e.target;
        
        // Verifica se clicou em um link ou em qualquer elemento dentro do link
        const link = target.closest('a[href*="LPPicbnsmSlmaxhMVUuW"]');
        
        if (link) {
            // Verifica se está dentro de um modal
            const modal = link.closest('[role="dialog"]');
            
            if (modal) {
                // FORÇA o redirecionamento
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                
                const url = link.getAttribute('href');
                
                console.log('Redirecionando para:', url);
                
                // Redireciona IMEDIATAMENTE
                window.location.href = url;
                
                return false;
            }
        }
    }, true); // Capture phase - executa ANTES de qualquer outro handler
    
    // Também intercepta no bubbling phase
    document.addEventListener('click', function(e) {
        const target = e.target;
        const link = target.closest('a[href*="LPPicbnsmSlmaxhMVUuW"]');
        
        if (link && link.closest('[role="dialog"]')) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            
            const url = link.getAttribute('href');
            window.location.href = url;
            
            return false;
        }
    }, false);
    
    // Adiciona um listener direto no body para garantir
    document.body.addEventListener('click', function(e) {
        const target = e.target;
        
        // Verifica se o texto contém "Não, obrigado"
        if (target.textContent && target.textContent.includes('Não, obrigado')) {
            const link = target.closest('a');
            
            if (link) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                
                const url = link.getAttribute('href');
                
                if (url) {
                    console.log('Forçando redirecionamento:', url);
                    window.location.href = url;
                }
                
                return false;
            }
        }
    }, true);
    
})();
