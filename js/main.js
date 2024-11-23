/*  ---------------------------------------------------
Template Name: Ashion
Description: Ashion ecommerce template
Author: Colorib
Author URI: https://colorlib.com/
Version: 1.0
Created: Colorib
---------------------------------------------------------  */

'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");

        /*------------------
            Product filter
        --------------------*/
        $('.filter__controls li').on('click', function () {
            $('.filter__controls li').removeClass('active');
            $(this).addClass('active');
        });
        if ($('.property__gallery').length > 0) {
            var containerEl = document.querySelector('.property__gallery');
            var mixer = mixitup(containerEl);
        }
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    //Search Switch
    $('.search-switch').on('click', function () {
        $('.search-model').fadeIn(400);
    });

    $('.search-close-switch').on('click', function () {
        $('.search-model').fadeOut(400, function () {
            $('#search-input').val('');
        });
    });

    //Canvas Menu
    $(".canvas__open").on('click', function () {
        $(".offcanvas-menu-wrapper").addClass("active");
        $(".offcanvas-menu-overlay").addClass("active");
    });

    $(".offcanvas-menu-overlay, .offcanvas__close").on('click', function () {
        $(".offcanvas-menu-wrapper").removeClass("active");
        $(".offcanvas-menu-overlay").removeClass("active");
    });

    /*------------------
        Navigation
    --------------------*/
    $(".header__menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*------------------
        Accordin Active
    --------------------*/
    $('.collapse').on('shown.bs.collapse', function () {
        $(this).prev().addClass('active');
    });

    $('.collapse').on('hidden.bs.collapse', function () {
        $(this).prev().removeClass('active');
    });

    /*--------------------------
        Banner Slider
    ----------------------------*/
    $(".banner__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: true,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true
    });

    /*--------------------------
        Login Register Slider
    ----------------------------*/

    document.getElementById('switchToRegister').addEventListener('click', function (e) {
        e.preventDefault();
        document.getElementById('loginForm').classList.add('d-none');
        document.getElementById('registerForm').classList.remove('d-none');
    });

    document.getElementById('switchToLogin').addEventListener('click', function (e) {
        e.preventDefault();
        document.getElementById('registerForm').classList.add('d-none');
        document.getElementById('loginForm').classList.remove('d-none');
    });


    /*--------------------------
        Product Details Slider
    ----------------------------*/
    $(".product__details__pic__slider").owlCarousel({
        loop: false,
        margin: 0,
        items: 1,
        dots: false,
        nav: true,
        navText: ["<i class='arrow_carrot-left'></i>", "<i class='arrow_carrot-right'></i>"],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: false,
        mouseDrag: false,
        startPosition: 'URLHash'
    }).on('changed.owl.carousel', function (event) {
        var indexNum = event.item.index + 1;
        product_thumbs(indexNum);
    });

    function product_thumbs(num) {
        var thumbs = document.querySelectorAll('.product__thumb a');
        thumbs.forEach(function (e) {
            e.classList.remove("active");
            if (e.hash.split("-")[1] == num) {
                e.classList.add("active");
            }
        })
    }


    /*------------------
        Magnific
    --------------------*/
    $('.image-popup').magnificPopup({
        type: 'image'
    });


    $(".nice-scroll").niceScroll({
        cursorborder: "",
        cursorcolor: "#dddddd",
        boxzoom: false,
        cursorwidth: 5,
        background: 'rgba(0, 0, 0, 0.2)',
        cursorborderradius: 50,
        horizrailenabled: false
    });

    /*------------------
        CountDown
    --------------------*/
    // For demo preview start
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    if (mm == 12) {
        mm = '01';
        yyyy = yyyy + 1;
    } else {
        mm = parseInt(mm) + 1;
        mm = String(mm).padStart(2, '0');
    }
    var timerdate = mm + '/' + dd + '/' + yyyy;
    // For demo preview end


    // Uncomment below and use your date //

    /* var timerdate = "2020/12/30" */

    $("#countdown-time").countdown(timerdate, function (event) {
        $(this).html(event.strftime("<div class='countdown__item'><span>%D</span> <p>Day</p> </div>" + "<div class='countdown__item'><span>%H</span> <p>Hour</p> </div>" + "<div class='countdown__item'><span>%M</span> <p>Min</p> </div>" + "<div class='countdown__item'><span>%S</span> <p>Sec</p> </div>"));
    });

    /*-------------------
        Range Slider
    --------------------- */
    var rangeSlider = $(".price-range"),
        minamount = $("#minamount"),
        maxamount = $("#maxamount"),
        minPrice = rangeSlider.data('min'),
        maxPrice = rangeSlider.data('max');
    rangeSlider.slider({
        range: true,
        min: minPrice,
        max: maxPrice,
        values: [minPrice, maxPrice],
        slide: function (event, ui) {
            minamount.val('$' + ui.values[0]);
            maxamount.val('$' + ui.values[1]);
        }
    });
    minamount.val('$' + rangeSlider.slider("values", 0));
    maxamount.val('$' + rangeSlider.slider("values", 1));

    /*------------------
        Single Product
    --------------------*/
    $('.product__thumb .pt').on('click', function () {
        var imgurl = $(this).data('imgbigurl');
        var bigImg = $('.product__big__img').attr('src');
        if (imgurl != bigImg) {
            $('.product__big__img').attr({ src: imgurl });
        }
    });

    /*-------------------
        Quantity change
    --------------------- */
    var proQty = $('.pro-qty');
    proQty.prepend('<span class="dec qtybtn">-</span>');
    proQty.append('<span class="inc qtybtn">+</span>');
    proQty.on('click', '.qtybtn', function () {
        var $button = $(this);
        var oldValue = $button.parent().find('input').val();
        if ($button.hasClass('inc')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        $button.parent().find('input').val(newVal);
    });

    /*-------------------
        Radio Btn
    --------------------- */
    $(".size__btn label").on('click', function () {
        $(".size__btn label").removeClass('active');
        $(this).addClass('active');
    });

})(jQuery);

