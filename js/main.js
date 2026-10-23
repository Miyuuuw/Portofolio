/**
 * Nemophila Sky Studio - Interactive JavaScript
 * Handles Navigation, Filtering, Project Modals, Contact Form & UI Micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initHeaderScroll();
  initProjectFilters();
  initProjectModal();
  initContactForm();
  initFaqAccordion();
  initCopyButtons();
  initSmoothScroll();
});

/* ==========================================================================
   Navigation & Mobile Menu
   ========================================================================== */
function initNavigation() {
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu when clicking nav link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active Link Highlight
  highlightActiveNav();
}

function highlightActiveNav() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href) {
      const pageName = href.split('/').pop();
      const currentFile = currentPath.split('/').pop() || 'index.html';
      
      if (pageName === currentFile || (currentFile === '' && pageName === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  });
}

/* ==========================================================================
   Header Scroll Shadow
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   Smooth Scrolling
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}

/* ==========================================================================
   Projects Filter (Used in projects.html)
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-item-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   Project Detail Modal
   ========================================================================== */
const projectDatabase = {
  'campus-habit': {
    title: 'UNTAN STUDENT PORTAL USABILITY STUDY',
    category: 'UI/UX Research',
    image: 'assets/images/project-mobile.jpg',
    description: 'Riset pengalaman pengguna komprehensif untuk mengevaluasi interaksi mahasiswa baru terhadap sistem akademik digital UNTAN. Berfokus pada diagnosis kendala (pain points) saat mencari jadwal dan pengumuman, pengujian usability SUS, serta perancangan rekomendasi antarmuka yang lebih ringkas dan intuitif.',
    role: 'Lead UI/UX Researcher & Usability Tester',
    tech: 'Draw.io, Usability Testing (SUS), In-depth Interview, Wireframing',
    semester: 'Proyek Riset Akademik Sistem Informasi UNTAN',
    deliverables: 'Laporan Usability, User Journey Map, Wireframe Redesign Interaktif'
  },
  'campus-hub': {
    title: 'SIM-BISNIS: ANALISIS OPERASIONAL UMKM',
    category: 'Sistem Informasi Bisnis',
    image: 'assets/images/project-system.jpg',
    description: 'Analisis proses bisnis mendalam dan perancangan sistem informasi manajemen inventaris untuk UMKM di Pontianak. Membedah alur transaksi manual, mereduksi redundansi data, dan merancang model basis data relasional yang transparan dan efisien.',
    role: 'Business Systems Analyst & Data Modeler',
    tech: 'BPMN 2.0, ERD Database, MySQL, Process Flowcharting',
    semester: 'Studi Kasus Analisis Proses Bisnis Sistem Informasi',
    deliverables: 'Dokumentasi BPMN, Skema Relasi Basis Data, Prototipe Dashboard'
  },
  'nemo-botanics': {
    title: 'STRATEGIC RESOURCE & HABIT ALLOCATOR',
    category: 'Strategic & Habit Planning',
    image: 'assets/images/project-brand.jpg',
    description: 'Konsep antarmuka perencana prioritas dan manajemen alokasi sumber daya jangka panjang dengan filosofi calm technology. Menggabungkan kalkulator target bertahap dan micro-interactions menenangkan untuk membantu pengguna fokus tanpa distraksi.',
    role: 'Product Concept & Interaction Designer',
    tech: 'UI/UX Design, Canva, Micro-interactions, Strategic Forecasting',
    semester: 'Eksplorasi Mandiri UI/UX & Produktivitas',
    deliverables: 'Interactive Prototype, Design Tokens, User Flow'
  },
  'aurora-creative': {
    title: 'UNTAN CAMPUS HUB: MONITORING FASILITAS',
    category: 'Antarmuka Digital & Sistem',
    image: 'assets/images/project-web.jpg',
    description: 'Rancangan dashboard sistem informasi web untuk monitoring ketersediaan ruang kelas dan reservasi laboratorium kampus Universitas Tanjungpura. Dilengkapi visualisasi grafik penggunaan fasilitas dan umpan balik kelayakan sarana perkuliahan.',
    role: 'Front-End Interface & Systems Analyst',
    tech: 'HTML5, CSS Modern (Grid/Flexbox), JavaScript, UI Testing',
    semester: 'Proyek Kolaborasi Rekayasa Web Sistem Informasi',
    deliverables: 'Responsive Dashboard Web, User Interface Testing, Komponen Moduler'
  },
  'library-rfid': {
    title: 'DIGITAL LIBRARY USER JOURNEY REDESIGN',
    category: 'UI/UX Research',
    image: 'assets/images/project-system.jpg',
    description: 'Pemetaan pengalaman pengguna dalam sistem sirkulasi dan penelusuran katalog buku digital perpustakaan. Mengidentifikasi drop-off rate saat mencari bahan ajar dan menyusun alur pencarian cepat terpadu.',
    role: 'UX Researcher & Information Architect',
    tech: 'Task Analysis, Wireframing, User Persona, Information Architecture',
    semester: 'Studi Kasus Interaksi Manusia & Komputer (HCI)',
    deliverables: 'User Journey Blueprint, Rekomendasi Alur Katalog, Wireframe & Alur Interaktif'
  },
  'student-association': {
    title: 'STUDENT INSIGHT & CAMPUS SATISFACTION STUDY',
    category: 'UI/UX Research',
    image: 'assets/images/project-web.jpg',
    description: 'Studi riset kualitatif independen bersama kelompok diskusi kecil mahasiswa untuk membedah tingkat kepuasan, kendala LMS perkuliahan, pemanfaatan fasilitas kampus, serta dinamika interaksi sosial guna merumuskan rekomendasi perbaikan yang solutif.',
    role: 'Study Group Lead & Qualitative Researcher',
    tech: 'Draw.io, In-depth Interview, Thematic Analysis, Problem Discovery',
    semester: 'Inisiatif Riset Kolaborasi Mahasiswa',
    deliverables: 'Laporan Kepuasan Mahasiswa, Analisis Hambatan LMS, Rekomendasi Solusi'
  }
};

