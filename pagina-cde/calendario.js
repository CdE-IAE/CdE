document.addEventListener('DOMContentLoaded', function() {
    const calendarContainer = document.querySelector('.calendar-container');
    const eventListTitle = document.querySelector('h2');
    const eventListContainer = document.querySelector('.event-list');
    const contentDiv = document.querySelector('.content');
    let currentDate = new Date();
    const events = {
        '2025-05-26': 'Recaudación de ropa de abrigo, lavandina y agua mineral',
        '2025-05-09': 'Reunión General - Inicio de ciclo 2025',
        '2025-05-16': 'Reunión General - Seguimiento de proyectos',
        '2025-05-30': 'Reunión General'
    };

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function isGeneralMeeting(date) {
        return events[date] && events[date].includes('Reunión General');
    }

    function generateCalendar(year, month) {
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const daysInMonth = lastDayOfMonth.getDate();
        const firstDayOfWeek = firstDayOfMonth.getDay();

        const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
        const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

        let calendarHTML = `<div class="calendar-header">
            <button class="prev-month">&lt;</button>
            <h2>${monthNames[month]} ${year}</h2>
            <button class="next-month">&gt;</button>
        </div>`;
        calendarHTML += '<table class="calendar-table"><thead><tr>';
        for (let day of dayNames) {
            calendarHTML += `<th>${day}</th>`;
        }
        calendarHTML += '</tr></thead><tbody><tr>';

        let dayCounter = 1;
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDayOfWeek) {
                    const prevMonthLastDay = new Date(year, month, 0).getDate() - firstDayOfWeek + j + 1;
                    calendarHTML += `<td class="other-month">${prevMonthLastDay}</td>`;
                } else if (dayCounter > daysInMonth) {
                    const nextMonthDay = dayCounter - daysInMonth;
                    calendarHTML += `<td class="other-month">${nextMonthDay}</td>`;
                } else {
                    const currentDateForEvent = new Date(year, month, dayCounter);
                    const eventDateKey = formatDate(currentDateForEvent);
                    let classList = '';
                    if (events[eventDateKey]) {
                        classList += 'has-event ';
                        if (isGeneralMeeting(eventDateKey)) {
                            classList += 'general-meeting ';
                        }
                    }
                    const today = new Date();
                    if (dayCounter === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                        classList += 'today ';
                    }
                    calendarHTML += `<td class="${classList}" data-date="${eventDateKey}" data-day="${dayCounter}">${dayCounter}</td>`;
                    dayCounter++;
                }
            }
            calendarHTML += '</tr><tr>';
            if (dayCounter > daysInMonth + (7 - firstDayOfWeek) % 7) {
                break;
            }
        }
        calendarHTML += '</tr></tbody></table>';
        calendarContainer.innerHTML = calendarHTML;

        const prevButton = calendarContainer.querySelector('.prev-month');
        const nextButton = calendarContainer.querySelector('.next-month');
        const monthHeader = calendarContainer.querySelector('.calendar-header h2');
        const calendarDays = calendarContainer.querySelectorAll('.calendar-table td');

        prevButton.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
            updateEventListForMonth(currentDate.getFullYear(), currentDate.getMonth());
            eventListTitle.textContent = 'Eventos del Mes';
        });

        nextButton.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
            updateEventListForMonth(currentDate.getFullYear(), currentDate.getMonth());
            eventListTitle.textContent = 'Eventos del Mes';
        });

        monthHeader.addEventListener('click', () => {
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth();
            updateEventListForMonth(currentYear, currentMonth);
            const monthNamesLong = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
            ];
            eventListTitle.textContent = `Eventos de ${monthNamesLong[currentMonth]} ${currentYear}`;
        });

        calendarDays.forEach(day => {
            day.addEventListener('click', () => {
                const date = day.getAttribute('data-date');
                const dayNumber = day.getAttribute('data-day');
                const monthIndex = currentDate.getMonth();
                const yearNumber = currentDate.getFullYear();
                const monthNamesShort = ["Ene", "Feb", "Mar", "Abr", "May", "Jun",
                    "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
                ];
                const selectedDateText = `${dayNumber} de ${monthNamesShort[monthIndex]}`;
                eventListTitle.textContent = selectedDateText;
                if (events[date]) {
                    updateEventListForDay(date, events[date]);
                } else {
                    eventListContainer.innerHTML = '<li>No hay eventos para este día.</li>';
                }
            });
        });

        updateEventListForMonth(year, month);
    }

    function updateEventListForDay(date, description) {
        eventListContainer.innerHTML = '';
        const listItem = document.createElement('li');
        const [year, month, day] = date.split('-').map(Number);
        listItem.textContent = description;
        eventListContainer.appendChild(listItem);
    }

    function updateEventListForMonth(year, month) {
        eventListContainer.innerHTML = '';
        let hasEvents = false;
        const monthStart = new Date(year, month, 1);
        const monthEnd = new Date(year, month + 1, 0);

        for (const dateStr in events) {
            const [eventYear, eventMonth, eventDay] = dateStr.split('-').map(Number);
            const eventDate = new Date(eventYear, eventMonth - 1, eventDay);

            if (eventDate >= monthStart && eventDate <= monthEnd) {
                const listItem = document.createElement('li');
                listItem.textContent = `[${String(eventDay).padStart(2, '0')}/${String(eventMonth).padStart(2, '0')}/${eventYear}] - ${events[dateStr]}`;
                eventListContainer.appendChild(listItem);
                hasEvents = true;
            }
        }

        if (!hasEvents) {
            const listItem = document.createElement('li');
            listItem.textContent = 'No hay eventos programados para este mes.';
            eventListContainer.appendChild(listItem);
        }
    }

    if (calendarContainer) {
        generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    }
});