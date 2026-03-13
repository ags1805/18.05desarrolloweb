const textElement = document.querySelector(".typewriter");
const words = ["una web profesional.", "vender más.", "presencia online."];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    textElement.classList.add("typing");

    if (isDeleting) {
        textElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        textElement.classList.remove("typing");
        isDeleting = true;
        typeSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }
    setTimeout(type, typeSpeed);
}

document.addEventListener("DOMContentLoaded", type);

// --- MANEJO DE EMAILJS ---

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const emailInput = document.querySelector('#email');
    const btn = document.querySelector('.btn-submit');
    const originalText = btn.textContent;

    if (!validarEmail(emailInput.value)) {
        alert('Por favor, ingresá un correo electrónico válido.');
        emailInput.focus();
        emailInput.style.borderColor = 'red';
        return; 
    }

    btn.textContent = 'Enviando...';
    btn.style.opacity = '0.7';
    btn.disabled = true;
    emailInput.style.borderColor = '';

    // REEMPLAZÁ ESTOS DOS IDs CON LOS DE TU PANEL
    const serviceID = 'service_trplj0y';
    const templateID = 'template_x2usd5e';

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            alert('¡Mensaje enviado con éxito! Te contactaremos pronto.');
            this.reset();
        }, (err) => {
            alert('Error al enviar: ' + JSON.stringify(err));
        })
        .finally(() => {
            btn.textContent = originalText;
            btn.style.opacity = '1';
            btn.disabled = false;
        });
});

// --- LÓGICA MENÚ HAMBURGUESA ---
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.nav-links');

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(n => n.addEventListener('click', () => {
    menu.classList.remove('is-active');
    menuLinks.classList.remove('active');
}));