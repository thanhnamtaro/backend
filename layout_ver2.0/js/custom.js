<<<<<<< HEAD
(function ($) {
    'use strict';
    /*Write Function Here*/

    /*Show Search Box*/
/*    $("#show-advance-search").on('click', function () {
        $(".advance-search").slideToggle('1000');
    });*/

    /*SHow login Form*/
    $("#show-login-form").on('click', function () {
        $(".form-login").slideToggle('1000');
        $(".form-signup").hide();
    })

    /*SHow signup Form*/
    $("#show-signup-form").on('click', function () {
        $(".form-signup").slideToggle('1000');
        $(".form-login").hide();
    })

    /*SHow user setting*/
    $("#show-user-setting").on('click', function () {
        $(".bio-user-area").slideToggle('1000');
    })

    /*SHow buy*/
    $("#show-buy").on('click', function () {
        $(".post-news-sale").hide();
        $(".post-news-buy").show();
    })

    /*SHow sale*/
    $("#show-sale").on('click', function () {
        $(".post-news-buy").hide();
        $(".post-news-sale").show();
    })

    /*Show Change Pass*/
    $("#show-change-password").on('click', function () {
        $(".change-pasword").slideToggle('1000');
    });

    /*Show menu mobile*/
    $('#show-menu-mobile').on('click', function(){
        $(this).toggleClass('is-active');
        $('.menu-mobile').slideToggle();
    });

    var arrowMainMenu = $('.arrow-main-menu');

    for(var i=0; i<arrowMainMenu.length; i++){
        $(arrowMainMenu[i]).on('click', function(){
            $(this).parent().find('.sub-menu-mobile').slideToggle();
            $(this).toggleClass('turn-arrow');
        })
    }

    $(window).resize(function(){
        if($(window).width() >= 1050){
            if($('.menu-mobile').css('display') == 'block'){
                $('.menu-mobile').css('display','none');
                $('#show-menu-mobile').toggleClass('is-active');
            }
            if($('.sub-menu-mobile').css('display') == 'block'){
                $('.sub-menu-mobile').css('display','none');
                $('.arrow-main-menu').removeClass('turn-arrow');
            }
        }
    });

    /*Back To Top*/
    var windowH = $(window).height()/2;

    $(window).on('scroll',function(){
        if ($(this).scrollTop() > windowH) {
            $("#idBtnBack").css('display','flex');
        } else {
            $("#idBtnBack").css('display','none');
        }
    });

    $('#idBtnBack').on("click", function(){
        $('html, body').animate({scrollTop: 0}, 300);
    });

=======
(function ($) {
    'use strict';
    /*Write Function Here*/

    /*Show Search Box*/
/*    $("#show-advance-search").on('click', function () {
        $(".advance-search").slideToggle('1000');
    });*/

    /*SHow login Form*/
    $("#show-login-form").on('click', function () {
        $(".form-login").slideToggle('1000');
        $(".form-signup").hide();
    })

    /*SHow signup Form*/
    $("#show-signup-form").on('click', function () {
        $(".form-signup").slideToggle('1000');
        $(".form-login").hide();
    })

    /*SHow user setting*/
    $("#show-user-setting").on('click', function () {
        $(".bio-user-area").slideToggle('1000');
    })

    /*SHow buy*/
    $("#show-buy").on('click', function () {
        $(".post-news-sale").hide();
        $(".post-news-buy").show();
    })

    /*SHow sale*/
    $("#show-sale").on('click', function () {
        $(".post-news-buy").hide();
        $(".post-news-sale").show();
    })

    /*Show Change Pass*/
    $("#show-change-password").on('click', function () {
        $(".change-pasword").slideToggle('1000');
    });

    /*Show menu mobile*/
    $('#show-menu-mobile').on('click', function(){
        $(this).toggleClass('is-active');
        $('.menu-mobile').slideToggle();
    });

    var arrowMainMenu = $('.arrow-main-menu');

    for(var i=0; i<arrowMainMenu.length; i++){
        $(arrowMainMenu[i]).on('click', function(){
            $(this).parent().find('.sub-menu-mobile').slideToggle();
            $(this).toggleClass('turn-arrow');
        })
    }

    $(window).resize(function(){
        if($(window).width() >= 1050){
            if($('.menu-mobile').css('display') == 'block'){
                $('.menu-mobile').css('display','none');
                $('#show-menu-mobile').toggleClass('is-active');
            }
            if($('.sub-menu-mobile').css('display') == 'block'){
                $('.sub-menu-mobile').css('display','none');
                $('.arrow-main-menu').removeClass('turn-arrow');
            }
        }
    });

    /*Back To Top*/
    var windowH = $(window).height()/2;

    $(window).on('scroll',function(){
        if ($(this).scrollTop() > windowH) {
            $("#idBtnBack").css('display','flex');
        } else {
            $("#idBtnBack").css('display','none');
        }
    });

    $('#idBtnBack').on("click", function(){
        $('html, body').animate({scrollTop: 0}, 300);
    });

>>>>>>> 8805d6a2d513a10d79360f7c2ff81704a9bb2c70
})(jQuery)