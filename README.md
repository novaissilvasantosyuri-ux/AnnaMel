# Annamel — Bolos e Doces Artesanais

Website demonstrativo premium, one page, desenvolvido pelo **Auvora Studios** para apresentação comercial à proprietária da Annamel (Franca, SP).

> Conceito: *"A arte de transformar momentos em sabores."*

---

## 1. Visão geral

| Item | Detalhe |
|---|---|
| Tipo | One page editorial, 100% estático |
| Stack | HTML semântico + CSS autoral + JavaScript vanilla (sem dependências, sem build) |
| Peso | ~3,6 MB de imagens otimizadas + ~55 KB de código (CSS/JS) |
| Fontes | Cormorant Garamond (títulos) e Manrope (textos) — **hospedadas localmente**, sem Google Fonts |
| Idiomas | pt-BR |
| Deploy | Qualquer host estático (Vercel, Netlify, Hostinger, cPanel…) |

A página não usa frameworks, bundlers ou CDNs: abre direto no navegador e carrega rápido em conexões móveis.

---

## 2. Estrutura de arquivos

```
annamel/
├── index.html                  → documento único com todas as seções
├── robots.txt
├── vercel.json                 → cache e cabeçalhos para deploy na Vercel
├── README.md
└── assets/
    ├── css/styles.css          → sistema visual completo (tokens, componentes, responsivo)
    ├── js/
    │   ├── config.js           → ⚙️ ÚNICO arquivo a editar para publicar
    │   └── main.js             → interações (menu, filtros, lightbox, reveal, WhatsApp)
    ├── fonts/                  → Cormorant Garamond + Manrope (woff2, variáveis)
    ├── favicon.svg             → monograma "A" (configurável)
    └── img/                    → fotografias do projeto (JPG progressivo)
```

---

## 3. Configuração — 3 passos

### 3.1 WhatsApp (obrigatório)

Abra `assets/js/config.js` e preencha o número, apenas dígitos, com código do país e DDD:

```js
whatsapp: "5516999999999",   // ← PREENCHER
```

**Enquanto o campo estiver vazio**, todos os botões abrem a tela de escolha de contato do WhatsApp com a mensagem já escrita — nenhum número foi inventado e nenhum link fica quebrado.

As mensagens pré-preenchidas são diferentes por contexto (`hero`, `orcamento`, `bolos`, `doces`, `inspiracao`) e podem ser reescritas no mesmo arquivo.

### 3.2 Instagram

```js
instagram: "https://www.instagram.com/annameldocesartesanais/",
instagramHandle: "@annameldocesartesanais",
```

Se o endereço mudar, basta trocar aqui — todos os botões do site são atualizados automaticamente.

### 3.3 Assinatura do estúdio

```js
studio: { name: "Auvora Studios", url: "" },
```

Com `url` preenchida (ex.: `"https://instagram.com/auvora"`), a assinatura do rodapé se torna um link. Vazia, permanece apenas como texto discreto.

---

## 4. Substituir as fotografias pelas imagens reais

Todas as fotos do site são **ilustrativas** — não são produtos reais da Annamel. Um aviso discreto na galeria deixa isso explícito e o site já está pronto para receber as fotografias verdadeiras: basta sobrescrever os arquivos em `assets/img/` mantendo os mesmos nomes.

| Arquivo | Onde aparece | Proporção ideal | Largura sugerida |
|---|---|---|---|
| `hero.jpg` | Hero | 4:5 (retrato) | 1200 px |
| `intro.jpg` | Apresentação | 4:5 | 1200 px |
| `g1.jpg` … `g6.jpg` | Galeria | 3:4 ou 4:3 (ver abaixo) | 1200–1600 px |
| `bolo-1.jpg` | Bolos (panorâmica) | 3:2 | 1800 px |
| `bolo-2.jpg` | Bolos (retrato) | 3:4 | 1200 px |
| `doces-1.jpg` | Doces (panorâmica) | 3:2 | 1600 px |
| `c-*.jpg` | Detalhes, inspiração, Instagram | 3:4 / 1:1 | 900–1000 px |

