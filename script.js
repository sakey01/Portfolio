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
});

// Toggle dark mode

// Typing quote effect for the home page
let i = 0;
function typeWriter(quote) {
  quote = '"The best error message is the one that never shows up. — Thomas Fuchs"';
  if (i < quote.length) {
    document.querySelector("#home-quote").innerHTML += quote.charAt(i);
    i++;
    setTimeout(typeWriter, 40);
  }
  return;
}

// show modules on hover (education section)

// form for sending a message
