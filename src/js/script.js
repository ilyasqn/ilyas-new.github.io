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

    $('ul.catalog__caption').on('click', 'li:not(catalog__caption__list_active)', function() {
        $(this)
          .addClass('catalog__caption__list_active').siblings().removeClass('catalog__caption__list_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });
    function toggleSlide (item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__content_back').eq(i).toggleClass('catalog-item__content_back_active');
            });
        });
    };
    toggleSlide ('.catalog-item__content__link');
    toggleSlide ('.catalog-item__content__link_back');

    //modal

    $('.modal__close').on('click', function(){
        $('.overlay').fadeOut();
    });

    $('.button_mini').each(function(i){
        $(this).on('click', function(){
            $('#order .modal__subtitle').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn();
        });
    });

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn();
    });

    function valideForms (form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: {
                    required: true,
                }
            },
            messages: {
                name: {
                    required: "Введите ваше имя",
                    minlength: jQuery.validator.format("Пожалуйста, введите хотя бы {0} буквы")
                },
                phone: {
                    required: "Введите ваш номер телефона",
                }
            }
        });
    }

    valideForms ('#consultation-form');
    valideForms ('#consultation form');
    valideForms('#order form');

    $('input[name=phone]').mask("+7(999) 999-9999");

    $('form').submit(function(e) {

        if (!$(this).valid()){ 
            return; 
        }
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });
});
