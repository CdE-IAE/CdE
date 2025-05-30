document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionContainer = item.querySelector('.question-container');
        const answer = item.querySelector('.answer');
        const toggleIcon = item.querySelector('.toggle-icon');

        questionContainer.addEventListener('click', () => {
            item.classList.toggle('open');
        });
    });
});