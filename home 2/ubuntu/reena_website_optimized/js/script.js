// JavaScript for Reena Dutta Real Estate Website

document.addEventListener('DOMContentLoaded', function() {
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        // Check if the current page matches the link href, accounting for index.html and empty paths
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage === '/' && linkHref === 'index.html')) {
            link.classList.add('active-nav');
        }
        
        // Special case for "looking-to-buy-or-sell.html" page
        if (currentPage === 'looking-to-buy-or-sell.html' && 
            (linkHref === 'looking-to-buy-or-sell.html')) {
            link.classList.add('active-nav');
        }
    });
    
    // Also handle the city navigation highlighting
    const cityNavLinks = document.querySelectorAll('.city-nav-item a');
    cityNavLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Video play button functionality
    const playButtons = document.querySelectorAll('.play-button');
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const videoPlaceholder = this.closest('.video-placeholder');
            const videoImage = videoPlaceholder.querySelector('img');
            const videoUrl = videoImage.getAttribute('data-video-url') || 'https://www.youtube.com/embed/dQw4w9WgXcQ'; // Default video if none specified
            
            // Create iframe element
            const iframe = document.createElement('iframe');
            iframe.setAttribute('src', videoUrl + '?autoplay=1');
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
            iframe.setAttribute('allowfullscreen', '');
            iframe.style.position = 'absolute';
            iframe.style.top = '0';
            iframe.style.left = '0';
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            
            // Replace placeholder with iframe
            videoPlaceholder.innerHTML = '';
            videoPlaceholder.appendChild(iframe);
        });
    });

    // Mobile navigation toggle
    const createMobileNav = () => {
        // Check if mobile nav already exists
        if (document.querySelector('.mobile-nav-toggle')) return;
        
        const nav = document.querySelector('nav');
        const navContainer = document.querySelector('.nav-container');
        
        // Create mobile nav toggle button
        const mobileNavToggle = document.createElement('button');
        mobileNavToggle.classList.add('mobile-nav-toggle');
        mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
        
        // Insert toggle button before nav
        navContainer.insertBefore(mobileNavToggle, nav);
        
        // Add mobile class to nav
        nav.classList.add('mobile-hidden');
        
        // Fix for duplicate tabs - ensure each link appears only once in mobile nav
        const navLinks = {};
        const navItems = Array.from(nav.querySelectorAll('ul li a'));
        
        navItems.forEach(link => {
            const href = link.getAttribute('href');
            // Only keep the first occurrence of each link
            if (!navLinks[href]) {
                navLinks[href] = link.parentElement;
            } else {
                // Mark duplicates for removal
                link.parentElement.classList.add('duplicate-nav-item');
            }
        });
        
        // Remove duplicate items
        document.querySelectorAll('.duplicate-nav-item').forEach(item => {
            item.remove();
        });
        
        // Toggle mobile nav
        mobileNavToggle.addEventListener('click', function() {
            nav.classList.toggle('mobile-hidden');
            nav.classList.toggle('mobile-visible');
            
            // Change icon
            if (nav.classList.contains('mobile-visible')) {
                mobileNavToggle.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    };

    // Property search functionality
    const setupPropertySearch = () => {
        const searchBtn = document.querySelector('.search-btn');
        if (!searchBtn) return;
        
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real implementation, this would send the search parameters to a backend
            // For now, we'll just show a message
            alert('Search functionality would be connected to your MLS database in the production version.');
        });
        
        const resetBtn = document.querySelector('.reset-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', function(e) {
                e.preventDefault();
                // Reset all form fields
                const formElements = document.querySelectorAll('.search-filters input, .search-filters select');
                formElements.forEach(element => {
                    if (element.tagName === 'SELECT') {
                        element.selectedIndex = 0;
                    } else {
                        element.value = '';
                    }
                });
            });
        }
        
        // View options toggle
        const viewOptions = document.querySelectorAll('.view-options span');
        viewOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove active class from all options
                viewOptions.forEach(opt => opt.classList.remove('active'));
                
                // Add active class to clicked option
                this.classList.add('active');
                
                // Get view type
                const viewType = this.textContent.toLowerCase();
                
                // Hide all result containers
                document.querySelector('.results-grid').style.display = 'none';
                
                const mapElement = document.querySelector('.results-map');
                if (mapElement) mapElement.style.display = 'none';
                
                // Show selected container
                if (viewType === 'list') {
                    document.querySelector('.results-grid').style.display = 'block';
                } else if (viewType === 'map' && mapElement) {
                    mapElement.style.display = 'block';
                } else {
                    // Gallery view would be implemented here
                    document.querySelector('.results-grid').style.display = 'block';
                }
            });
        });
    };

    // Form submission handling
    const setupForms = () => {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Basic validation
                let isValid = true;
                const requiredFields = form.querySelectorAll('[required]');
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add('error');
                    } else {
                        field.classList.remove('error');
                    }
                });
                
                if (isValid) {
                    // In a real implementation, this would submit the form data
                    // For now, show a success message
                    alert('Thank you for your submission! We will contact you shortly.');
                    form.reset();
                } else {
                    alert('Please fill in all required fields.');
                }
            });
        });
    };

    // Initialize responsive features based on screen size
    const initResponsive = () => {
        if (window.innerWidth < 768) {
            createMobileNav();
        }
        
        // Update on resize
        window.addEventListener('resize', function() {
            if (window.innerWidth < 768) {
                createMobileNav();
            }
        });
    };

    // Add animation classes when elements come into view
    const setupAnimations = () => {
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.animate-on-scroll');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementPosition < windowHeight - 100) {
                    if (element.classList.contains('fade-in-element')) {
                        element.classList.add('fade-in');
                    } else if (element.classList.contains('slide-in-element')) {
                        element.classList.add('slide-in');
                    }
                }
            });
        };
        
        // Add animation classes to elements
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.classList.add('animate-on-scroll', 'fade-in-element');
        });
        
        // Run on scroll
        window.addEventListener('scroll', animateOnScroll);
        // Run once on page load
        animateOnScroll();
    };

    // Initialize all functionality
    initResponsive();
    setupPropertySearch();
    setupForms();
    setupAnimations();
});
