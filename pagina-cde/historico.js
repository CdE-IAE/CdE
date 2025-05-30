const timelineHorizontal = document.getElementById('timelineHorizontal');
const timelineLine = document.getElementById('timelineLine');
const cursorDot = document.getElementById('cursorDot');
const cursorYearSpan = document.getElementById('cursorYear');
const timelineEvents = document.querySelectorAll('.timeline-event-horizontal');
const detailsContent = document.getElementById('details-content');

timelineHorizontal.addEventListener('mousemove', (e) => {
    const rect = timelineLine.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const maxX = rect.width;
    const position = Math.min(Math.max(0, mouseX), maxX);

    cursorDot.style.left = `${position}px`;
    cursorDot.style.opacity = 1;

    let closestYear = null;
    let minDistance = Infinity;

    timelineEvents.forEach(event => {
        const eventRect = event.getBoundingClientRect();
        const eventCenter = eventRect.left + eventRect.width / 2 - rect.left;
        const distance = Math.abs(mouseX - eventCenter);

        if (distance < minDistance) {
            minDistance = distance;
            closestYear = event.dataset.year;
        }
    });

    if (closestYear) {
        cursorYearSpan.textContent = closestYear;
        cursorYearSpan.style.opacity = 1;
    } else {
        cursorYearSpan.style.opacity = 0;
    }
});

timelineHorizontal.addEventListener('mouseleave', () => {
    cursorDot.style.opacity = 0;
    cursorYearSpan.style.opacity = 0;
});

timelineHorizontal.addEventListener('click', (e) => {
    const rect = timelineLine.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    let closestYear = null;
    let minDistance = Infinity;

    timelineEvents.forEach(event => {
        const eventRect = event.getBoundingClientRect();
        const eventCenter = eventRect.left + eventRect.width / 2 - rect.left;
        const distance = Math.abs(mouseX - eventCenter);

        if (distance < minDistance) {
            minDistance = distance;
            closestYear = event.dataset.year;
        }
    });

    if (closestYear) {
        window.location.href = `años/year_${closestYear}.html`;
    }
});

function mostrarDetalles(year) {
    detailsContent.innerHTML = `<h4>Año ${year}</h4><p>Aquí irían los documentos, fotos, etc. del año <strong>${year}</strong>.</p>`;
}