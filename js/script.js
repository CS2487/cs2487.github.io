// Portfolio Separated - Combined Main JavaScript (script + translations)

/**
 * Clean, structured portfolio engine refactored using clean architectural guidelines.
 * Features modular composition, professional error handling, DOM safe-guards,
 * and high-performance event throttling.
 */

/* ==========================================================================
   State Management & Translation Lexicon
   ========================================================================== */

const PortfolioState = {
    currentLanguage: 'en',
    currentImageIndex: 0,
    currentGallery: [],
    skillsAnimated: false,
    touchStartX: 0,
    touchEndX: 0
};

const translations = {
    en: {
        "nav": {
            "home": "Home",
            "about": "About",
            "skills": "Skills",
            "projects": "Projects",
            "contact": "Contact",
            "web": "Web Development",
            "mobile": "Mobile Development",
            "database": "Database Solutions",
            "consulting": "Software Consulting"
        },
        "personal": {
            "name": "Farea AL-Dhela'a"
        },
        "hero": {
            "subtitle": "Full-Stack Developer",
            "description": "Computer Science graduate passionate about building modern, scalable applications with intuitive user experiences.",
            "download": "Download CV",
            "contact": "Contact Me"
        },
        "about": {
            "title": "About Me",
            "subtitle": "Get to know me better",
            "who": "Who I Am",
            "description": "Full-Stack Developer with 2+ years of hands-on experience building Flutter mobile applications and Laravel backend systems through independent projects. Experienced in RESTful APIs, Firebase, MySQL/SQLite, authentication, and scalable software architecture. Strong knowledge of Clean Architecture, SOLID, OOP, and modern development practices.",
            "email": "Email",
            "phone": "Phone",
            "location": "Location"
        },
        "skills": {
            "title": "My Skills",
            "subtitle": "Technologies I work with",
            "backend": "Backend",
            "frontend": "Frontend",
            "programming": "Programming Languages",
            "viewAll": "View All Projects"
        },
        "projects": {
            "title": "My Projects",
            "subtitle": "Some of my recent work"
        },
        "timeline": {
            "education": "Education",
            "experience": "Experience",
            "degree": "Bachelor of Computer Science",
            "degreeDesc": "Graduated with focus on software development and system architecture. Completed coursework in algorithms, databases, and software engineering.",
            "freelance": "Freelance Developer",
            "selfEmployed": "Self-Employed",
            "freelanceDesc": "Developing custom software solutions for clients, including web applications, mobile apps, and database systems."
        },
        "contact": {
            "title": "Get In Touch",
            "subtitle": "Let's work together",
            "infoTitle": "Contact Information",
            "infoText": "Feel free to reach out to me for any questions or opportunities. I'm available for freelance projects and full-time positions.",
            "email": "Email",
            "phone": "Phone/WhatsApp",
            "location": "Location",
            "languages": "Languages",
            "namePlaceholder": "Your Name",
            "emailPlaceholder": "Your Email",
            "subjectPlaceholder": "Subject",
            "messagePlaceholder": "Your Message",
            "send": "Send Message"
        },
        "footer": {
            "tagline": "Creating digital experiences that matter.",
            "links": "Quick Links",
            "services": "Services",
            "rights": "All rights reserved."
        }
    },
    ar: {
        "nav": {
            "home": "الرئيسية",
            "about": "نبذة عني",
            "skills": "المهارات",
            "projects": "المشاريع",
            "contact": "التواصل",
            "web": "تطوير الويب",
            "mobile": "تطوير التطبيقات",
            "database": "حلول قواعد البيانات",
            "consulting": "الاستشارات البرمجية"
        },
        "personal": {
            "name": "فارع الضلاع"
        },
        "hero": {
            "subtitle": "مطور متكامل",
            "description": "خريج علوم حاسوب شغوف ببناء تطبيقات حديثة وقابلة للتوسع مع تجارب مستخدم بديهية.",
            "download": "تحميل السيرة الذاتية",
            "contact": "تواصل معي"
        },
        "about": {
            "title": "نبذة عني",
            "subtitle": "تعرف علي أكثر",
            "who": "من أنا",
            "description": "أنا خريج علوم حاسوب لدي شغف لإنشاء تطبيقات مبتكرة وفعالة. درست مجموعة واسعة من لغات البرمجة واكتسبت خبرة عملية من خلال مشاريع الجامعة والتدريب.",
            "email": "البريد الإلكتروني",
            "phone": "الهاتف",
            "location": "الموقع"
        },
        "skills": {
            "title": "مهاراتي",
            "subtitle": "التقنيات التي أعمل بها",
            "backend": "الخلفية",
            "frontend": "الواجهة الأمامية",
            "programming": "لغات البرمجة",
            "viewAll": "عرض جميع المشاريع"
        },
        "projects": {
            "title": "مشاريعي",
            "subtitle": "بعض من أعمالي الحديثة"
        },
        "timeline": {
            "education": "التعليم",
            "experience": "الخبرة",
            "degree": "بكالوريوس علوم الحاسوب",
            "degreeDesc": "تخرجت مع التركيز على تطوير البرمجيات وهندسة الأنظمة. أكملت دورات في الخوارزميات وقواعد البيانات وهندسة البرمجيات.",
            "freelance": "مطور مستقل",
            "selfEmployed": "عمل حر",
            "freelanceDesc": "تطوير حلول برمجية مخصصة للعملاء، بما في ذلك تطبيقات الويب والتطبيقات المحمولة وأنظمة قواعد البيانات."
        },
        "contact": {
            "title": "تواصل معي",
            "subtitle": "لنعمل معاً",
            "infoTitle": "معلومات التواصل",
            "infoText": "لا تتردد في التواصل معي لأي أسئلة أو فرص. أنا متاح للمشاريع المستقلة والوظائف بدوام كامل.",
            "email": "البريد الإلكتروني",
            "phone": "الهاتف/واتساب",
            "location": "الموقع",
            "languages": "اللغات",
            "namePlaceholder": "اسمك",
            "emailPlaceholder": "بريدك الإلكتروني",
            "subjectPlaceholder": "الموضوع",
            "messagePlaceholder": "رسالتك",
            "send": "إرسال الرسالة"
        },
        "footer": {
            "tagline": "إنشاء تجارب رقمية مهمة.",
            "links": "روابط سريعة",
            "services": "الخدمات",
            "rights": "جميع الحقوق محفوظة."
        }
    }
};

