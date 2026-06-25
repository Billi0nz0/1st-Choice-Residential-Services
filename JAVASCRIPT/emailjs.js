emailjs.init("o42jhG_7_vwiVwlxW");

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("appointmentForm");
  const spinner = document.getElementById("spinner");
  const statusMessage = document.getElementById("statusMessage");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    spinner.style.display = "block";
    statusMessage.style.display = "none";

    emailjs.sendForm(
      "service_delbcoz",
      "template_bqdwaau",
      form
    )
    .then(() => {
      return emailjs.sendForm(
        "service_delbcoz",
        "template_pv2ok1o",
        form
      );
    })
    .then(() => {
      spinner.style.display = "none";

      statusMessage.style.display = "block";
      statusMessage.style.color = "green";
      statusMessage.textContent =
        "Message sent successfully!";

      form.reset();
    })
    .catch((error) => {
      spinner.style.display = "none";

      statusMessage.style.display = "block";
      statusMessage.style.color = "red";
      statusMessage.textContent =
        "Failed to send message. Please try again.";

      console.error("EmailJS Error:", error);
    });
  });

});