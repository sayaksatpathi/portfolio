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
        { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
        { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
        { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg' },
        { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
        { name: 'C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg' },
        { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg' },
        { name: 'Go', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg' },
        { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
        { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' }
    ],
    frameworks: [
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
        { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
        { name: 'Flask', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg' },
        { name: 'Streamlit', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/streamlit/streamlit-original.svg' },
        { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg' },
        { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
        { name: 'Redux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg' },
        { name: 'Material UI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materialui/materialui-original.svg' }
    ],
    tools: [
        { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
        { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
        { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg' },
        { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
        { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
        { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' },
        { name: 'Canva', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg' },
        { name: 'Tableau', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tableau/tableau-original.svg' },
        { name: 'Wordpress', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-original.svg' }
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
    setInterval(() => {
        flicker1.classList.toggle('opacity-0');
        flicker2.classList.toggle('opacity-0');
    }, 2000);
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
            const skillCard = `
                        <div class="skill-card reveal bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 hover:border-blue-500 rounded-xl p-3 sm:p-4 lg:p-5 transition-all duration-300 group" style="transition-delay: ${index * 50}ms">
                            <div class="text-center">
                                <img src="${skill.icon}" class="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 mb-2 sm:mb-3 mx-auto group-hover:scale-110 transition-transform duration-300" alt="${skill.name} icon">
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
            const skillCard = `
                        <div class="skill-card reveal bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 hover:border-green-500 rounded-xl p-3 sm:p-4 lg:p-5 transition-all duration-300 group" style="transition-delay: ${index * 50}ms">
                            <div class="text-center">
                                <img src="${skill.icon}" class="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 mb-2 sm:mb-3 mx-auto group-hover:scale-110 transition-transform duration-300" alt="${skill.name} icon">
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
            const skillCard = `
                        <div class="skill-card reveal bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 hover:border-purple-500 rounded-xl p-3 sm:p-4 lg:p-5 transition-all duration-300 group" style="transition-delay: ${index * 50}ms">
                            <div class="text-center">
                                <img src="${skill.icon}" class="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 mb-2 sm:mb-3 mx-auto group-hover:scale-110 transition-transform duration-300" alt="${skill.name} icon">
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

// Offline-Compatible Music Player
class MusicPlayer {
    constructor() {
        this.currentSong = null;
        this.isPlaying = false;
        this.audio = new Audio();
        this.networkStatus = {
            online: navigator.onLine,
            lastChecked: Date.now(),
            retryCount: 0
        };

        // Music library (with local fallbacks)
        this.songs = [
            {
                title: "Lofi Hip Hop Radio",
                artist: "ChilledCow • Coding/Study Music",
                thumbnail: "https://i.ytimg.com/vi/jfKfPfyJRdk/mqdefault.jpg",
                audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                duration: 200,
                mood: "🌃 Coding Vibes"
            },
            {
                title: "Chill Beats",
                artist: "Study Music",
                thumbnail: "https://i.ytimg.com/vi/5qap5aO4i9A/mqdefault.jpg",
                audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
                duration: 238,
                mood: "🔥 Deep Focus"
            },
            {
                title: "Ambient Soundscape",
                artist: "Peaceful Sounds",
                thumbnail: "https://i.ytimg.com/vi/TUVcZfQe-Kw/mqdefault.jpg",
                audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
                duration: 203,
                mood: "✨ Creative Flow"
            },
            {
                title: "Electronic Chill",
                artist: "Synth Wave",
                thumbnail: "https://i.ytimg.com/vi/H5v3kku4y6Q/mqdefault.jpg",
                audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
                duration: 167,
                mood: "🎸 Productive"
            },
            {
                title: "Nature Sounds",
                artist: "Relaxing Music",
                thumbnail: "https://i.ytimg.com/vi/kTJczUoc26U/mqdefault.jpg",
                audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
                duration: 141,
                mood: "💫 Smooth Code"
            }
        ];

        this.currentIndex = 0;
        this.progress = 0;
        this.statsToday = Math.floor(Math.random() * 50) + 20;
        this.listeningTime = Math.floor(Math.random() * 8) + 2;
        this.volume = 0.5;
        this.isAudioSupported = this.checkAudioSupport();
        this.audioContext = null;
        this.simulationMode = false;
        this.errorMessage = document.getElementById('youtube-error-message');

        // Listen for network changes
        window.addEventListener('online', () => this.handleNetworkChange(true));
        window.addEventListener('offline', () => this.handleNetworkChange(false));

        this.initializePlayer();
        this.setupAudioEvents();
        this.checkSoundDrivers();
        this.checkNetworkStatus();
    }

    checkAudioSupport() {
        // Check if audio is supported
        const audio = document.createElement('audio');
        return !!(audio.canPlayType && (
            audio.canPlayType('audio/mpeg;').replace(/no/, '') ||
            audio.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, '') ||
            audio.canPlayType('audio/mp4; codecs="mp4a.40.2"').replace(/no/, '')
        ));
    }

    handleNetworkChange(isOnline) {
        this.networkStatus.online = isOnline;
        this.networkStatus.lastChecked = Date.now();

        if (isOnline) {
            this.showNetworkStatus('🌐 Network connection restored');
            this.errorMessage.classList.add('hidden');

            // Try to recover and play online content if we were in simulation mode
            if (this.simulationMode) {
                this.simulationMode = false;
                this.loadSong(this.currentIndex);
                if (this.isPlaying) {
                    setTimeout(() => this.togglePlayPause(), 1000);
                }
            }
        } else {
            this.showNetworkStatus('📵 Network connection lost');
            this.errorMessage.classList.remove('hidden');

            // Switch to simulation mode if we're not already in it
            if (!this.simulationMode) {
                this.simulationMode = true;
                this.simulatePlayback();
            }
        }
    }

    checkNetworkStatus() {
        // Check network status
        const isOnline = navigator.onLine;

        if (!isOnline) {
            this.errorMessage.classList.remove('hidden');
            this.simulationMode = true;
            this.showNetworkStatus('📵 Working in offline mode');
        } else {
            this.errorMessage.classList.add('hidden');
            this.simulationMode = false;
        }

        // Set up periodic network checks
        setInterval(() => {
            // Try to fetch a tiny resource to check real connectivity
            fetch('https://www.google.com/favicon.ico', {
                mode: 'no-cors',
                cache: 'no-store'
            })
                .then(() => {
                    if (!this.networkStatus.online) {
                        this.handleNetworkChange(true);
                    }
                })
                .catch(() => {
                    if (this.networkStatus.online) {
                        this.handleNetworkChange(false);
                    }
                });
        }, 30000); // Check every 30 seconds
    }

    simulatePlayback() {
        // If we're already playing, don't interrupt
        if (this.isPlaying) return;

        // Start progress bar simulation
        this.showNetworkStatus('🔄 Simulating playback in offline mode');

        let progress = 0;
        const duration = this.currentSong?.duration || 200;
        const increment = 100 / (duration * 10); // Update every 100ms

        // Clear any existing interval
        if (this.simulationInterval) clearInterval(this.simulationInterval);

        this.simulationInterval = setInterval(() => {
            progress += increment;
            if (progress >= 100) {
                progress = 0;
                this.nextSong();
            }

            if (this.songProgress) {
                this.songProgress.style.width = progress + '%';
            }
        }, 100);
    }

    stopSimulation() {
        if (this.simulationInterval) {
            clearInterval(this.simulationInterval);
            this.simulationInterval = null;
        }
    }

    async checkSoundDrivers() {
        try {
            // Check Web Audio API support
            if (window.AudioContext || window.webkitAudioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                console.log('✅ Web Audio API supported');

                // Check audio output devices
                if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
                    const devices = await navigator.mediaDevices.enumerateDevices();
                    const audioOutputs = devices.filter(device => device.kind === 'audiooutput');
                    console.log(`🔊 Found ${audioOutputs.length} audio output device(s)`);

                    if (audioOutputs.length === 0) {
                        this.showAudioWarning('No audio output devices detected');
                    } else {
                        this.showAudioStatus('Audio system ready');
                    }
                }
            } else {
                this.showAudioWarning('Web Audio API not supported');
            }
        } catch (error) {
            console.log('Audio check error:', error);
            this.showAudioWarning('Audio system check failed');
        }
    }

    showAudioStatus(message) {
        if (this.songArtist) {
            const originalText = this.songArtist.textContent;
            this.songArtist.textContent = message;
            this.songArtist.style.color = "#10b981";

            setTimeout(() => {
                this.songArtist.textContent = originalText;
                this.songArtist.style.color = "";
            }, 2000);
        }
    }

    showNetworkStatus(message) {
        if (this.songArtist) {
            const originalText = this.songArtist.textContent;
            this.songArtist.textContent = message;
            this.songArtist.style.color = "#eab308";

            setTimeout(() => {
                this.songArtist.textContent = originalText;
                this.songArtist.style.color = "";
            }, 3000);
        }
    }

    showAudioWarning(message) {
        if (this.songArtist) {
            const originalText = this.songArtist.textContent;
            this.songArtist.textContent = message;
            this.songArtist.style.color = "#ef4444";

            setTimeout(() => {
                this.songArtist.textContent = originalText;
                this.songArtist.style.color = "";
            }, 3000);
        }
    }

    initializePlayer() {
        // Get DOM elements
        this.songTitle = document.getElementById('song-title');
        this.songArtist = document.getElementById('song-artist');
        this.songImage = document.getElementById('song-image');
        this.defaultIcon = document.getElementById('default-music-icon');
        this.songProgress = document.getElementById('song-progress');
        this.playPauseBtn = document.getElementById('play-pause-btn');
        this.playIcon = document.getElementById('play-icon');
        this.pauseIcon = document.getElementById('pause-icon');
        this.currentMood = document.getElementById('current-mood');
        this.songsToday = document.getElementById('songs-today');
        this.listeningTimeEl = document.getElementById('listening-time');

        // Set initial stats
        if (this.songsToday) this.songsToday.textContent = this.statsToday;
        if (this.listeningTimeEl) this.listeningTimeEl.textContent = this.listeningTime + 'h';

        // Configure audio
        this.audio.volume = this.volume;
        this.audio.crossOrigin = "anonymous";

        // Add event listeners
        this.playPauseBtn?.addEventListener('click', () => this.togglePlayPause());
        document.getElementById('next-btn')?.addEventListener('click', () => this.nextSong());
        document.getElementById('prev-btn')?.addEventListener('click', () => this.prevSong());

        // Volume control
        const volumeSlider = document.getElementById('volume-slider');
        const volumeProgress = document.getElementById('volume-progress');
        if (volumeSlider && volumeProgress) {
            volumeSlider.addEventListener('click', (e) => {
                const rect = volumeSlider.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const percentage = x / rect.width;
                const volume = Math.max(0, Math.min(1, percentage));
                this.setVolume(volume);
                volumeProgress.style.width = (volume * 100) + '%';
            });
        }

        // Error message handling
        if (this.errorMessage) {
            if (!navigator.onLine) {
                this.errorMessage.classList.remove('hidden');
                this.simulationMode = true;
            } else {
                this.errorMessage.classList.add('hidden');
            }
        }

        // Load first song
        this.loadSong(0);
    }

    setupAudioEvents() {
        this.audio.addEventListener('loadstart', () => {
            console.log('Audio loading started');
        });

        this.audio.addEventListener('canplay', () => {
            console.log('Audio can start playing');
        });

        this.audio.addEventListener('play', () => {
            this.isPlaying = true;
            this.updatePlayPauseIcon();
        });

        this.audio.addEventListener('pause', () => {
            this.isPlaying = false;
            this.updatePlayPauseIcon();
        });

        this.audio.addEventListener('timeupdate', () => {
            if (this.audio.duration) {
                const progress = (this.audio.currentTime / this.audio.duration) * 100;
                if (this.songProgress) {
                    this.songProgress.style.width = progress + '%';
                }
            }
        });

        this.audio.addEventListener('ended', () => {
            this.nextSong();
        });

        this.audio.addEventListener('error', (e) => {
            console.log('Audio error:', e);
            // Fallback to next song if current fails
            setTimeout(() => this.nextSong(), 1000);
        });
    }

    loadSong(index) {
        if (index >= 0 && index < this.songs.length) {
            this.currentIndex = index;
            this.currentSong = this.songs[index];

            // Stop any existing simulation
            this.stopSimulation();

            // Update UI
            if (this.songTitle) this.songTitle.textContent = this.currentSong.title;
            if (this.songArtist) this.songArtist.textContent = this.currentSong.artist;
            if (this.currentMood) this.currentMood.textContent = this.currentSong.mood;

            // Update thumbnail
            if (this.songImage && this.defaultIcon) {
                this.songImage.src = this.currentSong.thumbnail;
                this.songImage.onload = () => {
                    this.songImage.classList.remove('hidden');
                    if (this.defaultIcon) this.defaultIcon.classList.add('hidden');
                };
                this.songImage.onerror = () => {
                    this.songImage.classList.add('hidden');
                    if (this.defaultIcon) this.defaultIcon.classList.remove('hidden');
                };
            }

            // If in simulation mode, don't try to load the audio
            if (this.simulationMode) {
                this.showNetworkStatus('🔄 Song loaded in offline mode');
                return;
            }

            // Load audio
            this.audio.src = this.currentSong.audioUrl;
            this.audio.preload = 'auto';
            this.audio.crossOrigin = 'anonymous';

            // Reset audio state
            this.audio.currentTime = 0;

            // Show loading state
            this.showAudioStatus('🔄 Loading audio...');

            // Load and check if audio is ready
            this.audio.load();

            // Wait for audio to be ready
            this.audio.addEventListener('canplaythrough', () => {
                this.showAudioStatus('✅ Ready to play');
            }, { once: true });
        }
    }

    async togglePlayPause() {
        try {
            // Handle simulation mode
            if (this.simulationMode) {
                this.isPlaying = !this.isPlaying;
                this.updatePlayPauseIcon();

                if (this.isPlaying) {
                    this.simulatePlayback();
                    this.showNetworkStatus('▶️ Simulating playback (offline mode)');
                } else {
                    this.stopSimulation();
                    this.showNetworkStatus('⏸️ Paused simulation');
                }
                return;
            }

            if (!this.isAudioSupported) {
                this.showAudioWarning('Audio not supported in this browser');
                return;
            }

            // Resume audio context if suspended (Chrome autoplay policy)
            if (this.audioContext && this.audioContext.state === 'suspended') {
                await this.audioContext.resume();
            }

            if (this.isPlaying) {
                this.audio.pause();
                this.showAudioStatus('⏸️ Paused');
            } else {
                // Show loading state
                this.showAudioStatus('⏳ Loading...');

                // Set current time to 0 if at the end
                if (this.audio.ended) {
                    this.audio.currentTime = 0;
                }

                const playPromise = this.audio.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        this.showAudioStatus('▶️ Playing');
                    }).catch(error => {
                        console.log('Playback error:', error);

                        if (error.name === 'NotAllowedError') {
                            this.showAudioPermissionNotice();
                        } else {
                            // Check if it's a network error
                            this.checkForNetworkError(error);
                        }
                    });
                }
            }
        } catch (error) {
            console.log('Playback error:', error);
            this.checkForNetworkError(error);
        }
    }

    checkForNetworkError(error) {
        // Check if it's likely a network error
        const isNetworkError = error.name === 'AbortError' ||
            error.message?.includes('network') ||
            !navigator.onLine;

        if (isNetworkError) {
            this.networkStatus.online = false;
            this.errorMessage.classList.remove('hidden');
            this.showNetworkStatus('📵 Network error detected, switching to offline mode');

            // Switch to simulation mode
            this.simulationMode = true;
            this.simulatePlayback();
        } else if (error.name === 'NotSupportedError') {
            this.showAudioWarning('Audio format not supported');
        } else if (error.name === 'AbortError') {
            this.showAudioWarning('Audio loading interrupted');
        } else {
            this.showAudioWarning('Playback failed - trying next song');
            setTimeout(() => this.nextSong(), 2000);
        }
    }

    showAudioPermissionNotice() {
        if (this.songArtist) {
            const originalText = this.songArtist.textContent;
            this.songArtist.textContent = "🔊 Click to enable audio";
            this.songArtist.style.color = "#f59e0b";

            // Add click handler to try playing again
            const tryAgain = () => {
                this.togglePlayPause();
                this.songArtist.removeEventListener('click', tryAgain);
            };
            this.songArtist.addEventListener('click', tryAgain);

            setTimeout(() => {
                this.songArtist.textContent = originalText;
                this.songArtist.style.color = "";
                this.songArtist.removeEventListener('click', tryAgain);
            }, 5000);
        }
    }

    updatePlayPauseIcon() {
        if (this.playIcon && this.pauseIcon) {
            if (this.isPlaying) {
                this.playIcon.classList.add('hidden');
                this.pauseIcon.classList.remove('hidden');
            } else {
                this.playIcon.classList.remove('hidden');
                this.pauseIcon.classList.add('hidden');
            }
        }
    }

    nextSong() {
        this.currentIndex = (this.currentIndex + 1) % this.songs.length;
        this.loadSong(this.currentIndex);
        if (this.isPlaying) {
            if (this.simulationMode) {
                this.simulatePlayback();
            } else {
                setTimeout(() => this.togglePlayPause(), 500);
            }
        }
    }

    prevSong() {
        this.currentIndex = this.currentIndex === 0 ? this.songs.length - 1 : this.currentIndex - 1;
        this.loadSong(this.currentIndex);
        if (this.isPlaying) {
            if (this.simulationMode) {
                this.simulatePlayback();
            } else {
                setTimeout(() => this.togglePlayPause(), 500);
            }
        }
    }

    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        this.audio.volume = this.volume;
    }
}

// Initialize music player when page loads
let musicPlayer;
window.addEventListener('load', () => {
    // Delay music player initialization slightly to ensure all elements are loaded
    setTimeout(() => {
        musicPlayer = new MusicPlayer();

        // Update stats occasionally  
        setInterval(() => {
            if (musicPlayer && musicPlayer.isPlaying && Math.random() > 0.8) {
                musicPlayer.statsToday += 1;
                musicPlayer.songsToday.textContent = musicPlayer.statsToday;
            }
        }, 60000);
    }, 1000);
});
