/* ==========================================================
   SCRIPT.JS — Site Ste_Trip Unificado
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
    list.querySelectorAll("a").forEach(a => a.addEventListener("click", () => list.classList.remove("open")));
  }

  /* --------------------------
     Tema Light / Dark
  -------------------------- */
  function initThemeToggle() {
    const nav = $(".nav-wrapper");
    if (!nav) return;

    let btn = $(".theme-toggle");
    if (!btn) {
      btn = document.createElement("button");
      btn.className = "theme-toggle";
      btn.textContent = "🌙";
      nav.appendChild(btn);
    }

    btn.addEventListener("click", toggleTheme);

    const saved = localStorage.getItem("ste_trip_theme");
    if (saved) applyTheme(saved);
    else applyTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }

  function applyTheme(mode) {
    document.documentElement.classList.toggle("dark", mode === "dark");
    localStorage.setItem("ste_trip_theme", mode);
    const btn = $(".theme-toggle");
    if (btn) btn.textContent = mode === "dark" ? "☀️" : "🌙";
  }

  function toggleTheme() {
    const isDark = document.documentElement.classList.contains("dark");
    applyTheme(isDark ? "light" : "dark");
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
        img.style.willChange = "opacity, transform";
      });

      let interval = setInterval(nextSlide, 3000);

      function nextSlide() {
        if (!imgs.length) return;
        imgs[current].style.opacity = "0";
        imgs[current].classList.remove("active");
        current = (current + 1) % imgs.length;
        imgs[current].style.opacity = "1";
        imgs[current].classList.add("active");
      }

      slider.addEventListener("mouseenter", () => clearInterval(interval));
      slider.addEventListener("mouseleave", () => interval = setInterval(nextSlide, 3000));

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
     Scroll suave para links internos
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

/* --------------------------
   Envio do Formulário via WhatsApp
-------------------------- */
function enviarWhatsApp() {
  const nome = document.getElementById("nome").value.trim();
  const whatsapp = document.getElementById("whatsapp").value.trim();
  const objetivo = document.getElementById("objetivo").value.trim();
  if (!nome || !whatsapp || !objetivo) {
    alert("Por favor, preencha os campos obrigatórios: Nome, WhatsApp e Objetivo.");
    return;
  }
  const msg = `Olá, meu nome é ${nome}. ${objetivo}`;
  window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
}



function enviarWhatsApp() {
  const nome = document.getElementById("nome").value;
  const whatsapp = document.getElementById("whatsapp").value;
  const objetivo = document.getElementById("objetivo").value;
  let msg = `Olá, meu nome é ${nome}. ${objetivo}`;
  window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
}

(() => {
  const $ = (sel, parent = document) => parent.querySelector(sel);
  const $$ = (sel, parent = document) => Array.from(parent.querySelectorAll(sel));
  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  document.addEventListener("DOMContentLoaded", () => {
    setYear();
    initMenu();
    initPortfolioSliders();
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
     Menu Mobile Toggle
  -------------------------- */
  function initMenu() {
    const btn = $(".nav-toggle");
    const list = $(".nav-list");
    if (!btn || !list) return;
    btn.addEventListener("click", () => list.classList.toggle("open"));
    list.querySelectorAll("a").forEach(a => a.addEventListener("click", () => list.classList.remove("open")));
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
        img.style.transition = "opacity .6s ease";
        img.style.willChange = "opacity";
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
            imgs.forEach((img, i) => img.style.opacity = i === current ? "1" : "0");
            imgs.forEach((img, i) => img.classList.toggle("active", i === current));
            interval = setInterval(nextSlide, 3000);
          }
        });
      }
    });
  }

  /* --------------------------
     Scroll suave para links internos
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

/* --------------------------
   Envio de WhatsApp
-------------------------- */
function enviarWhatsApp() {
  const nome = document.getElementById("nome").value;
  const whatsapp = document.getElementById("whatsapp").value.replace(/\D/g,''); // remove caracteres não numéricos
  const objetivo = document.getElementById("objetivo").value;
  if (!nome || !whatsapp || !objetivo) {
    alert("Por favor, preencha os campos obrigatórios.");
    return;
  }
  const msg = `Olá, meu nome é ${nome}. ${objetivo}`;
  window.open(`https://wa.me/55${whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
}
