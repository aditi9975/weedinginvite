/*====== MENU =====*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle', 'nav-menu')

/*====== RELLAX =====*/
if (window.Rellax) new Rellax('.parallax');

/*====== ANIMATE GSAP ======*/
gsap.from('.nav__logo', { opacity: 0, duration: 3, delay: .5, y: 30, ease: 'expo.out' });
gsap.from('.nav__toggle', { opacity: 0, duration: 3, delay: .7, y: 30, ease: 'expo.out' });
gsap.from('.nav__item', { opacity: 0, duration: 3, delay: .7, y: 35, ease: 'expo.out', stagger: .2 });

gsap.from('.home__title', { opacity: 0, duration: 3, delay: 1.3, y: 35, ease: 'expo.out' });
gsap.from('.home__subtitle', { opacity: 0, duration: 3, delay: 1.1, y: 35, ease: 'expo.out' });
gsap.from('.home__scroll', { opacity: 0, duration: 3, delay: 1.5, y: 25, ease: 'expo.out' });

/*====== SCROLL REVEAL SECTION ======*/
const sr = ScrollReveal({
    duration: 2500,
    reset: true
});

sr.reveal('.section__data', { origin: 'left', distance: '70px' });
sr.reveal('.section__img', { origin: 'left', distance: '90px', delay: 200 });

/*====== ROSE PETAL SHOWER ======*/
function createPetal() {
    const petal = document.createElement("div");
    petal.classList.add("petal");

    petal.style.left = Math.random() * window.innerWidth + "px";

    const duration = 5 + Math.random() * 5;
    petal.style.animationDuration = duration + "s";

    document.querySelector(".petal-container").appendChild(petal);

    const stopHeight = 0.2 * window.innerHeight + Math.random() * window.innerHeight * 0.6;

    setTimeout(() => {
        petal.style.animation = "none";
        petal.style.top = stopHeight + "px";
        petal.style.transform = "rotate(" + Math.random() * 360 + "deg)";
    }, duration * 1000);

    setTimeout(() => {
        petal.remove();
    }, 12000);
}

window.addEventListener("load", () => {
    // Fewer petals on small screens for performance
    const petalCount = window.innerWidth < 480 ? 8 : window.innerWidth < 768 ? 12 : 20;
    for (let i = 0; i < petalCount; i++) {
        setTimeout(createPetal, i * 300);
    }
});

/*====== HANDLE RESIZE ======*/
// Recalculate petal positions on resize
window.addEventListener('resize', () => {
    document.querySelectorAll('.petal').forEach(p => p.remove());
});

const section6 = document.querySelector(".section6");

window.addEventListener("scroll", () => {
    const trigger = section6.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (trigger < windowHeight - 100) {
        section6.classList.add("active");
    }
});

/* ===== ADDITIONAL JS FROM SECOND FILE ===== */
/* ===== ADDITIONAL JS FROM SECOND FILE ===== */
document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('bgMusic');
    const btn = document.getElementById('music-player');
    const disc = document.getElementById('musicDisc');
    const wave = document.getElementById('musicWave');

    if (!audio || !btn) {
        console.log('Missing audio/button');
        return;
    }

    audio.loop = true;
    audio.volume = 0.3;

    audio.muted = true;

    // try autoplay
    audio.play().catch(() => { });

    // unmute on first interaction
    window.addEventListener("click", () => {
        audio.muted = false;
    }, { once: true });

    const setUI = (playing) => {
        if (disc) disc.classList.toggle('spinning', playing);
        if (wave) wave.classList.toggle('paused', !playing);
    };

    // Create a floating message
  





    // Button click toggles
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (audio.paused) {
            audio.play()
                .then(() => {
                    setUI(true);
                    playPrompt.remove();
                })
                .catch(e => console.log('Play error:', e));
        } else {
            audio.pause();
            setUI(false);
        }
    });

    // Keep UI synced
    audio.addEventListener('play', () => setUI(true));
    audio.addEventListener('pause', () => setUI(false));
});
// Intersection Observer for Reveal Animations
const ciObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('ci-in');
    });
}, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

// Observe all elements with ci-rv class
document.querySelectorAll('.ci-rv').forEach(el => ciObserver.observe(el));