/* ==========================================================================
   Navigation & Interface Managers
   ========================================================================== */

function toggleMobileMenu() {
    const navLinks = document.getElementById('nav-links');
    const menuBtn = document.getElementById('menu-btn');

    if (navLinks && menuBtn) {
        navLinks.classList.toggle('show');
        menuBtn.classList.toggle('active');
    }
}

function setActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    const NAVBAR_HEIGHT = 80;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - NAVBAR_HEIGHT;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }
}

function handleBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        backToTop.classList.toggle('show', window.scrollY > 300);
    }
}

function toggleLangMenu() {
    const langMenu = document.getElementById("lang-menu");
    if (langMenu) {
        langMenu.classList.toggle("show");
    }
}

/* ==========================================================================
   Theme Engine
   ========================================================================== */

function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const cachedTheme = localStorage.getItem('theme');

    const isDark = cachedTheme ? cachedTheme === 'dark' : prefersDarkScheme.matches;
    document.body.classList.toggle('dark-mode', isDark);

    themeToggle.addEventListener('click', () => {
        const isCurrentlyDark = document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isCurrentlyDark ? 'dark' : 'light');
    });
}

/* ==========================================================================
   Form Handling & Validation
   ========================================================================== */

function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        try {
            const formData = new FormData(contactForm);
            const name = formData.get('name')?.toString().trim();
            const email = formData.get('email')?.toString().trim();
            const subject = formData.get('subject')?.toString().trim();
            const message = formData.get('message')?.toString().trim();

            if (!name || !email || !subject || !message) {
                showFormMessage('Please fill in all fields.', 'error');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }

            showFormMessage(`Thank you, ${name}! Your message has been sent successfully.`, 'success');
            contactForm.reset();
        } catch (error) {
            console.error('Submission tracking failed: ', error);
            showFormMessage('An unexpected error occurred. Please try again later.', 'error');
        }
    });
}

