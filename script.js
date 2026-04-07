// Așteptăm ca tot conținutul DOM-ului să se încarce
document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. EFECTUL DE REVEAL (Din codul tău original)
    // ==========================================
    const reveals = document.querySelectorAll(".reveal");

    const appearOptions = {
        threshold: 0.15, // Se declanșează când 15% din element este vizibil
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                // Adăugăm clasa 'active' pentru a declanșa animația CSS
                entry.target.classList.add("active");
                // Nu mai observăm elementul după ce a apărut o dată
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    reveals.forEach(reveal => {
        appearOnScroll.observe(reveal);
    });

    setTimeout(() => {
        reveals.forEach(reveal => {
            const rect = reveal.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                reveal.classList.add("active");
            }
        });
    }, 100); 

    // ==========================================
    // 2. PACHETE - Logica pentru Dropdown/Acordeon
    // ==========================================
    const packageCards = document.querySelectorAll('.pkg-card-acc');
    packageCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Nu închidem cardul dacă dăm click direct pe butonul de "Alege/Programează" din interior
            if (e.target.closest('button')) {
                return; 
            }

            // Închidem celelalte pachete
            packageCards.forEach(c => {
                if (c !== this) c.classList.remove('open');
            });
            
            // Deschidem sau Închidem pachetul pe care am dat click
            this.classList.toggle('open');
        });
    });

    // ==========================================
    // 3. BLOG - Logica pentru "Citește mai mult"
    // ==========================================
    const articleBtns = document.querySelectorAll('.article-btn');
    articleBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault(); // Previne comportamentul default
            const card = this.closest('.article-card');
            card.classList.toggle('expanded');
            
            // Schimbăm textul butonului dinamic
            if(card.classList.contains('expanded')) {
                this.innerText = "Ascunde articolul";
            } else {
                this.innerText = "Citește mai mult";
            }
        });
    });

    // ==========================================
    // 4. SPECIALITĂȚI (Expertise) - Logica pentru Expand
    // ==========================================
    const specialtyItems = document.querySelectorAll('.specialty-item');
    specialtyItems.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });

});

// ==========================================
// 5. FUNCȚII GLOBALE (Meniu Hamburger & Modale)
// ==========================================
// Aceste funcții trebuie să fie în afara DOMContentLoaded pentru a putea fi chemate de onclick="toggleModal()" din HTML.

function toggleMenu() { 
    document.getElementById('sideMenu').classList.toggle('open'); 
    document.getElementById('menuOverlay').classList.toggle('open'); 
}

function toggleModal() { 
    document.getElementById('appointmentModal').classList.toggle('active'); 
}

function toggleLoginModal() { 
    document.getElementById('loginModal').classList.toggle('active'); 
}