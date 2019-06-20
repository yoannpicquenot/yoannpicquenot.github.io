$(document).ready(function() {
    function bindLinksClick() {
        $('nav ul li').on('click', function(e) {
            e.preventDefault();
            var body = $("body");
            var linkToGo = `#${$(e.target).text().toLowerCase()}`;

            body.stop().animate({
                scrollTop: $(linkToGo).offset().top
            }, 500);

            window.location.hash = linkToGo;
        });
    }

    function setNavLink() {
        var hash = window.location.hash.substring(1);

        $(`.${hash}-underline`).addClass('active');

        bindLinksClick();
    }

    function initScrollSpy() {
        $(window).bind('scroll', function(e) {
            var top = $(window).scrollTop();
            if (top > 110) {
                $('.button.goUp').css('opacity', top / 200);
            } else {
                $('.button.goUp').css('opacity', '0')
            }

            if (top >= $('#experiences').offset().top &&
                top < $('#skills').offset().top) {
                $('nav ul li .underline').removeClass('active');
                $('nav ul li .experiences-underline').addClass('active');
            } else if (top >= $('#skills').offset().top) {
                $('nav ul li .underline').removeClass('active');
                $('nav ul li .skills-underline').addClass('active');
            } else {
                $('nav ul li .underline').removeClass('active');
            }
        });
    }
    $('.button.goUp').on('click', function() {
        $('html, body').stop().animate({
            scrollTop: 0
        }, 1000);
        window.location.hash = '';
    });
    setNavLink();
    initScrollSpy();
    var top = $(window).scrollTop();
    if (top > 110) {
        $('.button.goUp').css('opacity', top / 200);
    } else {
        $('.button.goUp').css('opacity', '0')
    }
});
