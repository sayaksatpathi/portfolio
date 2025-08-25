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

// Simple typewriter effect for the homepage subtitle (single-line)
function typeWriter(el, text, delay = 60, callback) {
    let i = 0;
    el.innerHTML = '';
    function type() {
        if (i < text.length) {
            el.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, delay);
        } else if (typeof callback === 'function') {
            callback();
        }
    }
    type();
}

document.addEventListener('DOMContentLoaded', function() {
    const el = document.getElementById('typed-text');
    if (el) {
        const phrase = "AI & ML Enthusiast | Web Developer | Cyber Security Learner | Open Source Contributor | Problem Solver | Lifelong Learner";
        // Small delay so it starts after fade-in for smoothness
        setTimeout(() => typeWriter(el, phrase, 40), 800);
    }
});
