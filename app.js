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

    const carouselContainer = document.getElementById('carousel-container');
    const carouselTrack = document.getElementById('carousel-track');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const dots = document.querySelectorAll('.carousel-dot');

    if (carouselContainer && carouselTrack && prevBtn && nextBtn && dots.length) {
        let currentIndex = 0;
        const totalSlides = dots.length;

        function getSlideWidth() {
            const slides = carouselTrack.children;
            if (slides.length > 0) {
                return slides[0].offsetWidth + 24;
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
            carouselContainer.scrollTo({
                left: slideWidth * index,
                behavior: 'smooth'
            });
            currentIndex = index;
            updateDots();
        }

        prevBtn.addEventListener('click', () => {
            currentIndex = Math.max(0, currentIndex - 1);
            updateCarousel(currentIndex);
        });

        nextBtn.addEventListener('click', () => {
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
        function startAutoPlay() {
            autoPlayInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % totalSlides;
                updateCarousel(currentIndex);
            }, 5000);
        }
        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }

        startAutoPlay();
        carouselContainer.addEventListener('mouseenter', stopAutoPlay);
        carouselContainer.addEventListener('mouseleave', startAutoPlay);
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
        const alpha = 0.12 + 0.43 * t;
        const lineW = 0.40 + 0.75 * t;

        ctx.save();
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
        ctx.lineWidth = lineW;
        ctx.stroke();
        ctx.restore();
    }

    ctx.restore();
});
