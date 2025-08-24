// Personal page specific functionality
$(window).scroll(function() {
    // Back to top button functionality
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn();
    } else {
        $('.back-to-top').fadeOut();
    }
});

function scrollToTop() {
    $('html, body').animate({scrollTop: 0}, 600);
}
