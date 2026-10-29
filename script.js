const modal = document.querySelector("#customizer-modal");
const modalClose = document.querySelector(".modal-close");
const customizerForm = document.querySelector("#customizer-form");
const customizerStatus = document.querySelector("#customizer-status");
const styleSelect = document.querySelector("#selected-style");
let lastFocusedElement;

function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocusedElement) lastFocusedElement.focus();
}

document.querySelectorAll(".open-customizer").forEach((button) => {
    button.addEventListener("click", () => {
        lastFocusedElement = button;
        const product = button.dataset.product;
        const matchingOption = [...styleSelect.options].find((option) => option.textContent === product);
        styleSelect.value = matchingOption ? matchingOption.value : styleSelect.options[0].value;
        customizerStatus.textContent = "";
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        document.querySelector("#customer-name").focus();
    });
});

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
});
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) closeModal();
});
customizerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = new FormData(customizerForm).get("name").toString().trim();
    customizerStatus.textContent = `¡Gracias, ${name}! Tu idea está lista. Muy pronto nuestro equipo se pondrá en contacto contigo.`;
    customizerForm.reset();
});

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");
menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    menuToggle.textContent = isOpen ? "×" : "☰";
});
siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        siteNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menú");
        menuToggle.textContent = "☰";
    });
});

document.querySelector("#newsletter-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const email = document.querySelector("#newsletter-email");
    document.querySelector("#newsletter-status").textContent = `¡Gracias! Te escribiremos a ${email.value}.`;
    event.currentTarget.reset();
});

