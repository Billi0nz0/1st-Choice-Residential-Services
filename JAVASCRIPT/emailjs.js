// Note: include the EmailJS SDK in your HTML, e.g.:
// <script src="https://cdn.emailjs.com/sdk/2.3.2/email.min.js"></script>
// This file must be plain JavaScript (no <script> tags) so it can be imported/bundled correctly.

(function() {
  // ********** CONFIG - replace these with your EmailJS values **********
  const EMAILJS_USER_ID = 'I56JZeMDawwtcx1Bd';              // e.g. user_xxx
  const EMAILJS_SERVICE_ID = 'service_3yrwjzo';        // e.g. service_xxx
  const APPOINTMENT_TEMPLATE_ID = 'template_1ur97jm'; // template for appointment form
  const CONTACT_TEMPLATE_ID = 'YOUR_CONTACT_TEMPLATE_ID';       // template for contact form
  // *******************************************************************

  if (typeof emailjs !== 'undefined' && typeof emailjs.init === 'function') {
    emailjs.init(EMAILJS_USER_ID);
  } else {
    console.warn('emailjs SDK not found. Make sure to include https://cdn.emailjs.com/sdk/2.3.2/email.min.js in your HTML before this script.');
  }

  // Helper DOM refs
  const overlay = document.getElementById('emailOverlay');
  const overlayMessage = document.getElementById('emailOverlayMessage');
  const overlayClose = document.getElementById('emailOverlayClose');

  function showOverlay(message = 'Sending…') {
    if (!overlay || !overlayMessage || !overlayClose) return;
    overlayMessage.textContent = message;
    overlay.classList.add('visible');
    overlay.setAttribute('aria-hidden', 'false');
    overlayClose.classList.add('hidden');
  }
  function showSuccess(message = 'Message sent — thanks!') {
    if (!overlayMessage || !overlayClose) return;
    overlayMessage.textContent = message;
    overlayMessage.classList.remove('email-error');
    overlayMessage.classList.add('email-success');
    overlayClose.classList.remove('hidden');
  }
  function showError(message = 'Failed to send. Try again later.') {
    if (!overlayMessage || !overlayClose) return;
    overlayMessage.textContent = message;
    overlayMessage.classList.remove('email-success');
    overlayMessage.classList.add('email-error');
    overlayClose.classList.remove('hidden');
  }
  function hideOverlay() {
    if (!overlay || !overlayMessage) return;
    overlay.classList.remove('visible');
    overlay.setAttribute('aria-hidden', 'true');
    overlayMessage.classList.remove('email-success', 'email-error');
  }

  if (overlayClose) overlayClose.addEventListener('click', hideOverlay);
  if (overlay) {
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) hideOverlay(); // close when clicking backdrop
    });
  }

  // Utility: disable form while sending
  function setFormDisabled(form, disabled) {
    if (!form || !form.elements) return;
    Array.from(form.elements).forEach(el => el.disabled = disabled);
  }

  // Prepare handler for appointment form
  const appointmentForm = document.getElementById('appointmentForm');
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', function (e) {
      e.preventDefault();
      // prevent double submit
      if (appointmentForm.dataset.sending === 'true') return;
      appointmentForm.dataset.sending = 'true';
      setFormDisabled(appointmentForm, true);

      showOverlay('Sending appointment request...');

      // Collect values (safe — works even if some name attributes contain spaces)
      const formData = new FormData(appointmentForm);
      // Build template params matching your EmailJS template variables.
      const templateParams = {
        form_subject: 'New appointment request',
        name: (formData.get('name') || formData.get('fullName') || '').trim(),
        email: (formData.get('email') || '').trim(),
        phone: (formData.get('Phone Number') || formData.get('phone') || formData.get('tel') || '').trim(),
        date: (formData.get('date') || '').trim(),
        message: (formData.get('message') || '').trim()
      };

      if (typeof emailjs !== 'undefined' && typeof emailjs.send === 'function') {
        emailjs.send(EMAILJS_SERVICE_ID, APPOINTMENT_TEMPLATE_ID, templateParams)
          .then(() => {
            showSuccess('Appointment request sent! We’ll be in touch shortly.');
            appointmentForm.reset();
          })
          .catch((err) => {
            console.error('EmailJS error (appointment):', err);
            showError('Unable to send appointment request. Please try again or call us.');
          })
          .finally(() => {
            appointmentForm.dataset.sending = 'false';
            setFormDisabled(appointmentForm, false);
          });
      } else {
        console.warn('emailjs.send unavailable; appointment request not sent.');
        showError('Unable to send appointment request. Please try again or call us.');
        appointmentForm.dataset.sending = 'false';
        setFormDisabled(appointmentForm, false);
      }
    });
  }

  // Prepare handler for popup contact form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (contactForm.dataset.sending === 'true') return;
      contactForm.dataset.sending = 'true';
      setFormDisabled(contactForm, true);

      showOverlay('Sending message...');

      const formData = new FormData(contactForm);
      const templateParams = {
        form_subject: 'Website contact message',
        name: (formData.get('name') || '').trim(),
        email: (formData.get('email') || '').trim(),
        message: (formData.get('message') || '').trim()
      };

      if (typeof emailjs !== 'undefined' && typeof emailjs.send === 'function') {
        emailjs.send(EMAILJS_SERVICE_ID, CONTACT_TEMPLATE_ID, templateParams)
          .then(() => {
            showSuccess('Message sent. Thank you — we’ll reply soon!');
            contactForm.reset();
          })
          .catch((err) => {
            console.error('EmailJS error (contact):', err);
            showError('Unable to send message. Please try again later.');
          })
          .finally(() => {
            contactForm.dataset.sending = 'false';
            setFormDisabled(contactForm, false);
          });
      } else {
        console.warn('emailjs.send unavailable; contact message not sent.');
        showError('Unable to send message. Please try again later.');
        contactForm.dataset.sending = 'false';
        setFormDisabled(contactForm, false);
      }
    });
  }

  // Optional: auto-hide overlay after a short delay on success
  // We attach a MutationObserver to detect success class change
  if (overlay && overlayMessage && typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(m => {
        if (m.target.classList && m.target.classList.contains('visible') && overlayMessage.classList.contains('email-success')) {
          // auto hide after 3.5s
          setTimeout(hideOverlay, 3500);
        }
      });
    });
    observer.observe(overlay, { attributes: true, attributeFilter: ['class'] });
  }

})();

