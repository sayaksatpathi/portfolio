// Safely initialize Lucide icons — if CDN fails on mobile, script still runs
try { lucide.createIcons(); } catch(e) { console.warn('Lucide icons unavailable:', e); }

// Smooth-scroll all anchor links (reliable cross-browser, works even if CSS scroll-behavior is overridden)
document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    const targetId = anchor.getAttribute('href').slice(1);
    if (!targetId) return;
    const target = document.getElementById(targetId);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Update URL hash without triggering a jump
    history.pushState(null, '', '#' + targetId);
});

// Detect touch-only devices — used to skip mouse-exclusive effects on mobile
const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

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
if (menuHoverBg && !isTouchDevice) {
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


// Skill icons resolve from devicon; anything without an icon falls back to
// a coloured initials tile automatically (see the render logic below).
const dev = s => `https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/${s}.svg`;
const skillCategories = [
    {
        title: 'Databases', icon: 'database', accent: 'purple', skills: [
            { name: 'MySQL', icon: dev('mysql/mysql-original') },
            { name: 'MongoDB', icon: dev('mongodb/mongodb-original') }
        ]
    },
    {
        title: 'Programming', icon: 'code', accent: 'blue', skills: [
            { name: 'C++', icon: dev('cplusplus/cplusplus-original') },
            { name: 'Python', icon: dev('python/python-original') },
            { name: 'Java', icon: dev('java/java-original') },
            { name: 'JavaScript', icon: dev('javascript/javascript-original') },
            { name: 'HTML', icon: dev('html5/html5-original') },
            { name: 'CSS', icon: dev('css3/css3-original') },
            { name: 'Bash / Shell', icon: dev('bash/bash-original') }
        ]
    },
    {
        title: 'AI / ML / Computer Vision', icon: 'brain', accent: 'cyan', skills: [
            { name: 'NumPy', icon: dev('numpy/numpy-original') },
            { name: 'Pandas', icon: dev('pandas/pandas-original') },
            { name: 'Scikit-learn', icon: dev('scikitlearn/scikitlearn-original') },
            { name: 'TensorFlow', icon: dev('tensorflow/tensorflow-original') },
            { name: 'Keras', icon: dev('keras/keras-original') },
            { name: 'PyTorch', icon: dev('pytorch/pytorch-original') },
            { name: 'OpenCV', icon: dev('opencv/opencv-original') },
            { name: 'YOLO / Ultralytics' },
            { name: 'CNN' },
            { name: 'Computer Vision' },
            { name: 'Object Detection' },
            { name: 'Streamlit', icon: dev('streamlit/streamlit-original') }
        ]
    },
    {
        title: 'Web Development', icon: 'globe', accent: 'green', skills: [
            { name: 'HTML5', icon: dev('html5/html5-original') },
            { name: 'CSS3', icon: dev('css3/css3-original') },
            { name: 'JavaScript', icon: dev('javascript/javascript-original') },
            { name: 'Node.js', icon: dev('nodejs/nodejs-original') },
            { name: 'React', icon: dev('react/react-original') },
            { name: 'REST APIs' },
            { name: 'WordPress', icon: dev('wordpress/wordpress-original') },
            { name: 'Vercel', icon: dev('vercel/vercel-original') }
        ]
    },
    {
        title: 'Cloud / DevOps', icon: 'cloud', accent: 'blue', skills: [
            { name: 'AWS / EC2', icon: dev('amazonwebservices/amazonwebservices-original-wordmark') },
            { name: 'Git / GitHub', icon: dev('git/git-original') },
            { name: 'Linux / Ubuntu', icon: dev('ubuntu/ubuntu-original') },
            { name: 'WSL' },
            { name: 'Shell scripting', icon: dev('bash/bash-original') },
            { name: 'Ansible', icon: dev('ansible/ansible-original') },
            { name: 'Jenkins', icon: dev('jenkins/jenkins-original') },
            { name: 'Docker', icon: dev('docker/docker-original') },
            { name: 'Kubernetes', icon: dev('kubernetes/kubernetes-plain') },
            { name: 'npm / NVM', icon: dev('npm/npm-original-wordmark') }
        ]
    },
    {
        title: 'Data & Visualization', icon: 'bar-chart-3', accent: 'purple', skills: [
            { name: 'Tableau' },
            { name: 'Pandas', icon: dev('pandas/pandas-original') },
            { name: 'Matplotlib', icon: dev('matplotlib/matplotlib-original') },
            { name: 'Jupyter', icon: dev('jupyter/jupyter-original') }
        ]
    }
];


// Header theme — decide nav/logo colour from whatever section is actually
// painted just under the header. (The hero is position:sticky, so it is
// always geometrically "in view"; an IntersectionObserver therefore keeps
// forcing light mode and the nav turns dark-on-dark. Sampling the painted
// element avoids that.)
const mainNav = document.getElementById('main-nav');

function updateHeaderTheme() {
    const y = (header.offsetHeight || 80) + 14;
    let dark = null;
    for (const x of [24, window.innerWidth - 24, Math.round(window.innerWidth / 2)]) {
        const el = document.elementFromPoint(x, y);
        if (!el) continue;
        let n = el;
        while (n && n !== document.body) {
            if (n.classList) {
                if (n.classList.contains('bg-dark')) { dark = true; break; }
                if (n.classList.contains('bg-light')) { dark = false; break; }
            }
            n = n.parentElement;
        }
        if (dark !== null) break;
    }
    if (dark === null) dark = (window.scrollY || 0) > window.innerHeight * 0.6;

    document.body.classList.toggle('dark', dark);
    header.classList.toggle('text-white', dark);
    header.classList.toggle('text-gray-900', !dark);
    menuBtn.classList.toggle('text-white', dark);
    menuBtn.classList.toggle('ball-style', dark);
    menuBtn.classList.toggle('text-gray-900', !dark);
    // The desktop nav stays visible on every section — only its colour changes.
    mainNav.classList.remove('opacity-0', 'pointer-events-none');
}

window.addEventListener('scroll', updateHeaderTheme, { passive: true });
window.addEventListener('resize', updateHeaderTheme, { passive: true });
updateHeaderTheme();
setTimeout(updateHeaderTheme, 200);
setTimeout(updateHeaderTheme, 900);

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
const flicker = document.getElementById('text-flicker');
const placeholder = document.getElementById('text-placeholder');
if (flicker && placeholder) {
    // 'building' is omitted on purpose — the line already starts with the
    // static word "Building", so flickering "building" read as a duplicate.
    const words = [
        { text: 'breaking', cls: 'text-red-500 line-through' },
        { text: 'fixing',   cls: 'text-green-400' },
        { text: 'shipping', cls: 'text-blue-400' },
    ];
    let current = 0;

    flicker.style.opacity = '1';

    setInterval(() => {
        // Fade out
        flicker.style.opacity = '0';

        setTimeout(() => {
            current = (current + 1) % words.length;
            const word = words[current];

            // Update both so invisible spacer always matches visible word width
            flicker.textContent = word.text;
            placeholder.textContent = word.text;

            flicker.className = `absolute left-0 top-0 ${word.cls}`;
            flicker.style.transition = 'opacity 0.5s ease';

            // Fade in
            flicker.style.opacity = '1';
        }, 500);
    }, 2500);
}

// 3D Card Effect
function initialize3dCards(selector) {
    if (isTouchDevice) return; // no hover on touch screens
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
if (!isTouchDevice) magneticLinks.forEach(link => {
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
    const skillsRoot = document.getElementById('skills-categories');
    if (skillsRoot) {
        const accents = {
            blue:   { border: 'hover:border-blue-500',   iconText: 'text-blue-400',   title: 'group-hover:text-blue-400',   bg: 'bg-blue-500/20',   fbText: 'text-blue-300' },
            green:  { border: 'hover:border-green-500',  iconText: 'text-green-400',  title: 'group-hover:text-green-400',  bg: 'bg-green-500/20',  fbText: 'text-green-300' },
            purple: { border: 'hover:border-purple-500', iconText: 'text-purple-400', title: 'group-hover:text-purple-400', bg: 'bg-purple-500/20', fbText: 'text-purple-300' },
            cyan:   { border: 'hover:border-cyan-500',   iconText: 'text-cyan-400',   title: 'group-hover:text-cyan-400',   bg: 'bg-cyan-500/20',   fbText: 'text-cyan-400' }
        };

        skillCategories.forEach((cat, ci) => {
            const a = accents[cat.accent] || accents.blue;
            const cards = cat.skills.map((skill, index) => {
                const initials = skill.name.replace(/[^A-Za-z0-9]/g, '').substring(0, 2).toUpperCase();
                const fb = `<div class="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 mb-2 sm:mb-3 mx-auto rounded-lg ${a.bg} items-center justify-center ${a.fbText} font-bold text-xs" style="display:${skill.icon ? 'none' : 'flex'}">${initials}</div>`;
                const img = skill.icon
                    ? `<img src="${skill.icon}" loading="lazy" class="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 mb-2 sm:mb-3 mx-auto group-hover:scale-110 transition-transform duration-300" alt="${skill.name} icon" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
                    : '';
                return `
                        <div class="skill-card reveal bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 ${a.border} rounded-xl p-3 sm:p-4 lg:p-5 transition-all duration-300 group" style="transition-delay: ${index * 40}ms">
                            <div class="text-center">
                                ${img}${fb}
                                <h4 class="font-bold text-white text-xs sm:text-sm lg:text-base ${a.title} transition-colors">${skill.name}</h4>
                            </div>
                        </div>`;
            }).join('');

            const block = `
                        <div class="reveal" style="transition-delay: ${ci * 80}ms">
                            <div class="flex items-center gap-3 mb-6">
                                <div class="w-8 h-8 ${a.bg} rounded-lg flex items-center justify-center">
                                    <i data-lucide="${cat.icon}" class="w-4 h-4 ${a.iconText}"></i>
                                </div>
                                <h3 class="text-xl sm:text-2xl font-bold text-white">${cat.title}</h3>
                            </div>
                            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                                ${cards}
                            </div>
                        </div>`;
            skillsRoot.insertAdjacentHTML('beforeend', block);
        });

        try { lucide.createIcons(); } catch (e) { /* icons optional */ }
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

    // Fallback: force-show all reveal elements after 100ms in case observer misses them
    // (short timeout ensures no blank-space flash; observer still handles scroll-in animation
    //  for elements already in the viewport via the post-preloader rAF check above)
    setTimeout(() => {
        document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
            el.classList.add('visible');
        });
    }, 100);

    initialize3dCards('#projects-section .project-card');

    const preloader = document.getElementById('preloader');
    const preloaderWipe = document.getElementById('preloader-wipe');
    const body = document.querySelector('body');
    const glitchLayers = document.querySelectorAll('.glitch-layer');
    const finalText = document.querySelector('.final-text');
    const typewriterElement = document.getElementById('typewriter');

    // Show final text after a short delay (kept snappy — visitors came for the work)
    setTimeout(() => {
        if (finalText) finalText.style.opacity = '1';
        glitchLayers.forEach(l => l.style.display = 'none');
    }, 700);

    // Start wipe effect
    setTimeout(() => {
        if (preloaderWipe) preloaderWipe.style.height = '120%';
    }, 900);

    // Hide preloader and reveal site
    setTimeout(() => {
        if (window.__clearPreloaderFallback) window.__clearPreloaderFallback();
        if (preloader) preloader.style.opacity = '0';
        if (body) body.classList.remove('overflow-hidden');
        if (typewriterElement) setupTypewriter();

        // Force-reveal any .reveal elements already in the viewport
        // (hash navigation is blocked during overflow:hidden, so observer
        //  may not have fired for the target section)
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
                    const rect = el.getBoundingClientRect();
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        el.classList.add('visible');
                    }
                });
            });
        });
    }, 1300);

    setTimeout(() => {
        if (preloader) preloader.style.display = 'none';
    }, 1800);

    const skillsGrid = document.querySelector('.skills-grid');
    const glow = document.getElementById('skills-grid-glow');
    if (skillsGrid && glow && !isTouchDevice) {
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

