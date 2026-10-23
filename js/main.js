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
  initFipStandingsSync();
  initFullScheduleFilter();
  initDynamicNextMatches();
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
      { group: 'Gara Ufficiale di Campionato', days: 'Sabato pomeriggio', hours: 'Ore 16:00 (Casa: Palestra Sc. Medie Breda)' }
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
  if (!tabBtns.length && !categoryPills.length) return;

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

/* ==========================================================================
   11. FIP Live Standings Dynamic Sync (Progressive Enhancement)
   ========================================================================== */
function initFipStandingsSync() {
  const standingsTable = document.querySelector('.standings-table');
  if (!standingsTable) return;

  // 1. First try local relative JSON synced by GitHub Action (no CORS issues)
  // 2. Fallback to direct FIP API if available
  fetch('./data/classifica-dr3.json')
    .then(r => {
      if (!r.ok) throw new Error('Local JSON not found');
      return r.json();
    })
    .catch(() => {
      return fetch('https://backend.fip.it/api/v1/classifica?comitato_codice=PTV&regione_codice=VE&sesso=M&codice_campionato=1DM&codice_fase=1&codice_girone=86006')
        .then(r => r.json());
    })
    .then(data => {
      const standingsList = Array.isArray(data) ? data : (data && data.standings ? data.standings : null);
      if (!standingsList || !standingsList.length) return;

      const tbody = standingsTable.querySelector('tbody');
      if (!tbody) return;

      // Sort by position or ranking criteria
      const sorted = [...standingsList].sort((a, b) => ((a.pos || a.posizione || 99) - (b.pos || b.posizione || 99)));

      tbody.innerHTML = sorted.map((team, idx) => {
        const pos = team.pos || team.posizione || (idx + 1);
        const name = (team.team || team.nome_squadra || '').toUpperCase();
        const fullName = team.full_name || team.squadra_nome || name;
        const city = (team.city || team.squadra_sede_citta) ? ` (${team.city || team.squadra_sede_citta})` : '';
        const fipCode = (team.fip_code || team.squadra_codice) ? ` • Cod. FIP ${team.fip_code || team.squadra_codice}` : '';
        const isWellfit = name.includes('WELLFIT');
        const pts = team.points ?? team.punti_classifica ?? 0;
        const g = team.played ?? team.disputate ?? 0;
        const v = team.won ?? team.vinte ?? 0;
        const p = team.lost ?? team.perse ?? 0;
        const pf = team.scored ?? team.punti_segnati ?? 0;
        const ps = team.conceded ?? team.punti_subiti ?? 0;
        const diff = pf - ps;
        const diffClass = diff > 0 ? 'text-success' : (diff < 0 ? 'text-danger' : '');
        const diffSign = diff > 0 ? `+${diff}` : diff;

        return `
          <tr class="${isWellfit ? 'highlight-row' : ''}">
            <td class="text-center pos-col">
              <span class="pos-badge ${isWellfit ? 'pos-highlight' : ''}">${isWellfit ? '<i class="fa-solid fa-shield-halved"></i>' : pos}</span>
            </td>
            <td class="team-cell">
              <strong>${isWellfit ? '🏀 ' : ''}${name}</strong>
              <span class="team-subtext">${fullName}${city}${fipCode}${isWellfit ? ' • Nostra Squadra' : ''}</span>
            </td>
            <td class="text-center pts-col"><strong>${pts}</strong></td>
            <td class="text-center">${g}</td>
            <td class="text-center ${v > 0 ? 'text-success' : ''}"><strong>${v}</strong></td>
            <td class="text-center ${p > 0 ? 'text-danger' : ''}">${p}</td>
            <td class="text-center mobile-hide">${pf}</td>
            <td class="text-center mobile-hide">${ps}</td>
            <td class="text-center ${diffClass}">${diffSign}</td>
            <td class="text-center">
              <span class="table-status-pill ${isWellfit ? 'playoff' : ''}">${isWellfit ? 'In Gara' : 'TV Ovest'}</span>
            </td>
          </tr>
        `;
      }).join('');

      // Update subtitle with sync timestamp
      if (data && data.updated_at_formatted) {
        const sub = document.querySelector('#classifiche .standings-sub');
        if (sub) {
          sub.innerHTML = `FIP Comitato Territoriale di Treviso • Codice Campionato 1DM • Girone 86006 • <span style="color: var(--orange-light);"><i class="fa-solid fa-arrows-rotate"></i> Aggiornato: ${data.updated_at_formatted}</span>`;
        }
      }
    })
    .catch(() => {
      // Gracefully silent: the pre-rendered HTML fallback already contains full official FIP data
    });
}

