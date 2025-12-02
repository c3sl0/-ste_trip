/* ==========================================================
   SCRIPT.JS — Site Ste_Trip (VERSÃO FINAL CORRIGIDA)
========================================================== */

(() => {
  const $ = (sel, parent = document) => parent.querySelector(sel);
  const $$ = (sel, parent = document) => Array.from(parent.querySelectorAll(sel));
  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  document.addEventListener("DOMContentLoaded", () => {
    setYear();
    initMenu();
    initThemeToggle();
    initPortfolioSliders();
    initTopButton();
    initSmoothScroll();
  });

  /* --------------------------
     Atualiza o ano no footer
  -------------------------- */
  function setYear() {
    const y = $("#year");
    if (y) y.textContent = new Date().getFullYear();
  }

  /* --------------------------
     Menu Mobile
  -------------------------- */
  function initMenu() {
    const btn = $(".nav-toggle");
    const list = $(".nav-list");
    if (!btn || !list) return;

    btn.addEventListener("click", () => list.classList.toggle("open"));
    list.querySelectorAll("a").forEach(a =>
      a.addEventListener("click", () => list.classList.remove("open"))
    );
  }

  
  /* --------------------------
     Slider do Portfólio
  -------------------------- */
  function initPortfolioSliders() {
    const sliders = $$(".slider");
    if (!sliders.length) return;

    sliders.forEach(slider => {
      const imgs = $$("img", slider);
      if (!imgs.length) return;

      let current = imgs.findIndex(i => i.classList.contains("active"));
      if (current < 0) current = 0;

      imgs.forEach((img, i) => {
        img.style.position = "absolute";
        img.style.inset = "0";
        img.style.opacity = i === current ? "1" : "0";
        img.style.transition = "opacity .6s ease, transform .6s ease";
      });

      let interval = setInterval(nextSlide, 3000);

      function nextSlide() {
        imgs[current].style.opacity = "0";
        imgs[current].classList.remove("active");

        current = (current + 1) % imgs.length;

        imgs[current].style.opacity = "1";
        imgs[current].classList.add("active");
      }

      slider.addEventListener("mouseenter", () => clearInterval(interval));
      slider.addEventListener("mouseleave", () => interval = setInterval(nextSlide, 3000));

      /* swipe no mobile */
      if (isTouch) {
        let startX = 0;
        slider.addEventListener("touchstart", e => startX = e.touches[0].clientX);
        slider.addEventListener("touchend", e => {
          const dx = e.changedTouches[0].clientX - startX;
          if (Math.abs(dx) > 50) {
            clearInterval(interval);
            current = dx < 0
              ? (current + 1) % imgs.length
              : (current - 1 + imgs.length) % imgs.length;

            imgs.forEach((img, i) => {
              img.style.opacity = i === current ? "1" : "0";
              img.classList.toggle("active", i === current);
            });

            interval = setInterval(nextSlide, 3000);
          }
        });
      }
    });
  }

  /* --------------------------
     Botão Voltar ao Topo
  -------------------------- */
  function initTopButton() {
    const btn = $("#topButton");
    if (!btn) return;

    window.addEventListener("scroll", () => {
      btn.style.display = window.scrollY > 300 ? "block" : "none";
    });

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* --------------------------
     Scroll suave
  -------------------------- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) target.scrollIntoView({ behavior: "smooth" });
      });
    });
  }
})();

/* ==========================================================
   ENVIO PARA WHATSAPP (ÚNICA FUNÇÃO FINAL)
========================================================== */

function enviarWhatsApp(numeroDestino = 5531971183321) {

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  let whatsapp = document.getElementById("whatsapp").value.trim();
  const cartao = document.getElementById("cartao").value;
  const qualCartao = document.getElementById("qualCartao").value.trim();
  const milhas = document.getElementById("milhas").value;
  const conhecimento = document.getElementById("conhecimento").value;
  const objetivo = document.getElementById("objetivo").value.trim();
  const destino = document.getElementById("destino").value;
  const viajante = document.getElementById("viajante").value;
  const duvidas = document.getElementById("duvidas").value.trim();

  /* VALIDACOES */
  if (!nome) return alert("Preencha o nome completo.");
  if (!email) return alert("Informe seu e-mail.");
  if (!whatsapp) return alert("Informe seu WhatsApp com DDD.");

  whatsapp = whatsapp.replace(/\D/g, "");
  if (whatsapp.length < 10 || whatsapp.length > 13)
    return alert("Número de WhatsApp inválido.");

  if (!objetivo) return alert("Descreva seu objetivo.");
  if (cartao === "Sim" && !qualCartao)
    return alert("Informe qual é o seu banco/cartão.");

  /* MENSAGEM */
  let mensagem = "CONSULTORIA DE MILHAS — NOVO CONTATO%0A%0A";
  mensagem += `Nome: ${nome}%0A`;
  mensagem += `Email: ${email}%0A`;
  mensagem += `WhatsApp: ${whatsapp}%0A%0A`;
  mensagem += `Tem cartão de crédito: ${cartao}%0A`;
  if (cartao === "Sim") mensagem += `Banco/Cartão: ${qualCartao}%0A`;
  mensagem += `Milhas atuais: ${milhas}%0A`;
  mensagem += `Conhecimento: ${conhecimento}%0A%0A`;
  mensagem += `Objetivo: ${objetivo}%0A`;
  mensagem += `Destino desejado: ${destino}%0A`;
  mensagem += `Tipo de viajante: ${viajante}%0A%0A`;
  if (duvidas) mensagem += `Dúvidas adicionais: ${duvidas}%0A`;

  /* ENVIO */
  window.open(`https://wa.me/${numeroDestino}?text=${mensagem}`, "_blank");
}


function enviarWhatsApp(numeroDestino) {
  const nome = document.getElementById("nome").value.trim();
  const whatsapp = document.getElementById("whatsapp").value.trim();
  const objetivo = document.getElementById("objetivo").value.trim();

  // ==== VALIDAÇÕES ====

  if (nome.length < 3) {
      alert("Por favor, digite seu nome completo.");
      return;
  }

  // Apenas números no WhatsApp
  const wppLimpo = whatsapp.replace(/\D/g, "");

  if (wppLimpo.length < 10) {
      alert("Digite um número de WhatsApp válido (DDD + número).");
      return;
  }

  if (objetivo.length < 5) {
      alert("Descreva seu objetivo com a mentoria.");
      return;
  }

  // ==== MONTAR MENSAGEM ====

  const msg = 
`🔥 *PEDIDO DE MENTORIA*

👤 Nome: ${nome}
📞 WhatsApp: ${whatsapp}
🎯 Objetivo: ${objetivo}

Quero entrar na mentoria!`;

  const url = `https://wa.me/${numeroDestino}?text=${encodeURIComponent(msg)}`;

  // Abrir no WhatsApp
  window.open(url, "_blank");
}
