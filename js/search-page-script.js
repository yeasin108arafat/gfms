$(document).ready(function () {
    // FLATPICKER DATE INPUT
    flatpickr("#tour-date", {
        mode: "range",
        dateFormat: "Y-m-d",
        minDate: "today", // Disable past dates
    });

    // CUSTOM MADE SELECT BOX
    $('.select-box').on('click', function () {
        $('.options-container').not($(this).next()).hide();
        $(this).next('.options-container').toggle();
    });

    // Handle option selection for each select box
    $('.option-wrapper').on('click', function () {
        // Find the select box associated with the clicked option
        var selectBox = $(this).closest('.custom-select').find('.select-box p');

        // Set the selected option text in the corresponding select box
        selectBox.text($(this).text());

        // Pass the selected value
        var selectedValue = $(this).text();
        console.log('Selected value: ', selectedValue);

        // Hide the options container after selection
        $(this).closest('.options-container').hide();
    });

    // Close options if clicked outside any custom select box
    $(document).on('click', function (event) {
        if (!$(event.target).closest('.custom-select').length) {
            $('.options-container').hide();
        }
    });


    // Array for month names
    var monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Initialize the date and month slider
    var currentDate = new Date();
    var currentMonthIndex = currentDate.getMonth();
    var currentYear = currentDate.getFullYear();
    var monthsToShow = 5; // Display 5 months at a time
    var monthSlider = $('#monthSlider');

    // Function to display months in the slider
    function populateMonths(startMonth, startYear) {
        monthSlider.empty();
        for (let i = 0; i < 12; i++) {
            let monthIndex = (startMonth + i) % 12;
            let year = startYear + Math.floor((startMonth + i) / 12);
            monthSlider.append('<div class="month-item">' + monthNames[monthIndex] + ' ' + year +
                '</div>');
        }
    }

    // Call the populate function to initialize the slider
    populateMonths(currentMonthIndex, currentYear);

    // Set initial position for sliding
    var currentSlide = 0;

    // Handle the next button click
    $('#nextMonth').click(function () {
        if (currentSlide < (12 - monthsToShow)) {
            currentSlide++;
            updateSlider();
        }
    });

    // Handle the previous button click
    $('#prevMonth').click(function () {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlider();
        }
    });

    // Update the slider's position
    function updateSlider() {
        var offset = currentSlide * -20;
        monthSlider.css('transform', 'translateX(' + offset + '%)');
    }

    // OWL CAROUSEL
    var owl = $(".owl-carousel");
    owl.owlCarousel({
        loop: false,
        margin: 10,
        nav: false,
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 3
            },
            768: {
                items: 4
            }
        },
        onInitialized: checkPosition, // Check position on initialization
        onTranslated: checkPosition // Check position after each slide transition
    });

    // OWL CAROUSEL CUSTOM NAV
    $('.owl-prev-custom').click(function () {
        owl.trigger('prev.owl.carousel');
    });

    $('.owl-next-custom').click(function () {
        owl.trigger('next.owl.carousel');
    });

    // Function to check the position of the carousel
    function checkPosition() {
        var itemCount = owl.find('.owl-item').length;
        var currentIndex = owl.find('.owl-item.active').first().index();

        // Enable/Disable Previous button
        if (currentIndex === 0) {
            $('.owl-prev-custom').prop('disabled', true);
        } else {
            $('.owl-prev-custom').prop('disabled', false);
        }

        // Enable/Disable Next button
        if (currentIndex === itemCount - owl.find('.owl-item.active').length) {
            $('.owl-next-custom').prop('disabled', true);
        } else {
            $('.owl-next-custom').prop('disabled', false);
        }
    }
});