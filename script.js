const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
  primaryNav.classList.toggle("is-open", !isOpen);
});

primaryNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    primaryNav.classList.remove("is-open");
  });
});

document.querySelectorAll(".faq-list details").forEach((item) => {
  item.addEventListener("toggle", () => {
    if (item.open) {
      document.querySelectorAll(".faq-list details[open]").forEach((other) => {
        if (other !== item) other.open = false;
      });
    }
  });
});

document.querySelector("#booking-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const fields = [
    ["Name", data.get("name")],
    ["Phone / WhatsApp", data.get("phone")],
    ["Email", data.get("email") || "Not provided"],
    ["Event type", data.get("eventType")],
    ["Event date", data.get("date")],
    ["Event location", data.get("location")],
    ["Expected guests", data.get("guests") || "Not provided"],
    ["Message", data.get("message") || "Not provided"]
  ];
  const message = `Hello Mc Bobo, I'd like to check your availability.\n\n${fields.map(([label, value]) => `${label}: ${value}`).join("\n")}`;
  document.querySelector("#form-note").textContent = "Your enquiry is ready in WhatsApp. Send the message there to complete your request.";
  window.open(`https://wa.me/2348132986400?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
});

document.querySelector("#year").textContent = new Date().getFullYear();

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".service-item, .process-list li, .moment-card").forEach((item) => {
    item.classList.add("reveal");
    observer.observe(item);
  });
}