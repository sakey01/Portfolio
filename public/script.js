// Toggle mobile menu
document.addEventListener("DOMContentLoaded", () => {
  typeWriter();
  initializeMobileMenu();
  initScrollNav();
});

// Mobile menu functionality
function initializeMobileMenu() {
  const menuIcon = document.getElementById("menu-icon");
  const navLinks = document.querySelector(".nav-group");
  const listItems = navLinks.querySelectorAll("li");

  menuIcon.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  listItems.forEach((li) => {
    li.addEventListener("click", () => {
      const link = li.querySelector("a");
      if (link) {
        link.click();
      }
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
      }
    });
  });

  window.addEventListener("click", (e) => {
    if (
      navLinks.classList.contains("active") &&
      !navLinks.contains(e.target) &&
      !menuIcon.contains(e.target)
    ) {
      navLinks.classList.remove("active");
    }
  });
}

// Underline nav link on scroll
function initScrollNav() {
  const sections = document.querySelectorAll("section[id]");
  const navLinksAll = document.querySelectorAll(".nav-group a");
  navLinksAll[0].classList.add("active-underline");

  function activateNavLink() {
    let scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 280;
      const sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinksAll.forEach((link) => {
          link.classList.remove("active-underline");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active-underline");
          }
        });
      }
    });
  }
  window.addEventListener("scroll", activateNavLink);
}

// Animation effect on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((e) => observer.observe(e));

// Typing quote effect + cursor blink effect
let i = 0;
function typeWriter() {
  const quote = document.getElementById("quote");
  const message = "The best error message is the one that never shows up. — Thomas Fuchs";
  quote.classList.add('blink');

  if (i < message.length) {
    quote.innerHTML += message.charAt(i);
    i++;
    setTimeout(typeWriter, 40);
  }
}

// Form handling
const form = document.getElementById("form");
const toast = document.createElement("div");
toast.innerText = "Message sent";
toast.className = "toast";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  // Send the data to your Express server using fetch
  fetch("/api/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.text())
    .then(() => {
      form.reset();

      document.body.appendChild(toast);
      // Trigger the slide-in animation
      setTimeout(() => toast.classList.add("show"), 10);

      setTimeout(() => {
        toast.classList.add("fade-out");
        setTimeout(() => toast.remove(), 400);
      }, 3000);
    });
});
