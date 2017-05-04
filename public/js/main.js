$(document).ready(function() {
    var pages = ['home', 'experiences', 'aboutme', 'contactme', 'notfound'];

    function toggleNavbar() {
        var state = $('nav').attr('class');
        $('nav').attr('class', (state === 'open' ? 'closed' : 'open'));
    }

    function launchScript(pagename) {
        $.getScript(`./public/js/${pagename}.js`)
    }

    function setPage(pathname, cb) {
        var pagename = pathname.match(/\/([a-zA-Z]*)/)[1];

        if (pagename === '') {
            pagename = 'home';
        }

        if (pages.indexOf(pagename) === -1) {
            window.location.pathname = '/notfound';
        }

        window.history.pushState({
            pathname: window.location.pathname
        }, null, pathname);

        $(document).on('navReady', setNavLinkActive);

        $('main').load(`./views/${pagename}.html`, function() {
            $('body').scrollTop(0);
            launchScript(pagename);
            if (cb && typeof cb === 'function') {
                cb();
            }
        });
    }

    function setActualPage(cb) {
        var pathname = window.location.pathname;
        setPage(pathname, cb);
    }

    function setNav() {
        $('nav').load('./views/nav.html', function() {
            $(document).trigger('navReady');

            $('nav ul li a').on('click', function(e) {
                e.preventDefault();
                var pathname = $(e.target)[0].pathname;

                setPage(pathname, function() {
                    setNavLinkActive();
                    toggleNavbar();
                });
            });

            $('a.icon-hamburger').on('click', toggleNavbar);
        });
    }

    function setNavLinkActive() {
        var pathname = window.location.pathname;
        $('nav ul li a').each(function(_, el) {
            el = $(el);
            if (pathname == el.attr('href')) {
                el.parent().addClass('active');
            } else {
                el.parent().removeClass('active');
            }
        });
    }

    function setFooter() {
        $.ajax('./views/footer.html').then(function(data) {
            $('footer').html(data);
        });
    }

    setNav();
    setActualPage(function() {
        setFooter();
    });

    window.onpopstate = function() {
        var pathname = window.location.pathname;

        setPage(pathname);
    }
});
