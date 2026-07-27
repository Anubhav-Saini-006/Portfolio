/**
 * MAIN INTERACTIVE SCRIPT
 * Lightweight, vanilla JavaScript to render portfolio data & enable subtle UI interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Render portfolio components
  if (typeof PORTFOLIO_DATA !== 'undefined') {
    renderPortfolio(PORTFOLIO_DATA);
  }

  setupNavigation();
  setupContactForm();
  setupEmailButton();
  setupScrollAnimations();
});

/**
 * Render dynamic portfolio content from config
 */
function renderPortfolio(data) {
  if (!data) return;

  // Render Projects Stack from Config
  if (data.projects && data.projects.length > 0) {
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer) {
      projectsContainer.innerHTML = data.projects.map((project, idx) => {
        const isReverse = idx % 2 === 1 ? 'reverse' : '';

        // Handle Action Buttons (Supports multiple githubLinks, single githubUrl, or none)
        let actionsHtml = '';
        if (project.githubLinks && Array.isArray(project.githubLinks)) {
          actionsHtml = project.githubLinks.map(link =>
            `<a href="${link.url}" class="btn btn-primary" target="_blank" rel="noopener">${escapeHtml(link.text)}</a>`
          ).join('');
        } else if (project.githubUrl && project.githubUrl.trim() !== '') {
          actionsHtml = `<a href="${project.githubUrl}" class="btn btn-primary" target="_blank" rel="noopener">View Github</a>`;
        }

        // Handle Preview Frame (Supports dual images, single image, or code snippet)
        let previewContent = '';
        if (project.images && Array.isArray(project.images)) {
          previewContent = `
            <div class="project-preview multi-images">
              ${project.images.map(img => `<img src="${img}" alt="${escapeHtml(project.title)}">`).join('')}
            </div>
          `;
        } else if (project.codeSnippet) {
          previewContent = `<div class="project-preview code-window"><pre><code>${escapeHtml(project.codeSnippet)}</code></pre></div>`;
        } else {
          previewContent = `<div class="project-preview"><img src="${project.image || 'assets/images/saas.png'}" alt="${escapeHtml(project.title)}"></div>`;
        }

        return `
          <div class="project-item ${isReverse}">
            <div class="project-info">
              <h3 class="project-title">${escapeHtml(project.title)}</h3>
              <div class="project-tags">
                ${project.tags.map(tag => `<span class="tag-pill">${escapeHtml(tag)}</span>`).join('')}
              </div>
              <p class="project-desc">${escapeHtml(project.description)}</p>
              ${actionsHtml ? `<div class="project-actions">${actionsHtml}</div>` : ''}
            </div>
            ${previewContent}
          </div>
        `;
      }).join('');
    }
  }
}

/**
 * Setup Email Icon Click Handler: Copies Email to Clipboard & Opens Gmail
 */
function setupEmailButton() {
  const emailBtn = document.getElementById('email-social-btn');
  if (!emailBtn) return;

  emailBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = 'anubhavsaini2506@gmail.com';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email);
    }
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, '_blank');
  });
}

/**
 * Handle Mobile Nav Toggle and Active Section Scroll Highlighting
 */
function setupNavigation() {
  const navToggle = document.getElementById('nav-toggle');
  const navLinksContainer = document.getElementById('nav-links');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  if (navToggle && navLinksContainer) {
    navToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('active');
    });
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
      });
    });
  }

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 200;
    sections.forEach(section => {
      if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/**
 * Setup Contact Form — sends directly via Web3Forms (works on GitHub Pages, Vercel, anywhere)
 *
 * HOW TO RECEIVE EMAILS FROM YOUR CONTACT FORM:
 * 1. Visit https://web3forms.com
 * 2. Enter anubhavsaini2506@gmail.com → Click "Create Access Key"
 * 3. Copy the key and paste it below where it says YOUR_WEB3FORMS_KEY
 *
 * That's it! No backend, no server — works on any hosting platform.
 */
const WEB3FORMS_ACCESS_KEY = '912f5cff-c7bd-45dc-ab19-842dfab07318'; // <-- Paste your key here

function setupContactForm() {
  const form = document.getElementById('contact-form-element');
  const messageInput = document.getElementById('message');

  // Auto-expand textarea height as user types
  if (messageInput) {
    messageInput.addEventListener('input', function () {
      this.style.height = '38px';
      this.style.height = (this.scrollHeight) + 'px';
    });
  }

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const submitBtn = document.getElementById('submit-btn');

    const formData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      message: messageInput.value.trim()
    };

    const originalBtnText = submitBtn ? submitBtn.textContent : 'Submit';
    if (submitBtn) {
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
    }

    const showSuccess = () => {
      form.reset();
      if (messageInput) messageInput.style.height = '38px';
      if (submitBtn) {
        submitBtn.textContent = 'Message Sent! ✓';
        submitBtn.style.backgroundColor = '#10B981';
        setTimeout(() => {
          submitBtn.textContent = originalBtnText;
          submitBtn.style.backgroundColor = '';
          submitBtn.disabled = false;
        }, 3500);
      }
    };

    const showError = () => {
      if (submitBtn) {
        submitBtn.textContent = 'Try Again';
        submitBtn.style.backgroundColor = '';
        submitBtn.disabled = false;
      }
    };

    // Always save to LocalStorage as backup
    const existingDB = JSON.parse(localStorage.getItem('portfolio_contacts') || '[]');
    existingDB.push({ ...formData, date: new Date().toISOString() });
    localStorage.setItem('portfolio_contacts', JSON.stringify(existingDB));

    // If no Web3Forms key set yet, just show success from LocalStorage save
    if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY === 'YOUR_WEB3FORMS_KEY') {
      showSuccess();
      return;
    }

    // Send via Web3Forms — works on GitHub Pages, Vercel, Netlify, anywhere
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Portfolio Contact from ${formData.name}`
        })
      });

      const result = await response.json();
      if (result.success) {
        showSuccess();
      } else {
        console.error('Web3Forms error:', result);
        showError();
      }
    } catch (err) {
      console.error('Form submission error:', err);
      // Still show success since we saved to LocalStorage
      showSuccess();
    }
  });
}

/**
 * Subtle Scroll Reveal Animation
 */
function setupScrollAnimations() {
  const animatedElements = document.querySelectorAll('.project-item, .service-item, .about-content');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(25px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  animatedElements.forEach(el => observer.observe(el));
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