/* ==========================================================================
   12. Full DR3 Schedule Round & Venue Filter
   ========================================================================== */
function initFullScheduleFilter() {
  const wrappers = document.querySelectorAll('.standings-wrapper');
  if (!wrappers.length) return;

  wrappers.forEach(wrapper => {
    const filterBtns = wrapper.querySelectorAll('.schedule-filter-bar button[data-schedule-tab]');
    const rows = wrapper.querySelectorAll('tbody tr.schedule-row');
    if (!filterBtns.length || !rows.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-schedule-tab');
        rows.forEach(row => {
          const phase = row.getAttribute('data-phase');
          const venue = row.getAttribute('data-venue');
          let show = false;

          if (filter === 'all') show = true;
          else if (filter === 'casa') show = (venue === 'casa');
          else if (filter === 'trasferta') show = (venue === 'trasferta');
          else if (filter === 'andata') show = (phase === 'andata');
          else if (filter === 'ritorno') show = (phase === 'ritorno');

          row.style.display = show ? '' : 'none';
        });
      });
    });
  });
}

/* ==========================================================================
   13. Dynamic Calendar & Next Match Engine (Date-based Live Selector)
   ========================================================================== */
const SCHEDULE_DATA_DR3 = [
  { round: '1ª Andata', datetime: '2026-10-22T21:00:00+02:00', date_formatted: 'Giovedì 22 Ottobre 2026', time_formatted: '21:00', venue_type: 'trasferta', home_team: 'Pall. Ormelle', away_team: 'Wellfit Union Sport', gym_name: 'P.C. - Palestra Comunale di Ormelle', gym_address: 'Via Capitello della Salute, 4 - Ormelle (TV)', fip_code: '008322' },
  { round: '2ª Andata', datetime: '2026-10-30T21:15:00+01:00', date_formatted: 'Venerdì 30 Ottobre 2026', time_formatted: '21:15', venue_type: 'casa', home_team: 'Wellfit Union Sport', away_team: 'Basket Club Miane', gym_name: 'Palestra Scuole Medie G. Galilei', gym_address: 'Via San Pio X, 33 - Breda di Piave (TV)', fip_code: '008325' },
  { round: '3ª Andata', datetime: '2026-11-06T21:15:00+01:00', date_formatted: 'Venerdì 6 Novembre 2026', time_formatted: '21:15', venue_type: 'casa', home_team: 'Wellfit Union Sport', away_team: 'Pol. Salgareda', gym_name: 'Palestra Scuole Medie G. Galilei', gym_address: 'Via San Pio X, 33 - Breda di Piave (TV)', fip_code: '008329' },
  { round: '4ª Andata', datetime: '2026-11-13T21:15:00+01:00', date_formatted: 'Venerdì 13 Novembre 2026', time_formatted: '21:15', venue_type: 'trasferta', home_team: 'Pol. S. Giorgio Quinto', away_team: 'Wellfit Union Sport', gym_name: 'Palestra Scolastica \'Ciardi\'', gym_address: 'Via Marzabotto, 2 - Quinto di Treviso (TV)', fip_code: '008334' },
  { round: '5ª Andata', datetime: '2026-11-20T21:15:00+01:00', date_formatted: 'Venerdì 20 Novembre 2026', time_formatted: '21:15', venue_type: 'casa', home_team: 'Wellfit Union Sport', away_team: 'Basket Nervesa', gym_name: 'Palestra Scuole Medie G. Galilei', gym_address: 'Via San Pio X, 33 - Breda di Piave (TV)', fip_code: '008339' },
  { round: '6ª Andata', datetime: '2026-11-27T21:00:00+01:00', date_formatted: 'Venerdì 27 Novembre 2026', time_formatted: '21:00', venue_type: 'trasferta', home_team: 'Masutti-Vittorio V.to', away_team: 'Wellfit Union Sport', gym_name: 'Palazzetto dello Sport', gym_address: 'Piazza Aldo Moro - Vittorio Veneto (TV)', fip_code: '008343' },
  { round: '7ª Andata', datetime: '2026-12-04T21:15:00+01:00', date_formatted: 'Venerdì 4 Dicembre 2026', time_formatted: '21:15', venue_type: 'trasferta', home_team: 'Pol. Godigese', away_team: 'Wellfit Union Sport', gym_name: 'Palasport Castello di Godego', gym_address: 'Via Piave, 12 - Castello di Godego (TV)', fip_code: '008348' },
  { round: '8ª Andata', datetime: '2026-12-11T21:15:00+01:00', date_formatted: 'Venerdì 11 Dicembre 2026', time_formatted: '21:15', venue_type: 'casa', home_team: 'Wellfit Union Sport', away_team: 'Att. Motorie La Torre', gym_name: 'Palestra Scuole Medie G. Galilei', gym_address: 'Via San Pio X, 33 - Breda di Piave (TV)', fip_code: '008352' },
  { round: '9ª Andata', datetime: '2026-12-18T21:15:00+01:00', date_formatted: 'Venerdì 18 Dicembre 2026', time_formatted: '21:15', venue_type: 'trasferta', home_team: 'Albaredo Insieme', away_team: 'Wellfit Union Sport', gym_name: 'Palazzetto dello Sport di Vedelago', gym_address: 'Via Papa Sarto, 16 - Vedelago (TV)', fip_code: '008356' },
  { round: '1ª Ritorno', datetime: '2027-01-15T21:15:00+01:00', date_formatted: 'Venerdì 15 Gennaio 2027', time_formatted: '21:15', venue_type: 'casa', home_team: 'Wellfit Union Sport', away_team: 'Pall. Ormelle', gym_name: 'Palestra Scuole Medie G. Galilei', gym_address: 'Via San Pio X, 33 - Breda di Piave (TV)', fip_code: '008367' },
  { round: '2ª Ritorno', datetime: '2027-01-22T21:15:00+01:00', date_formatted: 'Venerdì 22 Gennaio 2027', time_formatted: '21:15', venue_type: 'trasferta', home_team: 'Basket Club Miane', away_team: 'Wellfit Union Sport', gym_name: 'Palasport Comunale', gym_address: 'Via Cal di Mezzo - Miane (TV)', fip_code: '008370' },
  { round: '3ª Ritorno', datetime: '2027-01-29T21:15:00+01:00', date_formatted: 'Venerdì 29 Gennaio 2027', time_formatted: '21:15', venue_type: 'trasferta', home_team: 'Pol. Salgareda', away_team: 'Wellfit Union Sport', gym_name: 'Palazzetto dello Sport di Salgareda', gym_address: 'Via Callunga, 1 - Salgareda (TV)', fip_code: '008374' },
  { round: '4ª Ritorno', datetime: '2027-02-12T21:15:00+01:00', date_formatted: 'Venerdì 12 Febbraio 2027', time_formatted: '21:15', venue_type: 'casa', home_team: 'Wellfit Union Sport', away_team: 'Pol. S. Giorgio Quinto', gym_name: 'Palestra Scuole Medie G. Galilei', gym_address: 'Via San Pio X, 33 - Breda di Piave (TV)', fip_code: '008379' },
  { round: '5ª Ritorno', datetime: '2027-02-19T21:15:00+01:00', date_formatted: 'Venerdì 19 Febbraio 2027', time_formatted: '21:15', venue_type: 'trasferta', home_team: 'Basket Nervesa', away_team: 'Wellfit Union Sport', gym_name: 'Palazzetto dello Sport', gym_address: 'Via Zoppolete - Nervesa della Battaglia (TV)', fip_code: '008384' },
  { round: '6ª Ritorno', datetime: '2027-02-26T21:15:00+01:00', date_formatted: 'Venerdì 26 Febbraio 2027', time_formatted: '21:15', venue_type: 'casa', home_team: 'Wellfit Union Sport', away_team: 'Masutti-Vittorio V.to', gym_name: 'Palestra Scuole Medie G. Galilei', gym_address: 'Via San Pio X, 33 - Breda di Piave (TV)', fip_code: '008388' },
  { round: '7ª Ritorno', datetime: '2027-03-05T21:15:00+01:00', date_formatted: 'Venerdì 5 Marzo 2027', time_formatted: '21:15', venue_type: 'casa', home_team: 'Wellfit Union Sport', away_team: 'Pol. Godigese', gym_name: 'Palestra Scuole Medie G. Galilei', gym_address: 'Via San Pio X, 33 - Breda di Piave (TV)', fip_code: '008393' },
  { round: '8ª Ritorno', datetime: '2027-03-12T21:15:00+01:00', date_formatted: 'Venerdì 12 Marzo 2027', time_formatted: '21:15', venue_type: 'trasferta', home_team: 'Att. Motorie La Torre', away_team: 'Wellfit Union Sport', gym_name: 'Palestra Comunale', gym_address: 'Via Don Martino Bassani - Romano d\'Ezzelino (VI)', fip_code: '008397' },
  { round: '9ª Ritorno', datetime: '2027-03-19T21:15:00+01:00', date_formatted: 'Venerdì 19 Marzo 2027', time_formatted: '21:15', venue_type: 'casa', home_team: 'Wellfit Union Sport', away_team: 'Albaredo Insieme', gym_name: 'Palestra Scuole Medie G. Galilei', gym_address: 'Via San Pio X, 33 - Breda di Piave (TV)', fip_code: '008401' }
];

