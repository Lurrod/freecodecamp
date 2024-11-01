document.addEventListener("DOMContentLoaded", () => {
    // Fonction pour activer l'animation des barres de compétence
    function activateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-level');
        skillBars.forEach(skillBar => {
            skillBar.classList.add('visible');
        });
    }
    
    // Fonction pour désactiver l'animation des barres de compétence
    function deactivateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-level');
        skillBars.forEach(skillBar => {
            skillBar.classList.remove('visible');
        });
    }

    // Configuration de l'observateur pour l'animation de la section compétences
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Ajouter un délai de 0.5 second pour démarrage de l'animation
                setTimeout(() => activateSkillBars(), 500);
            }
        });
    }, { threshold: 0.5 });

    // Observer la section compétences
    const competencesSection = document.getElementById('competences');
    if (competencesSection) {
        observer.observe(competencesSection);
    }
    
    // Ajouter un écouteur d'événement au lien "Compétences"
    const competencesLink = document.querySelector('a[href="#competences"]');
    competencesLink.addEventListener('click', (event) => {
        // Retirer les classes visibles pour réinitialiser l'animation
        deactivateSkillBars();
        setTimeout(() => activateSkillBars(), 1000);
    });
});

document.querySelectorAll('.project-card').forEach(card => {
    let timeout;

    card.addEventListener('mouseenter', () => {
        timeout = setTimeout(() => {
            card.classList.add('hovered');
            const imageUrl = card.getAttribute('data-image'); // Récupère l'URL de l'image
            card.style.backgroundImage = `url('astra.webp')`;
        }, 1000);
    });

    card.addEventListener('mouseleave', () => {
        clearTimeout(timeout);
        card.classList.remove('hovered');
        card.style.backgroundImage = ''; 
    });
});

document.getElementById('toggleTheme').addEventListener('click', () => {
    document.body.classList.toggle('light-theme');

    const themeButton = document.getElementById('toggleTheme');
    if (document.body.classList.contains('light-theme')) {
        themeButton.innerHTML = '<i class="fas fa-sun"></i>'; // Icône pour le mode clair
    } else {
        themeButton.innerHTML = '<i class="fas fa-moon"></i>'; // Icône pour le mode sombre
    }
});

const container = document.querySelector('.container')
for (var i=0; i <= 100; i++){
    const blocks = document.createElement('div');
    blocks.classList.add('block');
    container.appendChild(blocks);
}

function animateBlocks(){
    anime({
        targets: '.block',
        translateX: function(){
            return anime.random(-700,700);
        }, 
        targets: '.block',
        translateY: function(){
            return anime.random(-500,500);
        },
        targets: '.block',
        scale: function(){
            return anime.random(1,5);
        },

        easing: 'easeOutSine',
        duration: 3000,
        delay: anime.stagger(10),
        complete: animateBlocks,

    })
}

animateBlocks()

document.addEventListener("keydown", function(event) {
    const sections = document.querySelectorAll(".section"); // Récupère toutes les sections
    let currentSectionIndex = Array.from(sections).findIndex(section =>
        section.getBoundingClientRect().top >= 0 && section.getBoundingClientRect().top < window.innerHeight
    );

    if (event.key === "ArrowDown") {
        event.preventDefault(); // Empêche le comportement par défaut de défilement
        // Passe à la section suivante si elle existe
        if (currentSectionIndex < sections.length - 1) {
            sections[currentSectionIndex + 1].scrollIntoView({ behavior: "smooth" });
        }
    } else if (event.key === "ArrowUp") {
        event.preventDefault(); // Empêche le comportement par défaut de défilement
        // Retourne à la section précédente si elle existe
        if (currentSectionIndex > 0) {
            sections[currentSectionIndex - 1].scrollIntoView({ behavior: "smooth" });
        }
    }
});

