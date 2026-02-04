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

  // Contact form submit (front-end only; backend eklenebilir)
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
      // WhatsApp veya tel ile yönlendirme seçeneği
      var whatsappText = 'Merhaba, randevu almak istiyorum. Ad Soyad: ' + name + ', Telefon: ' + phone;
      if (message) whatsappText += '\nMesaj: ' + message;
      var encoded = encodeURIComponent(whatsappText);
      if (confirm('Formu göndermek yerine WhatsApp ile iletişime geçmek ister misiniz? (Önerilen)')) {
        window.open('https://wa.me/905454201468?text=' + encoded, '_blank');
      } else {
        // Burada backend'e POST yapılabilir
        alert('Mesajınız alındı. En kısa sürede sizinle iletişime geçeceğiz. Alternatif: +90 545 420 14 68 numarasından arayabilirsiniz.');
        form.reset();
      }
    });
  }

  // Header scroll: hafif arka plan
  var header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 80);
    });
  }
})();