const SCHEDULE_DATA_U14 = [
  { round: '1ª Andata', datetime: '2026-10-11T16:00:00+02:00', date_formatted: 'Domenica 11 Ottobre 2026', time_formatted: '16:00', venue_type: 'casa', home_team: 'Wellfit Union Sport', away_team: 'Nutribullet-Treviso', gym_name: 'Palestra Scuole Medie G. Galilei', gym_address: 'Via San Pio X, 33 - Breda di Piave (TV)', fip_code: '006825' },
  { round: '2ª Andata', datetime: '2026-10-18T16:00:00+02:00', date_formatted: 'Domenica 18 Ottobre 2026', time_formatted: '16:00', venue_type: 'trasferta', home_team: 'Priula Autofficina Spresiano', away_team: 'Wellfit Union Sport', gym_name: 'Palazzetto dello Sport di Spresiano', gym_address: 'Via Ugo Foscolo, 6 - Spresiano (TV)', fip_code: '006832' },
  { round: '3ª Andata', datetime: '2026-10-24T16:00:00+02:00', date_formatted: 'Sabato 24 Ottobre 2026', time_formatted: '16:00', venue_type: 'casa', home_team: 'Wellfit Union Sport', away_team: 'Att. Motorie M.B. Planet', gym_name: 'Palestra Scuole Medie G. Galilei', gym_address: 'Via San Pio X, 33 - Breda di Piave (TV)', fip_code: '006834' },
  { round: '5ª Andata', datetime: '2026-11-14T16:00:00+01:00', date_formatted: 'Sabato 14 Novembre 2026', time_formatted: '16:00', venue_type: 'casa', home_team: 'Wellfit Union Sport', away_team: 'Valbelluna Basket', gym_name: 'Palestra Scuole Medie G. Galilei', gym_address: 'Via San Pio X, 33 - Breda di Piave (TV)', fip_code: '006845' },
  { round: '6ª Andata', datetime: '2026-11-21T17:00:00+01:00', date_formatted: 'Sabato 21 Novembre 2026', time_formatted: '17:00', venue_type: 'trasferta', home_team: 'U.S. Hesperia', away_team: 'Wellfit Union Sport', gym_name: 'Palestra \'San Bartolomeo\'', gym_address: 'Via San Bartolomeo, 1 - Treviso (TV)', fip_code: '006852' },
  { round: '7ª Andata', datetime: '2026-11-28T16:00:00+01:00', date_formatted: 'Sabato 28 Novembre 2026', time_formatted: '16:00', venue_type: 'casa', home_team: 'Wellfit Union Sport', away_team: 'Sporting Club Oderzo', gym_name: 'Palestra Scuole Medie G. Galilei', gym_address: 'Via San Pio X, 33 - Breda di Piave (TV)', fip_code: '006853' },
  { round: '4ª Andata', datetime: '2026-12-05T16:00:00+01:00', date_formatted: 'Sabato 5 Dicembre 2026', time_formatted: '16:00', venue_type: 'trasferta', home_team: 'Pall. Vittorio Veneto', away_team: 'Wellfit Union Sport', gym_name: 'Palestra Comunale di Tarzo', gym_address: 'Via Trevisani nel mondo - Tarzo (TV)', fip_code: '006840' },
  { round: '8ª Andata', datetime: '2026-12-13T11:00:00+01:00', date_formatted: 'Domenica 13 Dicembre 2026', time_formatted: '11:00', venue_type: 'trasferta', home_team: 'Rucker Academy', away_team: 'Wellfit Union Sport', gym_name: 'Palasaccon', gym_address: 'Via San Felice, 1/N - San Vendemiano (TV)', fip_code: '006861' },
  { round: '9ª Andata', datetime: '2026-12-19T16:00:00+01:00', date_formatted: 'Sabato 19 Dicembre 2026', time_formatted: '16:00', venue_type: 'casa', home_team: 'Wellfit Union Sport', away_team: 'Pol. Salgareda', gym_name: 'Palestra Scuole Medie G. Galilei', gym_address: 'Via San Pio X, 33 - Breda di Piave (TV)', fip_code: '006864' },
  { round: '11ª Andata', datetime: '2027-01-16T16:00:00+01:00', date_formatted: 'Sabato 16 Gennaio 2027', time_formatted: '16:00', venue_type: 'casa', home_team: 'Wellfit Union Sport', away_team: 'Pall.Carità', gym_name: 'Palestra Scuole Medie G. Galilei', gym_address: 'Via San Pio X, 33 - Breda di Piave (TV)', fip_code: '006877' },
  { round: '1ª Ritorno', datetime: '2027-01-23T16:00:00+01:00', date_formatted: 'Sabato 23 Gennaio 2027', time_formatted: '16:00', venue_type: 'trasferta', home_team: 'Nutribullet-Treviso', away_team: 'Wellfit Union Sport', gym_name: 'P.C. - Palestra Planck', gym_address: 'Via Franchini, 1 - Villorba (TV)', fip_code: '006881' },
  { round: '2ª Ritorno', datetime: '2027-01-30T16:00:00+01:00', date_formatted: 'Sabato 30 Gennaio 2027', time_formatted: '16:00', venue_type: 'casa', home_team: 'Wellfit Union Sport', away_team: 'Priula Autofficina Spresiano', gym_name: 'Palestra Scuole Medie G. Galilei', gym_address: 'Via San Pio X, 33 - Breda di Piave (TV)', fip_code: '006887' },
  { round: '3ª Ritorno', datetime: '2027-02-14T10:30:00+01:00', date_formatted: 'Domenica 14 Febbraio 2027', time_formatted: '10:30', venue_type: 'trasferta', home_team: 'Att. Motorie M.B. Planet', away_team: 'Wellfit Union Sport', gym_name: 'Palestra Scuola Elementare', gym_address: 'Via Stadio, 15 - Sedico (BL)', fip_code: '006888' },
  { round: '4ª Ritorno', datetime: '2027-02-20T16:00:00+01:00', date_formatted: 'Sabato 20 Febbraio 2027', time_formatted: '16:00', venue_type: 'casa', home_team: 'Wellfit Union Sport', away_team: 'Pall. Vittorio Veneto', gym_name: 'Palestra Scuole Medie G. Galilei', gym_address: 'Via San Pio X, 33 - Breda di Piave (TV)', fip_code: '006894' },
  { round: '5ª Ritorno', datetime: '2027-02-27T17:00:00+01:00', date_formatted: 'Sabato 27 Febbraio 2027', time_formatted: '17:00', venue_type: 'trasferta', home_team: 'Valbelluna Basket', away_team: 'Wellfit Union Sport', gym_name: 'Palasport \'De Mas\'', gym_address: 'Via Gabelli, 2 - Belluno (BL)', fip_code: '006900' },
  { round: '6ª Ritorno', datetime: '2027-03-06T16:00:00+01:00', date_formatted: 'Sabato 6 Marzo 2027', time_formatted: '16:00', venue_type: 'casa', home_team: 'Wellfit Union Sport', away_team: 'U.S. Hesperia', gym_name: 'Palestra Scuole Medie G. Galilei', gym_address: 'Via San Pio X, 33 - Breda di Piave (TV)', fip_code: '006906' },
  { round: '7ª Ritorno', datetime: '2027-03-13T18:00:00+01:00', date_formatted: 'Sabato 13 Marzo 2027', time_formatted: '18:00', venue_type: 'trasferta', home_team: 'Sporting Club Oderzo', away_team: 'Wellfit Union Sport', gym_name: 'Palasport di Oderzo', gym_address: 'Via Pontremoli, 1 - Oderzo (TV)', fip_code: '006908' },
  { round: '8ª Ritorno', datetime: '2027-03-20T16:00:00+01:00', date_formatted: 'Sabato 20 Marzo 2027', time_formatted: '16:00', venue_type: 'casa', home_team: 'Wellfit Union Sport', away_team: 'Rucker Academy', gym_name: 'Palestra Scuole Medie G. Galilei', gym_address: 'Via San Pio X, 33 - Breda di Piave (TV)', fip_code: '006916' },
  { round: '9ª Ritorno', datetime: '2027-04-03T16:00:00+01:00', date_formatted: 'Sabato 3 Aprile 2027', time_formatted: '16:00', venue_type: 'trasferta', home_team: 'Pol. Salgareda', away_team: 'Wellfit Union Sport', gym_name: 'Palazzetto dello Sport di Salgareda', gym_address: 'Via Callunga, 1 - Salgareda (TV)', fip_code: '006919' },
  { round: '11ª Ritorno', datetime: '2027-04-18T16:00:00+02:00', date_formatted: 'Domenica 18 Aprile 2027', time_formatted: '16:00', venue_type: 'trasferta', home_team: 'Pall.Carità', away_team: 'Wellfit Union Sport', gym_name: 'Palacave', gym_address: 'Via Cave (fraz. Fontane) - Villorba (TV)', fip_code: '006928' }
];

