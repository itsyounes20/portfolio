
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('form-submit-btn');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const originalBtnText = submitBtn.innerText;
      submitBtn.innerText = 'Sending...';
      submitBtn.disabled = true;
      formStatus.className = 'form-status';
      formStatus.innerText = '';

      const formData = new FormData(contactForm);

      try {
        const response = await fetch(contactForm.action, {
          method: contactForm.method,
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          formStatus.classList.add('status-success');
          formStatus.innerText = 'Message was sent, I will get back to you soon.';
          contactForm.reset();
        } 
        else {
          // server Error
          const data = await response.json();
          formStatus.classList.add('status-error');
          if (Object.hasOwn(data, 'errors')) {
            formStatus.innerText = data["errors"].map(error => error["message"]).join(", ");
          } 
          else {
            formStatus.innerText = 'There was a problem sending your message.';
          }
        }
      } 
      catch (error) {
        // network Error
        formStatus.classList.add('status-error');
        formStatus.innerText = 'Network error. Please check your connection and try again.';
      } 
      finally {
        // reset button state
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;
      }
    });
  }
});