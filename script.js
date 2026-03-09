const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

function setStatus(message, type) {
  formStatus.textContent = message;
  formStatus.classList.remove("success", "error");
  if (type) {
    formStatus.classList.add(type);
  }
}

contactForm.addEventListener("submit", async function onSubmit(event) {
  event.preventDefault();

  const submitButton = contactForm.querySelector("button[type='submit']");
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    setStatus("Please fill in all fields.", "error");
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Sending...";
  setStatus("", "");

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, message })
    });

    const data = await response.json();

    if (!response.ok) {
      setStatus(data.error || "Failed to send message.", "error");
      return;
    }

    contactForm.reset();
    setStatus("Message sent successfully. I will contact you soon.", "success");
  } catch (error) {
    console.error("Request failed:", error);
    setStatus("Server error. Please try again later.", "error");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Send Inquiry";
  }
});
