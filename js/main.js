/**
 * Wellfit Union Sport - Breda di Piave (TV)
 * Main Interactive JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initAnnouncementBar();
  initHeaderAndNav();
  initMobileDrawer();
  initTeamModals();
  initCategoryPreselect();
  initScheduleAndResults();
  initGalleryAndLightbox();
  initContactForm();
  initBackToTop();
});

/* ==========================================================================
   1. Announcement Bar
   ========================================================================== */
function initAnnouncementBar() {
  const bar = document.getElementById('announcementBar');
  const closeBtn = document.getElementById('closeAnnouncement');
  if (!bar || !closeBtn) return;

  if (sessionStorage.getItem('wus_announcement_closed') === 'true') {
    bar.classList.add('closed');
  }

  closeBtn.addEventListener('click', () => {
    bar.style.maxHeight = '0';
    bar.style.opacity = '0';
    bar.style.padding = '0';
    setTimeout(() => {
      bar.classList.add('closed');
      sessionStorage.setItem('wus_announcement_closed', 'true');
    }, 300);
  });
}

/* ==========================================================================
   2. Sticky Header & Scroll Spy
   ========================================================================== */
function initHeaderAndNav() {
  const header = document.getElementById('mainHeader');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link, .mobile-nav-link');
  if (!header) return;

  // Header shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Multi-page active link detection based on current URL
  const path = window.location.pathname;
  let pageName = path.split('/').pop() || 'index.html';
  if (pageName === '' || pageName === '/') pageName = 'index.html';

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkFile = href.split('#')[0].split('?')[0];
    
    // Check if this nav link corresponds to the current page
    if (linkFile === pageName || (pageName === 'index.html' && (linkFile === '' || linkFile === 'index.html'))) {
      link.classList.add('active');
    } else if (linkFile && !linkFile.startsWith('#')) {
      link.classList.remove('active');
    }
  });
}

/* ==========================================================================
   3. Mobile Drawer Navigation
   ========================================================================== */
function initMobileDrawer() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-drawer .btn');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    mobileOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeDrawer);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ==========================================================================
   4. Team Details Modal & Training Timetable
   ========================================================================== */
const teamData = {
  minibasket: {
    title: 'Minibasket Wellfit Union Sport',
    badge: 'Avviamento & Motricità (5 - 11 Anni)',
    desc: 'Il nostro centro minibasket accoglie bambini e bambine dai 5 agli 11 anni, suddivisi per fasce d’età (Pulcini, Scoiattoli e Aquilotti). L’attività è impostata sul gioco, sullo sviluppo degli schemi motori di base e sulla socializzazione.',
    gym: 'Palestra Scuole Medie Comunali - Via Levada, Breda di Piave (TV)',
    staff: 'Istruttori Federali FIP qualificate con esperienza pluriennale e animatori sportivi.',
    schedule: [
      { group: 'Pulcini & Paperine (5-6 anni)', days: 'Martedì e Giovedì', hours: '16:30 - 17:30' },
      { group: 'Scoiattoli & Libellule (7-8 anni)', days: 'Lunedì e Mercoledì', hours: '16:30 - 17:45' },
      { group: 'Aquilotti & Gazzelle (9-11 anni)', days: 'Lunedì e Giovedì', hours: '17:45 - 19:00' }
    ],
    requirements: 'Certificato medico sportivo (non agonistico per i piccoli, agonistico dai 10 anni in su), scarpe pulite per il parquet e borraccia.'
  },
  under14: {
    title: 'Settore Giovanile Under 14 FIP',
    badge: 'Agonismo & Formazione (12 - 14 Anni)',
    desc: 'La categoria Under 14 segna l’ingresso ufficiale nel basket a tutto campo dei campionati federali FIP. Gli atleti affinano la tecnica fondamentale (tiro, palleggio, 1vs1) e apprendono i concetti di collaborazione difensiva e spaziature offensive.',
    gym: 'Palazzetto dello Sport - Via delle Magnolie, Breda di Piave (TV)',
    staff: 'Allenatore Federale di Base FIP e Preparatore Fisico qualificato Scienze Motorie.',
    schedule: [
      { group: 'Allenamento Tecnico 1', days: 'Martedì', hours: '17:30 - 19:30' },
      { group: 'Allenamento Tecnico 2', days: 'Giovedì', hours: '17:30 - 19:30' },
      { group: 'Preparazione Atletica & Tiro', days: 'Venerdì', hours: '17:00 - 18:30' },
      { group: 'Gara Ufficiale di Campionato', days: 'Domenica mattina', hours: 'Casa o Trasferta' }
    ],
    requirements: 'Visita medico-sportiva agonistica obbligatoria rilasciata da centro accreditato.'
  },
  senior: {
    title: 'Prima Squadra Senior',
    badge: 'Campionato Regionale Veneto',
    desc: 'La formazione di vertice della Wellfit Union Sport milita nel campionato regionale. Un team composto da atleti esperti del territorio trevigiano e giovani cresciuti nel nostro vivaio, esempio di dedizione e spirito di squadra.',
    gym: 'Palazzetto dello Sport - Via delle Magnolie, Breda di Piave (TV)',
    staff: 'Capo Allenatore Nazionale, Vice Coach, Fisioterapista dedicato.',
    schedule: [
      { group: 'Allenamento Tattico 1', days: 'Lunedì', hours: '20:30 - 22:30' },
      { group: 'Allenamento Tattico 2', days: 'Mercoledì', hours: '20:30 - 22:30' },
      { group: 'Rifinitura & Tiro', days: 'Venerdì', hours: '20:30 - 22:00' },
      { group: 'Gara Casalinga', days: 'Sabato sera', hours: '20:30 (Ingresso Libero)' }
    ],
    requirements: 'Tesseramento federale agonistico FIP.'
  }
};