/*-------------------
        Donation Btn
    --------------------- */
// Select all donation buttons and the custom amount input
const buttons = document.querySelectorAll('.donation-buttons .donation-btn');
const customAmountInput = document.getElementById('customAmount');

// Add a click event listener to each button
buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove the 'active' class from all buttons
        buttons.forEach(btn => btn.classList.remove('active'));
        // Add the 'active' class to the clicked button
        button.classList.add('active');
        // Update the custom amount input with the button's value
        const value = button.textContent.replace('€', '').replace('.', '').trim(); // Remove '€' and dots, trim whitespace
        customAmountInput.value = parseInt(value, 10); // Convert to number and set as input value
    });
});

// Add event listener to the input to clear the active state when typing a custom amount
customAmountInput.addEventListener('input', () => {
    buttons.forEach(btn => btn.classList.remove('active'));
});


/*-------------------
        Filtering Logic
    --------------------- */

function applyFilters() {
    const type = document.getElementById('animalTypeFilter').value.toLowerCase();
    const sex = document.getElementById('sexFilter').value.toLowerCase();
    const age = document.getElementById('ageFilter').value.toLowerCase();
    const size = document.getElementById('sizeFilter').value.toLowerCase();
    const breed = document.getElementById('breedFilter').value.toLowerCase();
    const location = document.getElementById('locationFilter').value.toLowerCase();

    const animalItems = document.querySelectorAll('.animal-item');

    animalItems.forEach((item) => {
        const itemType = item.getAttribute('data-type').toLowerCase();
        const itemSex = item.getAttribute('data-sex').toLowerCase();
        const itemAge = item.getAttribute('data-age').toLowerCase();
        const itemSize = item.getAttribute('data-size').toLowerCase();
        const itemBreed = item.getAttribute('data-breed').toLowerCase();
        const itemLocation = item.getAttribute('data-location').toLowerCase();

        const matchesType = !type || itemType === type;
        const matchesSex = !sex || itemSex === sex;
        const matchesAge = !age || itemAge === age;
        const matchesSize = !size || itemSize === size;
        const matchesBreed = !breed || itemBreed.includes(breed);
        const matchesLocation = !location || itemLocation.includes(location);

        if (matchesType && matchesSex && matchesAge && matchesSize && matchesBreed && matchesLocation) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

/* -------------------

    PDF Generation

--------------------- */

function generateLostFormPDF() {
    const animalName = document.getElementById("animalName")?.value || "N/A";
    const animalSize = document.getElementById("animalSize")?.value || "N/A";
    const animalType = document.getElementById("animalType")?.value || "N/A";
    const animalAge = document.getElementById("animalAge")?.value || "N/A";
    const animalBreed = document.getElementById("animalBreed")?.value || "N/A";
    const lastLocation = document.getElementById("lastLocation")?.value || "N/A";
    const contactInfo = document.getElementById("contactInfo")?.value || "N/A";
    const description = document.getElementById("description")?.value || "N/A";

    // Criar um novo documento PDF
    const pdf = new jsPDF();

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(18);
    pdf.text("Relatório de Animal Perdido", 105, 20, { align: "center" });

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    pdf.text(`Nome do Animal: ${animalName}`, 10, 40);
    pdf.text(`Tamanho: ${animalSize}`, 10, 50);
    pdf.text(`Tipo: ${animalType}`, 10, 60);
    pdf.text(`Idade: ${animalAge}`, 10, 70);
    pdf.text(`Raça: ${animalBreed}`, 10, 80);
    pdf.text(`Última Localização Vista: ${lastLocation}`, 10, 90);
    pdf.text(`Informação de Contacto: ${contactInfo}`, 10, 100);
    pdf.text("Descrição:", 10, 110);
    pdf.text(description, 10, 120, { maxWidth: 180 });

    // Adicionar rodapé
    pdf.setFontSize(10);
    pdf.text("BuscaPatas - Plataforma de Apoio a Animais", 105, 290, { align: "center" });

    // Gerar e baixar o PDF
    pdf.save("Animal_Perdido.pdf");
}


