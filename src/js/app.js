// Needed for nav to work
const nav = document.querySelector(".nav__circle-checkbox");
const navBg = document.querySelector(".nav__circle-background");
const form = document.querySelector(".theme-form");

let isNavOpened = false;

nav.addEventListener("change", () => {
  if (!isNavOpened) {
    form.classList.toggle("theme-form--show");
    isNavOpened = true;
  } else {
    form.classList.toggle("theme-form--show");
    isNavOpened = false;
  }
});