function showFormMessage(message, type) {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    const existingMessage = contactForm.querySelector('.form-message');
    if (existingMessage) existingMessage.remove();

    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.innerHTML = `
        <i class='bx ${type === 'success' ? 'bx-check-circle' : 'bx-error-circle'}'></i>
        <p></p>
    `;
    messageDiv.querySelector('p').textContent = message;

    contactForm.insertBefore(messageDiv, contactForm.firstChild);
    setTimeout(() => messageDiv.remove(), 5000);
}

/* ==========================================================================
   Dynamic UX Animations
   ========================================================================== */

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initSkillBarsAnimation() {
    const skillsSection = document.querySelector('.skills');
    const skillBars = document.querySelectorAll('.progress-bar');

    if (!skillsSection || skillBars.length === 0) return;

    const animateSkillBars = () => {
        if (PortfolioState.skillsAnimated) return;

        const sectionPosition = skillsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (sectionPosition < screenPosition) {
            skillBars.forEach((bar, index) => {
                const calculatedWidth = bar.style.width || bar.getAttribute('data-width') || '0%';
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = calculatedWidth;
                }, 100 + (index * 100));
            });

            PortfolioState.skillsAnimated = true;
            window.removeEventListener('scroll', animateSkillBars);
        }
    };

    window.addEventListener('scroll', animateSkillBars);
    setTimeout(animateSkillBars, 100);
}

function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    if (revealElements.length === 0) return;

    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const VISIBLE_THRESHOLD = 150;

            if (elementTop < window.innerHeight - VISIBLE_THRESHOLD) {
                element.classList.add('revealed');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
}

/* ==========================================================================
   Localization & Translation Engine
   ========================================================================== */

function initTranslations() {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && translations[savedLanguage]) {
        PortfolioState.currentLanguage = savedLanguage;
    }
    applyTranslations();
    updateDocumentDirection();
}

function applyTranslations() {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        const text = getTranslation(key);
        if (text !== null) element.textContent = text;
    });

    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        const text = getTranslation(key);
        if (text !== null) element.setAttribute('placeholder', text);
    });
}

function getTranslation(key) {
    try {
        return key.split('.').reduce((obj, i) => (obj ? obj[i] : null), translations[PortfolioState.currentLanguage]) || null;
    } catch (e) {
        return null;
    }
}

function switchLanguage(language) {
    if (translations[language]) {
        PortfolioState.currentLanguage = language;
        localStorage.setItem('language', language);
        applyTranslations();
        updateDocumentDirection();
        
        const langMenu = document.getElementById('lang-menu');
        if (langMenu) langMenu.classList.remove('show');
    }
}

function updateDocumentDirection() {
    const isRtl = PortfolioState.currentLanguage === 'ar';
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', PortfolioState.currentLanguage);
}

// Global API Exposure
window.switchLanguage = switchLanguage;
window.getTranslation = getTranslation;
window.toggleMobileMenu = toggleMobileMenu;
window.toggleLangMenu = toggleLangMenu;

/* ==========================================================================
   Lightbox Gallery Engine
   ========================================================================== */

function openGallery(element) {
    if (!element) return;
    const galleryData = element.getAttribute("data-gallery");
    if (!galleryData) return;

    try {
        PortfolioState.currentGallery = JSON.parse(galleryData);
        if (Array.isArray(PortfolioState.currentGallery) && PortfolioState.currentGallery.length > 0) {
            PortfolioState.currentImageIndex = 0;
            showLightbox(PortfolioState.currentImageIndex);
            
            const lightbox = document.getElementById("lightbox");
            if (lightbox) lightbox.style.display = "block";
            document.body.style.overflow = "hidden";
        }
    } catch (e) {
        console.error("Invalid structural gallery dataset payload", e);
    }
}

function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    if (lightbox) lightbox.style.display = "none";
    document.body.style.overflow = "auto";
}

function changeImage(step) {
    const galleryLength = PortfolioState.currentGallery.length;
    if (galleryLength === 0) return;

    PortfolioState.currentImageIndex = (PortfolioState.currentImageIndex + step + galleryLength) % galleryLength;
    showLightbox(PortfolioState.currentImageIndex);
}

