$(document).ready(function() {
    function setNavLink() {
        var hash = window.location.hash.substring(1) || 'aboutme';

        $(`.${hash}-underline`).addClass('active');
    }

    setNavLink();
});
