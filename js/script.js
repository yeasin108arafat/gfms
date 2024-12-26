$(document).ready(function () {
    
    //FORM IMAGE UPLOAD -----------------------------------------
    $(document).on('change', 'input[type="file"]', function () {
        const $input = $(this);
        const isMultiple = $input.hasClass('multi-image-upload');
        const $previewContainer = $input.closest('.input-file-wrap').next('.preview-container');
        const files = this.files;

        // Clear existing previews
        $previewContainer.empty();

        if (isMultiple) {
            // Handle multiple image upload
            Array.from(files).forEach((file, index) => {
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        const previewHtml = `
                            <div class="preview-item" data-index="${index}">
                                <img src="${e.target.result}" alt="Preview Image" />
                                <button type="button" class="close-btn">×</button>
                            </div>
                        `;
                        $previewContainer.append(previewHtml);
                    };
                    reader.readAsDataURL(file);
                }
            });
        } else {
            // Handle single image upload
            const file = files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const previewHtml = `
                        <div class="preview-item">
                            <img src="${e.target.result}" alt="Preview Image" />
                            <button type="button" class="close-btn">×</button>
                        </div>
                    `;
                    $previewContainer.append(previewHtml);
                };
                reader.readAsDataURL(file);
            }
        }
    });

    // Handle remove button click
    $(document).on('click', '.close-btn', function () {
        const $previewItem = $(this).closest('.preview-item');
        const $previewContainer = $previewItem.closest('.preview-container');
        const $fileInput = $previewContainer.prev('.input-file-wrap').find('input[type="file"]');
        const isMultiple = $fileInput.hasClass('multi-image-upload');

        if (isMultiple) {
            // Handle removal for multiple images
            const indexToRemove = $previewItem.data('index');
            const dataTransfer = new DataTransfer();
            const files = $fileInput[0].files;

            Array.from(files).forEach((file, index) => {
                if (index !== indexToRemove) {
                    dataTransfer.items.add(file);
                }
            });

            $fileInput[0].files = dataTransfer.files;
        } else {
            // Handle removal for single image
            $fileInput.val(''); // Clear the file input
        }

        // Remove the preview item
        $previewItem.remove();
    });

    // REPEAT INPUT -----------------------------------------
    // Object to track row counts for each group
    const rowCount = {};

    // Handle the "Add Row" button click
    $(document).on('click', '.add-row-btn', function () {
        const targetClass = $(this).data('target'); // Get the target class
        const $lastRow = $(`.${targetClass}`).last(); // Find the last row of the target class
        const $newRow = $lastRow.clone(); // Clone the row

        // Initialize or increment the row count for this group
        if (!rowCount[targetClass]) {
            rowCount[targetClass] = $lastRow.data('group-index') || 1;
        }
        rowCount[targetClass]++;

        // Update attributes in the cloned row
        $newRow.attr('data-group-index', rowCount[targetClass]);

        // Update input and select names
        $newRow.find('input, select').each(function () {
            const name = $(this).attr('name');
            if (name) {
                // Extract the first two words of the name
                const baseName = name.split('-').slice(0, 2).join('-'); // Take the first two parts
                $(this).attr('name', `${baseName}-${rowCount[targetClass]}`); // Append the new index
            }
            $(this).val(''); // Clear the value
        });

        // Append the new row after the last row in the group
        $lastRow.after($newRow);

        // Show close button for all rows
        $(`.${targetClass} .close-row-btn`).show();
    });

    // Handle the "Close" button click
    $(document).on('click', '.close-row-btn', function () {
        const $row = $(this).closest('.field-row'); // Find the closest field-row
        const targetClass = $row.attr('class').split(' ').find(c => c.startsWith('row-group-')); // Identify the row group class
        
        $row.remove(); // Remove the entire row

        // If only one row is left, hide the close button
        if ($(`.${targetClass}`).length === 1) {
            $(`.${targetClass} .close-row-btn`).hide();
        }
    });

    // Initial state: hide close button if only one row exists
    $('.field-row').each(function () {
        const targetClass = $(this).attr('class').split(' ').find(c => c.startsWith('row-group-')); // Identify the row group class
        
        if ($(`.${targetClass}`).length === 1) {
            $(this).find('.close-row-btn').hide();
        }
    });

    

    // POPUP IMAGE ---------------------------------------
    // Initialize Magnific Popup for single image popups
    if ($('.popup-image').length) {
        $('.popup-image').magnificPopup({
            type: 'image',
            gallery: {
                enabled: false // Disable gallery mode
            },
            zoom: {
                enabled: true, // Enable zoom animation
                duration: 200 // Duration of the zoom animation in ms
            }
        });
    }

    // Initialize Magnific Popup for image galleries
    if ($('.popup-image-gallery').length) {
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
    }



    // Toggle password visibility
    $('#togglePassword').on('click', function () {
        // Toggle the type of the password field
        const passwordField = $('#password');
        const eyeIcon = $('#eyeIcon');
        const isPassword = passwordField.attr('type') === 'password';

        passwordField.attr('type', isPassword ? 'text' : 'password');
        eyeIcon.attr(
            'src',
            isPassword ? 'images/icn/eye-close.svg' : 'images/icn/eye.svg'
        );
    });

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

    // SIDEBAR MENU 
    // Show submenu if it contains an active-page class
    const activeSubmenu = $(".active-page").closest(".submenu");
    activeSubmenu.addClass("active-submenu");
    activeSubmenu.prev(".menu").addClass("active-menu");

    // Menu click handler
    $(".menu").click(function() {
        // Close all submenus except the clicked one
        const submenu = $(this).next(".submenu");
        $(".submenu").not(submenu).slideUp().removeClass("active-submenu");
        submenu.slideToggle().toggleClass("active-submenu");

        // Add active-menu class to the clicked menu and remove from others
        $(".menu").not(this).removeClass("active-menu");
        $(this).toggleClass("active-menu");
    });


});
