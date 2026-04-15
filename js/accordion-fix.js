// Fix completo do accordion de Dúvidas Frequentes
(function () {
  'use strict';

  // Respostas das perguntas frequentes
  var faqAnswers = {
    'Este material é seguro para crianças?':
      'Sim, todas as dinâmicas foram desenvolvidas pensando na segurança e bem-estar das crianças, utilizando abordagens lúdicas e educativas, apropriadas para a faixa etária e sem riscos.',
    'Para qual idade o material é indicado?':
      'O material é indicado para crianças de 7 a 14 anos, mas pode ser adaptado para idades um pouco mais novas ou mais velhas, dependendo do grupo.',
    'Preciso de experiência para aplicar as dinâmicas?':
      'Não! As dinâmicas são autoexplicativas, com um passo a passo claro e objetivo, permitindo que qualquer pessoa possa aplicá-las sem dificuldade.',
    'Como recebo o acesso ao material?':
      'O acesso é imediato após a confirmação do pagamento. Você receberá um e-mail com todas as instruções para baixar o material em PDF.',
  };

  function initAccordion() {
    var items = document.querySelectorAll('[data-orientation="vertical"][data-state]');

    items.forEach(function (item) {
      var button = item.querySelector('button[data-orientation="vertical"]');
      var content = item.querySelector('[role="region"]');

      if (!button || !content) return;

      // Injeta a resposta no conteúdo se estiver vazio
      var questionText = button.textContent.trim().replace(/[\u25bc\u25b2]/, '').trim();
      // Remove o ícone de chevron do texto
      var cleanQuestion = '';
      var svgIndex = button.innerHTML.indexOf('<svg');
      if (svgIndex > -1) {
        cleanQuestion = button.innerHTML.substring(0, svgIndex).trim();
        // Remove tags HTML residuais
        var tmp = document.createElement('div');
        tmp.innerHTML = cleanQuestion;
        cleanQuestion = tmp.textContent.trim();
      } else {
        cleanQuestion = questionText;
      }

      var answer = faqAnswers[cleanQuestion];
      if (answer && content.innerHTML.trim() === '') {
        content.innerHTML =
          '<div style="padding: 0 24px 24px; color: #4b5563; line-height: 1.6;">' +
          answer +
          '</div>';
      }

      // Remove listeners antigos clonando o botão
      var newButton = button.cloneNode(true);
      button.parentNode.replaceChild(newButton, button);
      button = newButton;

      // Garante estado inicial fechado
      item.setAttribute('data-state', 'closed');
      button.setAttribute('data-state', 'closed');
      button.setAttribute('aria-expanded', 'false');
      content.removeAttribute('hidden');
      content.style.display = 'none';
      content.setAttribute('data-state', 'closed');

      button.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        var isOpen = item.getAttribute('data-state') === 'open';

        // Fecha todos os outros itens
        items.forEach(function (otherItem) {
          if (otherItem !== item) {
            var otherBtn = otherItem.querySelector('button[data-orientation="vertical"]');
            var otherContent = otherItem.querySelector('[role="region"]');
            otherItem.setAttribute('data-state', 'closed');
            if (otherBtn) {
              otherBtn.setAttribute('data-state', 'closed');
              otherBtn.setAttribute('aria-expanded', 'false');
            }
            if (otherContent) {
              otherContent.setAttribute('data-state', 'closed');
              otherContent.style.display = 'none';
            }
          }
        });

        // Alterna o item clicado
        if (isOpen) {
          item.setAttribute('data-state', 'closed');
          button.setAttribute('data-state', 'closed');
          button.setAttribute('aria-expanded', 'false');
          content.setAttribute('data-state', 'closed');
          content.style.display = 'none';
        } else {
          item.setAttribute('data-state', 'open');
          button.setAttribute('data-state', 'open');
          button.setAttribute('aria-expanded', 'true');
          content.setAttribute('data-state', 'open');
          content.style.display = 'block';
        }
      });
    });
  }

  // Executa quando o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAccordion);
  } else {
    initAccordion();
  }

  // Observa o DOM caso o React injete os elementos depois
  var observer = new MutationObserver(function (mutations) {
    var shouldInit = false;
    mutations.forEach(function (m) {
      m.addedNodes.forEach(function (node) {
        if (
          node.nodeType === 1 &&
          (node.hasAttribute('data-orientation') ||
            node.querySelector('[data-orientation="vertical"]'))
        ) {
          shouldInit = true;
        }
      });
    });
    if (shouldInit) {
      initAccordion();
    }
  });

  if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      observer.observe(document.body, { childList: true, subtree: true });
    });
  }
})();
