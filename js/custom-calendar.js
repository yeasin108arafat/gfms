$(document).ready(function () {
    const today = new Date();
    let currentMonthOffset = 0; // Controls the currently visible month
    let startDate = null;
    let endDate = null;

    // Function to create the calendar
    function generateCalendar(monthOffset) {
        const currentMonth = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
        const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
        const daysInMonth = lastDayOfMonth.getDate();
        const firstDayOfWeek = currentMonth.getDay();

        let daysHtml = '';
        let dayCounter = 1;

        // Add blank days for the first week
        for (let i = 0; i < firstDayOfWeek; i++) {
            daysHtml += '<div class="day"></div>';
        }

        // Add the actual days
        for (let i = 1; i <= daysInMonth; i++) {
            const dayDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
            const isDisabled = dayDate < new Date(today.setHours(0, 0, 0, 0)); // Disable only past dates, not today
            daysHtml += `<div class="day ${isDisabled ? 'disabled' : ''}" data-date="${dayDate.toISOString()}">${i}</div>`;
        }

        return `
            <div class="month">
                <div class="month-header">${currentMonth.toLocaleString('default', { month: 'long' })} ${currentMonth.getFullYear()}</div>
                <div class="days">
                    <div class="day-header">Su</div>
                    <div class="day-header">Mo</div>
                    <div class="day-header">Tu</div>
                    <div class="day-header">We</div>
                    <div class="day-header">Th</div>
                    <div class="day-header">Fr</div>
                    <div class="day-header">Sa</div>
                    ${daysHtml}
                </div>
            </div>
        `;
    }

    // Render the calendar for two months
    function renderCalendar() {
        $('#calendar').html(generateCalendar(currentMonthOffset) + generateCalendar(currentMonthOffset + 1));

        // Enable the next and previous buttons, no longer disabled since we removed the limit
        $('#prev').prop('disabled', currentMonthOffset === 0); // Only disable 'prev' when on the current month
        $('#next').prop('disabled', false); // Always allow 'next' (no limit)
    }

    // Highlight range between two dates
    function highlightRange() {
        const allDays = $('.day').not('.disabled');
        allDays.removeClass('range selected start-date end-date');
        
        if (startDate && endDate) {
            allDays.each(function () {
                const currentDay = new Date($(this).data('date'));
                if (currentDay >= startDate && currentDay <= endDate) {
                    $(this).addClass('range');
                }
                if (currentDay.getTime() === startDate.getTime()) {
                    $(this).addClass('selected start-date');  // Highlight "From" date with "start-date" class
                }
                if (currentDay.getTime() === endDate.getTime()) {
                    $(this).addClass('selected end-date');  // Highlight "To" date with "end-date" class
                }
            });
        } else if (startDate) {
            // If only the start date is selected, highlight just that
            allDays.each(function () {
                const currentDay = new Date($(this).data('date'));
                if (currentDay.getTime() === startDate.getTime()) {
                    $(this).addClass('selected');  // Highlight only the "From" date
                }
            });
        }
    }

    // Preview range when hovering
    function previewRange(hoveredDate) {
        const allDays = $('.day').not('.disabled');
        allDays.removeClass('hover-range');
        if (startDate && !endDate && hoveredDate > startDate) {
            allDays.each(function () {
                const currentDay = new Date($(this).data('date'));
                if (currentDay > startDate && currentDay <= hoveredDate) {
                    $(this).addClass('hover-range');
                }
            });
        }
    }

    // Handle day click event
    $('#calendar').on('click', '.day:not(.disabled)', function () {
        const clickedDate = new Date($(this).data('date'));
        
        // If no start date or both dates are selected, reset start date
        if (!startDate || (startDate && endDate)) {
            startDate = clickedDate;
            endDate = null;
            $('#fromDate').text(clickedDate.toDateString());
            $('#toDate').text('');
        } else if (clickedDate < startDate) {
            // If a new earlier date is clicked, update the start date
            startDate = clickedDate;
            $('#fromDate').text(clickedDate.toDateString());
        } else if (clickedDate >= startDate) {
            // Set the end date if the clicked date is after the start date
            endDate = clickedDate;
            $('#toDate').text(clickedDate.toDateString());
        }

        // Highlight the range
        highlightRange();
    });

    // Handle hover event for previewing the range
    $('#calendar').on('mouseover', '.day:not(.disabled)', function () {
        const hoveredDate = new Date($(this).data('date'));
        previewRange(hoveredDate);
    });

    $('#calendar').on('mouseout', '.day:not(.disabled)', function () {
        $('.day').removeClass('hover-range'); // Remove hover effect when mouse leaves
    });

    // Handle next button click
    $('#next').on('click', function () {
        currentMonthOffset++;
        renderCalendar();
    });

    // Handle previous button click
    $('#prev').on('click', function () {
        if (currentMonthOffset > 0) {
            currentMonthOffset--;
            renderCalendar();
        }
    });

    // Initialize the calendar
    renderCalendar();
});
