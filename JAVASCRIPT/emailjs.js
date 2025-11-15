
  // Initialize EmailJS
  emailjs.init("o42jhG_7_vwiVwlxW");

  const form = document.getElementById("appointmentForm");
  const spinner = document.getElementById("spinner");
  const statusMessage = document.getElementById("statusMessage");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Reset status
    spinner.style.display = "block";
    statusMessage.style.display = "none";

    // 1. Send the main message
    emailjs.sendForm("service_delbcoz", "template_bqdwaau", form)
      .then(() => {
        // 2. Send auto-reply to user
        return emailjs.sendForm("service_delbcoz", "template_pv2ok1o", form);
      })
      .then(() => {
        // Success
        spinner.style.display = "none";
        statusMessage.style.display = "block";
        statusMessage.style.color = "white";
        statusMessage.textContent = "Message sent successfully!";
        form.reset();
      })
      .catch((error) => {
        // Failure
        spinner.style.display = "none";
        statusMessage.style.display = "block";
        statusMessage.style.color = "red";
        statusMessage.textContent = "Failed to send message. Please try again.";
        console.error("EmailJS Error:", error);
      });
  });

