// Needed for nav to work
const nav = document.querySelector(".nav__circle-checkbox");
const navBg = document.querySelector(".nav__circle-background");
const form = document.querySelector(".form");

let isNavActive = false;

nav.addEventListener("change", () => {
  // form.classList.toggle("hide-form");

  // Checking if the nav is opened or not.
  if (!isNavActive) {
    navBg.removeEventListener("transitionstart", hideForm);
    navBg.addEventListener("transitionend", showForm);
  } else {
    navBg.removeEventListener("transitionend", showForm);
    navBg.addEventListener("transitionstart", hideForm);
  }
});

function hideForm() {
  form.style.visibility = "hidden";
  form.style.opacity = "0";
  form.style.transform = "translateY(100rem) scale(0.3)";
  isNavActive = false;
}

function showForm() {
  form.style.visibility = "visible";
  form.style.opacity = "1";
  form.style.transform = "translateY(0) scale(1)";
  isNavActive = true;
}
