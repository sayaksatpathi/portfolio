// Common navbar functionality used across all pages
$(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('.navbar').slideUp(400);
        } else {
            $('.navbar').slideDown(400);
        }
    });
});
