(function() {
  $('.arrow-down').on('click', function() {
    $('body').animate({
      scrollTop: $('#stages').offset().top
    }, 1000);
  });
})();
