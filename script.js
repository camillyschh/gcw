/* ===========================================================
   MUNDO ANIMAL — interações
   1. Menu mobile
   2. Filtro de categorias (animais.html)
   3. Acordeão (cuidados.html)
=========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initAnimalFilter();
  initAccordion();
});

/* ---------- 1. Menu mobile ---------- */
function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------- 2. Filtro de categorias ---------- */
function initAnimalFilter() {
  const chips = document.querySelectorAll(".chip[data-filter]");
  const cards = document.querySelectorAll(".animal-card[data-category]");
  if (!chips.length || !cards.length) return;

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");

      const filter = chip.dataset.filter;
      cards.forEach((card) => {
        const match = filter === "todos" || card.dataset.category === filter;
        card.style.display = match ? "" : "none";
      });
    });
  });
}

/* ---------- 3. Acordeão (Dicas rápidas) ---------- */
function initAccordion() {
  const items = document.querySelectorAll(".acc-item");
  if (!items.length) return;

  items.forEach((item) => {
    const trigger = item.querySelector(".acc-trigger");
    const panel = item.querySelector(".acc-panel");

    trigger.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      // fecha os outros itens (comportamento estilo sanfona)
      items.forEach((other) => {
        other.classList.remove("open");
        other.querySelector(".acc-panel").style.maxHeight = null;
        other.querySelector(".acc-trigger").setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        item.classList.add("open");
        panel.style.maxHeight = panel.scrollHeight + "px";
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });

  // abre o primeiro item por padrão
  const first = items[0];
  first.classList.add("open");
  first.querySelector(".acc-panel").style.maxHeight =
    first.querySelector(".acc-panel").scrollHeight + "px";
  first.querySelector(".acc-trigger").setAttribute("aria-expanded", "true");
}
