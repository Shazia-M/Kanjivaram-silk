// Basic interactivity + reveal-on-scroll + tilt alignment
// Place file at js/script.js

document.addEventListener('DOMContentLoaded', function () {
  // Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  navToggle && navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    if (navLinks.classList.contains('open')) {
      navLinks.style.display = 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.background = 'white';
      navLinks.style.padding = '1.6rem';
      navLinks.style.position = 'absolute';
      navLinks.style.right = '2.4rem';
      navLinks.style.top = '6.8rem';
      navLinks.style.boxShadow = '0 .6rem 2rem rgba(16,24,40,.08)';
    } else {
      navLinks.style.display = '';
      navLinks.style.boxShadow = '';
    }
  });

  // IntersectionObserver for reveal animations
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // once revealed, unobserve for performance
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(el => observer.observe(el));

  // Tilt image straightening on scroll into center
  const tilt = document.querySelector('.tilt');
  if (tilt) {
    const tiltObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          // smooth to straight
          tilt.style.transform = 'rotate(0deg) translateY(0)';
          tilt.style.transition = 'transform 0.8s cubic-bezier(.2,.9,.2,1)';
        } else {
          // put it back tilted slightly for depth
          tilt.style.transform = 'rotate(-6deg) translateY(.8rem)';
        }
      });
    }, { threshold: 0.55 });
    tiltObserver.observe(tilt);
  }

  // Gentle parallax on about image
  const aboutImage = document.querySelector('.about-image');
  window.addEventListener('scroll', () => {
    if (!aboutImage) return;
    const rect = aboutImage.getBoundingClientRect();
    const mid = window.innerHeight / 2;
    const offset = (rect.top - mid) * -0.03;
    aboutImage.style.transform = `scale(1.04) translateY(${offset}px)`;
  });

  // Small accessible skip: close menu on link click (mobile)
  const navA = document.querySelectorAll('.nav-links a');
  navA.forEach(a => a.addEventListener('click', () => {
    if (window.innerWidth < 700 && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      navLinks.style.display = '';
    }
  }));
});