// Toggle mobile menu
document.addEventListener("DOMContentLoaded", () => {
  typeWriter();

  const menuIcon = document.getElementById("menu-icon");
  const navLinks = document.querySelector(".nav-group");
  const links = navLinks.querySelectorAll("a");

  menuIcon.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
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

  // Underline nav link on scroll
  const sections = document.querySelectorAll("section[id]");
  const navLinksAll = document.querySelectorAll(".nav-group a");
  navLinksAll[0].classList.add("active-underline");

  function activateNavLink() {
    let scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 300;
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
});

// animation effect for view
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

// Typing quote effect for the home page
let i = 0;
function typeWriter(quote) {
  quote = '"The best error message is the one that never shows up. — Thomas Fuchs"';
  if (i < quote.length) {
    document.querySelector("#quote").innerHTML += quote.charAt(i);
    i++;
    setTimeout(typeWriter, 30);
  }
  return;
}

// Form handling
const form = document.getElementById("form");
const inputs = document.querySelectorAll(".form-input");

const toast = document.createElement("div");
toast.innerText = "Message sent";
toast.classList = "toast";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  inputs.forEach((input) => {
    input.value = "";
  });

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("fade-out");
    setTimeout(() => {
      toast.remove();
    }, 1200);
  }, 3000);
});