// Photo Carousel Functionality
document.addEventListener('DOMContentLoaded', function () {
    const ciTrack = document.getElementById('ciTrack');
    const ciPhotoDotsEl = document.getElementById('ciPhotoDots');

    if (ciTrack && ciPhotoDotsEl) {
        const ciSlides = ciTrack.querySelectorAll('.ci-slide');
        const N = ciSlides.length;
        let ciPhotoIdx = 0;

        // Create dots
        for (let i = 0; i < N; i++) {
            const d = document.createElement('div');
            d.className = 'ci-pdot' + (i === 0 ? ' on' : '');
            d.onclick = () => goCiPhoto(i);
            ciPhotoDotsEl.appendChild(d);
        }

        const ciPDots = ciPhotoDotsEl.querySelectorAll('.ci-pdot');

        function goCiPhoto(idx) {
            ciPhotoIdx = (idx + N) % N;
            ciTrack.style.transform = `translateX(-${ciPhotoIdx * 100}%)`;
            ciPDots.forEach((d, i) => d.classList.toggle('on', i === ciPhotoIdx));
        }

        // Make functions globally available
        window.goCiPhoto = goCiPhoto;
        window.ciSlide = function (dir) {
            goCiPhoto(ciPhotoIdx + dir);
        };

        // Auto slide
        setInterval(() => window.ciSlide(1), 4000);

        // Touch events
        let ciTouchX = 0;
        ciTrack.parentElement.addEventListener('touchstart', e => {
            ciTouchX = e.touches[0].clientX;
        }, { passive: true });

        ciTrack.parentElement.addEventListener('touchend', e => {
            const d = ciTouchX - e.changedTouches[0].clientX;
            if (Math.abs(d) > 40) window.ciSlide(d > 0 ? 1 : -1);
        }, { passive: true });
    }
});

// Map Function
function openMap() {
    window.open('https://maps.google.com/?q=Vicky+Garden+Mangal+Karyalay+Loha+Nanded', '_blank');
}
window.openMap = openMap;

// Countdown Timer (if elements exist)
const wedding = new Date('2026-03-16T12:45:00+05:30');

function pad(n) {
    return String(n).padStart(2, '0');
}

function tick() {
    const diff = wedding - new Date();

    // Check if countdown elements exist
    const dEl = document.getElementById('ciD');
    const hEl = document.getElementById('ciH');
    const mEl = document.getElementById('ciM');
    const sEl = document.getElementById('ciS');

    if (dEl && hEl && mEl && sEl) {
        if (diff <= 0) {
            ['ciD', 'ciH', 'ciM', 'ciS'].forEach(id =>
                document.getElementById(id).textContent = '00'
            );
            return;
        }

        dEl.textContent = pad(Math.floor(diff / 86400000));
        hEl.textContent = pad(Math.floor((diff % 86400000) / 3600000));
        mEl.textContent = pad(Math.floor((diff % 3600000) / 60000));
        sEl.textContent = pad(Math.floor((diff % 60000) / 1000));
    }
}

// Start countdown if elements exist
if (document.getElementById('ciD')) {
    tick();
    setInterval(tick, 1000);
}

// Enhance existing petal function with better performance
const originalCreatePetal = window.createPetal || function () { };
window.createPetal = function () {
    const petal = document.createElement("div");
    petal.classList.add("petal");
    petal.style.left = Math.random() * window.innerWidth + "px";
    const duration = 5 + Math.random() * 5;
    petal.style.animationDuration = duration + "s";

    const container = document.querySelector(".petal-container");
    if (container) {
        container.appendChild(petal);

        const stopHeight = 0.2 * window.innerHeight + Math.random() * window.innerHeight * 0.6;

        setTimeout(() => {
            petal.style.animation = "none";
            petal.style.top = stopHeight + "px";
            petal.style.transform = "rotate(" + Math.random() * 360 + "deg)";
        }, duration * 1000);

        setTimeout(() => petal.remove(), 12000);
    }
};

// Enhance existing petal initialization
window.addEventListener("load", () => {
    // Clear existing petals first
    document.querySelectorAll('.petal').forEach(p => p.remove());

    // Create new petals with optimized count
    const petalCount = window.innerWidth < 480 ? 8 : window.innerWidth < 768 ? 12 : 20;
    for (let i = 0; i < petalCount; i++) {
        setTimeout(window.createPetal, i * 300);
    }
});

function updateParallax() {
    const scrollY = window.scrollY;
    const winH = window.innerHeight;

    // only in hero zone
    if (scrollY > winH) return;

    // ✅ move together but LIMIT so it never reaches elephant row
    const move = Math.min(scrollY * 0.12, 32); // max 32px (adjust 20–40)

    const img2 = document.querySelector('.home__parallax-img2');
    const img3 = document.querySelector('.home__parallax-img3');

    if (img2) img2.style.setProperty('--pMove', move + 'px');
    if (img3) img3.style.setProperty('--pMove', move + 'px');
}

window.addEventListener('scroll', updateParallax, { passive: true });
updateParallax();


window.addEventListener('load', () => {
    if (typeof gsap === 'undefined') return;

    gsap.from('.hero-top', {
        opacity: 0, y: -25, filter: 'blur(10px)',
        duration: 1.4, ease: 'expo.out', delay: 0.2
    });

    gsap.from('.hero-mid', {
        opacity: 0, y: -20, filter: 'blur(10px)',
        duration: 1.2, ease: 'expo.out', delay: 0.5
    });

    gsap.from('.hero-bottom', {
        opacity: 0, y: -25, filter: 'blur(10px)',
        duration: 1.4, ease: 'expo.out', delay: 0.75
    });

    gsap.from('.hero-sub', {
        opacity: 0, y: -14, filter: 'blur(8px)',
        duration: 1.1, ease: 'expo.out', delay: 1.05
    });
});