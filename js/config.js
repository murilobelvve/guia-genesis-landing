/* Configuração comercial central — Projeto Bíblico / Guia Ilustrado de Gênesis.
   Edite SÓ este arquivo para atualizar preço, links e dados de contato.
   Campos vazios ("") são tratados como "ainda não configurado" pelo site — nunca invente valores aqui. */
window.SITE_CONFIG = {
  product: {
    name: "Guia Ilustrado de Gênesis",
    subtitle: "A Origem de Tudo",
    tagline: "Uma jornada visual pelos 50 capítulos do primeiro livro da Bíblia.",
    priceCurrent: 19.90,
    priceRegular: 29.90,
    currency: "R$",
    format: "PDF digital",
  },
  links: {
    // URL do checkout oficial (Hotmart, Kiwify, Stripe Payment Link, etc). Vazio = botão fica em estado "em configuração".
    // Stripe Payment Link — MODO LIVE. Pagamentos feitos aqui são cobrados de verdade.
    checkoutUrl: "https://buy.stripe.com/cNidR906K7zv48F3Ox0oO20",
    // Amostra gratuita real, já existe neste projeto — caminho relativo dentro do próprio site.
    freeSampleUrl: "downloads/Genesis_Amostra_Gratuita_3_Paginas.pdf",
    // E-mail/canal oficial de contato. Vazio = seção de contato no rodapé/FAQ fica genérica, sem inventar endereço.
    contactEmail: "",
    privacyUrl: "",
    termsUrl: "",
  },
  brand: {
    name: "Projeto Bíblico",
    logoSrc: "assets/logo.png",
  },
  previews: {
    cover: "assets/ebook-cover.png",
    chapter: "previews/capitulo-07.png",
    characters: "previews/personagens-35.png",
    questions: "previews/perguntas-38.png",
  },
  // Nenhuma ferramenta de analytics de terceiros está instalada. Os eventos abaixo só disparam
  // CustomEvents no próprio navegador (ver js/main.js) e um log no console — nada é enviado a
  // nenhum servidor. Ligue uma ferramenta real (GA4, Meta Pixel, Plausible...) e documente aqui.
  analytics: {
    provider: null,
  },
};
