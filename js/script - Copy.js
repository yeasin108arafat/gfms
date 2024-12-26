$(document).ready(function () {

    // Preview the PDF in a new tab
    document.getElementById('previewBtn').addEventListener('click', function () {
        const div = document.getElementById('printableDiv');

        // Configure PDF options
        const options = {
            margin: [10, 10, 10, 10], // Top, Right, Bottom, Left margins
            filename: 'content.pdf',
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // Generate the PDF and open it in a new tab
        html2pdf().set(options).from(div).toPdf().get('pdf').then(function (pdf) {
            const blob = pdf.output('blob');
            const pdfURL = URL.createObjectURL(blob);
            window.open(pdfURL, '_blank'); // Open the generated PDF in a new tab
        });
    });

    // Download the PDF directly
    document.getElementById('downloadBtn').addEventListener('click', function () {
        const div = document.getElementById('printableDiv');

        // Configure PDF options
        const options = {
            margin: [10, 10, 10, 10], // Top, Right, Bottom, Left margins
            filename: 'content.pdf',
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // Generate and download the PDF
        html2pdf().set(options).from(div).save();
    });


    //Popup
    $('.popup-image').magnificPopup({
        type: 'image',
        gallery: {
            enabled: false // Enable gallery mode
        },
        zoom: {
            enabled: true, // Enable zoom animation
            duration: 200 // Duration of the zoom animation in ms
        }
    });
    $('.popup-image-gallery').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true // Enable gallery mode
        },
        zoom: {
            enabled: true, // Enable zoom animation
            duration: 200 // Duration of the zoom animation in ms
        }
    });

    //Header Fix
    // const header = $('header');
    // const scrollThreshold = 100;

    // $(window).on('scroll', function() {
    //     if ($(window).scrollTop() > scrollThreshold) {
    //         header.addClass('fixed');
    //     } else {
    //         header.removeClass('fixed');
    //     }
    // });

    // MENU SCRIPT
    $('.dropMenuBtn').on('click', function(event) {
        event.stopPropagation();
        const $toggleDiv = $(this).next('.toggleDiv');
        $('.toggleDiv').not($toggleDiv).hide();
        $toggleDiv.toggle();
    });
    $(document).on('click', function(event) {
        if (!$(event.target).closest('.toggleDiv, .dropMenuBtn').length) {
            $('.toggleDiv').hide();
        }
    });


    //TABLE ACTION BTN
    var actionButtonClass = '.action-btn-handeler';
    var moreActionsClass = '.more-action-btns';
    var hiddenClass = 'hidden';

    $(actionButtonClass).on('click', function (e) {
        e.stopPropagation();
        var actions = $(this).closest('.action-td').find(moreActionsClass);
        $(moreActionsClass).not(actions).addClass(hiddenClass);
        actions.toggleClass(hiddenClass);
    });
    $(document).on('click', function () {
        $(moreActionsClass).addClass(hiddenClass);
    });
    $(moreActionsClass).on('click', function (e) {
        e.stopPropagation();
    });


    // CUSTOM POPUP
    $('.share-book-btn').click(function () {
        $('.pop-1').addClass('open-pop');
    });

    $('.pop-close').click(function () {
        $('.popup-bg').removeClass('open-pop');
    });
    $('.popup-bg').click(function (e) {
        // If the target of the click isn't the popup wrapper or a descendant of it, close the popup
        if (!$(e.target).closest('.popup-wrapper').length) {
            $(this).removeClass('open-pop');
        }
    });

    $('.share-media-book-btn').click(function () {
        $('.pop-1').removeClass('open-pop');
        $('.pop-2').addClass('open-pop');
    });
    $('.confirm-msg-pop-close').click(function () {
        $('.pop-2').removeClass('open-pop');
    });

    $('.metric-pop-btn').click(function () {
        $('.pop-3').addClass('open-pop');
    });




    // Show and hide password
    $('#togglePassword').click(function (event) {
        event.preventDefault(); // Prevent the page from reloading
        let passwordField = $('#password');
        let eyeIcon = $('#eyeIcon');
        let type = passwordField.attr('type');

        // Toggle between password and text type
        if (type === 'password') {
            passwordField.attr('type', 'text');
            eyeIcon.attr('src', 'images/show.png'); // Change to "show" image
        } else {
            passwordField.attr('type', 'password');
            eyeIcon.attr('src', 'images/hide.png'); // Change back to "hide" image
        }
    });


    // CLICK TO COPY
    $('.copyButton').click(function () {
        // Find the nearest input element in the same container
        var copyText = $(this).siblings('.copyText');

        // Create a temporary input element
        var tempInput = $('<input>');
        $('body').append(tempInput);

        // Set the value of the temporary input to the value you want to copy
        tempInput.val(copyText.val()).select();

        try {
            // Execute the copy command
            document.execCommand('copy');
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }

        // Remove the temporary input
        tempInput.remove();

        // Get the custom message from the data-message attribute
        var customMessage = copyText.attr('data-message');

        // Update the popup message with the custom message
        $('.copy-status').text(customMessage);

        // Show the message and hide it after 3 seconds
        $('.copy-message').fadeIn().delay(1000).fadeOut();
    });

    // CLICK TO DOWNLOAD
    $('.downloadButton').click(function () {
        // Show the message and hide it after 3 seconds
        $('.download-message').fadeIn().delay(3000).fadeOut(); // Adjusted to 3000ms for better visibility
    });





    // CUSTOM TOOLTIP
    function handleTooltip() {
        var windowWidth = $(window).width();

        // Remove any existing event handlers to avoid conflicts when resizing
        $('.tooltip-icon').off('hover click');
        $('.tooltip-wrapper').off('click');
        $(document).off('click.hideTooltip');

        if (windowWidth > 991) {
            // For screens larger than 991px, show tooltip on hover
            $('.tooltip-icon').hover(function () {
                $(this).siblings('.tooltip-wrapper').fadeIn(200);
            }, function () {
                $(this).siblings('.tooltip-wrapper').fadeOut();
            });
        } else {
            // For screens 991px or less, show tooltip on click
            $('.tooltip-icon').on('click', function (e) {
                $(this).siblings('.tooltip-wrapper').fadeIn();
                e.stopPropagation(); // Prevents the body click event from firing
            });

            // Hide tooltip when clicking outside the .tooltip-content but within .tooltip-wrapper
            $('.tooltip-wrapper').on('click', function (e) {
                if (!$(e.target).closest('.tooltip-content').length) {
                    $(this).fadeOut();
                }
            });

            // Hide tooltip when clicking outside the tooltip wrapper entirely
            $(document).on('click.hideTooltip', function (e) {
                if ($(e.target).closest('.tooltip-wrapper').length === 0) {
                    $('.tooltip-wrapper').fadeOut();
                }
            });
        }
    }

    // Run the function on page load and window resize
    handleTooltip();
    $(window).resize(function () {
        handleTooltip();
    });


    // BACK TO TOP
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) { // Show button after scrolling 300px
            $('.backtotop-wrapper').fadeIn();
        } else {
            $('.backtotop-wrapper').fadeOut();
        }
    });

    // Scroll to top when the button is clicked
    $('.backtotop-wrapper').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 500); // Smooth scroll to top in 500ms
        return false;
    });


    $(document).click(function (event) {
        var $area = $('.result-page-header-right .custom-search-wrapper');

        // Check if the clicked element is inside the area
        if ($area.is(event.target) || $area.has(event.target).length > 0) {
            $area.addClass('increase-weight');
        } else {
            $area.removeClass('increase-weight');
        }
    });



    //INSTAGRAM STORIES PAGE DROPDOWN BUTTON
    $('.share-instagram-stories-drop-btn').click(function (e) {
        e.stopPropagation();
        $('.stories-dropdown').toggle();
    });

    $(document).click(function (e) {
        if (!$(e.target).closest('.stories-dropdown, .share-instagram-stories-drop-btn').length) {
            $('.stories-dropdown').hide();
        }
    });



   



});