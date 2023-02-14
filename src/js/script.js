$(document).ready(function(){
    $('.slider').slick({
        fade: true,
        autoplay: true,
        autoplaySpeed: 2000,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="../img/icons/3/left-removebg-preview.png" alt="#"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="../img/icons/3/right-removebg-preview.png" alt="#"></button>',
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    arrows: false,
                    dots: true,
                    autoplay: true,
                }
            }
        ]
    });
});
