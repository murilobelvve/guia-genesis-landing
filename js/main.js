(function () {
  "use strict";
  var cfg = window.SITE_CONFIG;

  /* ---------- analytics event stub ----------
     Nenhum serviço externo está conectado. Isso só despacha um CustomEvent local e loga no
     console, para que uma ferramenta real (GA4, Meta Pixel, Plausible...) possa ser plugada
     depois só escutando "pb:track" em window, sem reescrever o resto do site. */
  function track(eventName, detail) {
    try {
      window.dispatchEvent(new CustomEvent("pb:track", { detail: Object.assign({ event: eventName }, detail || {}) }));
      if (window.console && console.info) console.info("[analytics-stub]", eventName, detail || {});
    } catch (e) { /* nunca quebra a página por causa de tracking */ }
  }
  window.pbTrack = track;

  function fmtPrice(v) {
    return cfg.product.currency + " " + v.toFixed(2).replace(".", ",");
  }

  document.addEventListener("DOMContentLoaded", function () {
    /* preço */
    document.querySelectorAll("[data-price-current]").forEach(function (el) { el.textContent = fmtPrice(cfg.product.priceCurrent); });
    document.querySelectorAll("[data-price-regular]").forEach(function (el) { el.textContent = fmtPrice(cfg.product.priceRegular); });

    /* amostra gratuita — link real, sempre funcional */
    document.querySelectorAll("[data-sample-link]").forEach(function (el) {
      el.href = cfg.links.freeSampleUrl;
      el.addEventListener("click", function () { track("free_sample_click"); });
    });

    /* botão de compra — some para estado desabilitado/honesto se não há checkout configurado */
    document.querySelectorAll("[data-buy-button]").forEach(function (el) {
      if (cfg.links.checkoutUrl) {
        el.href = cfg.links.checkoutUrl;
        el.addEventListener("click", function () { track("buy_click"); });
      } else {
        el.setAttribute("aria-disabled", "true");
        el.classList.add("is-pending");
        el.removeAttribute("href");
        el.setAttribute("role", "button");
        el.setAttribute("tabindex", "0");
        var msg = document.createElement("span");
        msg.className = "pending-note";
        msg.textContent = "A compra está sendo configurada — volte em breve.";
        el.insertAdjacentElement("afterend", msg);
        function showPending() { track("buy_click_pending"); msg.classList.add("is-visible"); }
        el.addEventListener("click", function (e) { e.preventDefault(); showPending(); });
        el.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); showPending(); } });
      }
    });

    /* FAQ acessível por teclado (botão nativo + aria-expanded) */
    document.querySelectorAll(".faq-item").forEach(function (item) {
      var btn = item.querySelector(".faq-q");
      var panel = item.querySelector(".faq-a");
      var id = "faq-" + Math.random().toString(36).slice(2, 8);
      panel.id = id;
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-controls", id);
      btn.addEventListener("click", function () {
        var open = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!open));
        item.classList.toggle("is-open", !open);
        if (!open) track("faq_open", { question: btn.textContent.trim() });
      });
    });

    /* seção de oferta: evento de visualização (Intersection Observer, sem libs externas) */
    var offerSection = document.getElementById("oferta");
    if (offerSection && "IntersectionObserver" in window) {
      var seen = false;
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting && !seen) { seen = true; track("offer_view"); io.disconnect(); }
        });
      }, { threshold: 0.4 });
      io.observe(offerSection);
    }

    /* respeita prefers-reduced-motion: nenhuma animação de scroll/parallax é usada,
       mas a flag fica disponível caso se adicione alguma no futuro. */
    window.PB_REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
})();
