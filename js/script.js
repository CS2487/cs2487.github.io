// Portfolio Separated - Combined Main JavaScript (script + translations)

/* ===========================
   Mobile Navigation
=========================== */
function toggleMobileMenu() {
    const navLinks = document.getElementById('nav-links');
    const menuBtn = document.getElementById('menu-btn');

    if (navLinks && menuBtn) {
        navLinks.classList.toggle('show');
        menuBtn.classList.toggle('active');
    }
}

// Close mobile menu when clicking a link
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    const mobileMenuBtn = document.getElementById('menu-btn');
    const navLinksContainer = document.getElementById('nav-links');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenuBtn && navLinksContainer) {
                mobileMenuBtn.classList.remove('active');
                navLinksContainer.classList.remove('show');
            }
        });
    });
});

/* ===========================
   Active navigation links
=========================== */
function setActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    const navbarHeight = 80; // Approximate navbar height

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - navbarHeight;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Update active link on hash change
window.addEventListener('hashchange', setActiveNavLink);

/* ===========================
   Navbar scroll effect
=========================== */
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
}

/* ===========================
   Back to top button
=========================== */
function handleBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }
}

/* ===========================
   Theme Toggle
=========================== */
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');

    if (!themeToggle) return;

    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.body.classList.toggle('dark-mode', currentTheme === 'dark');
    } else {
        document.body.classList.toggle('dark-mode', prefersDarkScheme.matches);
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    });
}

/* ===========================
   Contact Form
=========================== */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');

    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        if (!name || !email || !subject || !message) {
            showFormMessage('Please fill in all fields.', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }

        showFormMessage(`Thank you, ${name}! Your message has been sent successfully. I'll get back to you soon.`, 'success');
        contactForm.reset();
    });
}

function showFormMessage(message, type) {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    const existingMessage = contactForm.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.innerHTML = `
        <i class='bx ${type === 'success' ? 'bx-check-circle' : 'bx-error-circle'}'></i>
        <p>${message}</p>
    `;

    contactForm.insertBefore(messageDiv, contactForm.firstChild);

    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

/* ===========================
   Smooth Scrolling
=========================== */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
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

/* ===========================
   Skills Bars Animation
=========================== */
function initSkillBarsAnimation() {
    const skillsSection = document.querySelector('.skills');
    const skillBars = document.querySelectorAll('.progress-bar');

    if (!skillsSection || skillBars.length === 0) return;

    let animated = false;

    const animateSkillBars = () => {
        if (animated) return;

        const sectionPosition = skillsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (sectionPosition < screenPosition) {
            skillBars.forEach((bar, index) => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100 + (index * 100));
            });

            animated = true;
            window.removeEventListener('scroll', animateSkillBars);
        }
    };

    window.addEventListener('scroll', animateSkillBars);
    setTimeout(animateSkillBars, 100);
}

/* ===========================
   Scroll Reveal
=========================== */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');

    if (revealElements.length === 0) return;

    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('revealed');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
}

/* ===========================
   Language dropdown
=========================== */
function toggleLangMenu() {
    const langMenu = document.getElementById("lang-menu");
    if (langMenu) {
        langMenu.classList.toggle("show");
    }
}

document.addEventListener("click", function (e) {
    const btn = document.getElementById("lang-btn");
    const menu = document.getElementById("lang-menu");
    if (btn && menu && !btn.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove("show");
    }
});

/* ===========================
   Utility
=========================== */
function elementExists(selector) {
    return document.querySelector(selector) !== null;
}

/* ===========================
   Inject CSS for form messages
=========================== */
const formMessageStyles = `
.form-message {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-sm);
    border-radius: var(--radius-sm);
    margin-bottom: var(--space-md);
    animation: fadeInUp 0.3s ease;
}
.form-message-success {
    background: rgba(75, 181, 67, 0.1);
    color: var(--success-color);
    border: 1px solid rgba(75, 181, 67, 0.2);
}
.form-message-error {
    background: rgba(220, 53, 69, 0.1);
    color: #dc3545;
    border: 1px solid rgba(220, 53, 69, 0.2);
}
.form-message i {
    font-size: 1.2rem;
}
.form-message p {
    margin: 0;
    font-weight: 500;
}
`;
const styleSheet = document.createElement('style');
styleSheet.textContent = formMessageStyles;
document.head.appendChild(styleSheet);

/* ===========================
   Translations (en + ar)
=========================== */
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
            "description": "I'm a Computer Science graduate with a passion for creating innovative and effective applications. I've studied a wide range of programming languages and gained hands-on experience through university projects and internships.",
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

