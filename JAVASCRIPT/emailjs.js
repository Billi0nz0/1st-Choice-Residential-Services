emailjs.init("YOUR_PUBLIC_KEY");

document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", this)
    .then(() => alert("Message sent successfully!"));
});

document.getElementById("appointmentForm").addEventListener("submit", function(e) {
  e.preventDefault();
  emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", this)
    .then(() => alert("Appointment booked successfully!"));
});
