// Index page specific functionality
$(window).on("load", function () {
    // Welcome overlay logic
    if (!sessionStorage.viewed) {
        $("#overlay").show().delay(1000).fadeOut(2000, "swing");
        sessionStorage.viewed = 1;
    } else {
        $('#overlay').hide();
    }
});
