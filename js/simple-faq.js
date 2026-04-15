// FAQ Simples - Solução definitiva
document.addEventListener('DOMContentLoaded', function() {
    
    // Aguarda 2 segundos para garantir que o React renderizou
    setTimeout(function() {
        
        // Remove a seção de FAQ bugada do React
        const oldFAQ = Array.from(document.querySelectorAll('section')).find(section => {
            const h2 = section.querySelector('h2');
            return h2 && h2.textContent.includes('Dúvidas Frequentes');
        });
        
        if (!oldFAQ) return;
        
        // Cria a nova seção HTML pura
        const newFAQ = document.createElement('section');
        newFAQ.className = 'w-full py-16 md:py-24 bg-white';
        newFAQ.innerHTML = `
            <div class="container mx-auto px-4 md:px-6">
                <div class="text-center mb-12">
                    <h2 class="text-3xl md:text-4xl font-bold">Dúvidas Frequentes</h2>
                </div>
                
                <div class="max-w-3xl mx-auto space-y-4">
                    
                    <!-- Pergunta 1 -->
                    <div class="faq-card border border-green-200 rounded-lg bg-white shadow-sm overflow-hidden">
                        <div class="faq-header p-6 cursor-pointer hover:bg-gray-50 flex justify-between items-center" onclick="toggleFAQ(this)">
                            <h3 class="text-lg font-semibold text-gray-800">Este material é seguro para crianças?</h3>
                            <svg class="faq-arrow w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </div>
                        <div class="faq-content" style="display: none;">
                            <div class="px-6 pb-6 text-base text-gray-600">
                                Sim, todas as dinâmicas foram desenvolvidas pensando na segurança e bem-estar das crianças, utilizando abordagens lúdicas e educativas, apropriadas para a faixa etária e sem riscos.
                            </div>
                        </div>
                    </div>
                    
                    <!-- Pergunta 2 -->
                    <div class="faq-card border border-green-200 rounded-lg bg-white shadow-sm overflow-hidden">
                        <div class="faq-header p-6 cursor-pointer hover:bg-gray-50 flex justify-between items-center" onclick="toggleFAQ(this)">
                            <h3 class="text-lg font-semibold text-gray-800">Para qual idade o material é indicado?</h3>
                            <svg class="faq-arrow w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </div>
                        <div class="faq-content" style="display: none;">
                            <div class="px-6 pb-6 text-base text-gray-600">
                                O material é indicado para crianças de 7 a 14 anos, mas pode ser adaptado para idades um pouco mais novas ou mais velhas, dependendo do grupo.
                            </div>
                        </div>
                    </div>
                    
                    <!-- Pergunta 3 -->
                    <div class="faq-card border border-green-200 rounded-lg bg-white shadow-sm overflow-hidden">
                        <div class="faq-header p-6 cursor-pointer hover:bg-gray-50 flex justify-between items-center" onclick="toggleFAQ(this)">
                            <h3 class="text-lg font-semibold text-gray-800">Preciso de experiência para aplicar as dinâmicas?</h3>
                            <svg class="faq-arrow w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </div>
                        <div class="faq-content" style="display: none;">
                            <div class="px-6 pb-6 text-base text-gray-600">
                                Não! As dinâmicas são autoexplicativas, com um passo a passo claro e objetivo, permitindo que qualquer pessoa possa aplicá-las sem dificuldade.
                            </div>
                        </div>
                    </div>
                    
                    <!-- Pergunta 4 -->
                    <div class="faq-card border border-green-200 rounded-lg bg-white shadow-sm overflow-hidden">
                        <div class="faq-header p-6 cursor-pointer hover:bg-gray-50 flex justify-between items-center" onclick="toggleFAQ(this)">
                            <h3 class="text-lg font-semibold text-gray-800">Como recebo o acesso ao material?</h3>
                            <svg class="faq-arrow w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </div>
                        <div class="faq-content" style="display: none;">
                            <div class="px-6 pb-6 text-base text-gray-600">
                                O acesso é imediato após a confirmação do pagamento. Você receberá um e-mail com todas as instruções para baixar o material em PDF.
                            </div>
                        </div>
                    </div>
                    
                </div>
                
                <div class="text-center mt-12">
                    <a href="#pricing" class="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 rounded-md px-8 w-full max-w-md mx-auto text-lg font-bold bg-green-500 hover:bg-green-600 text-white animate-pulse-cta">
                        Tirei minhas dúvidas, quero comprar!
                    </a>
                </div>
                
                <div class="max-w-3xl mx-auto text-center mt-16">
                    <h3 class="text-2xl font-bold mb-4">Precisa de Ajuda? 👆</h3>
                    <p class="text-gray-600">
                        Se tiver qualquer dúvida sobre o produto, acesso ou pagamento, nossa equipe está pronta para te ajudar. 
                        Entre em contato pelo e-mail 
                        <a href="mailto:dinamicasinterativas@gmail.com" class="text-blue-600 hover:underline">dinamicasinterativas@gmail.com</a> 
                        e responderemos o mais rápido possível.
                    </p>
                    <p class="text-xs text-gray-500 mt-12">
                        Pirataria é <span class="font-bold text-red-500">crime!</span> 
                        A venda do Produto só pode ser realizada através deste site. Qualquer outro site onde você encontre este produto é uma FALSIFICAÇÃO e vai contra as leis. 
                        Evite falsificações e recuse conteúdos ilegais ou pirateados. NÃO adquira programas parecidos e que não são baseados em anos de estudo da psicologia comportamental. 
                        Não nos responsabilizamos por compras realizadas em outros sites.
                    </p>
                </div>
            </div>
        `;
        
        // Substitui a seção antiga pela nova
        oldFAQ.parentNode.replaceChild(newFAQ, oldFAQ);
        
    }, 2000);
    
});

// Função global para toggle do FAQ
function toggleFAQ(header) {
    const card = header.parentElement;
    const content = card.querySelector('.faq-content');
    const arrow = header.querySelector('.faq-arrow');
    
    // Fecha todos os outros
    document.querySelectorAll('.faq-content').forEach(function(item) {
        if (item !== content) {
            item.style.display = 'none';
            item.parentElement.querySelector('.faq-arrow').style.transform = 'rotate(0deg)';
        }
    });
    
    // Toggle do atual
    if (content.style.display === 'none') {
        content.style.display = 'block';
        arrow.style.transform = 'rotate(180deg)';
    } else {
        content.style.display = 'none';
        arrow.style.transform = 'rotate(0deg)';
    }
}
