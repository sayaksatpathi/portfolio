// Projects page specific functionality
$(window).on("load", function() {
    // Project fade-in on scroll
    $(window).scroll(function() {
        var windowBottom = $(this).scrollTop() + $(this).innerHeight();
        $(".project-item").each(function() {
            var objectBottom = $(this).offset().top + $(this).outerHeight() / 3;
            if (objectBottom < windowBottom) {
                if ($(this).css("opacity") == 0) { 
                    $(this).addClass("fade-in"); 
                }
            }
        });
    }).scroll(); // Trigger scroll on load
});
