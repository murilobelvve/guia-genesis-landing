# Relatório de Entrega — Landing Page do Guia Ilustrado de Gênesis

## Arquivos criados
```
marketing/landing/
├── index.html              (página única, 10 seções do briefing)
├── css/style.css            (identidade visual, responsivo, acessibilidade)
├── js/config.js             (CONFIGURAÇÃO CENTRAL — editar só este arquivo)
├── js/main.js                (interatividade: FAQ, botões, eventos de analytics-stub)
├── assets/logo.png           (cópia de marketing/materiais/)
├── assets/hero-bg.png        (cópia do teaser cósmico)
├── assets/ebook-cover.png    (cópia da capa real do e-book)
├── previews/capitulo-07.png  (captura real do PDF — página do Capítulo 2)
├── previews/personagens-35.png (captura real — página de personagens)
├── previews/perguntas-38.png  (captura real — página de perguntas)
├── downloads/Genesis_Amostra_Gratuita_3_Paginas.pdf (cópia do PDF real, funcional)
└── Relatorio_Entrega.md      (este arquivo)
```
Nenhum arquivo preexistente do projeto foi sobrescrito — tudo novo, em pasta própria.

## Como rodar localmente
Não há build nem dependências — é HTML/CSS/JS puro. Basta abrir o arquivo diretamente:
```
C:\Users\muril\projeto-biblico\marketing\landing\index.html
```
(duplo clique, ou arrastar pro navegador). Para testar como ficaria servido por um domínio real
(recomendado antes de publicar, por causa de caminhos relativos), qualquer servidor estático simples
funciona, por exemplo: `python -m http.server 8000` dentro da pasta `landing/`, depois abrir
`http://localhost:8000`.

## Como configurar o checkout oficial
Abra `js/config.js` e preencha:
```js
links: { checkoutUrl: "https://SEU-LINK-DE-CHECKOUT-AQUI", ... }
```
Enquanto esse campo estiver vazio (como está agora), o botão de compra aparece visualmente normal mas
fica desabilitado de verdade (`aria-disabled="true"`, sem `href`) — ao clicar, mostra a mensagem "A compra
está sendo configurada" em vez de navegar para qualquer lugar. Isso foi testado e confirmado via script
(ver seção de testes abaixo).

## Como configurar o download gratuito
Já está configurado e funcional: `js/config.js` aponta `freeSampleUrl` para
`downloads/Genesis_Amostra_Gratuita_3_Paginas.pdf`, que é uma cópia real do PDF de 3 páginas já produzido.
Os três botões "Baixar amostra gratuita" da página (hero, seção de amostra e chamada final) agora disparam
o download direto do arquivo — testado de verdade via Chrome headless (evento `Page.downloadWillBegin`
capturado, arquivo de 2.412.026 bytes baixado por completo), não apenas verificado pelo link.

**Limitação conhecida e importante:** esse download forçado só funciona quando a página é aberta por um
servidor (`http://` ou `https://` — inclusive o GitHub Pages, quando publicar). Se você abrir o
`index.html` localmente por duplo clique (`file://`), o Chrome ignora o atributo `download` por política de
segurança do próprio navegador para arquivos locais, e o clique só abre o PDF no visualizador em vez de
baixar — isso não é um bug da página, é uma restrição do navegador para o protocolo `file://`, sem solução
via código. Para testar o download de verdade antes de publicar, rode um servidor local dentro da pasta
`landing/`: `python -m http.server 8000` e abra `http://localhost:8000`.

## Informações comerciais ainda pendentes
- **Link de checkout oficial** — ✅ Configurado: Stripe Payment Link em modo **live**
  (`https://buy.stripe.com/cNidR906K7zv48F3Ox0oO20`), produto "Guia Ilustrado de Gênesis", R$ 19,90,
  pagamento único. Testado via `js/config.js` → os 3 botões de compra da página carregam esse link, sem
  estado "pendente". Pagamentos feitos nele são cobrados de verdade.
- **E-mail/canal de contato oficial** — vazio; a resposta do FAQ correspondente diz explicitamente que
  ainda está sendo configurada, em vez de inventar um endereço.
- **Links de privacidade e termos** — não existem ainda; omitidos do rodapé com uma nota visível em vez de
  apontar para páginas inexistentes.
- **Ferramenta de analytics** — nenhuma está instalada. `js/main.js` despacha eventos locais
  (`pb:track` via `CustomEvent` + log no console) para `buy_click`, `buy_click_pending`,
  `free_sample_click`, `faq_open` e `offer_view` — uma ferramenta real (GA4, Meta Pixel, Plausible...)
  pode escutar `window.addEventListener('pb:track', ...)` sem precisar reescrever a página.

## Testes realizados (e resultado)
Todos os testes abaixo foram executados de verdade, via Chrome headless controlado por CDP (o mesmo motor
usado nos renders de vídeo do projeto) — não são afirmações sem verificação.

| Teste | Resultado |
|---|---|
| Layout desktop (1280px) | ✅ OK — captura visual conferida |
| Layout mobile (390px) | ✅ OK — sem overflow horizontal real (`scrollWidth` = `innerWidth` = 390px, verificado via script, não só visualmente) |
| Erros de console JS | ✅ Zero erros capturados |
| Botão de compra sem checkout configurado | ✅ Fica `aria-disabled`, sem `href`, classe `is-pending` — confirmado via leitura do DOM |
| Link da amostra gratuita | ✅ Resolve para o arquivo PDF real |
| Download direto da amostra (3 botões: hero, seção amostra, CTA final) | ✅ Testado via servidor local — clique dispara `Page.downloadWillBegin`, arquivo completo (2.412.026 bytes) salvo em disco, nome sugerido correto |
| Carregamento de todas as imagens | ✅ 6/6 imagens com `naturalWidth > 0` (nenhuma quebrada) |
| FAQ abre/fecha por clique | ✅ Testado via clique programático, `aria-expanded` alterna corretamente |
| FAQ acessível por teclado | ⚠️ Implementado (`<button>` nativo, suporta Enter/Espaço/Tab por padrão do navegador), mas não testado manualmente com um leitor de tela real |
| Navegação por teclado (foco visível) | ⚠️ CSS `:focus-visible` implementado, não testado manualmente com Tab real |
| `prefers-reduced-motion` | ✅ Regra CSS presente (`scroll-behavior:auto` e durações de transição cortadas); não há animação de scroll/parallax na página mesmo sem essa regra |
| SEO básico (title, description, OG, hierarquia de headings) | ✅ Presentes no `<head>`; hierarquia H1→H2→H3 consistente |
| Favicon | ✅ Usa o logo real (`assets/logo.png`) |

## Limitações conhecidas
1. **Sem teste manual de acessibilidade** (leitor de tela, navegação por teclado ponta a ponta) — só a
   implementação via padrões de HTML/ARIA foi verificada, não uma sessão de teste assistido real.
2. **Sem teste em dispositivo físico** — todos os testes foram em Chrome headless com viewport emulado, não
   em um celular ou tablet real.
3. **Nenhuma ferramenta de analytics real conectada** — os eventos existem como estrutura (stub), mas não
   enviam dados a lugar nenhum até que uma ferramenta seja conectada.
4. **Sem teste de performance/Lighthouse** — não foi executada uma auditoria formal de performance, apenas
   verificação de carregamento de imagens e ausência de erros.
5. A página **não está publicada** em nenhum domínio ou hospedagem — existe só localmente neste projeto,
   conforme instrução de não publicar em produção sem autorização.
