document.addEventListener('DOMContentLoaded', function() {
    // First, set the viewport height variable to use in CSS
    setViewportHeight();
    
    // Update the viewport height variable when the window is resized
    window.addEventListener('resize', setViewportHeight);
    
    // Function to set the viewport height CSS variable
    function setViewportHeight() {
        // First we get the viewport height and multiply it by 1% to get a value for a vh unit
        let vh = window.innerHeight * 0.01;
        // Then we set the value in the --vh custom property to the root of the document
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.navbar-nav a.nav-link');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Close mobile menu if open
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - (window.innerWidth < 768 ? 60 : 70),
                behavior: 'smooth'
            });
        });
    });
    
    // Change navbar background on scroll
    function toggleNavbarBg() {
        const navbar = document.querySelector('.navbar');
        
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(30, 136, 229, 0.95)';
            navbar.style.boxShadow = '0 1px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'transparent';
            navbar.style.boxShadow = 'none';
        }
    }
    
    window.addEventListener('scroll', toggleNavbarBg);
    
    // Update active nav item based on scroll position
    function updateActiveNavOnScroll() {
        const sections = document.querySelectorAll('section, header');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavOnScroll);
    
    // Animation on scroll effect for cards
    function animateOnScroll() {
        const animatedElements = document.querySelectorAll('.skill-card, .project-card, .cert-card, .hobby-card, .timeline-item');
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    }
    
    window.addEventListener('scroll', animateOnScroll);
    
    // Initial call to set the correct state on page load
    toggleNavbarBg();
    updateActiveNavOnScroll();
    animateOnScroll();
}); 