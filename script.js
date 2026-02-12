(function () {
  'use strict';

  // Mobile menu toggle
  var menuToggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (nav && nav.classList.contains('open')) nav.classList.remove('open');
      }
    });
  });

  // İletişim formu: fetch ile FormSubmit.co'ya gönder, ardından doğrudan teşekkür sayfasına yönlendir (ara sayfa yok).
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('[name="name"]').value.trim();
      var phone = form.querySelector('[name="phone"]').value.trim();
      var message = form.querySelector('[name="message"]').value.trim();
      if (!name || !phone) {
        alert('Lütfen Ad Soyad ve Telefon alanlarını doldurun.');
        return;
      }
      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Gönderiliyor…';
      }
      var body = new FormData();
      body.append('_subject', 'İletişim formu — Psikogenetik & Longevity');
      body.append('_captcha', 'false');
      body.append('name', name);
      body.append('phone', phone);
      body.append('message', message);
      fetch('https://formsubmit.co/freelancereklamhizmeti@gmail.com', {
        method: 'POST',
        body: body,
        headers: { 'Accept': 'application/json' }
      })
        .then(function () {
          window.location.href = 'tesekkurler.html';
        })
        .catch(function () {
          window.location.href = 'tesekkurler.html';
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Gönder';
          }
        });
    });
  }

  // Header scroll: hafif arka plan
  var header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 80);
    });
  }

  // Mobil: sabit CTA hero bölgesindeyken gizli, aşağı kaydırınca çık, en üste dönünce tekrar gizlensin
  var fixedCta = document.querySelector('.fixed-cta');
  var mobileCta = window.matchMedia('(max-width: 900px)');
  var CTA_SCROLL_THRESHOLD = 120;

  function updateFixedCtaVisibility() {
    if (!fixedCta) return;
    if (mobileCta.matches) {
      if (window.scrollY > CTA_SCROLL_THRESHOLD) {
        fixedCta.classList.add('fixed-cta--visible');
      } else {
        fixedCta.classList.remove('fixed-cta--visible');
      }
    } else {
      fixedCta.classList.add('fixed-cta--visible');
    }
  }

  if (fixedCta) {
    updateFixedCtaVisibility();
    window.addEventListener('scroll', updateFixedCtaVisibility, { passive: true });
    mobileCta.addEventListener('change', updateFixedCtaVisibility);
  }
})();
