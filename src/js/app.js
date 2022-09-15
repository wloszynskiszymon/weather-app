import { getJSON } from "./requestAPI";
// Needed for nav to work
const nav = document.querySelector(".nav__circle-checkbox");
const navBg = document.querySelector(".nav__circle-background");
const form = document.querySelector(".theme-form");
// For weather info
const infoTemperature = document.querySelector(".info__container-temperature");

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

// getJSON("Poznan");
