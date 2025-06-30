// optional dark/light toggle


//media query to hide nav bar and have a menu instead

// moving underline for nav bar
const navItems = document.querySelectorAll("nav ul li");

const Scrollobserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('Now viewing:', entry.target.id);
    }
  });
}, { threshold: 0.5 });


// typing quote effect
let i = 0;
function typeWriter(quote) {
   quote =
    '"The best error message is the one that never shows up. — Thomas Fuchs"';
  if (i < quote.length) {
    document.querySelector("#home-quote").innerHTML += quote.charAt(i);
    i++;
    setTimeout(typeWriter, 50);
  }
  return;
}

typeWriter();

// show modules on hover (education section)

// form for sending a message
