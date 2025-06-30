// optional dark/light toggle

//media query to hide nav bar and have a menu instead

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
});

// moving underline for nav bar
const navItems = document.querySelectorAll("nav ul li");

const Scrollobserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log("Now viewing:", entry.target.id);
      }
    });
  },
  { threshold: 0.5 }
);

// typing quote effect
let i = 0;
function typeWriter(quote) {
  quote =
    '"The best error message is the one that never shows up. — Thomas Fuchs"';
  if (i < quote.length) {
    document.querySelector("#home-quote").innerHTML += quote.charAt(i);
    i++;
    setTimeout(typeWriter, 40);
  }
  return;
}

// show modules on hover (education section)

// form for sending a message
