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
            } else if (top >= $('#skills').offset().top &&
                top < $('#contact').offset().top) {
                $('nav ul li .underline').removeClass('active');
                $('nav ul li .skills-underline').addClass('active');
            } else if (top >= $('#contact').offset().top) {
                $('nav ul li .underline').removeClass('active');
                $('nav ul li .contact-underline').addClass('active');
            } else {
                $('nav ul li .underline').removeClass('active');
            }
        });
    }

    function initForm() {
        console.log(window.localStorage.getItem('liamesahneebtnes'));
        if(window.localStorage.getItem('liamesahneebtnes') === 'true') {
            $('#contact-form').hide();
            $('.form-message').css('opacity', '1');
        } else {
            $('#contact-form').show();
            $('#contact-form').submit(sendForm);
        }
    }

    function sendForm(e) {
        var data = {};
        $('.button-send-form').text('SENDING...');
        e.preventDefault();
        $(e.target.children).each(function(_, el) {
            var d = $(el).children()[0];
            if (typeof(d) !== 'undefined') {
                data[$(d).attr('name')] = d.value;
            }
        });
        $.ajax({
            method: 'POST',
            url: '/email',
            data: JSON.stringify(data),
            contentType: 'application/json'
        }).done(function(res) {
            if(res.status === 200) {
                $('form').animate({opacity: 0}, 'slow', function() {
                    $('form').hide();
                    $('.form-message').animate({opacity: 1}, 'slow');
                    window.localStorage.setItem('liamesahneebtnes', true);
                });
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
    initForm();
    var top = $(window).scrollTop();
    if (top > 110) {
        $('.button.goUp').css('opacity', top / 200);
    } else {
        $('.button.goUp').css('opacity', '0')
    }
});
