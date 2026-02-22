// Safely initialize Lucide icons — if CDN fails on mobile, script still runs
try { lucide.createIcons(); } catch(e) { console.warn('Lucide icons unavailable:', e); }

// Overlay Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const overlayMenu = document.getElementById('overlay-menu');
const overlayLinks = document.querySelectorAll('.overlay-link');
const header = document.getElementById('header');
const closeMenuBtn = document.getElementById('close-menu-btn');
const menuOpenIcon = document.getElementById('menu-open-icon');
const menuCloseIcon = document.getElementById('menu-close-icon');

menuBtn.addEventListener('click', () => {
    overlayMenu.classList.add('open');
    if (menuOpenIcon && menuCloseIcon) {
        menuOpenIcon.classList.add('opacity-0');
        menuCloseIcon.classList.remove('opacity-0');
    }
});

closeMenuBtn.addEventListener('click', () => {
    overlayMenu.classList.remove('open');
    if (menuOpenIcon && menuCloseIcon) {
        menuOpenIcon.classList.remove('opacity-0');
        menuCloseIcon.classList.add('opacity-0');
    }
});

overlayLinks.forEach(link => {
    link.addEventListener('click', () => {
        overlayMenu.classList.remove('open');
        if (menuOpenIcon && menuCloseIcon) {
            menuOpenIcon.classList.remove('opacity-0');
            menuCloseIcon.classList.add('opacity-0');
        }
    });
});

// Overlay Menu Hover Effect
const menuHoverBg = document.getElementById('menu-hover-bg');
if (menuHoverBg) {
    overlayLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            menuHoverBg.classList.remove('opacity-0');
        });
        link.addEventListener('mouseleave', () => {
            menuHoverBg.classList.add('opacity-0');
        });
        link.addEventListener('mousemove', (e) => {
            const rect = overlayMenu.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            menuHoverBg.style.left = `${x}px`;
            menuHoverBg.style.top = `${y}px`;
        });
    });
}


