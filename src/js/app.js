import { getJSON } from "./requestAPI";
// Needed for nav to work
const navCircle = document.querySelector(".nav__circle");
const navCricleCheckbox = document.querySelector(".nav__circle-checkbox");
const navArrow = document.querySelector(".nav__arrow");
const themeForm = document.querySelector(".theme");
const searchForm = document.querySelector(".search");
const searchLoadedForm = document.querySelector(".search-loaded");
const weatherInfo = document.querySelector(".info__container");

// That's "See all possible themes" paragraph
const searchCityIcon = document.querySelector(".search__input__icon");
const navBackSpan = document.querySelector(".nav__back span");
const navLink = document.querySelector(".nav__link");

// For weather info
const background = document.querySelector("#background");
const precipitationBg = document.querySelector("#precipitation-fall");

// Search

const state = {
  background: "first-entry",
  weather: "sunny",
  timeOfDay: "evening",
  isPrecipitation: true,
  precipitation: "snow",
  loadedCity: "false",
  themeNavOpened: "false",
};

const changeView = function () {
  searchForm.classList.toggle("search--hidden");
  navArrow.classList.toggle("nav__arrow--hidden");
  searchLoadedForm.classList.toggle("search-loaded--hidden");
  weatherInfo.classList.toggle("info--hidden");

  if (state.loadedCity) {
    background.classList.remove(state.background);
    state.background = generateBgClass();
    background.classList.add(state.background);
    state.loadedCity = !state.loadedCity;
  } else {
    background.classList.remove(state.background);
    state.background = "first-entry";
    background.classList.add(state.background);
    state.loadedCity = !state.loadedCity;
    if (state.isPrecipitation) {
      precipitationBg.classList.remove(state.precipitation);
    }
  }
};

const generateBgClass = function () {
  return `${state.weather}-${state.timeOfDay}`;
};

// When searching a city via first load
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  changeView();
});

searchLoadedForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

navArrow.addEventListener("click", changeView);

// "See all possible themes"
navCricleCheckbox.addEventListener("change", () => {
  if (!state.themeNavOpened) {
    themeForm.classList.toggle("theme--show");
    state.themeNavOpened = true;
  } else {
    themeForm.classList.toggle("theme--show");
    state.themeNavOpened = false;
  }
});

[navLink, navBackSpan].forEach((el) =>
  el.addEventListener("click", () => {
    navCircle.classList.toggle("nav__circle--hidden");
    searchForm.classList.toggle("search--hidden");
    navBackSpan.classList.toggle("hidden");
  })
);

navCricleCheckbox.addEventListener("click", () => {
  navBackSpan.classList.toggle("hidden");
});

// getJSON("Poznan");
