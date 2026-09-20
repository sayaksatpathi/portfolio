/* ══════════════════════════════════════════════════════════════════════
   interactive.js — progressive interactivity layer for the portfolio.
   Loaded after script.js. Everything here is additive and defensive:
   if an element is missing, the feature simply no-ops.
   ══════════════════════════════════════════════════════════════════════ */
(function () {
    'use strict';

    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const $ = (s, r = document) => r.querySelector(s);
    const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
    const drawIcons = () => { try { lucide.createIcons(); } catch (e) {} };

    /* ─── Project data (single source of truth for filter, modal, skills) ── */
    const PROJECTS = {
        'CyberShield AI': {
            category: 'AI/ML', badge: 'AI/ML', image: 'images/projects/cybershield.png',
            live: 'https://rad-donut-a8e264.netlify.app/', github: 'https://github.com/sayaksatpathi/cybershield-ai-streamlit',
            tags: ['Python', 'Streamlit', 'Machine Learning', 'Cybersecurity'],
            stack: ['Python', 'Streamlit', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Git / GitHub'],
            tagline: 'Real-time, ML-powered financial fraud detection',
            problem: 'Fraudulent transactions are costly and need to be flagged the moment they happen — not in a nightly batch.',
            solution: 'A machine-learning system that scores each transaction for fraud risk in real time and surfaces it on a live security dashboard with clear, explainable signals.',
            architecture: 'Python classification models trained on transaction features → a scoring layer → a Streamlit / web dashboard for live monitoring, batch analysis and performance analytics.',
            learned: 'Taking an ML model from notebook to a usable product: evaluation metrics that matter for fraud, and designing an interface a non-technical analyst can actually read.'
        },
        'MoneyMind': {
            category: 'FinTech', badge: 'FinTech', image: 'images/projects/moneymind.png',
            live: 'https://money-mind-rouge.vercel.app', github: 'https://github.com/sayaksatpathi/-MoneyMind',
            tags: ['JavaScript', 'HTML', 'CSS'],
            stack: ['JavaScript', 'HTML', 'HTML5', 'CSS', 'CSS3', 'Vercel', 'Git / GitHub'],
            tagline: 'A personal-finance tracker with visual insights',
            problem: 'Most people lose track of where their money goes and give up on clunky budgeting tools.',
            solution: 'A lightweight, client-side finance app to log income, expenses and savings goals, with clean visual summaries that make spending patterns obvious at a glance.',
            architecture: 'Vanilla JavaScript with a component-style UI, client-side state and persistence, deployed on Vercel.',
            learned: 'Structuring state and UI without a framework, and how much clarity good data visualisation adds to an everyday tool.'
        },
        'TimeCraft': {
            category: 'Web', badge: 'Productivity', image: 'images/projects/timecraft.png',
            live: 'https://time-craft-one.vercel.app', github: 'https://github.com/sayaksatpathi/TimeCraft',
            tags: ['TypeScript', 'React', 'Web'],
            stack: ['JavaScript', 'React', 'Node.js', 'Vercel', 'Git / GitHub'],
            tagline: 'A productivity dashboard for planning and focus',
            problem: 'Task lists alone do not help you actually protect time or build momentum.',
            solution: 'A time-management app combining task planning, a calendar, focus timers, streaks, levels and analytics so progress feels rewarding.',
            architecture: 'React + TypeScript SPA with local persistence and a component-driven dashboard, deployed on Vercel.',
            learned: 'Designing a motivating UX (streaks, XP, progress rings) and keeping a data-heavy dashboard fast and readable.'
        },
        'IT Service Portal': {
            category: 'Web', badge: 'Full-Stack', image: 'images/projects/industrial.png',
            live: 'https://industrial-training-portfolio.vercel.app', github: 'https://github.com/sayaksatpathi/Industrial-training-portfolio',
            tags: ['JavaScript', 'Web', 'Internship'],
            stack: ['JavaScript', 'Node.js', 'React', 'REST APIs', 'Vercel', 'Git / GitHub'],
            tagline: 'Full-stack IT service management, built in industrial training',
            problem: 'Support teams need one place to log, assign and track service requests instead of scattered emails.',
            solution: 'An IT service-management portal with a customer-facing request flow and an admin dashboard showing active requests, services and completion stats.',
            architecture: 'Full-stack web app with a request/ticketing model, an admin portal and a stats dashboard, deployed on Vercel.',
            learned: 'Modelling a real workflow end-to-end and separating a public interface from an internal admin view.'
        },
        'Sayak Traders': {
            category: 'Business', badge: 'Business', image: 'images/projects/sayaktraders.png',
            live: 'https://sayak-traders.vercel.app', github: 'https://github.com/sayaksatpathi/fmcg-distributor',
            tags: ['JavaScript', 'Web', 'Business'],
            stack: ['JavaScript', 'HTML', 'CSS', 'Vercel', 'Git / GitHub'],
            tagline: 'A distributor-management system for an FMCG business',
            problem: 'A local FMCG distributor needed a simple digital way to manage products, orders and reporting.',
            solution: 'A distributor management system with an admin login covering inventory, orders and basic reporting.',
            architecture: 'JavaScript web app with an authenticated admin area, deployed on Vercel.',
            learned: 'Building for a real client’s day-to-day operations and keeping an admin tool practical rather than flashy.'
        },
        'Log-Guardian': {
            category: 'Security', badge: 'Security', icon: 'file-search', accent: 'green',
            github: 'https://github.com/sayaksatpathi/Log-Guardian',
            tags: ['Python', 'Security', 'Automation'],
            stack: ['Python', 'Bash / Shell', 'Shell scripting', 'Linux / Ubuntu', 'Git / GitHub'],
            tagline: 'Log monitoring & threat detection in Python',
            problem: 'Suspicious activity often hides in noisy system logs no one has time to read.',
            solution: 'A Python tool that parses system logs, flags suspicious patterns and surfaces potential intrusions automatically.',
            architecture: 'Python log parsers + rule/heuristic checks, runnable from the shell for scheduled monitoring.',
            learned: 'Log parsing at scale, writing detection rules, and thinking like a defender.'
        },
        'Evidence Protector': {
            category: 'Security', badge: 'Security', icon: 'shield', accent: 'purple',
            github: 'https://github.com/sayaksatpathi/Evidence_protector',
            tags: ['TypeScript', 'Security', 'Web'],
            stack: ['JavaScript', 'Node.js', 'Git / GitHub'],
            tagline: 'Tamper-proof digital evidence integrity',
            problem: 'Digital evidence must be provably unaltered to be trustworthy.',
            solution: 'A tool that safeguards and verifies files to maintain a tamper-proof chain of custody.',
            architecture: 'TypeScript app that fingerprints files and verifies integrity over time.',
            learned: 'Practical cryptographic integrity checks and the importance of verifiable audit trails.'
        },
        'URL Shortener': {
            category: 'Web', badge: 'Web', icon: 'link', accent: 'cyan',
            github: 'https://github.com/sayaksatpathi/url-shortener',
            tags: ['HTML', 'JavaScript'],
            stack: ['HTML', 'CSS', 'JavaScript', 'Git / GitHub'],
            tagline: 'Long links, made short and shareable',
            problem: 'Long URLs are ugly and hard to share.',
            solution: 'A lightweight tool that turns long URLs into clean, shareable short links.',
            architecture: 'Client-side HTML/JS that generates and manages short links.',
            learned: 'Keeping a single-purpose tool genuinely simple and fast.'
        }
    };
    const ACCENT_HEX = { green: '#4ade80', purple: '#c084fc', cyan: '#22d3ee', blue: '#60a5fa' };

    /* ══════════════════ 1. CUSTOM CURSOR ══════════════════ */
    (function cursor() {
        const el = document.getElementById('cursor');
        if (!el || isTouch) { if (el) el.style.display = 'none'; return; }
        const label = document.createElement('span');
        label.className = 'ix-cursor-label';
        el.appendChild(label);

        let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my;
        addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
        (function loop() {
            cx += (mx - cx) * 0.2; cy += (my - cy) * 0.2;
            el.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
            requestAnimationFrame(loop);
        })();

        const labelFor = t => {
            if (t.closest('.ix-case-btn')) return 'VIEW';
            if (t.closest('.project-card')) return 'VIEW';
            if (t.closest('.skill-card')) return 'INFO';
            if (t.closest('a, button')) return 'OPEN';
            if (t.closest('img')) return 'LOOK';
            return '';
        };
        document.addEventListener('mouseover', e => {
            const txt = labelFor(e.target);
            if (txt) { label.textContent = txt; el.classList.add('ix-labelled'); }
        });
        document.addEventListener('mouseout', e => {
            if (!e.relatedTarget || !labelFor(e.relatedTarget)) el.classList.remove('ix-labelled');
        });
    })();

    /* ══════════════════ 2. SCROLL PROGRESS + SECTION RAIL ══════════════════ */
    (function progressAndRail() {
        const bar = document.createElement('div');
        bar.id = 'ix-progress';
        document.body.appendChild(bar);

        const sections = [
            ['hero-section', 'Home'], ['skills-section', 'Skills'], ['education-section', 'Education'],
            ['projects-section', 'Projects'], ['activity-section', 'Activity'], ['about-section', 'About'],
            ['contact-section', 'Contact']
        ].filter(([id]) => document.getElementById(id));

        const rail = document.createElement('div');
        rail.id = 'ix-rail';
        rail.innerHTML = sections.map(([id, name]) =>
            `<button class="ix-rail-dot" data-target="${id}" aria-label="${name}"><span class="ix-rail-label">${name}</span></button>`
        ).join('');
        document.body.appendChild(rail);
        rail.addEventListener('click', e => {
            const b = e.target.closest('.ix-rail-dot'); if (!b) return;
            const t = document.getElementById(b.dataset.target);
            if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        const dots = $$('.ix-rail-dot', rail);

        const update = () => {
            const st = window.scrollY || document.documentElement.scrollTop;
            const h = document.documentElement.scrollHeight - innerHeight;
            bar.style.transform = `scaleX(${h > 0 ? st / h : 0})`;
        };
        addEventListener('scroll', update, { passive: true });
        addEventListener('resize', update, { passive: true });
        update();

        const spy = new IntersectionObserver(entries => {
            entries.forEach(en => {
                if (en.isIntersecting) {
                    dots.forEach(d => d.classList.toggle('active', d.dataset.target === en.target.id));
                }
            });
        }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
        sections.forEach(([id]) => spy.observe(document.getElementById(id)));
    })();

    /* ══════════════════ 3. ANIMATED COUNTERS ══════════════════ */
    (function counters() {
        const re = /^(\d+(?:\.\d+)?)([+%])?$/;
        const targets = [];
        ['#hero-section', '#activity-section', '#skills-section'].forEach(sel => {
            const root = $(sel); if (!root) return;
            $$('.font-bold', root).forEach(el => {
                const m = el.textContent.trim().match(re);
                if (m && !el.dataset.ixCount) {
                    el.dataset.ixCount = '1';
                    targets.push({ el, num: parseFloat(m[1]), suffix: m[2] || '', dec: (m[1].split('.')[1] || '').length });
                }
            });
        });
        if (!targets.length) return;
        const run = t => {
            if (reduceMotion) { t.el.textContent = t.num + t.suffix; return; }
            const dur = 1100, start = performance.now();
            const step = now => {
                const p = Math.min(1, (now - start) / dur);
                const e = 1 - Math.pow(1 - p, 3);
                t.el.textContent = (t.num * e).toFixed(t.dec) + t.suffix;
                if (p < 1) requestAnimationFrame(step);
                else t.el.textContent = t.num.toFixed(t.dec) + t.suffix;
            };
            requestAnimationFrame(step);
        };
        const io = new IntersectionObserver((ens, obs) => {
            ens.forEach(en => { if (en.isIntersecting) { const t = targets.find(x => x.el === en.target); if (t) run(t); obs.unobserve(en.target); } });
        }, { threshold: 0.6 });
        targets.forEach(t => { t.el.textContent = '0' + t.suffix; io.observe(t.el); });
    })();

    /* ══════════════════ 4. MODAL (shared) ══════════════════ */
    const modal = (function () {
        const back = document.createElement('div');
        back.className = 'ix-modal-backdrop';
        back.innerHTML = '<div class="ix-modal" role="dialog" aria-modal="true"></div>';
        document.body.appendChild(back);
        const box = $('.ix-modal', back);
        let lastFocus = null;
        const close = () => { back.classList.remove('open'); document.body.style.overflow = ''; if (lastFocus) try { lastFocus.focus(); } catch (e) {} };
        back.addEventListener('click', e => { if (e.target === back) close(); });
        addEventListener('keydown', e => { if (e.key === 'Escape' && back.classList.contains('open')) close(); });
        const open = html => {
            lastFocus = document.activeElement;
            box.innerHTML = html;
            back.classList.add('open');
            document.body.style.overflow = 'hidden';
            drawIcons();
            const x = $('.ix-modal-close', box); if (x) x.addEventListener('click', close);
        };
        return { open, close };
    })();

    function projectModalHTML(title, p) {
        const hero = p.image
            ? `<div class="ix-modal-hero"><img src="${p.image}" alt="${title} dashboard"><button class="ix-modal-close" aria-label="Close">✕</button></div>`
            : `<div class="ix-modal-hero"><div class="ix-modal-banner" style="background:linear-gradient(135deg, ${(ACCENT_HEX[p.accent] || '#60a5fa')}33, #0e1014)"><i data-lucide="${p.icon || 'folder'}" style="color:${ACCENT_HEX[p.accent] || '#60a5fa'}"></i></div><button class="ix-modal-close" aria-label="Close">✕</button></div>`;
        const chips = (p.tags || []).map(t => `<span class="ix-modal-chip">${t}</span>`).join('');
        const sec = (h, body) => `<div class="ix-modal-section"><h4>${h}</h4>${body}</div>`;
        const actions = `<div class="ix-modal-actions">${p.live ? `<a class="ix-btn ix-btn-primary" href="${p.live}" target="_blank" rel="noopener noreferrer"><i data-lucide="external-link"></i> Live Demo</a>` : ''}<a class="ix-btn ix-btn-ghost" href="${p.github}" target="_blank" rel="noopener noreferrer"><i data-lucide="github"></i> GitHub</a></div>`;
        return `${hero}<div class="ix-modal-body">
            <h3>${title}</h3>
            <p class="ix-modal-tagline">${p.tagline}</p>
            <div>${chips}</div>
            ${sec('Problem', `<p>${p.problem}</p>`)}
            ${sec('Solution', `<p>${p.solution}</p>`)}
            ${sec('Architecture', `<p>${p.architecture}</p>`)}
            ${sec('What I learned', `<p>${p.learned}</p>`)}
            ${actions}
        </div>`;
    }

    /* ══════════════════ 5. PROJECT CARDS: tag, case-study, filter ══════════════════ */
    (function projects() {
        const grid = $('#projects-section .grid.md\\:grid-cols-2, #projects-section .grid');
        const cards = $$('#projects-section .project-card');
        if (!cards.length) return;

        // tag cards + add case-study affordance
        cards.forEach(card => {
            const title = (card.querySelector('h3')?.textContent || '').trim();
            const p = PROJECTS[title];
            if (!p) return;
            card.dataset.ixCat = p.category;
            card.dataset.ixTitle = title;
            card.classList.add('ix-anim');
            const body = card.querySelector('.p-5, .p-4, [class*="p-5"], [class*="p-6"]') || card.lastElementChild;
            const btn = document.createElement('button');
            btn.className = 'ix-case-btn';
            btn.innerHTML = '<i data-lucide="book-open"></i> View case study';
            btn.addEventListener('click', ev => { ev.stopPropagation(); modal.open(projectModalHTML(title, p)); });
            (body || card).appendChild(btn);
            // clicking the media area also opens the study
            const media = card.querySelector('img, .h-48');
            if (media) { media.style.cursor = 'pointer'; media.addEventListener('click', () => modal.open(projectModalHTML(title, p))); }
        });
        drawIcons();

        // filter bar
        const catsOrder = ['All', 'AI/ML', 'Web', 'Security', 'FinTech', 'Business'];
        const counts = {};
        cards.forEach(c => { const k = c.dataset.ixCat; if (k) counts[k] = (counts[k] || 0) + 1; });
        const present = catsOrder.filter(c => c === 'All' || counts[c]);
        const bar = document.createElement('div');
        bar.className = 'ix-filter';
        bar.innerHTML = present.map((c, i) =>
            `<button class="ix-filter-btn${i === 0 ? ' active' : ''}" data-cat="${c}">${c}<span class="ix-filter-count">${c === 'All' ? cards.length : counts[c]}</span></button>`
        ).join('');
        if (grid && grid.parentNode) grid.parentNode.insertBefore(bar, grid);

        bar.addEventListener('click', e => {
            const b = e.target.closest('.ix-filter-btn'); if (!b) return;
            $$('.ix-filter-btn', bar).forEach(x => x.classList.toggle('active', x === b));
            const cat = b.dataset.cat;
            cards.forEach(c => {
                const show = cat === 'All' || c.dataset.ixCat === cat;
                c.classList.toggle('ix-hidden', !show);
            });
        });
    })();

    /* ══════════════════ 6. INTERACTIVE SKILLS ══════════════════ */
    (function skills() {
        const norm = s => s.toLowerCase().replace(/[^a-z0-9]/g, '');
        document.addEventListener('click', e => {
            const card = e.target.closest('#skills-section .skill-card');
            if (!card) return;
            const name = (card.querySelector('h4')?.textContent || '').trim();
            if (!name) return;
            const key = norm(name);
            const related = Object.entries(PROJECTS).filter(([, p]) =>
                (p.stack || []).some(s => {
                    const n = norm(s);
                    return n === key || n.includes(key) || key.includes(n);
                })
            );
            const list = related.length
                ? `<div class="ix-skill-projlist">${related.map(([t, p]) =>
                    `<a href="#" data-open="${t}"><i data-lucide="${p.icon || 'folder-git-2'}"></i> ${t} <span class="ix-modal-chip" style="margin:0 0 0 auto">${p.badge}</span></a>`).join('')}</div>`
                : `<p style="color:#9ca3af">No public project uses this yet — it’s part of my learning toolkit. New projects are on the way.</p>`;
            modal.open(`<div class="ix-modal-hero"><div class="ix-modal-banner"><i data-lucide="sparkles" style="color:#60a5fa"></i></div><button class="ix-modal-close" aria-label="Close">✕</button></div>
                <div class="ix-modal-body">
                    <h3>${name}</h3>
                    <p class="ix-modal-tagline">Where I’ve used this</p>
                    ${related.length ? '<div class="ix-modal-section"><h4>Used in</h4></div>' : ''}
                    ${list}
                </div>`);
            // wire "open project" links inside the skill modal
            $$('.ix-skill-projlist a').forEach(a => a.addEventListener('click', ev => {
                ev.preventDefault();
                const t = a.dataset.open; if (PROJECTS[t]) modal.open(projectModalHTML(t, PROJECTS[t]));
            }));
        });
    })();

    /* ══════════════════ 7. COPY EMAIL + TOAST ══════════════════ */
    const toast = (function () {
        const wrap = document.createElement('div'); wrap.id = 'ix-toasts'; document.body.appendChild(wrap);
        return (msg, icon = 'check-circle') => {
            const t = document.createElement('div'); t.className = 'ix-toast';
            t.innerHTML = `<i data-lucide="${icon}"></i> ${msg}`;
            wrap.appendChild(t); drawIcons();
            requestAnimationFrame(() => t.classList.add('show'));
            setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 2200);
        };
    })();
    const EMAIL = 'sayaksatpathi12@gmail.com';
    function copyEmail() {
        const done = () => toast('Email copied — ' + EMAIL);
        if (navigator.clipboard) navigator.clipboard.writeText(EMAIL).then(done).catch(done);
        else { const ta = document.createElement('textarea'); ta.value = EMAIL; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); } catch (e) {} ta.remove(); done(); }
    }
    (function contactCopy() {
        const contact = document.getElementById('contact-section'); if (!contact) return;
        const getIn = contact.querySelector('a[href^="mailto:"]');
        if (!getIn) return;
        const btn = document.createElement('button');
        btn.className = 'ix-btn ix-btn-ghost';
        btn.style.cssText = 'margin-top:16px;background:rgba(255,255,255,.9);color:#111;border-color:transparent';
        btn.innerHTML = '<i data-lucide="copy"></i> Copy email';
        btn.addEventListener('click', copyEmail);
        getIn.insertAdjacentElement('afterend', document.createElement('br'));
        getIn.parentNode.appendChild(btn);
        drawIcons();
    })();

    /* ══════════════════ 8. COMMAND PALETTE (Ctrl/⌘+K) ══════════════════ */
    (function palette() {
        const go = id => { const t = document.getElementById(id); if (t) t.scrollIntoView({ behavior: 'smooth' }); };
        const items = [
            { label: 'Projects', icon: 'folder-git-2', run: () => go('projects-section') },
            { label: 'Skills', icon: 'cpu', run: () => go('skills-section') },
            { label: 'Education', icon: 'graduation-cap', run: () => go('education-section') },
            { label: 'GitHub Activity', icon: 'activity', run: () => go('activity-section') },
            { label: 'About', icon: 'user', run: () => go('about-section') },
            { label: 'Contact', icon: 'mail', run: () => go('contact-section') },
            { label: 'Copy email address', icon: 'copy', run: copyEmail },
            { label: 'Download Resume (CV)', icon: 'download', run: () => window.open('https://sayaksatpathi.netlify.app/Sayak_Satpathi_Resume.pdf', '_blank') },
            { label: 'Open GitHub', icon: 'github', run: () => window.open('https://github.com/sayaksatpathi', '_blank') },
            { label: 'Open LinkedIn', icon: 'linkedin', run: () => window.open('https://www.linkedin.com/in/sayak-satpathi-34031b240', '_blank') },
            { label: 'Jump to Terminal', icon: 'terminal', run: () => { const t = document.getElementById('ix-terminal'); if (t) { t.scrollIntoView({ behavior: 'smooth', block: 'center' }); const i = t.querySelector('.ix-term-input'); setTimeout(() => i && i.focus(), 500); } } }
        ];
        const back = document.createElement('div');
        back.className = 'ix-palette-backdrop';
        back.innerHTML = `<div class="ix-palette" role="dialog" aria-modal="true">
            <input type="text" placeholder="Type a command or search…" aria-label="Command search">
            <div class="ix-palette-list"></div>
            <div class="ix-palette-hint"><span><span class="ix-kbd-key">↑↓</span> navigate</span><span><span class="ix-kbd-key">↵</span> select</span><span><span class="ix-kbd-key">esc</span> close</span></div>
        </div>`;
        document.body.appendChild(back);
        const input = $('input', back), list = $('.ix-palette-list', back);
        let filtered = items.slice(), active = 0, openState = false;

        const render = () => {
            list.innerHTML = filtered.map((it, i) =>
                `<div class="ix-palette-item${i === active ? ' active' : ''}" data-i="${i}"><i data-lucide="${it.icon}"></i> ${it.label}</div>`
            ).join('') || '<div class="ix-palette-item" style="opacity:.5">No matches</div>';
            drawIcons();
        };
        const open = () => { openState = true; back.classList.add('open'); input.value = ''; filtered = items.slice(); active = 0; render(); setTimeout(() => input.focus(), 30); document.body.style.overflow = 'hidden'; };
        const close = () => { openState = false; back.classList.remove('open'); document.body.style.overflow = ''; };
        const exec = () => { const it = filtered[active]; if (it) { close(); setTimeout(it.run, 120); } };

        input.addEventListener('input', () => {
            const q = input.value.toLowerCase().trim();
            filtered = items.filter(it => it.label.toLowerCase().includes(q));
            active = 0; render();
        });
        list.addEventListener('click', e => { const el = e.target.closest('.ix-palette-item'); if (!el || el.dataset.i === undefined) return; active = +el.dataset.i; exec(); });
        back.addEventListener('click', e => { if (e.target === back) close(); });
        addEventListener('keydown', e => {
            if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) { e.preventDefault(); openState ? close() : open(); return; }
            if (!openState) return;
            if (e.key === 'Escape') { close(); }
            else if (e.key === 'ArrowDown') { e.preventDefault(); active = Math.min(filtered.length - 1, active + 1); render(); }
            else if (e.key === 'ArrowUp') { e.preventDefault(); active = Math.max(0, active - 1); render(); }
            else if (e.key === 'Enter') { e.preventDefault(); exec(); }
        });
    })();

    /* ══════════════════ 9. TERMINAL ══════════════════ */
    (function terminal() {
        const host = $('#activity-section .container');
        if (!host) return;
        const wrap = document.createElement('div');
        wrap.className = 'reveal';
        wrap.style.marginTop = '2.5rem';
        wrap.innerHTML = `
            <div class="flex items-center gap-3 mb-6">
                <div class="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center"><i data-lucide="terminal" class="w-4 h-4 text-green-400"></i></div>
                <h3 class="text-xl sm:text-2xl font-bold text-white">Try the terminal</h3>
            </div>
            <div class="ix-terminal" id="ix-terminal">
                <div class="ix-term-bar">
                    <span class="ix-term-dot" style="background:#ff5f56"></span>
                    <span class="ix-term-dot" style="background:#ffbd2e"></span>
                    <span class="ix-term-dot" style="background:#27c93f"></span>
                    <span class="ix-term-title">sayak@portfolio: ~</span>
                </div>
                <div class="ix-term-body" id="ix-term-body">
                    <div class="ix-term-line ix-term-muted">Welcome. Type <span class="ix-term-cmd">help</span> and hit Enter.</div>
                </div>
            </div>`;
        host.appendChild(wrap);
        drawIcons();

        const body = $('#ix-term-body', wrap);
        const prompt = () => '<span class="ix-term-prompt">sayak@portfolio</span>:<span class="ix-term-path">~</span>$ ';
        const print = html => { const d = document.createElement('div'); d.className = 'ix-term-line'; d.innerHTML = html; body.appendChild(d); body.scrollTop = body.scrollHeight; };
        const scrollTo = id => { const t = document.getElementById(id); if (t) { t.scrollIntoView({ behavior: 'smooth' }); print('<span class="ix-term-muted">→ scrolling to ' + id.replace('-section', '') + '…</span>'); } };

        const cmds = {
            help: () => print(
                'Available commands:\n' +
                '  <span class="ix-term-cmd">projects</span>  view my projects\n' +
                '  <span class="ix-term-cmd">skills</span>    technical skills\n' +
                '  <span class="ix-term-cmd">about</span>     about me\n' +
                '  <span class="ix-term-cmd">github</span>    open GitHub\n' +
                '  <span class="ix-term-cmd">linkedin</span>  open LinkedIn\n' +
                '  <span class="ix-term-cmd">resume</span>    download CV\n' +
                '  <span class="ix-term-cmd">contact</span>   how to reach me\n' +
                '  <span class="ix-term-cmd">clear</span>     clear the screen'),
            projects: () => { print('<span class="ix-term-accent">' + Object.keys(PROJECTS).join('  •  ') + '</span>'); scrollTo('projects-section'); },
            skills: () => { print('<span class="ix-term-accent">Python • JS • React • PyTorch • OpenCV • Docker • AWS • Linux …</span>'); scrollTo('skills-section'); },
            about: () => { print('2nd-year B.Tech AI &amp; ML student at SMIT — full-stack developer, UI/UX enthusiast and open-source contributor.'); scrollTo('about-section'); },
            github: () => { print('<span class="ix-term-muted">opening github.com/sayaksatpathi…</span>'); window.open('https://github.com/sayaksatpathi', '_blank'); },
            linkedin: () => { print('<span class="ix-term-muted">opening LinkedIn…</span>'); window.open('https://www.linkedin.com/in/sayak-satpathi-34031b240', '_blank'); },
            resume: () => { print('<span class="ix-term-muted">downloading CV…</span>'); window.open('https://sayaksatpathi.netlify.app/Sayak_Satpathi_Resume.pdf', '_blank'); },
            contact: () => print('email: <span class="ix-term-path">' + EMAIL + '</span>  — type <span class="ix-term-cmd">copy</span> to copy it'),
            copy: () => { copyEmail(); print('<span class="ix-term-muted">copied to clipboard ✓</span>'); },
            whoami: () => print('sayak'),
            ls: () => print('projects/  skills/  education/  about/  contact.md  resume.pdf'),
            clear: () => { body.innerHTML = ''; },
            matrix: () => print('<span style="color:#22c55e">Wake up, Neo… the Matrix has you. 🟢</span>'),
            sudo: () => print('<span class="ix-term-muted">Nice try. Permission denied 😄</span>'),
            banner: () => print('<span class="ix-term-accent">SAYAK SATPATHI — AI/ML • Full-Stack • DevOps</span>')
        };
        const aliases = { proj: 'projects', skill: 'skills', cv: 'resume', cls: 'clear', help: 'help', '?': 'help' };

        const newInputLine = () => {
            const line = document.createElement('div');
            line.className = 'ix-term-line ix-term-inputline';
            line.innerHTML = prompt() + '<input class="ix-term-input" autocomplete="off" spellcheck="false" aria-label="terminal input">';
            body.appendChild(line);
            const input = line.querySelector('input');
            input.focus();
            input.addEventListener('keydown', e => {
                if (e.key !== 'Enter') return;
                const raw = input.value.trim();
                const cmd = aliases[raw.toLowerCase()] || raw.toLowerCase();
                // freeze this line
                line.innerHTML = prompt() + '<span class="ix-term-cmd">' + (raw || '') + '</span>';
                if (raw) { (cmds[cmd] || (() => print('command not found: <span class="ix-term-accent">' + raw + '</span> — type <span class="ix-term-cmd">help</span>')))(); }
                newInputLine();
            });
            body.scrollTop = body.scrollHeight;
        };
        newInputLine();
        body.addEventListener('click', () => { const i = body.querySelector('.ix-term-inputline input'); if (i) i.focus(); });

        // observe reveal for the terminal block
        const io = new IntersectionObserver((ens, o) => ens.forEach(en => { if (en.isIntersecting) { wrap.classList.add('visible'); o.disconnect(); } }), { threshold: 0.05 });
        io.observe(wrap);
    })();

})();