function initTeamModals() {
  const modal = document.getElementById('teamModal');
  const modalContent = document.getElementById('modalTeamContent');
  const closeBtn = document.getElementById('closeTeamModal');
  const triggerBtns = document.querySelectorAll('.open-team-modal');

  if (!modal || !modalContent) return;

  function openModal(teamKey) {
    const data = teamData[teamKey];
    if (!data) return;

    let scheduleRows = data.schedule.map(s => `
      <tr>
        <td><strong>${s.group}</strong></td>
        <td>${s.days}</td>
        <td>${s.hours}</td>
      </tr>
    `).join('');

    modalContent.innerHTML = `
      <span class="modal-header-badge">${data.badge}</span>
      <h3 class="modal-team-title">${data.title}</h3>
      <p style="color: var(--text-body); margin-bottom: 18px;">${data.desc}</p>
      
      <h4 style="color: #fff; font-family: var(--font-heading); margin-top: 15px; font-size: 1.1rem;">
        <i class="fa-solid fa-calendar-check" style="color: var(--orange-primary);"></i> Orario Settimanale Allenamenti:
      </h4>
      <div style="overflow-x: auto;">
        <table class="modal-schedule-table">
          <thead>
            <tr>
              <th>Gruppo / Sessione</th>
              <th>Giorni</th>
              <th>Orario</th>
            </tr>
          </thead>
          <tbody>
            ${scheduleRows}
          </tbody>
        </table>
      </div>

      <div style="margin-top: 15px; font-size: 0.88rem; color: var(--text-muted); display: flex; flex-direction: column; gap: 8px;">
        <p><strong style="color: #fff;"><i class="fa-solid fa-map-pin" style="color: var(--orange-primary);"></i> Struttura:</strong> ${data.gym}</p>
        <p><strong style="color: #fff;"><i class="fa-solid fa-user-tie" style="color: var(--orange-primary);"></i> Staff Tecnico:</strong> ${data.staff}</p>
        <p><strong style="color: #fff;"><i class="fa-solid fa-notes-medical" style="color: var(--orange-primary);"></i> Requisiti:</strong> ${data.requirements}</p>
      </div>

      <div style="margin-top: 25px; display: flex; gap: 12px; flex-wrap: wrap;">
        <a href="contatti.html?category=${teamKey}" class="btn btn-primary btn-sm modal-contact-link" data-cat="${teamKey}">
          <i class="fa-solid fa-paper-plane"></i> Iscriviti o Richiedi Prova
        </a>
        <button class="btn btn-outline btn-sm" id="closeModalInnerBtn">Chiudi</button>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Link within modal to contact form
    const contactLink = modalContent.querySelector('.modal-contact-link');
    if (contactLink) {
      contactLink.addEventListener('click', (e) => {
        const categorySelect = document.getElementById('userCategory');
        if (categorySelect) {
          // If on the same page with contact form
          e.preventDefault();
          closeModal();
          categorySelect.value = teamKey;
          const contactSec = document.getElementById('contatti');
          if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    const innerClose = document.getElementById('closeModalInnerBtn');
    if (innerClose) innerClose.addEventListener('click', closeModal);
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const team = btn.getAttribute('data-team');
      openModal(team);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   5. Category Pre-selection from CTA buttons
   ========================================================================== */
function initCategoryPreselect() {
  const ctaButtons = document.querySelectorAll('.cta-preselect');
  const categorySelect = document.getElementById('userCategory');

  // 1. Auto-select category from URL query parameters (e.g. contatti.html?category=minibasket)
  if (categorySelect) {
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('cat') || urlParams.get('category');
    if (catParam) {
      const optionToSelect = Array.from(categorySelect.options).find(opt => 
        opt.value.toLowerCase() === catParam.toLowerCase()
      );
      if (optionToSelect) {
        categorySelect.value = optionToSelect.value;
      }
    }
  }

  // 2. Intra-page and cross-page buttons
  ctaButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-category-select');
      if (categorySelect && cat) {
        categorySelect.value = cat;
      }
    });
  });
}

/* ==========================================================================
   6. Match Schedule & Results Filter System
   ========================================================================== */
function initScheduleAndResults() {
  const tabBtns = document.querySelectorAll('.tab-btn[data-filter-status]');
  const categoryPills = document.querySelectorAll('.category-filters .filter-pill');
  const matchCards = document.querySelectorAll('.match-card');

  let currentStatus = 'upcoming'; // 'upcoming' or 'results'
  let currentCategory = 'all';    // 'all', 'senior', 'under14', 'minibasket'

  function filterMatches() {
    matchCards.forEach(card => {
      const isStatusMatch = card.classList.contains(currentStatus);
      const cardCategory = card.getAttribute('data-team');
      const isCategoryMatch = (currentCategory === 'all') || (cardCategory === currentCategory);

      if (isStatusMatch && isCategoryMatch) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  }

  // Status Tab Switch
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      currentStatus = btn.getAttribute('data-filter-status');
      filterMatches();
    });
  });

  // Category Filter Pills
  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = pill.getAttribute('data-category-filter');
      filterMatches();
    });
  });

  // Run on startup
  filterMatches();
}

/* ==========================================================================
   7. Photo Gallery Filter & Lightbox Viewer
   ========================================================================== */
function initGalleryAndLightbox() {
  const filterPills = document.querySelectorAll('.gallery-filters .filter-pill');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const closeBtn = document.getElementById('closeLightbox');
  const prevBtn = document.getElementById('prevLightbox');
  const nextBtn = document.getElementById('nextLightbox');

  let visibleItems = Array.from(galleryItems);
  let currentIndex = 0;

  // Filter Categories
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.getAttribute('data-gallery-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filter === 'all' || itemCategory === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });

      visibleItems = Array.from(document.querySelectorAll('.gallery-item:not(.hidden)'));
    });
  });

  // Open Lightbox
  function openLightbox(index) {
    visibleItems = Array.from(document.querySelectorAll('.gallery-item:not(.hidden)'));
    if (visibleItems.length === 0) return;
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function updateLightbox() {
    const item = visibleItems[currentIndex];
    if (!item) return;
    const img = item.querySelector('img');
    const caption = item.getAttribute('data-caption') || '';

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || 'Foto Wellfit Union Sport';
    lightboxCaption.textContent = caption;
    lightboxCounter.textContent = `${currentIndex + 1} / ${visibleItems.length}`;
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % visibleItems.length;
    updateLightbox();
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
    updateLightbox();
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const idx = visibleItems.indexOf(item);
      if (idx !== -1) {
        openLightbox(idx);
      }
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', nextImage);
  if (prevBtn) prevBtn.addEventListener('click', prevImage);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });
}

/* ==========================================================================
   8. Contact Form Validation & Simulated Submission
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitContactBtn');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnSpinner = submitBtn.querySelector('.btn-spinner');
  const formFeedback = document.getElementById('formFeedback');

  if (!form) return;

  const fields = {
    name: {
      el: document.getElementById('userName'),
      errorEl: document.getElementById('nameError'),
      validate: (v) => v.trim().length >= 3 ? '' : 'Inserisci il tuo nome e cognome (almeno 3 caratteri).'
    },
    email: {
      el: document.getElementById('userEmail'),
      errorEl: document.getElementById('emailError'),
      validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Inserisci un indirizzo email valido.'
    },
    category: {
      el: document.getElementById('userCategory'),
      errorEl: document.getElementById('categoryError'),
      validate: (v) => v ? '' : 'Seleziona una categoria o motivo della richiesta.'
    },
    subject: {
      el: document.getElementById('userSubject'),
      errorEl: document.getElementById('subjectError'),
      validate: (v) => v.trim().length >= 4 ? '' : "Inserisci l'oggetto della richiesta."
    },
    message: {
      el: document.getElementById('userMessage'),
      errorEl: document.getElementById('messageError'),
      validate: (v) => v.trim().length >= 10 ? '' : 'Scrivi un messaggio di almeno 10 caratteri.'
    },
    privacy: {
      el: document.getElementById('userPrivacy'),
      errorEl: document.getElementById('privacyError'),
      validate: (v, el) => el.checked ? '' : "È necessario acconsentire all'informativa sulla privacy."
    }
  };

  // Clear errors on input
  Object.values(fields).forEach(f => {
    if (f.el) {
      f.el.addEventListener('input', () => {
        if (f.errorEl) f.errorEl.textContent = '';
      });
      f.el.addEventListener('change', () => {
        if (f.errorEl) f.errorEl.textContent = '';
      });
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Validate all fields
    Object.keys(fields).forEach(key => {
      const f = fields[key];
      if (!f.el) return;
      const errorMsg = f.validate(f.el.value, f.el);
      if (errorMsg) {
        if (f.errorEl) f.errorEl.textContent = errorMsg;
        isValid = false;
      } else {
        if (f.errorEl) f.errorEl.textContent = '';
      }
    });

    if (!isValid) return;

    // Loading State
    btnText.classList.add('hidden');
    btnSpinner.classList.remove('hidden');
    submitBtn.disabled = true;

    // Simulate Server Request (1.2s)
    setTimeout(() => {
      btnText.classList.remove('hidden');
      btnSpinner.classList.add('hidden');
      submitBtn.disabled = false;

      const userName = fields.name.el.value.split(' ')[0];
      const categoryName = fields.category.el.options[fields.category.el.selectedIndex].text;

      // Show Feedback
      formFeedback.className = 'form-feedback success';
      formFeedback.innerHTML = `
        <strong><i class="fa-solid fa-circle-check"></i> Messaggio inviato con successo!</strong><br>
        Grazie ${userName}, abbiamo ricevuto la tua richiesta per <em>${categoryName}</em>. La segreteria della Wellfit Union Sport ti risponderà al più presto.
      `;
      formFeedback.classList.remove('hidden');

      // Toast Notification
      showToast(`🏀 Richiesta inviata con successo! A presto ${userName}.`);

      // Reset form
      form.reset();

      // Clear feedback after 8 seconds
      setTimeout(() => {
        formFeedback.classList.add('hidden');
      }, 8000);
    }, 1200);
  });
}

/* ==========================================================================
   9. Toast Notification Helper
   ========================================================================== */
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-basketball fa-bounce" style="color: var(--orange-primary);"></i> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4500);
}

/* ==========================================================================
   10. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
