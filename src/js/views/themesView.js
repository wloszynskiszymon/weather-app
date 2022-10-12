import background from "../backgrounds/background.js";

class ThemesView {
  _navArrow = document.querySelector(".nav__arrow");
  _navCircle = document.querySelector(".nav__circle");
  _navCricleCheckbox = document.querySelector(".nav__circle-checkbox");
  _themeForm = document.querySelector(".theme");

  _formData = {};

  constructor() {
    this._addHandlerOpenForm();
  }

  addHandlerThemeSubmit(handler) {
    this._themeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._navCricleCheckbox.checked = false;
      this._toggleThemesForm();

      this._formData = {
        weatherRadioButtonValue: document.querySelector(
          '.theme__input[name="weather"]:checked'
        ).value,
        timeRadioButtonValue: document.querySelector(
          '.theme__input[name="time"]:checked'
        ).value,
      };

      handler(
        this._formData.weatherRadioButtonValue,
        this._formData.timeRadioButtonValue
      );
    });
  }

  _addHandlerOpenForm() {
    this._navCircle.addEventListener(
      "click",
      this._toggleThemesForm.bind(this)
    );
  }

  _toggleThemesForm() {
    this._themeForm.classList.toggle("hidden--bottom--theme");
    this._navArrow.classList.toggle("hidden--left");
  }

  showThemesView() {
    this._navArrow.classList.remove("hidden--left");
    this._navCircle.classList.remove("hidden--right");
  }

  hideThemesView() {
    this._navArrow.classList.add("hidden--left");
    this._navCircle.classList.add("hidden--right");
  }
}

export default new ThemesView();