function showLightbox(index) {
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCounter = document.getElementById("lightbox-counter");

    if (!lightboxImg || !PortfolioState.currentGallery[index]) return;

    lightboxImg.style.opacity = '0';
    setTimeout(() => {
        lightboxImg.src = PortfolioState.currentGallery[index];
        lightboxImg.style.opacity = '1';
    }, 200);

    if (lightboxCounter) {
        lightboxCounter.textContent = `${index + 1} / ${PortfolioState.currentGallery.length}`;
    }
}

// Expose openGallery globally for HTML execution context accessors
window.openGallery = openGallery;
window.closeLightbox = closeLightbox;
window.changeImage = changeImage;

/* ==========================================================================
   Event Management Core Pipeline (Initialization & DomReady Setup)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Structural Global Injections
    const formMessageStyles = `
        .form-message { display: flex; align-items: center; gap: var(--space-sm, 10px); padding: var(--space-sm, 10px); border-radius: var(--radius-sm, 4px); margin-bottom: var(--space-md, 15px); animation: fadeInUp 0.3s ease; }
        .form-message-success { background: rgba(75, 181, 67, 0.1); color: var(--success-color, #4bb543); border: 1px solid rgba(75, 181, 67, 0.2); }
        .form-message-error { background: rgba(220, 53, 69, 0.1); color: #dc3545; border: 1px solid rgba(220, 53, 69, 0.2); }
        .form-message i { font-size: 1.2rem; }
        .form-message p { margin: 0; font-weight: 500; }
    `;
    const styleSheet = document.createElement('style');
    styleSheet.textContent = formMessageStyles;
    document.head.appendChild(styleSheet);

    // Module Initializations
    initTranslations();
    setActiveNavLink();
    initThemeToggle();
    initContactForm();
    initSmoothScrolling();
    initSkillBarsAnimation();
    initScrollReveal();

    // High Performance Scroll Throttling Interface Pipeline
    function throttle(func, limit) {
        let inThrottle;
        return function (...args) {
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    const throttledScrollHandler = throttle(() => {
        handleNavbarScroll();
        handleBackToTop();
        setActiveNavLink();
    }, 100);

    window.addEventListener('scroll', throttledScrollHandler);
    
    // Initial triggers for accurate viewport evaluations
    handleNavbarScroll();
    handleBackToTop();

    // Context Cleanups for Mobile Navigation
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            const mobileMenuBtn = document.getElementById('menu-btn');
            const navLinksContainer = document.getElementById('nav-links');
            if (mobileMenuBtn && navLinksContainer) {
                mobileMenuBtn.classList.remove('active');
                navLinksContainer.classList.remove('show');
            }
        });
    });

    // Language Dropdown Dynamic Click-Away Closer
    document.addEventListener("click", (e) => {
        const btn = document.getElementById("lang-btn");
        const menu = document.getElementById("lang-menu");
        if (btn && menu && !btn.contains(e.target) && !menu.contains(e.target)) {
            menu.classList.remove("show");
        }
    });

    // Lightbox Hotkeys Event Listeners
    document.addEventListener("keydown", (event) => {
        const lightbox = document.getElementById("lightbox");
        if (lightbox && lightbox.style.display === "block") {
            if (event.key === "Escape") closeLightbox();
            else if (event.key === "ArrowLeft") changeImage(-1);
            else if (event.key === "ArrowRight") changeImage(1);
        }
    });

    // Lightbox Dim Screen Tap/Click Out Bounds System Listener
    const lightboxEl = document.getElementById("lightbox");
    if (lightboxEl) {
        lightboxEl.addEventListener("click", (event) => {
            if (event.target === lightboxEl) closeLightbox();
        });

        // Touch Swipe Architecture Engine Setup
        lightboxEl.addEventListener("touchstart", (event) => {
            PortfolioState.touchStartX = event.changedTouches[0].screenX;
        }, { passive: true });

        lightboxEl.addEventListener("touchend", (event) => {
            PortfolioState.touchEndX = event.changedTouches[0].screenX;
            const delta = PortfolioState.touchEndX - PortfolioState.touchStartX;
            if (Math.abs(delta) > 50) {
                changeImage(delta > 0 ? -1 : 1);
            }
        }, { passive: true });
    }
});