(function() {
  $('.arrow-down').on('click', function() {
    $('body').animate({
      scrollTop: $('#internships').offset().top
    }, 1000);
  });
})();