Proporções usadas na galeria: `g1` 3:4 · `g2` 4:3 · `g3` 3:4 · `g4` 1:1 · `g5` 3:4 · `g6` panorâmica.

Recomendações: luz natural, fundos claros (marfim/creme) ou verdes profundos, composição limpa. Exporte em JPG qualidade 80–85, progressivo, com o menor peso possível (ideal < 300 KB por imagem).

> Importante: ao trocar uma imagem, atualize também os atributos `width`/`height` da tag `<img>` correspondente no `index.html` para evitar saltos de layout.

---

## 5. Identidade visual aplicada

| Token | Cor | Uso |
|---|---|---|
| Verde profundo | `#164C43` | navegação, seção de bolos, botões primários, acentos |
| Verde escuro | `#103B34` / `#0B2A25` | CTA final, estados de hover |
| Verde menta | `#C7E6D9` | detalhes, painéis, itálicos sobre fundo escuro |
| Marfim | `#F8F5EF` | fundo principal |
| Creme | `#EAE2D4` | seções alternadas |
| Dourado fosco | `#B9A16B` | filetes, numeração, microdetalhes (nunca em blocos) |
| Texto | `#26332F` | textos e títulos |

**Tipografia:** Cormorant Garamond 300 (títulos, com itálicos de destaque) + Manrope 400–600 (interface, textos e botões). Escalas fluidas com `clamp()`, entrelinha editorial e `text-wrap: balance/pretty`.

---

## 6. Recursos implementados

- Header transparente sobre o hero que ganha fundo translúcido com blur ao rolar
- Menu mobile em tela cheia, com foco controlado (`inert`, `aria-expanded`, fechamento por ESC)
- Ritmo editorial: hero assimétrico com sangria de imagem, faixa manifesto, alternância marfim/creme/verde
- Galeria com **filtros funcionais** por categoria, grade assimétrica e **lightbox** (teclado ← → ESC)
- 4 passos de encomenda, seção Instagram, CTA final com fotografia e overlay tonal
- Botões de WhatsApp contextuais + botão flutuante que aparece após o primeiro scroll
- Animações discretas: revelações por `IntersectionObserver`, linhas mascaradas no hero, parallax leve
- `prefers-reduced-motion` respeitado em todos os efeitos
- SEO: title, description, Open Graph, Twitter Card, JSON-LD (`Bakery`), HTML semântico, `alt` em todas as imagens, hierarquia correta de headings
- Acessibilidade: skip link, foco visível, `aria-*` nos controles, contraste revisado, navegação por teclado

---

## 7. Deploy

**Vercel (recomendado)**

1. `vercel` na pasta do projeto (ou arraste a pasta em vercel.com/new)
2. Framework: *Other* · Build command: vazio · Output directory: `.` (raiz)
3. Depois do deploy, aponte o domínio definitivo (ex.: `annamel.com.br`)

**Outros hosts**: publique a pasta `annamel/` inteira por FTP. Não há dependências, banco de dados ou variáveis de ambiente.

---

## 8. O que este projeto não faz (por decisão editorial)

- Não há carrinho, checkout ou pagamento online — o modelo é **encomenda personalizada com conversa e orçamento**
- Não há preços, sabores, prazos ou condições comerciais inventados
- Não há depoimentos, métricas ou publicações fictícias
- Não há telefone, endereço completo ou dados comerciais inventados

---

## 9. Checklist de entrega

- [x] Todas as seções do briefing implementadas
- [x] Botões e links funcionais (nenhum `href="#"`)
- [x] Zero erros de console, zero imagens quebradas
- [x] Responsivo validado em 390 / 820 / 1024 / 1440 px
- [x] Menu mobile, filtros e lightbox testados
- [x] SEO, Open Graph e acessibilidade
- [x] Animações com respeito a `prefers-reduced-motion`
- [x] Configuração centralizada em um único arquivo

---

*Uma experiência digital criada com carinho pelo Auvora Studios.*
