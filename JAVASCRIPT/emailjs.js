
  // Initialize EmailJS
  emailjs.init("rlhSxF5_hDOpidefu");

  const form = document.getElementById("appointmentForm");
  const spinner = document.getElementById("spinner");
  const statusMessage = document.getElementById("statusMessage");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Reset status
    spinner.style.display = "block";
    spinner.style.color = "white";
    statusMessage.style.display = "none";

    // 1. Send the main message
    emailjs.sendForm("service_17q4tv4", "template_x9ur96s", form)
      .then(() => {
        // 2. Send auto-reply to user
        return emailjs.sendForm("service_17q4tv4", "template_1ur97jm", form);
      })
      .then(() => {
        // Success
        spinner.style.display = "none";
        statusMessage.style.display = "block";
        statusMessage.style.color = "white";
        statusMessage.textContent = "Appointment Sucessfully Booked!";
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






