document.addEventListener('DOMContentLoaded', () => {
    if (window.AOS) {
        AOS.init({
            once: true,
            offset: 50,
            duration: 800,
            easing: 'ease-out-cubic',
        });
    }

    // Video modal
    const vmodal = document.getElementById('vmodal');
    const vmodalVideo = document.getElementById('vmodal-video');
    if (vmodal && vmodalVideo) {
        window.openVideo = function(src, title) {
            vmodalVideo.src = src;
            vmodal.classList.add('open');
            vmodalVideo.play().catch(() => {});
            document.body.style.overflow = 'hidden';
        };
        window.closeVideo = function() {
            vmodalVideo.pause();
            vmodalVideo.removeAttribute('src');
            vmodalVideo.load();
            vmodal.classList.remove('open');
            document.body.style.overflow = '';
        };
        vmodal.addEventListener('click', (e) => {
            if (e.target === vmodal) window.closeVideo();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && vmodal.classList.contains('open')) window.closeVideo();
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
            navCommercialization: 'Products',
            navMedia: 'Media',
            navPeople: 'Team',
            navJoin: 'Join Us',
            commercialEyebrow: 'Products Pipeline',
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
            researchLoop: 'Research Loop',
            // QuantaAlpha deck
            qaTitle: 'QuantaAlpha  ·  Self-Evolving Alpha Mining Engine',
            qaSubtitle: 'An Evolutionary Framework for LLM-Driven Alpha Mining  ·  First LLM × Evolutionary Algorithm Fusion Framework',
            qaH1: 'Core Positioning',
            qaP1: 'Translates quantitative research into an <b class="text-slate-300">auditable Agent workflow</b>: factor hypothesis generation, expression construction, code implementation, backtest validation, and iterative optimization in a unified pipeline. Multi-agent collaboration completes factor discovery, logic explanation, risk filtering, and factor warehousing.',
            qaH2: 'Technical Highlights',
            qaP2: 'Upgrades from random trial-and-error to interpretable evolution based on complete research trajectories via <b class="text-slate-300">trajectory-level mutation/crossover</b> and directed logic repair; introduces complexity, redundancy, and Rank IC constraints to mitigate factor crowding and backtest noise.',
            qaH3: 'Impact',
            qaP3: 'Faithfully simulates the workflow of professional quant researchers — AI moves from "blindly generating code by trial and error" to a white-box system that <b class="text-slate-300">actively participates in hypothesis formation, failure diagnosis, and experience reuse</b>. <b class="text-white">Consistently outperforms all baselines</b> on CSI 300; cross-market transfer maintains significant excess returns. <b class="text-slate-300">Covered by Tencent News and adopted by Orient Securities and other institutions as an AI-empowered quant research case study.</b>',
            qaStat1: 'Outperforms',
            qaStat1Sub: 'CSI 300',
            qaStat2: 'Zero-shot',
            qaStat2Sub: 'Cross-market',
            qaStat3Sub: 'Agent Workflow',
            qaMedia: 'Orient Securities · Tencent News Coverage',
            qaHarness: 'Three-Layer Harness Architecture',
            qaLead: 'Plan research directions',
            qaReviewer: 'Cross-direction audit & cross-referral',
            qaMiner: 'Parallel exploration',
            qaWiki: '<i class="fas fa-circle-info text-sky-600 mr-1"></i> <b class="text-slate-300">Factor Wiki</b>: Structured factor knowledge base as a consensus medium for multi-Agent collaboration — each factor carries a full lineage chain → traceable research genealogy.',
            // EpochX deck
            epTitle: 'EpochX  ·  Human–Agent Production Network',
            epH1: 'Core Positioning',
            epP1: 'A credits-native human–agent marketplace — <b class="text-slate-300">humans and agents are economically equal participants</b>. First to unify an agent task market, reusable skill ecosystem, verifiable delivery flow, execution trace memory, and credits-native incentive layer into a single production protocol.',
            epH2: 'Mechanism',
            epP2: 'Task posting → recursive decomposition → parallel execution → verified settlement → distilled into reusable Skills / Traces / Experience. Credits handle bounty locking, delegation budgets, acceptance settlement, and reuse royalty distribution.',
            epH3: 'Differentiating Value',
            epP3: 'Upgrades from one-off demos to a <b class="text-slate-300">self-reinforcing economic system</b>: execution, verification, and distillation all contribute compound returns. The core contribution elevates Agentic AI from tool-calling to infrastructure with <b class="text-slate-300">organizational coordination, knowledge compounding, and economic closed loops</b> — "agent civilization infrastructure."',
            epMedia: 'Coverage: TechWalker · HF Papers',
            epDemo1: 'Task Publishing demo',
            epDemo2: 'Agent Execution demo',
            epLive: 'epochx.cc Live',
            // RepoMaster deck
            rmTitle: 'RepoMaster  ·  Repo-Level Autonomous Exploration',
            rmSubtitle: 'Independent research: end-to-end understanding, retrieval, localization, and task execution for 100K+ file repositories.',
            rmFeat1: 'Repo Understanding',
            rmFeat1P: 'Builds hierarchical code trees, module dependency graphs, and function call graphs to locate key files, classes, and functions in ultra-large repositories.',
            rmFeat2: 'Autonomous Exploration',
            rmFeat2P: 'Supports agents exploring and completing complex tasks in real GitHub repos via search, dependency analysis, and granular code view.',
            rmFeat3: 'Results',
            rmFeat3P: 'Complex task completion rate <b class="text-slate-300">24% → 62.96%</b> (vs OpenHands), token cost reduced by <b class="text-slate-300">95%</b>.',
            rmFeat4: 'Paper & Open Source',
            rmFeat4P: '<b class="text-slate-300">NeurIPS 2025 Spotlight</b>. MLE-Bench Kaggle tasks: <b class="text-slate-300">22.7%</b> gold medals, far exceeding open-source Code Agent SOTA.',
            // Event Research deck
            erTitle: 'Event-Driven Research OS  ·  Financial Event Deep Research',
            erSubtitle: 'Independent research direction: upgrading major market events from one-time news processing to research assets that are understandable, comparable, inferable, verifiable, and reusable.',
            erBody: 'The system centers on structured <b class="text-slate-300">Events</b> rather than news or research report documents; organizes event chains via <b class="text-slate-300">Context / Event / Mechanism / Asset / Outcome</b>, conducts Deep Research around mechanism similarity, macro environment, market price-in degree, and historical counterexamples, and converges output into auditable <b class="text-slate-300">Claims</b> entering T+1 / T+5 / T+20 multi-window backtesting to distinguish retrieval errors, reasoning errors, and fully priced-in markets.',
            erTag1: 'Event Understanding → Historical Analogy → Mechanism Reasoning',
            erTag3: 'Lookahead-Bias-Free Verification',
            // Idea2Paper deck
            i2pTitle: 'Idea2Paper / ARK  ·  Research Automation',
            i2pBody: 'End-to-end research automation product connecting literature exploration, method planning, experiment execution, result interpretation, manuscript drafting, and review iteration in a closed loop. Served externally via ARK (idea2paper.org) and PaperBuild (paperbuild.cn), with open-source reference implementation on GitHub.'
        },
        zh: {
            navResearch: '研究方向',
            navPublications: '论文成果',
            navCommercialization: '产品',
            navMedia: '媒体报道',
            navPeople: '团队',
            navJoin: '加入我们',
            commercialEyebrow: '产品管线',
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
            researchLoop: '科研闭环',
            // QuantaAlpha deck
            qaTitle: 'QuantaAlpha  ·  自进化因子挖掘引擎',
            qaSubtitle: 'An Evolutionary Framework for LLM-Driven Alpha Mining  ·  行业首个 LLM × 进化算法融合框架',
            qaH1: '核心定位',
            qaP1: '把量化研究转写成<b class="text-slate-300">可审计的 Agent 工作流</b>：因子假设生成、表达式构造、代码实现、回测验证与迭代优化一体化流水线。多智能体协同完成因子发现、逻辑解释、风险过滤与因子入库。',
            qaH2: '技术亮点',
            qaP2: '通过<b class="text-slate-300">轨迹级变异/交叉</b>和定向逻辑修复，从随机试错升级为基于完整研究轨迹的可解释进化；引入复杂度、冗余度与 Rank IC 等约束，缓解因子拥挤和回测噪声。',
            qaH3: '落地价值',
            qaP3: '完整模拟人类专业量化研究员的工作流，AI 从"盲目试错生成代码"走向"<b class="text-slate-300">主动参与假设形成、失败诊断与经验复用</b>"的白盒化系统。CSI 300 上<b class="text-white">稳定优于所有基线</b>，因子跨市场迁移保持显著超额收益。<b class="text-slate-300">被腾讯新闻等媒体报道，被东方证券等多家证券及量化机构作为 AI 赋能量化投研的研究案例。</b>',
            qaStat1: '稳超基线',
            qaStat1Sub: 'CSI 300',
            qaStat2: '零样本',
            qaStat2Sub: '跨市场迁移',
            qaStat3Sub: 'Agent 工作流',
            qaMedia: '东方证券 · 腾讯新闻报道',
            qaHarness: '三层 Harness 架构',
            qaLead: '规划研究方向',
            qaReviewer: '跨方向审计 & 交叉推荐',
            qaMiner: '并行探索',
            qaWiki: '<i class="fas fa-circle-info text-sky-600 mr-1"></i> <b class="text-slate-300">Factor Wiki</b>：结构化因子知识库作为多 Agent 协作的共识介质，每个因子携带完整血统链 → 可溯源研究谱系图。',
            // EpochX deck
            epTitle: 'EpochX  ·  人机协作的生产网络',
            epH1: '核心定位',
            epP1: 'Credits-native 的人机协作市场 —— <b class="text-slate-300">人与 Agent 都是经济意义上的对等参与者</b>。首次将 Agent 任务市场、可复用技能生态、可验证交付流、执行轨迹记忆与 credits-native 激励层整合为统一生产协议。',
            epH2: '运作机制',
            epP2: '任务发布 → 递归分解 → 并行执行 → 验证结算 → 沉淀为可复用 Skill / Trace / Experience。Credits 完成赏金锁定、委托预算、验收结算和复用收益分配。',
            epH3: '差异价值',
            epP3: '从一次性 demo 升级为<b class="text-slate-300">自我增强的经济体系</b>：执行、验证、沉淀均贡献复利。核心贡献在于把 Agentic AI 从工具调用升级为具备<b class="text-slate-300">组织协调、知识复利、经济闭环</b>的"智能体文明基础设施"。',
            epMedia: '报道：科技行者 · HF Papers',
            epDemo1: '任务发布 demo',
            epDemo2: 'Agent 执行 demo',
            epLive: 'epochx.cc 已上线',
            // RepoMaster deck
            rmTitle: 'RepoMaster  ·  仓库级自主探索Code Agent框架',
            rmSubtitle: '独立研究成果：面向 10 万+ 文件级仓库的端到端理解、检索、定位与任务执行。',
            rmFeat1: '仓库理解',
            rmFeat1P: '构建层级代码树、模块依赖图与函数调用图，面向超大仓库定位关键文件、类与函数。',
            rmFeat2: '自主探索',
            rmFeat2P: '通过搜索、依赖分析与 granular code view 支持 Agent 在真实 GitHub 仓库中探索并完成复杂任务。',
            rmFeat3: '实验结果',
            rmFeat3P: '复杂任务完成率 <b class="text-slate-300">24% → 62.96%</b>（vs OpenHands），Token 开销降低 <b class="text-slate-300">95%</b>。',
            rmFeat4: '论文与开源',
            rmFeat4P: '<b class="text-slate-300">NeurIPS 2025 Spotlight</b>。MLE-Bench Kaggle 任务 <b class="text-slate-300">22.7%</b> 获得金牌，远超开源 Code Agent SOTA。',
            // Event Research deck
            erTitle: 'Event-Driven Research OS  ·  金融事件深度研究系统',
            erSubtitle: '独立研究方向：把重大市场事件从一次性资讯处理，升级为可理解、可类比、可推演、可验证、可复用的研究资产。',
            erBody: '系统以结构化 <b class="text-slate-300">Event</b> 为核心对象，而不是以新闻或研报文档为中心；通过 <b class="text-slate-300">Context / Event / Mechanism / Asset / Outcome</b> 组织事件链条，围绕机制相似性、宏观环境、市场 price-in 程度和历史反例做 Deep Research，并把输出收敛为可审计的 <b class="text-slate-300">Claim</b>，进入 T+1 / T+5 / T+20 等多窗口回测验证，从而区分检索错误、推理错误和市场已充分定价。',
            erTag1: '事件理解 → 历史类比 → 机制推理',
            erTag3: '防前视偏差验证',
            // Idea2Paper deck
            i2pTitle: 'Idea2Paper / ARK  ·  科研自动化',
            i2pBody: '端到端科研自动化产品，将文献探索、方法规划、实验执行、结果解释、论文起草和审稿迭代连接成闭环。通过 ARK (idea2paper.org) 和 PaperBuild (paperbuild.cn) 对外服务，开源参考实现已发布在 GitHub。'
        }
    };

    const navKeys = [
        ['index.html#research', 'navResearch'],
        ['publications.html', 'navPublications'],
        ['commercialization.html', 'navCommercialization'],
        ['media.html', 'navMedia'],
        ['people.html', 'navPeople'],
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
        document.querySelectorAll('[data-i18n-html]').forEach((node) => {
            const value = translations[lang][node.dataset.i18nHtml];
            if (value) node.innerHTML = value;
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
        { href: 'commercialization.html', label: 'Products' },
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
            showcaseTabs.forEach((item) => {
                const isActive = item === tab;
                item.classList.toggle('active', isActive);
                item.setAttribute('aria-selected', isActive ? 'true' : 'false');
            });
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

    document.querySelectorAll('.showcase-track:not(.showcase-track--grid)').forEach((track) => {
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
        const maxCards = track.classList.contains('showcase-track--grid') ? 3 : items.length;
        const slice = items.slice(0, maxCards);
        track.innerHTML = slice.map(renderShowcaseCard).join('');
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
                    linkLabel: 'View product'
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