function initDynamicNextMatches() {
  const urlParams = new URLSearchParams(window.location.search);
  const simParam = urlParams.get('simDate');
  const now = simParam ? new Date(simParam) : new Date();

  // If simulation mode active, show top banner
  if (simParam && !document.querySelector('.sim-date-banner')) {
    const banner = document.createElement('div');
    banner.className = 'sim-date-banner';
    banner.innerHTML = `<i class="fa-solid fa-flask"></i> Modalità Simulazione Data: <strong>${now.toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</strong> <a href="${window.location.pathname}" style="color: #fff; margin-left: 10px; text-decoration: underline;">Ripristina data reale</a>`;
    document.body.prepend(banner);
  }

  // Find next upcoming match (buffer of 3 hours after start time)
  const isMatchUpcoming = m => (new Date(m.datetime).getTime() + 3 * 3600 * 1000) >= now.getTime();

  const nextDR3 = SCHEDULE_DATA_DR3.find(isMatchUpcoming) || SCHEDULE_DATA_DR3[SCHEDULE_DATA_DR3.length - 1];
  const nextU14 = SCHEDULE_DATA_U14.find(isMatchUpcoming) || SCHEDULE_DATA_U14[SCHEDULE_DATA_U14.length - 1];

  function renderMatchCard(cardEl, match, categoryName, tagLabel, tagColor, calHash) {
    if (!cardEl || !match) return;

    const isHome = match.venue_type === 'casa';
    const statusBadgeClass = isHome ? 'badge-home' : 'badge-away';
    const statusIcon = isHome ? 'fa-house' : 'fa-plane';
    const statusText = isHome ? 'IN CASA' : 'TRASFERTA';

    const homeName = isHome ? 'Wellfit Union Sport' : match.home_team;
    const awayName = isHome ? match.away_team : 'Wellfit Union Sport';
    const homeIsHighlight = isHome ? 'highlight' : '';
    const awayIsHighlight = !isHome ? 'highlight' : '';
    const homeShield = isHome ? 'fa-shield-halved' : 'fa-shield';
    const awayShield = !isHome ? 'fa-shield-halved' : 'fa-shield';

    cardEl.innerHTML = `
      <div class="match-status-col">
        <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
          <span class="match-badge ${statusBadgeClass}"><i class="fa-solid ${statusIcon}"></i> ${statusText}</span>
          <span class="badge-tag" style="background: ${tagColor.bg}; color: ${tagColor.color}; border: 1px solid ${tagColor.border}; font-size: 0.72rem; padding: 2px 8px; font-weight: 700;">${tagLabel}</span>
        </div>
        <span class="match-category">${categoryName} (${match.round})</span>
      </div>
      <div class="match-teams-col">
        <div class="team-side team-home">
          <span class="team-name ${homeIsHighlight}">${homeName}</span>
          <span class="team-logo-small"><i class="fa-solid ${homeShield}"></i></span>
        </div>
        <div class="match-vs-box">
          <span class="vs-text">VS</span>
          <span class="match-time-tag">${match.time_formatted}</span>
        </div>
        <div class="team-side team-away">
          <span class="team-logo-small"><i class="fa-solid ${awayShield}"></i></span>
          <span class="team-name ${awayIsHighlight}">${awayName}</span>
        </div>
      </div>
      <div class="match-meta-col">
        <div class="meta-row"><i class="fa-regular fa-calendar"></i> <strong>${match.date_formatted}</strong></div>
        <div class="meta-row"><i class="fa-solid fa-location-dot"></i> ${match.gym_name}, ${match.gym_address}</div>
      </div>
      <div class="match-action-col">
        <a href="calendario.html#${calHash}" class="btn btn-outline btn-xs"><i class="fa-solid fa-calendar-days"></i> Calendario ${tagLabel}</a>
      </div>
    `;
  }

  // 1. Home page cards
  const homeCardDR3 = document.getElementById('homeFeaturedMatchDR3');
  const homeCardU14 = document.getElementById('homeFeaturedMatchU14');

  if (homeCardDR3) {
    renderMatchCard(
      homeCardDR3,
      nextDR3,
      'Divisione Regionale 3',
      'DR3',
      { bg: 'rgba(255, 96, 0, 0.16)', color: 'var(--orange-light)', border: 'rgba(255, 96, 0, 0.35)' },
      'calendario-dr3'
    );
  }

  if (homeCardU14) {
    renderMatchCard(
      homeCardU14,
      nextU14,
      'Under 14 Regionale',
      'UNDER 14',
      { bg: 'rgba(0, 180, 216, 0.16)', color: '#38bdf8', border: 'rgba(0, 180, 216, 0.35)' },
      'calendario-u14'
    );
  }

  // 2. Calendar page top cards
  const calCardDR3 = document.getElementById('calendarUpcomingDR3');
  const calCardU14 = document.getElementById('calendarUpcomingU14');

  if (calCardDR3) {
    renderMatchCard(
      calCardDR3,
      nextDR3,
      'Divisione Regionale 3',
      'DR3',
      { bg: 'rgba(255, 96, 0, 0.16)', color: 'var(--orange-light)', border: 'rgba(255, 96, 0, 0.35)' },
      'calendario-dr3'
    );
  }

  if (calCardU14) {
    renderMatchCard(
      calCardU14,
      nextU14,
      'Under 14 Regionale',
      'UNDER 14',
      { bg: 'rgba(0, 180, 216, 0.16)', color: '#38bdf8', border: 'rgba(0, 180, 216, 0.35)' },
      'calendario-u14'
    );
  }

  // 3. Highlight next match row in full tables on calendario.html
  function highlightTableRow(containerId, matchCode) {
    const container = document.getElementById(containerId);
    if (!container || !matchCode) return;
    const rows = container.querySelectorAll('tr.schedule-row');
    rows.forEach(row => {
      const pill = row.querySelector('.fip-code-pill');
      if (pill && pill.textContent.trim() === matchCode) {
        row.classList.add('is-next-match');
        const dateBox = row.querySelector('.schedule-date-box');
        if (dateBox && !dateBox.querySelector('.next-match-indicator')) {
          const tag = document.createElement('span');
          tag.className = 'next-match-indicator';
          tag.innerHTML = '<i class="fa-solid fa-star"></i> PROSSIMA GARA';
          dateBox.appendChild(tag);
        }
      }
    });
  }

  if (nextDR3) highlightTableRow('scheduleRowsContainer', nextDR3.fip_code);
  if (nextU14) highlightTableRow('scheduleU14RowsContainer', nextU14.fip_code);
}