/* ===========================
   Translations Engine
=========================== */
let currentLanguage = 'en';

function initTranslations() {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && translations[savedLanguage]) {
        currentLanguage = savedLanguage;
    }
    applyTranslations();
    updateDocumentDirection();
}

function applyTranslations() {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = getTranslation(key);
        if (translation) {
            element.textContent = translation;
        }
    });

    const placeholderElements = document.querySelectorAll('[data-translate-placeholder]');
    placeholderElements.forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        const translation = getTranslation(key);
        if (translation) {
            element.setAttribute('placeholder', translation);
        }
    });
}

function getTranslation(key) {
    const keys = key.split('.');
    let translation = translations[currentLanguage];
    for (const k of keys) {
        if (translation && Object.prototype.hasOwnProperty.call(translation, k)) {
            translation = translation[k];
        } else {
            return null;
        }
    }
    return translation;
}

function switchLanguage(language) {
    if (translations[language]) {
        currentLanguage = language;
        localStorage.setItem('language', language);
        applyTranslations();
        updateDocumentDirection();
        const langMenu = document.getElementById('lang-menu');
        if (langMenu) {
            langMenu.classList.remove('show');
        }
    }
}

function updateDocumentDirection() {
    const html = document.documentElement;
    if (currentLanguage === 'ar') {
        html.setAttribute('dir', 'rtl');
        html.setAttribute('lang', 'ar');
    } else {
        html.setAttribute('dir', 'ltr');
        html.setAttribute('lang', 'en');
    }
}

// Expose globally
window.switchLanguage = switchLanguage;
window.getTranslation = getTranslation;

/* ===========================
   Init on DOMContentLoaded
=========================== */
document.addEventListener('DOMContentLoaded', () => {
    initTranslations();
    setActiveNavLink();
    initThemeToggle();
    initContactForm();
    // Throttling function to limit strict frequency
    function throttle(func, limit) {
        let inThrottle;
        return function () {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    const throttledScrollHandler = throttle(() => {
        handleNavbarScroll();
        handleBackToTop();
        setActiveNavLink();
    }, 100);

    window.addEventListener('scroll', throttledScrollHandler);

    handleNavbarScroll();
    handleBackToTop();
});
/* ===========================
   Lightbox Gallery
=========================== */
let currentImageIndex = 0;
let currentGallery = [];

function openGallery(element) {
    const galleryData = element.getAttribute("data-gallery");
    if (!galleryData) return;

    try {
        currentGallery = JSON.parse(galleryData);
        if (currentGallery.length > 0) {
            currentImageIndex = 0;
            showLightbox(currentImageIndex);
            document.getElementById("lightbox").style.display = "block";
            document.body.style.overflow = "hidden"; // Prevent scrolling
        }
    } catch (e) {
        console.error("Invalid gallery data", e);
    }
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
    document.body.style.overflow = "auto";
}

function changeImage(n) {
    currentImageIndex += n;
    if (currentImageIndex >= currentGallery.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = currentGallery.length - 1;
    }
    showLightbox(currentImageIndex);
}

function showLightbox(n) {
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCounter = document.getElementById("lightbox-counter");

    // Smooth transition
    lightboxImg.style.opacity = 0;
    setTimeout(() => {
        lightboxImg.src = currentGallery[n];
        lightboxImg.style.opacity = 1;
    }, 200);

    lightboxCounter.innerHTML = `${n + 1} / ${currentGallery.length}`;
}

// Event Listeners for Lightbox
document.addEventListener("keydown", function (event) {
    if (document.getElementById("lightbox").style.display === "block") {
        if (event.key === "Escape") {
            closeLightbox();
        } else if (event.key === "ArrowLeft") {
            changeImage(-1);
        } else if (event.key === "ArrowRight") {
            changeImage(1);
        }
    }
});

document.addEventListener("click", function (event) {
    const lightbox = document.getElementById("lightbox");
    if (event.target === lightbox) {
        closeLightbox();
    }
});

// Touch support (Swipe)
let touchStartX = 0;
let touchEndX = 0;

document.getElementById("lightbox")?.addEventListener("touchstart", function (event) {
    touchStartX = event.changedTouches[0].screenX;
}, false);

document.getElementById("lightbox")?.addEventListener("touchend", function (event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        changeImage(1); // Swipe Left -> Next
    }
    if (touchEndX > touchStartX + 50) {
        changeImage(-1); // Swipe Right -> Prev
    }
}
