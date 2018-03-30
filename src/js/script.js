/* Import libraties */
//= vendors/jquery-3.3.1.js
//= vendors/slick.js
//= vendors/parallax.js

$(function() {

    var windowHeight = $(window).innerHeight();
    var windowScrollTop = $(window).scrollTop();
    var diff = -100;

    var offsetXLogo = $('.header .logo').position().left;
    var offsetYLogo = $('.header .logo').position().top + 28;

    preloader();

    if($('.people-teaser').length > 0) {
        $(window).resize(function() {
            windowHeight = $(this).innerHeight();
        });
    
        $(window).scroll(function() {
            windowScrollTop = $(window).scrollTop();        
            for(var i=0; i < $('.people-row').length; i++) {
                diff = windowScrollTop - $('.people-row').eq(i).offset().top + (.8*windowHeight);
                if(diff >  0) {
                    $('.people-row').eq(i).css({
                        'top': '0'
                    });
                } else {
                    $('.people-row').eq(i).removeAttr('style');
                }
            }
        });
    }

    // Open modals 
    $('.people-teaser').on('click', function(e) {
        e.preventDefault();
        var target = $(this).attr('href');
        $(target).fadeIn(300);
        $('body').addClass('no-scroll');
    });

    $('.btn-close-modal').on('click', function(e) {
        e.preventDefault();
        $('.people-modal').fadeOut(300);
        $('body').removeClass('no-scroll');
    });

    // Burger button
    $('[data-js="burger-btn"]').on('click', function(e) {
        e.preventDefault();
        $('[data-js="burger-btn"]').toggleClass('clicked');
        $('.full-screen-nav').fadeToggle(300);
    });

    if($('[data-js="main-slider"]').length > 0) {
        // Pagination
        $('[data-js="pagination"]').on('click', function(e) {
            e.preventDefault();
            var length = $('[data-js="pagination"]').length;
            var index = $(this).attr('data-index');
            $('[data-js="main-slider"]').slick('slickGoTo', +index);
            $('[data-js="pagination"]').removeClass('current');
            if(!$(this).hasClass('active')) {
                for(var i = 0; i <= +index; i++) {
                    var current = $('[data-js="pagination"]').eq(i);
                    if(!$(current).hasClass('active')) {
                        $(current).addClass('active');
                    }
                }   
            } else {
                for(var i = +index + 1; i < length; i++) {
                    var current = $('[data-js="pagination"]').eq(i);
                    $(current).removeClass('active');
                }
            }
            $(this).addClass('current');
        });

        $('[data-js="main-slider"]').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            nextArrow: $('.btn-main-slider-next'),
            prevArrow: $('.btn-main-slider-prev'),
            fade: true,
            dots: false,
            speed: 1,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        dots: true
                    }
                }
            ]
        });

        $('[data-js="main-slider"] .slick-dots').css('top', $('.slider-nav-dots').offset().top - 30);

        $('[data-js="main-slider"]').on('afterChange', function(event, slick, currentSlide) {
            $('[data-js="pagination"]').eq(currentSlide).trigger('click');
            $('[data-js="main-slider"] .main-slider__slide').eq(currentSlide).find('.left-side').addClass('animated zoomInLeft');
            $('[data-js="main-slider"] .main-slider__slide').eq(currentSlide).find('.right-side').addClass('animated zoomInRight');
            $('[data-js="main-slider"] .slick-dots').css('top', $('[data-js="main-slider"] .main-slider__slide').eq(currentSlide).find('.slider-nav-dots').offset().top - 30);
        });
        $('[data-js="main-slider"]').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            $('[data-js="main-slider"] .main-slider__slide').eq(currentSlide).find('.left-side').removeClass('animated zoomInLeft');
            $('[data-js="main-slider"] .main-slider__slide').eq(currentSlide).find('.right-side').removeClass('animated zoomInRight');
        });
    }

    $('[data-js="btn-up"]').on('click', function(e) {
        e.preventDefault();
        $('body, html').animate({
            scrollTop:0
        }, '500');
    });

    function preloader() {
        if($('.preloader').length > 0) {
            setTimeout(function() {
                $('.preloader img').animate({
                    "top": 0,
                    "left": 0,
                    "max-width": 37
                }, 1500, function() {
                    $('.preloader').fadeOut(500);
                    $('body').removeClass('no-scroll');
                });
            }, 5000);
        }
    }
});