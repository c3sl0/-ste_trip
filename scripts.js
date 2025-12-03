


document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formMilhas");
  const btn = document.getElementById("btnWhatsApp");

  if (!form || !btn) return;

  btn.addEventListener("click", () => {
    // Campos obrigatórios
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const whatsapp = document.getElementById("whatsapp").value.trim();
    const objetivo = document.getElementById("objetivo").value.trim();
    const cartao = document.getElementById("cartao").value;
    const qualCartao = document.getElementById("qualCartao").value.trim();

    // Validação
    if (!nome || !email || !whatsapp || !objetivo) {
      alert("Por favor, preencha todos os campos obrigatórios (*)");
      return;
    }

    if (cartao === "Sim" && !qualCartao) {
      alert("Por favor, informe qual cartão de crédito você possui.");
      return;
    }

    const wppLimpo = whatsapp.replace(/\D/g, "");
    if (wppLimpo.length < 10) {
      alert("Por favor, informe um número de WhatsApp válido.");
      return;
    }

    // Campos opcionais
    const milhas = document.getElementById("milhas").value;
    const conhecimento = document.getElementById("conhecimento").value;
    const destino = document.getElementById("destino").value;
    const viajante = document.getElementById("viajante").value;
    const duvidas = document.getElementById("duvidas").value.trim();

    // Monta a mensagem
    let mensagem = `Olá! Gostaria de uma consultoria de milhas.

Nome: ${nome}
E-mail: ${email}
WhatsApp: ${whatsapp}
Possui cartão de crédito: ${cartao}
${cartao === "Sim" ? `Qual cartão: ${qualCartao}\n` : ""}
Milhas atuais: ${milhas}
Conhecimento sobre milhas: ${conhecimento}
Objetivo da consultoria: ${objetivo}
Destino desejado: ${destino}
Tipo de viajante: ${viajante}
${duvidas ? `Dúvidas adicionais: ${duvidas}` : ""}`;

    // Número do WhatsApp (formato internacional)
    const numeroDestino = "553171183321"; // substitua pelo número real

    // Redireciona para WhatsApp
    window.open(`https://wa.me/${numeroDestino}?text=${encodeURIComponent(mensagem)}`, "_blank");

    // Limpa o formulário
    form.reset();
  });
});










document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnMentoria");
  const form = document.getElementById("formMentoria");

  btn.addEventListener("click", () => {
    const nome = document.getElementById("nome").value.trim();
    const whatsapp = document.getElementById("whatsapp").value.trim();
    const objetivo = document.getElementById("objetivo").value.trim();

    // Número do WhatsApp da mentoria (em formato internacional)
    const numeroDestino = "5531971183321";

    // Monta a mensagem
    const mensagem = `Olá! Quero participar da mentoria.
Nome: ${nome}
WhatsApp: ${whatsapp}
Objetivo: ${objetivo}`;

    // Abre WhatsApp
    window.open(`https://wa.me/${numeroDestino}?text=${encodeURIComponent(mensagem)}`, "_blank");

    // Limpa formulário
    form.reset();
  });
});







