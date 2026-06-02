// Global Theme Interactive Scripts
document.addEventListener('DOMContentLoaded', () => {
  // 1. Magnetic Buttons Interaction Physics
  const initMagneticButtons = () => {
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    
    magneticBtns.forEach(btn => {
      // Smooth transitions resetting
      btn.style.transition = 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
      
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        // Push element slightly in direction of cursor
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });
      
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
      });
    });
  };

  // 2. Scroll Reveal viewport observer (matches React ScrollReveal)
  const initScrollReveal = () => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          revealObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const itemsToReveal = document.querySelectorAll('.animate-fade-up, .product-card, .collection-product-item');
    itemsToReveal.forEach(item => {
      item.classList.add('reveal-init');
      revealObserver.observe(item);
    });
  };

  // Run initializations
  initMagneticButtons();
  initScrollReveal();
});

// Custom styles for Scroll Reveal animations
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  .reveal-init {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .reveal-active {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(styleSheet);
