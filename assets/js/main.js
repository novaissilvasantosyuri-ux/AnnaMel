/* ==========================================================================
   ANNAMEL · Interações — Auvora Studios
   Vanilla JS, sem dependências. Respeita prefers-reduced-motion.
   ========================================================================== */
(function () {
  "use strict";

  var CFG = window.ANNAMEL || {};
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* ----------------------------------------------------------------------
     1. Links de WhatsApp (contextuais) e Instagram
     ---------------------------------------------------------------------- */
  function whatsappHref(messageKey) {
    var messages = CFG.messages || {};
    var text = messages[messageKey] || messages.orcamento || "";
    var number = (CFG.whatsapp || "").replace(/\D/g, "");
    var url = number
      ? "https://wa.me/" + number
      : "https://wa.me/"; // sem número: abre a escolha de contato do WhatsApp
    return url + "?text=" + encodeURIComponent(text);
  }

  function initContactLinks() {
    $$("[data-wa]").forEach(function (el) {
      el.setAttribute("href", whatsappHref(el.dataset.wa));
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    });

    $$("[data-instagram]").forEach(function (el) {
      if (CFG.instagram) {
        el.setAttribute("href", CFG.instagram);
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener noreferrer");
      }
    });

    $$("[data-ig-handle]").forEach(function (el) {
      el.textContent = CFG.instagramHandle || "Instagram";
    });

    // Assinatura do estúdio: vira link somente se houver URL configurada
    $$("[data-studio-url]").forEach(function (el) {
      var url = CFG.studio && CFG.studio.url;
      if (url) {
        el.setAttribute("href", url);
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener noreferrer");
      } else {
        var span = document.createElement("span");
        span.className = el.className;
        span.textContent = el.textContent;
        el.replaceWith(span);
      }
    });

    $$("[data-year]").forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });
  }

  /* ----------------------------------------------------------------------
     2. Header: estado ao rolar + barra de progresso
     ---------------------------------------------------------------------- */
  function initHeader() {
    var header = $("[data-header]");
    if (!header) return;
    var lastState = null;

    function update() {
      var y = window.scrollY || window.pageYOffset;
      var state = y > 24 ? "solid" : "top";
      if (state !== lastState) {
        header.classList.toggle("is-scrolled", state === "solid");
        lastState = state;
      }
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  /* ----------------------------------------------------------------------
     3. Menu mobile
     ---------------------------------------------------------------------- */
  function initMenu() {
    var toggle = $("[data-menu-toggle]");
    var panel = $("[data-menu-panel]");
    if (!toggle || !panel) return;

    var isOpen = false;
    var firstLink = panel.querySelector("a");

    function setOpen(open) {
      isOpen = open;
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      panel.classList.toggle("is-open", open);
      panel.setAttribute("aria-hidden", String(!open));
      document.body.classList.toggle("is-menu-open", open);
      if (open) {
        panel.removeAttribute("inert");
        document.body.classList.add("is-locked");
        if (firstLink) window.setTimeout(function () { firstLink.focus(); }, 260);
      } else {
        panel.setAttribute("inert", "");
        document.body.classList.remove("is-locked");
      }
    }

    toggle.addEventListener("click", function () { setOpen(!isOpen); });

    $$("a", panel).forEach(function (link) {
      link.addEventListener("click", function () { setOpen(false); });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isOpen) {
        setOpen(false);
        toggle.focus();
      }
    });

    // Fecha o menu se a viewport crescer para desktop
    var mq = window.matchMedia("(min-width: 900px)");
    mq.addEventListener("change", function (e) { if (e.matches && isOpen) setOpen(false); });

    setOpen(false);
  }

  /* ----------------------------------------------------------------------
     4. Reveal on scroll
     ---------------------------------------------------------------------- */
  function initReveal() {
    var items = $$("[data-reveal]");
    if (!items.length) return;

    if (reduceMotion.matches || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });

    items.forEach(function (el) { io.observe(el); });
  }

  /* ----------------------------------------------------------------------
     5. Navegação ativa
     ---------------------------------------------------------------------- */
  function initActiveNav() {
    var links = $$("[data-nav-link]");
    if (!links.length || !("IntersectionObserver" in window)) return;

    // Um link pode representar mais de uma seção (ex.: Especialidades = bolos + doces)
    var pairs = [];
    links.forEach(function (link) {
      var refs = (link.dataset.sections || link.getAttribute("href") || "").split(/\s+/);
      refs.forEach(function (ref) {
        if (!ref || ref.charAt(0) !== "#") return;
        var section = document.querySelector(ref);
        if (section) pairs.push({ section: section, link: link });
      });
    });
    if (!pairs.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var current = pairs.filter(function (p) { return p.section === entry.target; })[0];
        if (!current) return;
        links.forEach(function (link) {
          var active = link === current.link;
          link.classList.toggle("is-active", active);
          if (active) { link.setAttribute("aria-current", "true"); }
          else { link.removeAttribute("aria-current"); }
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    pairs.forEach(function (p) { io.observe(p.section); });
  }

  /* ----------------------------------------------------------------------
     6. Galeria: filtros
     ---------------------------------------------------------------------- */
  function initFilters() {
    var filterBar = $("[data-filters]");
    var gallery = $("[data-gallery]");
    if (!filterBar || !gallery) return;

    var buttons = $$("button", filterBar);
    var items = $$("[data-cat]", gallery);
    var note = $("[data-gallery-count]");

    function apply(filter) {
      var visible = 0;
      items.forEach(function (item) {
        var cats = (item.dataset.cat || "").split(/\s+/);
        var show = filter === "todas" || cats.indexOf(filter) !== -1;
        item.classList.toggle("is-hidden", !show);
        if (show) {
          visible++;
          item.classList.remove("is-in");
          // reinicia a animação de entrada
          void item.offsetWidth;
          item.classList.add("is-in");
        }
      });
      if (note) note.textContent = visible === 1 ? "1 criação" : visible + " criações";
    }

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) {
          b.classList.toggle("is-active", b === btn);
          b.setAttribute("aria-pressed", String(b === btn));
        });
        apply(btn.dataset.filter);
      });
    });

    apply("todas");
  }

  /* ----------------------------------------------------------------------
     7. Lightbox da galeria
     ---------------------------------------------------------------------- */
  function initLightbox() {
    var dialog = $("[data-lightbox]");
    if (!dialog || typeof dialog.showModal !== "function") return;

    var img = $("[data-lightbox-img]", dialog);
    var caption = $("[data-lightbox-caption]", dialog);
    var triggers = $$("[data-lightbox-open]");
    var current = 0;

    function open(index) {
      var trigger = triggers[index];
      var media = trigger.querySelector("img");
      if (!media) return;
      current = index;
      img.src = media.currentSrc || media.src;
      img.alt = media.alt || "";
      caption.textContent = trigger.dataset.caption || "";
      dialog.showModal();
      document.body.classList.add("is-locked");
    }

    function close() {
      dialog.close();
      document.body.classList.remove("is-locked");
    }

    function step(dir) {
      var next = (current + dir + triggers.length) % triggers.length;
      open(next);
    }

    triggers.forEach(function (trigger, index) {
      trigger.addEventListener("click", function (e) {
        e.preventDefault();
        open(index);
      });
    });

    $$("[data-lightbox-close]", dialog).forEach(function (btn) {
      btn.addEventListener("click", close);
    });
    $("[data-lightbox-prev]", dialog).addEventListener("click", function () { step(-1); });
    $("[data-lightbox-next]", dialog).addEventListener("click", function () { step(1); });

    dialog.addEventListener("click", function (e) {
      if (e.target === dialog) close();
    });
    dialog.addEventListener("close", function () {
      document.body.classList.remove("is-locked");
    });
    dialog.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    });
  }

  /* ----------------------------------------------------------------------
     8. Parallax discreto (apenas desktop + sem redução de movimento)
     ---------------------------------------------------------------------- */
  function initParallax() {
    var targets = $$("[data-parallax]");
    if (!targets.length || reduceMotion.matches) return;

    var desktop = window.matchMedia("(min-width: 900px)");
    var ticking = false;

    function frame() {
      ticking = false;
      if (!desktop.matches) return;
      var vh = window.innerHeight;
      targets.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) return;
        var progress = (rect.top + rect.height / 2 - vh / 2) / vh;
        var amount = parseFloat(el.dataset.parallax || "18");
        el.style.transform = "translate3d(0," + (progress * amount).toFixed(2) + "px,0)";
      });
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(frame);
      }
    }

    frame();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
  }

  /* ----------------------------------------------------------------------
     9. Barra de progresso de leitura + botão flutuante
     ---------------------------------------------------------------------- */
  function initScrollUI() {
    var floater = $("[data-floater]");
    if (floater) {
      var showFrom = 600;
      var onScroll = function () {
        var y = window.scrollY || window.pageYOffset;
        var nearEnd = (window.innerHeight + y) > (document.body.scrollHeight - 420);
        floater.classList.toggle("is-visible", y > showFrom && !nearEnd);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }
  }

  /* ----------------------------------------------------------------------
     Boot
     ---------------------------------------------------------------------- */
  function boot() {
    initContactLinks();
    initHeader();
    initMenu();
    initReveal();
    initActiveNav();
    initFilters();
    initLightbox();
    initParallax();
    initScrollUI();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
