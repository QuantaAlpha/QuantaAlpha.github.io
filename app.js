document.addEventListener('DOMContentLoaded', () => {
    if (window.AOS) {
        AOS.init({
            once: true,
            offset: 50,
            duration: 800,
            easing: 'ease-out-cubic',
        });
    }

    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }

    // Navigation active state highlighting
    (function highlightActiveNav() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        // Map page filenames to their nav href patterns
        const pageToHref = {
            'index.html': ['index.html#research'],
            'publications.html': ['publications.html'],
            'commercialization.html': ['commercialization.html'],
            'media.html': ['media.html'],
            'people.html': ['people.html', 'people.html#community'],
        };

        const matchingHrefs = pageToHref[currentPage] || [];
        if (!matchingHrefs.length) return;

        // Select all nav links (desktop + mobile)
        const navLinks = document.querySelectorAll('nav a[href]');
        navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            // Skip the "Join Us" button (it has special styling)
            if (href === 'index.html#contact') return;
            // Check if this link matches the current page
            if (matchingHrefs.includes(href)) {
                link.classList.add('nav-active');
            }
        });
    })();

    const translations = {
        en: {
            navResearch: 'Research',
            navPublications: 'Publications',
            navCommercialization: 'Commercialization',
            navMedia: 'Media',
            navPeople: 'People',
            navCommunity: 'Community',
            navJoin: 'Join Us',
            commercialEyebrow: 'Commercialization Pipeline',
            commercialTitle: 'From Frontier Papers to Deployable Agent Products',
            commercialIntro: 'QuantaAlpha turns research results into product-grade systems across AI investment, code agent infrastructure, research automation, and personal agent orchestration.',
            statProductLines: 'Product Lines',
            statPluginUsers: 'Plugin Users',
            statWeeklyActive: 'Weekly Active',
            reportedByQbitAI: 'Reported by QbitAI mirror',
            qaCommercialCopy: 'A self-evolving factor discovery system that converts quant research into an auditable agent workflow: hypothesis generation, factor coding, backtest validation, trajectory mutation, crossover, and risk filtering.',
            reportedArr: 'Reported ARR',
            coreMarket: 'Core Market',
            crossMarket: 'Cross-market',
            liveProduct: 'Live Product',
            epochxCommercialCopy: 'A credits-native human-agent marketplace where tasks are decomposed, executed, verified, and converted into reusable skills, workflows, execution traces, and institutional memory.',
            nativeEconomy: 'Native Economy',
            taskSplitting: 'Task Splitting',
            agentAssets: 'Agent Assets',
            semaCommercialCopy: 'A programmable AI coding engine for enterprise workflows: repository understanding, tool execution, multi-agent scheduling, permission control, and VS Code / messaging-channel delivery from the same core.',
            repoScale: 'Repo Scale',
            tokenCut: 'Token Cut',
            vscodeUsers: 'VS Code Users',
            researchAutomation: 'Research Automation',
            publicExperience: 'Public Experience',
            arkCommercialCopy: 'End-to-end research automation that links literature exploration, method planning, experiment execution, result interpretation, manuscript drafting, and review iteration into a closed-loop product surface.',
            papersAssisted: 'Papers Assisted',
            researchLoop: 'Research Loop'
        },
        zh: {
            navResearch: '研究方向',
            navPublications: '论文成果',
            navCommercialization: '商业化',
            navMedia: '媒体报道',
            navPeople: '团队',
            navCommunity: '社区',
            navJoin: '加入我们',
            commercialEyebrow: '商业化管线',
            commercialTitle: '从前沿论文到可部署的 Agent 产品',
            commercialIntro: 'QuantaAlpha 将研究成果转化为产品级系统，覆盖 AI 投资、CodeAgent 基础设施、科研自动化和个人 Agent 编排。',
            statProductLines: '产品线',
            statPluginUsers: '插件用户',
            statWeeklyActive: '周活跃',
            reportedByQbitAI: 'QbitAI 镜像报道',
            qaCommercialCopy: '自进化因子发现系统，把量化研究变成可审计的 Agent 工作流：假设生成、因子编码、回测验证、轨迹变异、交叉进化和风险过滤。',
            reportedArr: '报道 ARR',
            coreMarket: '核心市场',
            crossMarket: '跨市场',
            liveProduct: '线上产品',
            epochxCommercialCopy: 'Credits-native 的人机协作任务市场，将任务拆解、执行、验证，并沉淀为可复用技能、工作流、执行轨迹和组织记忆。',
            nativeEconomy: '原生经济',
            taskSplitting: '任务拆解',
            agentAssets: 'Agent 资产',
            semaCommercialCopy: '面向企业工作流的可编程 AI coding engine：覆盖仓库理解、工具执行、多 Agent 调度、权限控制，以及 VS Code / 消息渠道交付。',
            repoScale: '仓库规模',
            tokenCut: 'Token 降幅',
            vscodeUsers: 'VS Code 用户',
            researchAutomation: '科研自动化',
            publicExperience: '公开体验',
            arkCommercialCopy: '端到端科研自动化产品，将文献探索、方法规划、实验执行、结果解释、论文起草和审稿迭代连接成闭环。',
            papersAssisted: '辅助论文',
            researchLoop: '科研闭环'
        }
    };

    const navKeys = [
        ['index.html#research', 'navResearch'],
        ['publications.html', 'navPublications'],
        ['commercialization.html', 'navCommercialization'],
        ['media.html', 'navMedia'],
        ['people.html', 'navPeople'],
        ['people.html#community', 'navCommunity'],
        ['index.html#contact', 'navJoin']
    ];

    navKeys.forEach(([href, key]) => {
        document.querySelectorAll(`nav a[href="${href}"]`).forEach((link) => {
            link.dataset.i18n = key;
        });
    });

    function applyLanguage(lang) {
        document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
        document.querySelectorAll('[data-i18n]').forEach((node) => {
            const value = translations[lang][node.dataset.i18n];
            if (value) node.textContent = value;
        });
        document.querySelectorAll('[data-lang-toggle]').forEach((toggle) => {
            toggle.textContent = lang === 'zh' ? 'EN' : '中文';
            toggle.setAttribute('aria-label', lang === 'zh' ? 'Switch to English' : '切换到中文');
        });
    }

    function createLanguageToggle(extraClasses) {
        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.dataset.langToggle = 'true';
        toggle.className = extraClasses;
        toggle.addEventListener('click', () => {
            const nextLang = localStorage.getItem('qa-lang') === 'zh' ? 'en' : 'zh';
            localStorage.setItem('qa-lang', nextLang);
            applyLanguage(nextLang);
        });
        return toggle;
    }

    const desktopMenu = document.querySelector('nav .hidden.md\\:flex');
    if (desktopMenu) {
        const joinLink = desktopMenu.querySelector('a[href="index.html#contact"]');
        const toggle = createLanguageToggle('text-sm font-semibold text-slate-300 hover:text-white transition-colors border border-white/10 rounded-full px-3 py-1.5');
        desktopMenu.insertBefore(toggle, joinLink);
    }

    const mobileMenu = document.querySelector('#mobile-menu .space-y-2');
    if (mobileMenu) {
        const joinLink = mobileMenu.querySelector('a[href="index.html#contact"]');
        const toggle = createLanguageToggle('block w-full text-left px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-md');
        mobileMenu.insertBefore(toggle, joinLink);
    }

    applyLanguage(localStorage.getItem('qa-lang') || 'en');

    function markCurrentNavigation() {
        const currentPage = normalizedPageName();
        const hash = window.location.hash;
        const activeHrefs = new Set();

        if (currentPage === 'index.html') {
            activeHrefs.add(hash === '#contact' ? 'index.html#contact' : 'index.html#research');
        } else if (currentPage === 'people.html' && hash === '#community') {
            activeHrefs.add('people.html#community');
        } else {
            activeHrefs.add(currentPage);
        }

        document.querySelectorAll('nav a').forEach((link) => {
            const isCurrent = activeHrefs.has(link.getAttribute('href'));
            link.classList.toggle('nav-current', isCurrent);
            if (isCurrent) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    markCurrentNavigation();
    window.addEventListener('hashchange', markCurrentNavigation);

    function buildJoinModal() {
        const modal = document.createElement('div');
        modal.id = 'join-modal';
        modal.className = 'fixed inset-0 z-[80] hidden items-center justify-center px-4 bg-slate-950/75 backdrop-blur-md';
        modal.innerHTML = `
            <div class="join-modal-card glass-card relative w-full max-w-3xl rounded-2xl p-6 md:p-8">
                <button type="button" class="join-modal-close absolute right-4 top-4 h-9 w-9 rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Close">
                    <i class="fas fa-xmark"></i>
                </button>
                <div class="mb-7 pr-10">
                    <div class="text-sm uppercase tracking-[0.2em] text-brand-blue font-semibold mb-3">Collaboration & Careers</div>
                    <h2 class="text-2xl md:text-3xl font-bold text-white mb-3">Build frontier agent systems with us</h2>
                    <p class="text-slate-400 text-sm leading-relaxed">We work with researchers, builders, labs, and startups turning agent research into real products.</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-7">
                    <div>
                        <h3 class="text-base font-bold text-brand-blue mb-3 flex items-center gap-2"><i class="fas fa-handshake"></i> Seeking Partners</h3>
                        <ul class="space-y-2 text-slate-400 text-sm">
                            <li><strong>University/Corp Labs:</strong> joint research and compute.</li>
                            <li><strong>Startups:</strong> industry applications of Agent tech.</li>
                            <li><strong>Open Source:</strong> contributors for GitHub repos.</li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-base font-bold text-brand-blue mb-3 flex items-center gap-2"><i class="fas fa-user-graduate"></i> Ideal Candidate</h3>
                        <ul class="space-y-2 text-slate-400 text-sm">
                            <li>Top-tier publications or production-grade systems.</li>
                            <li>Strong self-motivation and passion for AGI.</li>
                            <li>Focus: Agentic RL, CodeAgent, reasoning, or AI4Science.</li>
                        </ul>
                    </div>
                </div>
                <a href="mailto:quantaalpha.ai@gmail.com" class="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-slate-950 bg-gradient-to-r from-brand-blue to-brand-violet rounded-full hover:shadow-lg hover:shadow-brand-blue/25 transition-all duration-300">
                    <i class="fas fa-envelope mr-2"></i> quantaalpha.ai@gmail.com
                </a>
            </div>
        `;
        document.body.appendChild(modal);
        return modal;
    }

    const joinModal = buildJoinModal();
    function showJoinModal() {
        joinModal.classList.remove('hidden');
        joinModal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }
    function hideJoinModal() {
        joinModal.classList.add('hidden');
        joinModal.classList.remove('flex');
        document.body.style.overflow = '';
    }
    document.querySelectorAll('a[href="index.html#contact"]').forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            showJoinModal();
        });
    });
    joinModal.querySelector('.join-modal-close').addEventListener('click', hideJoinModal);
    joinModal.addEventListener('click', (event) => {
        if (event.target === joinModal) hideJoinModal();
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !joinModal.classList.contains('hidden')) {
            hideJoinModal();
        }
    });

    const modulePages = [
        { href: 'index.html', label: 'Research' },
        { href: 'publications.html', label: 'Publications' },
        { href: 'commercialization.html', label: 'Commercialization' },
        { href: 'media.html', label: 'Media' },
        { href: 'people.html', label: 'People' }
    ];

    function normalizedPageName() {
        const page = window.location.pathname.split('/').pop();
        return page || 'index.html';
    }

    function navigateModule(direction) {
        const currentPage = normalizedPageName();
        const currentIndex = Math.max(0, modulePages.findIndex((page) => page.href === currentPage));
        const nextIndex = (currentIndex + direction + modulePages.length) % modulePages.length;
        const target = modulePages[nextIndex];
        document.body.classList.add(direction > 0 ? 'page-transition-out-right' : 'page-transition-out-left');
        window.setTimeout(() => {
            window.location.href = target.href;
        }, 160);
    }

    function buildPageNav() {
        const currentPage = normalizedPageName();
        const currentIndex = Math.max(0, modulePages.findIndex((page) => page.href === currentPage));
        const prevPage = modulePages[(currentIndex - 1 + modulePages.length) % modulePages.length];
        const nextPage = modulePages[(currentIndex + 1) % modulePages.length];

        const prev = document.createElement('button');
        prev.type = 'button';
        prev.className = 'page-nav page-nav-left';
        prev.setAttribute('aria-label', `Previous module: ${prevPage.label}`);
        prev.innerHTML = `<i class="fas fa-chevron-left"></i><span class="page-nav-label">${prevPage.label}</span>`;
        prev.addEventListener('click', () => navigateModule(-1));

        const next = document.createElement('button');
        next.type = 'button';
        next.className = 'page-nav page-nav-right';
        next.setAttribute('aria-label', `Next module: ${nextPage.label}`);
        next.innerHTML = `<i class="fas fa-chevron-right"></i><span class="page-nav-label">${nextPage.label}</span>`;
        next.addEventListener('click', () => navigateModule(1));

        document.body.append(prev, next);
    }

    buildPageNav();

    const carouselContainer = document.getElementById('carousel-container');
    const carouselTrack = document.getElementById('carousel-track');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const dots = document.querySelectorAll('.carousel-dot');

    if (carouselContainer && carouselTrack && prevBtn && nextBtn && dots.length) {
        let currentIndex = 0;
        const totalSlides = dots.length;

        let latestTargetScroll = 0;
        let smoothPanRaf = null;
        let carouselScrollAnimRaf = null;

        /** Slower than native `scroll-behavior: smooth` (browser-dependent). */
        const CAROUSEL_SCROLL_DURATION_MS = 2600;

        function animateCarouselScroll(targetLeft) {
            if (carouselScrollAnimRaf) {
                cancelAnimationFrame(carouselScrollAnimRaf);
                carouselScrollAnimRaf = null;
            }
            const start = carouselContainer.scrollLeft;
            const delta = targetLeft - start;
            if (Math.abs(delta) < 0.5) {
                carouselContainer.scrollLeft = targetLeft;
                return;
            }
            const t0 = performance.now();
            function easeOutCubic(t) {
                return 1 - (1 - t) ** 3;
            }
            function step(now) {
                const elapsed = now - t0;
                const t = Math.min(1, elapsed / CAROUSEL_SCROLL_DURATION_MS);
                carouselContainer.scrollLeft = start + delta * easeOutCubic(t);
                if (t < 1) {
                    carouselScrollAnimRaf = requestAnimationFrame(step);
                } else {
                    carouselScrollAnimRaf = null;
                    carouselContainer.scrollLeft = targetLeft;
                }
            }
            carouselScrollAnimRaf = requestAnimationFrame(step);
        }

        function getSlideWidth() {
            const slides = carouselTrack.children;
            if (slides.length > 0) {
                const gap = window.matchMedia('(min-width: 1024px)').matches ? 48 : 36;
                return slides[0].offsetWidth + gap;
            }
            return 724;
        }

        function updateDots() {
            dots.forEach((dot, i) => {
                if (i === currentIndex) {
                    dot.classList.add('active');
                    dot.style.backgroundColor = 'rgba(255,255,255,0.8)';
                } else {
                    dot.classList.remove('active');
                    dot.style.backgroundColor = 'rgba(255,255,255,0.3)';
                }
            });
        }

        function updateCarousel(index) {
            const slideWidth = getSlideWidth();
            const targetLeft = slideWidth * index;
            if (smoothPanRaf) {
                cancelAnimationFrame(smoothPanRaf);
                smoothPanRaf = null;
            }
            latestTargetScroll = targetLeft;
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                carouselContainer.scrollLeft = targetLeft;
            } else {
                animateCarouselScroll(targetLeft);
            }
            currentIndex = index;
            updateDots();
        }

        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            currentIndex = Math.max(0, currentIndex - 1);
            updateCarousel(currentIndex);
        });

        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            currentIndex = Math.min(totalSlides - 1, currentIndex + 1);
            updateCarousel(currentIndex);
        });

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                updateCarousel(i);
            });
        });

        carouselContainer.addEventListener('scroll', () => {
            const slideWidth = getSlideWidth();
            const scrollLeft = carouselContainer.scrollLeft;
            const newIndex = Math.round(scrollLeft / slideWidth);
            if (newIndex !== currentIndex && newIndex >= 0 && newIndex < totalSlides) {
                currentIndex = newIndex;
                updateDots();
            }
        });

        updateDots();

        let autoPlayInterval;
        const CAROUSEL_AUTOPLAY_MS = 16000;

        function startAutoPlay() {
            autoPlayInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % totalSlides;
                updateCarousel(currentIndex);
            }, CAROUSEL_AUTOPLAY_MS);
        }
        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }

        /** Hover: pointer X → target scroll; lower = slower follow. */
        const HOVER_SMOOTH = 0.022;

        function setHoverScrollTarget(clientX) {
            const rect = carouselContainer.getBoundingClientRect();
            const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
            const maxScroll = carouselContainer.scrollWidth - carouselContainer.clientWidth;
            if (maxScroll <= 0) return;
            latestTargetScroll = ratio * maxScroll;
        }

        function smoothPanLoop() {
            smoothPanRaf = null;
            const maxScroll = carouselContainer.scrollWidth - carouselContainer.clientWidth;
            if (maxScroll <= 0) return;
            const cur = carouselContainer.scrollLeft;
            const diff = latestTargetScroll - cur;
            if (Math.abs(diff) < 0.45) {
                carouselContainer.scrollLeft = latestTargetScroll;
                return;
            }
            carouselContainer.scrollLeft = cur + diff * HOVER_SMOOTH;
            smoothPanRaf = requestAnimationFrame(smoothPanLoop);
        }

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (!prefersReducedMotion.matches) {
            carouselContainer.addEventListener('mousemove', (e) => {
                setHoverScrollTarget(e.clientX);
                if (!smoothPanRaf) {
                    smoothPanRaf = requestAnimationFrame(smoothPanLoop);
                }
            });
        }

        startAutoPlay();
        carouselContainer.addEventListener('mouseenter', () => {
            stopAutoPlay();
            if (carouselScrollAnimRaf) {
                cancelAnimationFrame(carouselScrollAnimRaf);
                carouselScrollAnimRaf = null;
            }
            latestTargetScroll = carouselContainer.scrollLeft;
        });
        carouselContainer.addEventListener('mouseleave', () => {
            startAutoPlay();
        });
    }

    const filterBtns = document.querySelectorAll('.pub-filter');
    const pubItems = document.querySelectorAll('.pub-item');
    filterBtns.forEach((filterBtn) => {
        filterBtn.addEventListener('click', () => {
            filterBtns.forEach((b) => {
                b.classList.remove('active');
                b.classList.remove('bg-brand-blue/20', 'text-brand-blue', 'border-brand-blue/30');
                b.classList.add('bg-white/5', 'text-slate-400', 'border-white/10');
            });
            filterBtn.classList.add('active', 'bg-brand-blue/20', 'text-brand-blue', 'border-brand-blue/30');
            filterBtn.classList.remove('bg-white/5', 'text-slate-400', 'border-white/10');

            const filter = filterBtn.dataset.filter;
            pubItems.forEach((item) => {
                const year = item.dataset.year;
                const tags = item.dataset.tags || '';
                if (filter === 'all') {
                    item.style.display = '';
                } else if (filter === '2026' || filter === '2025') {
                    item.style.display = year === filter ? '' : 'none';
                } else {
                    item.style.display = tags.includes(filter) ? '' : 'none';
                }
            });
        });
    });

    const showcaseTabs = document.querySelectorAll('[data-showcase-tab]');
    const showcasePanels = document.querySelectorAll('[data-showcase-panel]');

    function activeShowcaseTrack() {
        return document.querySelector('.showcase-panel.active .showcase-track');
    }

    function scrollShowcase(direction) {
        const track = activeShowcaseTrack();
        if (!track) return;
        const firstCard = track.querySelector('.showcase-card');
        const distance = firstCard ? firstCard.offsetWidth + 18 : 420;
        track.scrollBy({ left: direction * distance, behavior: 'smooth' });
    }

    showcaseTabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.showcaseTab;
            showcaseTabs.forEach((item) => item.classList.toggle('active', item === tab));
            showcasePanels.forEach((panel) => {
                const isActive = panel.dataset.showcasePanel === target;
                panel.classList.toggle('active', isActive);
                if (isActive) {
                    const track = panel.querySelector('.showcase-track');
                    if (track) track.scrollTo({ left: 0, behavior: 'smooth' });
                }
            });
        });
    });

    document.querySelectorAll('.showcase-track').forEach((track) => {
        track.addEventListener('wheel', (event) => {
            if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
            event.preventDefault();
            track.scrollBy({ left: event.deltaY, behavior: 'smooth' });
        }, { passive: false });

        let isPointerDown = false;
        let startX = 0;
        let startScrollLeft = 0;
        let suppressClick = false;

        track.addEventListener('pointerdown', (event) => {
            if (event.button !== 0) return;
            isPointerDown = true;
            startX = event.clientX;
            startScrollLeft = track.scrollLeft;
            suppressClick = false;
            track.setPointerCapture(event.pointerId);
        });

        track.addEventListener('pointermove', (event) => {
            if (!isPointerDown) return;
            const deltaX = startX - event.clientX;
            if (Math.abs(deltaX) > 4) {
                suppressClick = true;
                track.classList.add('is-dragging');
            }
            track.scrollLeft = startScrollLeft + deltaX;
        });

        function endShowcaseDrag(event) {
            if (!isPointerDown) return;
            isPointerDown = false;
            track.classList.remove('is-dragging');
            if (track.hasPointerCapture(event.pointerId)) {
                track.releasePointerCapture(event.pointerId);
            }
        }

        track.addEventListener('pointerup', endShowcaseDrag);
        track.addEventListener('pointercancel', endShowcaseDrag);
        track.addEventListener('lostpointercapture', () => {
            isPointerDown = false;
            track.classList.remove('is-dragging');
        });
        track.addEventListener('click', (event) => {
            if (!suppressClick) return;
            event.preventDefault();
            event.stopPropagation();
            suppressClick = false;
        }, true);
    });

    function escapeHtml(value) {
        return value.replace(/[&<>"']/g, (char) => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[char]));
    }

    function firstText(root, selector) {
        const node = root.querySelector(selector);
        return node ? node.textContent.replace(/\s+/g, ' ').trim() : '';
    }

    function firstHref(root, selector, fallback) {
        const node = root.querySelector(selector);
        const href = node ? node.getAttribute('href') : '';
        return href && href !== '#' ? href : fallback;
    }

    function normalizeSrc(src) {
        return src || 'images/logo.png';
    }

    function imageForPublication(title) {
        const normalized = title.toLowerCase();
        if (normalized.includes('epochx')) return 'images/EpochX.jpg';
        if (normalized.includes('se-agent')) return 'images/SE-Agent.png';
        if (normalized.includes('gittaskbench')) return 'images/GitTaskBench.png';
        if (normalized.includes('repomaster') || normalized.includes('sema code')) return 'images/RepoMaster.png';
        if (normalized.includes('octopus')) return 'images/Octupus.png';
        if (normalized.includes('quantaalpha')) return 'images/media/quantaalpha-qbitai-mirror.png';
        if (normalized.includes('clonemem')) return 'images/media/clonemem-baai.png';
        return 'images/logo.png';
    }

    function renderShowcaseCard(item) {
        const target = item.href && item.href.startsWith('http') ? ' target="_blank"' : '';
        const imageClass = item.containImage ? ' class="showcase-img-contain"' : '';
        const safeHref = escapeHtml(item.href || '#');
        return `
            <article class="showcase-card glass-card">
                <a href="${safeHref}"${target}><img${imageClass} src="${escapeHtml(normalizeSrc(item.image))}" alt="${escapeHtml(item.alt || item.title)}" loading="lazy" decoding="async"></a>
                <div class="showcase-body">
                    <div class="showcase-kicker">${escapeHtml(item.kicker)}</div>
                    <h3><a href="${safeHref}"${target}>${escapeHtml(item.title)}</a></h3>
                    <p>${escapeHtml(item.copy)}</p>
                    <a href="${safeHref}"${target} class="showcase-link">${escapeHtml(item.linkLabel)} <i class="fas fa-arrow-right"></i></a>
                </div>
            </article>
        `;
    }

    function replaceShowcaseTrack(panelName, items) {
        const track = document.querySelector(`[data-showcase-panel="${panelName}"] .showcase-track`);
        if (!track || items.length <= track.querySelectorAll('.showcase-card').length) return;
        track.innerHTML = items.map(renderShowcaseCard).join('');
        track.scrollTo({ left: 0, behavior: 'auto' });
    }

    async function loadHtmlPage(path) {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`Unable to load ${path}`);
        const html = await response.text();
        return new DOMParser().parseFromString(html, 'text/html');
    }

    async function hydrateShowcaseFromPages() {
        const hasShowcase = document.querySelector('[data-showcase-panel] .showcase-track');
        if (!hasShowcase) return;

        try {
            const [publicationsDoc, commercializationDoc, mediaDoc] = await Promise.all([
                loadHtmlPage('publications.html'),
                loadHtmlPage('commercialization.html'),
                loadHtmlPage('media.html')
            ]);

            const paperItems = Array.from(publicationsDoc.querySelectorAll('#publications-list .pub-item')).map((item) => {
                const title = firstText(item, 'h4 a');
                const image = imageForPublication(title);
                const tags = Array.from(item.querySelectorAll('.flex.flex-wrap.gap-1 span'))
                    .map((tag) => tag.textContent.replace(/\s+/g, ' ').trim())
                    .filter(Boolean);
                const year = item.dataset.year || firstText(item, '.flex-shrink-0 span') || 'Publication';
                const firstTag = tags[0] || 'Publication';
                return {
                    image,
                    containImage: false,
                    alt: `${title} publication`,
                    kicker: `${year} · ${firstTag}`,
                    title,
                    copy: tags.length ? tags.slice(0, 3).join(' · ') : 'Research publication from the complete QuantaAlpha publication list.',
                    href: firstHref(item, 'h4 a', 'publications.html'),
                    linkLabel: 'Open paper'
                };
            }).filter((item) => item.title && item.image !== 'images/logo.png');

            const projectItems = Array.from(commercializationDoc.querySelectorAll('.commercial-card')).map((item) => {
                const badges = Array.from(item.querySelectorAll('.flex.flex-wrap.gap-2 span'))
                    .map((badge) => badge.textContent.replace(/\s+/g, ' ').trim())
                    .filter(Boolean);
                const title = firstText(item, 'h3');
                return {
                    image: normalizeSrc(item.querySelector('img')?.getAttribute('src')),
                    alt: item.querySelector('img')?.getAttribute('alt') || `${title} project`,
                    kicker: badges.slice(0, 2).join(' · ') || 'Project',
                    title,
                    copy: firstText(item, 'p'),
                    href: firstHref(item, '.section-link', 'commercialization.html'),
                    linkLabel: 'View project'
                };
            }).filter((item) => item.title);

            const mediaItems = Array.from(mediaDoc.querySelectorAll('.media-card')).map((item) => {
                const title = firstText(item, '.media-title');
                return {
                    image: normalizeSrc(item.querySelector('img')?.getAttribute('src')),
                    alt: item.querySelector('img')?.getAttribute('alt') || `${title} coverage`,
                    kicker: firstText(item, '.media-source') || 'Media Coverage',
                    title,
                    copy: firstText(item, '.media-copy'),
                    href: firstHref(item, '.media-link', 'media.html'),
                    linkLabel: 'Open coverage'
                };
            }).filter((item) => item.title);

            replaceShowcaseTrack('papers', paperItems);
            replaceShowcaseTrack('projects', projectItems);
            replaceShowcaseTrack('media', mediaItems);
        } catch (error) {
            console.warn('Keeping fallback showcase cards:', error);
        }
    }

    const showcaseShell = document.querySelector('.showcase-shell');
    if (showcaseShell && 'IntersectionObserver' in window) {
        const showcaseObserver = new IntersectionObserver((entries, observer) => {
            if (!entries.some((entry) => entry.isIntersecting)) return;
            observer.disconnect();
            hydrateShowcaseFromPages();
        }, { rootMargin: '600px 0px' });
        showcaseObserver.observe(showcaseShell);
    } else {
        hydrateShowcaseFromPages();
    }

    document.querySelectorAll('.media-card').forEach((card) => {
        const link = card.querySelector('.media-link');
        const image = card.querySelector('.media-img');
        const title = card.querySelector('.media-title');
        if (!link) return;

        [image, title].forEach((target) => {
            if (!target) return;
            target.setAttribute('role', 'link');
            target.setAttribute('tabindex', '0');
            target.style.cursor = 'pointer';
            target.addEventListener('click', () => {
                window.open(link.href, '_blank', 'noopener');
            });
            target.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    window.open(link.href, '_blank', 'noopener');
                }
            });
        });
    });

    document.querySelectorAll('.commercial-card').forEach((card) => {
        const link = card.querySelector('.section-link');
        const image = card.querySelector('.commercial-img');
        const title = card.querySelector('h3');
        if (!link) return;

        [image, title].forEach((target) => {
            if (!target) return;
            target.setAttribute('role', 'link');
            target.setAttribute('tabindex', '0');
            target.style.cursor = 'pointer';
            target.addEventListener('click', () => {
                window.open(link.href, '_blank', 'noopener');
            });
            target.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    window.open(link.href, '_blank', 'noopener');
                }
            });
        });
    });

    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.remove('opacity-0', 'invisible');
                backToTopBtn.classList.add('opacity-100', 'visible');
            } else {
                backToTopBtn.classList.add('opacity-0', 'invisible');
                backToTopBtn.classList.remove('opacity-100', 'visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    const canvas = document.getElementById('hero-torus-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const size = 820;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    const cx = size / 2;
    const cy = size / 2;
    const rx = 385;
    const ry = 118;
    const numEllipses = 34;

    ctx.clearRect(0, 0, size, size);
    ctx.save();
    ctx.translate(cx, cy);

    for (let i = 0; i < numEllipses; i++) {
        const angle = (i / numEllipses) * Math.PI;
        const t = (Math.cos(angle) + 1) / 2;
        /* 略抬底线：原先 angle→π 一侧过淡（视觉上偏左下），与右上亮度更接近 */
        const alpha = 0.17 + 0.39 * t;
        const lineW = 0.52 + 0.68 * t;

        ctx.save();
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(14, 116, 184, ${alpha})`;
        ctx.lineWidth = lineW;
        ctx.stroke();
        ctx.restore();
    }

    ctx.restore();
});

