/* ==========================================================================
   ANNAMEL · BOLOS E DOCES ARTESANAIS
   Arquivo único de configuração do site — Auvora Studios
   --------------------------------------------------------------------------
   Este é o ÚNICO arquivo que precisa ser editado para publicar o projeto.
   Nenhum dado comercial (telefone, preços, produtos) foi inventado.
   ========================================================================== */

window.ANNAMEL = {
  /* ------------------------------------------------------------------
     1) WHATSAPP
     Informe apenas números, com código do país e DDD. Exemplo:
     whatsapp: "5516999999999"

     Enquanto estiver vazio (""), todos os botões de WhatsApp abrem a
     tela de escolha de contato do WhatsApp já com a mensagem escrita —
     nenhum link fica quebrado e nenhum número é inventado.
     ------------------------------------------------------------------ */
  whatsapp: "",

  /* ------------------------------------------------------------------
     2) INSTAGRAM
     ------------------------------------------------------------------ */
  instagram: "https://www.instagram.com/annameldocesartesanais/",
  instagramHandle: "@annameldocesartesanais",

  /* ------------------------------------------------------------------
     3) ASSINATURA DO ESTÚDIO (rodapé)
     Deixe `url` vazio para exibir apenas o texto. Se preencher (ex.:
     "https://www.instagram.com/auvora"), a assinatura vira um link.
     ------------------------------------------------------------------ */
  studio: {
    name: "Auvora Studios",
    url: ""
  },

  /* ------------------------------------------------------------------
     4) LOCALIZAÇÃO (exibida no hero, rodapé e SEO)
     ------------------------------------------------------------------ */
  location: {
    city: "Franca",
    state: "SP",
    line: "Confeitaria artesanal • Franca, SP"
  },

  /* ------------------------------------------------------------------
     5) MENSAGENS PRÉ-PREENCHIDAS DO WHATSAPP (por contexto)
     ------------------------------------------------------------------ */
  messages: {
    hero: "Olá! Conheci o trabalho da Annamel pelo site e gostaria de conversar sobre uma encomenda personalizada.",
    orcamento: "Olá! Gostaria de solicitar um orçamento para uma encomenda personalizada com a Annamel.",
    bolos: "Olá! Gostaria de conversar sobre um bolo personalizado. Tenho algumas ideias e gostaria de solicitar um orçamento.",
    doces: "Olá! Gostaria de conhecer as opções de doces artesanais para minha celebração.",
    inspiracao: "Olá! Tenho uma ideia para uma criação personalizada e gostaria de conversar sobre ela com a Annamel.",
    encomendas: "Olá! Vi o site e gostaria de entender como funcionam as encomendas da Annamel."
  }
};
