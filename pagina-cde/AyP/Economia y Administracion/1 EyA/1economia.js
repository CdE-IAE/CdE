document.addEventListener('DOMContentLoaded', function() {
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const navLinks = document.querySelector('.nav-links');
    const dropdown = document.querySelector('.dropdown'); // Selecciona el div con la clase 'dropdown'

    if (hamburgerIcon && navLinks) {
        hamburgerIcon.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
        });
    }

    // Manejar el dropdown en móvil
    if (dropdown) {
        const dropbtn = dropdown.querySelector('.dropbtn');
        if (dropbtn) {
            dropbtn.addEventListener('click', (event) => {
                event.stopPropagation(); // Evitar que el clic cierre el menú principal
                dropdown.classList.toggle('active');
            });
        }
    }
});