function initProjectModal() {
  const modal = document.getElementById('projectModal');
  if (!modal) return;

  const modalImg = modal.querySelector('.modal-hero-img');
  const modalBadge = modal.querySelector('.modal-badge');
  const modalTitle = modal.querySelector('.modal-title');
  const modalDesc = modal.querySelector('.modal-desc');
  const modalRole = modal.querySelector('.modal-role');
  const modalTech = modal.querySelector('.modal-tech');
  const modalSem = modal.querySelector('.modal-semester');
  const modalClose = modal.querySelector('.modal-close-btn');

  const openModal = (projectId) => {
    const data = projectDatabase[projectId] || {
      title: 'STUDI KASUS SISTEM INFORMASI & UX',
      category: 'UI/UX Research',
      image: 'assets/images/project-mobile.jpg',
      description: 'Dokumentasi eksplorasi analisis sistem informasi dan riset pengalaman pengguna oleh Siti Aisyah, mahasiswa Sistem Informasi Universitas Tanjungpura.',
      role: 'UI/UX Researcher & Systems Analyst',
      tech: 'Canva, Draw.io, BPMN 2.0, ERD, Antigravity AI IDE',
      semester: 'S1 Sistem Informasi UNTAN 2026',
      deliverables: 'Riset Pengguna, Wireframe, Dokumentasi Sistem'
    };

    if (modalImg) modalImg.src = data.image;
    if (modalBadge) modalBadge.textContent = data.category;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalDesc) modalDesc.textContent = data.description;
    if (modalRole) modalRole.textContent = data.role;
    if (modalTech) modalTech.textContent = data.tech;
    if (modalSem) modalSem.textContent = data.semester;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Attach click listener to cards
  document.querySelectorAll('[data-project-id]').forEach(card => {
    card.addEventListener('click', (e) => {
      // Prevent modal opening if clicking an external link inside
      if (e.target.closest('a')) return;
      const id = card.getAttribute('data-project-id');
      openModal(id);
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

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
   Contact Form Validation & Submission
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contactName')?.value.trim();
    const email = document.getElementById('contactEmail')?.value.trim();
    const message = document.getElementById('contactMessage')?.value.trim();

    if (!name || !email || !message) {
      showToast('⚠️ Mohon lengkapi semua kolom yang wajib diisi.');
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('⚠️ Format email tidak valid. Silakan periksa kembali.');
      return;
    }

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.innerHTML : 'Kirim Pesan';

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin-icon">
          <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-dashoffset="10"></circle>
        </svg>
        Mengirim Pesan...
      `;
    }

    // Simulate friendly submission
    setTimeout(() => {
      contactForm.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }

      showToast('✿ Pesan berhasil terkirim! Terima kasih telah menghubungi saya.');
    }, 1200);
  });
}

/* ==========================================================================
   FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!questionBtn || !answer) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(other => {
        other.classList.remove('active');
        const otherAns = other.querySelector('.faq-answer');
        if (otherAns) otherAns.style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* ==========================================================================
   Copy to Clipboard Utility
   ========================================================================== */
function initCopyButtons() {
  const copyElements = document.querySelectorAll('[data-copy]');
  copyElements.forEach(el => {
    el.addEventListener('click', () => {
      const textToCopy = el.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`📋 Disalin ke clipboard: "${textToCopy}"`);
        }).catch(() => {
          showToast('⚠️ Gagal menyalin teks.');
        });
      }
    });
  });
}

/* ==========================================================================
   Toast Notification System
   ========================================================================== */
function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Auto remove after 3.8s
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 400);
  }, 3800);
}