const skillsCategories = {
    languages: [
        { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/python/python-original.svg' },
        { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/javascript/javascript-original.svg' },
        { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/cplusplus/cplusplus-original.svg' },
        { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/java/java-original.svg' },
        { name: 'C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/c/c-original.svg' },
        { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/php/php-original.svg' },
        { name: 'Go', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/go/go-original.svg' },
        { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/html5/html5-original.svg' },
        { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/css3/css3-original.svg' }
    ],
    frameworks: [
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/react/react-original.svg' },
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/nodejs/nodejs-original.svg' },
        { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/nextjs/nextjs-original.svg' },
        { name: 'Flask', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/flask/flask-original.svg' },
        { name: 'Streamlit', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/streamlit/streamlit-original.svg' },
        { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/bootstrap/bootstrap-original.svg' },
        { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/tailwindcss/tailwindcss-plain.svg' },
        { name: 'Redux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/redux/redux-original.svg' },
        { name: 'Material UI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/materialui/materialui-original.svg' }
    ],
    tools: [
        { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/mongodb/mongodb-original.svg' },
        { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/mysql/mysql-original.svg' },
        { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/firebase/firebase-plain.svg' },
        { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/git/git-original.svg' },
        { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/amazonwebservices/amazonwebservices-original.svg' },
        { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/figma/figma-original.svg' },
        { name: 'Canva', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/canva/canva-original.svg' },
        { name: 'Tableau', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/tableau/tableau-original.svg' },
        { name: 'Wordpress', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/wordpress/wordpress-original.svg' }
    ]
};


// Scroll animations and theme change
const mainNav = document.getElementById('main-nav');

const observerOptions = {
    root: null,
    rootMargin: '-50px 0px -50px 0px',
    threshold: 0.5
};

let currentSection = 'hero-section'; // Track current section

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const isDark = entry.target.classList.contains('bg-dark');
            const sectionId = entry.target.id;
            currentSection = sectionId;

            console.log('Current section:', sectionId, 'isDark:', isDark); // Debug log

            if (isDark) {
                // Dark sections - hide main nav, show white text
                document.body.classList.add('dark');
                header.classList.add('text-white');
                header.classList.remove('text-gray-900');
                menuBtn.classList.add('text-white', 'ball-style');
                menuBtn.classList.remove('text-gray-900');
                mainNav.classList.add('opacity-0', 'pointer-events-none');
            } else {
                // Light sections (hero and footer) - show nav with dark text
                document.body.classList.remove('dark');
                header.classList.remove('text-white');
                header.classList.add('text-gray-900');
                menuBtn.classList.remove('text-white', 'ball-style');
                menuBtn.classList.add('text-gray-900');
                mainNav.classList.remove('opacity-0', 'pointer-events-none');
            }

            // Special handling for hero section - always ensure nav is visible
            if (sectionId === 'hero-section') {
                setTimeout(() => {
                    mainNav.classList.remove('opacity-0', 'pointer-events-none');
                    header.classList.remove('text-white');
                    header.classList.add('text-gray-900');
                    menuBtn.classList.remove('text-white', 'ball-style');
                    menuBtn.classList.add('text-gray-900');
                }, 100);
            }
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Initial state: ensure navigation is visible on hero section
setTimeout(() => {
    mainNav.classList.remove('opacity-0', 'pointer-events-none');
    header.classList.add('text-gray-900');
    header.classList.remove('text-white');
    menuBtn.classList.add('text-gray-900');
    menuBtn.classList.remove('text-white', 'ball-style');
}, 100);

// Backup scroll listener to ensure hero section nav is always visible
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        const heroSection = document.getElementById('hero-section');
        const heroRect = heroSection.getBoundingClientRect();
        const isHeroVisible = heroRect.top <= 100 && heroRect.bottom >= 100;

        if (isHeroVisible && currentSection === 'hero-section') {
            // Force show navigation on hero
            mainNav.classList.remove('opacity-0', 'pointer-events-none');
            header.classList.remove('text-white');
            header.classList.add('text-gray-900');
            menuBtn.classList.remove('text-white', 'ball-style');
            menuBtn.classList.add('text-gray-900');
        }
    }, 50);
});

// Back to top button
const backToTopButton = document.getElementById('back-to-top');
if (backToTopButton) {
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


// Local Time
const localTimeEl = document.getElementById('local-time');
const userTimeEl = document.getElementById('user-time');

function updateTime() {
    const now = new Date();
    const localTime = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
    const userTime = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
    if (localTimeEl) localTimeEl.textContent = localTime + " (IST)";
    if (userTimeEl) userTimeEl.textContent = userTime;
}
updateTime();
setInterval(updateTime, 1000);

// Text flicker animation
const flicker1 = document.getElementById('text-flicker-1');
const flicker2 = document.getElementById('text-flicker-2');

if (flicker1 && flicker2) {
    let showingBreaking = true;
    setInterval(() => {
        if (showingBreaking) {
            // Fade out "breaking", then fade in "fixing"
            flicker1.classList.add('opacity-0');
            setTimeout(() => flicker2.classList.remove('opacity-0'), 320);
        } else {
            // Fade out "fixing", then fade in "breaking"
            flicker2.classList.add('opacity-0');
            setTimeout(() => flicker1.classList.remove('opacity-0'), 320);
        }
        showingBreaking = !showingBreaking;
    }, 2500);
}

// 3D Card Effect
function initialize3dCards(selector) {
    const cards3D = document.querySelectorAll(selector);
    cards3D.forEach(card => {
        const image = card.querySelector('img');

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const deltaX = x - centerX;
            const deltaY = y - centerY;

            const maxRotate = 8;

            const rotateX = (deltaY / centerY) * -maxRotate;
            const rotateY = (deltaX / centerX) * maxRotate;

            card.style.transition = 'transform 0.1s linear';
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

            if (image) {
                image.style.transition = 'transform 0.1s linear';
                image.style.transform = `translateX(${rotateY * -1.5}px) translateY(${rotateX * -1.5}px)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.4s ease-out';
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            if (image) {
                image.style.transition = 'transform 0.4s ease-out';
                image.style.transform = 'translateX(0) translateY(0)';
            }
        });
    });
}

// Magnetic effect
const magneticLinks = document.querySelectorAll('.magnetic-link');
magneticLinks.forEach(link => {
    link.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = link.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const deltaX = clientX - centerX;
        const deltaY = clientY - centerY;

        link.style.transition = 'transform 0.1s linear';
        link.style.transform = `translate(${deltaX * 0.2}px, ${deltaY * 0.3}px)`;
    });

    link.addEventListener('mouseleave', () => {
        link.style.transition = 'transform 0.3s cubic-bezier(0.7, 0, 0.3, 1)';
        link.style.transform = 'translate(0, 0)';
    });
});

// Preloader Logic & Initializations
window.addEventListener('load', () => {
    const languagesContainer = document.getElementById('languages-container');
    const frameworksContainer = document.getElementById('frameworks-container');
    const toolsContainer = document.getElementById('tools-container');

    // Populate Languages
    if (languagesContainer) {
        skillsCategories.languages.forEach((skill, index) => {
            const initials = skill.name.substring(0, 2).toUpperCase();
            const skillCard = `
                        <div class="skill-card reveal bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 hover:border-blue-500 rounded-xl p-3 sm:p-4 lg:p-5 transition-all duration-300 group" style="transition-delay: ${index * 50}ms">
                            <div class="text-center">
                                <img src="${skill.icon}" loading="lazy" class="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 mb-2 sm:mb-3 mx-auto group-hover:scale-110 transition-transform duration-300" alt="${skill.name} icon" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
                                <div style="display:none" class="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 mb-2 sm:mb-3 mx-auto rounded-lg bg-blue-500/30 items-center justify-center text-blue-300 font-bold text-xs">${initials}</div>
                                <h4 class="font-bold text-white text-xs sm:text-sm lg:text-base group-hover:text-blue-400 transition-colors">${skill.name}</h4>
                            </div>
                        </div>
                    `;
            languagesContainer.innerHTML += skillCard;
        });
    }

    // Populate Frameworks
    if (frameworksContainer) {
        skillsCategories.frameworks.forEach((skill, index) => {
            const initials = skill.name.substring(0, 2).toUpperCase();
            const skillCard = `
                        <div class="skill-card reveal bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 hover:border-green-500 rounded-xl p-3 sm:p-4 lg:p-5 transition-all duration-300 group" style="transition-delay: ${index * 50}ms">
                            <div class="text-center">
                                <img src="${skill.icon}" loading="lazy" class="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 mb-2 sm:mb-3 mx-auto group-hover:scale-110 transition-transform duration-300" alt="${skill.name} icon" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
                                <div style="display:none" class="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 mb-2 sm:mb-3 mx-auto rounded-lg bg-green-500/30 items-center justify-center text-green-300 font-bold text-xs">${initials}</div>
                                <h4 class="font-bold text-white text-xs sm:text-sm lg:text-base group-hover:text-green-400 transition-colors">${skill.name}</h4>
                            </div>
                        </div>
                    `;
            frameworksContainer.innerHTML += skillCard;
        });
    }

    // Populate Tools
    if (toolsContainer) {
        skillsCategories.tools.forEach((skill, index) => {
            const initials = skill.name.substring(0, 2).toUpperCase();
            const skillCard = `
                        <div class="skill-card reveal bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 hover:border-purple-500 rounded-xl p-3 sm:p-4 lg:p-5 transition-all duration-300 group" style="transition-delay: ${index * 50}ms">
                            <div class="text-center">
                                <img src="${skill.icon}" loading="lazy" class="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 mb-2 sm:mb-3 mx-auto group-hover:scale-110 transition-transform duration-300" alt="${skill.name} icon" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
                                <div style="display:none" class="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 mb-2 sm:mb-3 mx-auto rounded-lg bg-purple-500/30 items-center justify-center text-purple-300 font-bold text-xs">${initials}</div>
                                <h4 class="font-bold text-white text-xs sm:text-sm lg:text-base group-hover:text-purple-400 transition-colors">${skill.name}</h4>
                            </div>
                        </div>
                    `;
            toolsContainer.innerHTML += skillCard;
        });
    }

    initialize3dCards('#skills-section .skill-card');

    // Initialize reveal animations for all elements
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // once visible, never hide again
            }
        });
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Fallback: force-show all reveal elements after 4s in case observer misses them
    setTimeout(() => {
        document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
            el.classList.add('visible');
        });
    }, 4000);

    initialize3dCards('#projects-section .project-card');

    const preloader = document.getElementById('preloader');
    const preloaderWipe = document.getElementById('preloader-wipe');
    const body = document.querySelector('body');
    const glitchLayers = document.querySelectorAll('.glitch-layer');
    const finalText = document.querySelector('.final-text');
    const typewriterElement = document.getElementById('typewriter');

    // Show final text after a delay
    setTimeout(() => {
        if (finalText) finalText.style.opacity = '1';
        glitchLayers.forEach(l => l.style.display = 'none');
    }, 2300);

    // Start wipe effect
    setTimeout(() => {
        if (preloaderWipe) preloaderWipe.style.height = '120%';
    }, 2500);

    // Hide preloader and reveal site
    setTimeout(() => {
        if (window.__clearPreloaderFallback) window.__clearPreloaderFallback();
        if (preloader) preloader.style.opacity = '0';
        if (body) body.classList.remove('overflow-hidden');
        if (typewriterElement) setupTypewriter();
    }, 3500);

    setTimeout(() => {
        if (preloader) preloader.style.display = 'none';
    }, 4500);

    const skillsGrid = document.querySelector('.skills-grid');
    const glow = document.getElementById('skills-grid-glow');
    if (skillsGrid && glow) {
        skillsGrid.addEventListener('mousemove', (e) => {
            const rect = skillsGrid.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            glow.style.transform = `translate(${x - 100}px, ${y - 100}px)`;
        });
    }

});

// Typewriter Effect
function setupTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;

    const textArray = [
        "AI & ML Enthusiast",
        "Web Developer",
        "Cyber Security Learner",
        "Open Source Contributor",
        "Problem Solver",
        "Lifelong Learner"
    ];
    let textArrayIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = textArray[textArrayIndex];
        if (isDeleting) {
            charIndex--;
            typewriterElement.textContent = currentText.substring(0, charIndex);
            if (charIndex === 0) {
                isDeleting = false;
                textArrayIndex = (textArrayIndex + 1) % textArray.length;
                setTimeout(type, 500);
            } else {
                setTimeout(type, 50);
            }
        } else {
            charIndex++;
            typewriterElement.textContent = currentText.substring(0, charIndex);
            if (charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(type, 2000);
            } else {
                setTimeout(type, 100);
            }
        }
    }
    type();
}

