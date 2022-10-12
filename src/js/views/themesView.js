class ThemesView {
  _navArrow = document.querySelector(".nav__arrow");
  _navCircle = document.querySelector(".nav__circle");
  _navCricleCheckbox = document.querySelector(".nav__circle-checkbox");
  _themeForm = document.querySelector(".theme");
  _switchBackground = document.querySelector(".switch");
  _switchBackgroundCheckbox = document.querySelector(".switch__checkbox");
  _weatherRadioButton;
  _timeRadioButton;

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

      handler(this._formData);
    });
  }

  addHandlerSwitchBackground(handler) {
    // If checked image will be rendered, if not then gradient
    this._switchBackgroundCheckbox.addEventListener("click", () => {
      const bool = this.checkSwitchState();
      handler(bool);
    });
  }

  checkSwitchState() {
    return this._switchBackgroundCheckbox.checked ? true : false;
  }

  _addHandlerOpenForm() {
    this._navCircle.addEventListener(
      "click",
      this._toggleThemesForm.bind(this)
    );
  }

  clearInputs() {
    const inputs = document.querySelectorAll(".theme__input");
    inputs.forEach((input) => {
      input.checked = false;
    });
  }

  _toggleThemesForm() {
    this._themeForm.classList.toggle("hidden--bottom--theme");
    this._navArrow.classList.toggle("hidden--left");
    this._switchBackground.classList.toggle("hidden--top");
  }

  showThemesView() {
    this._navArrow.classList.remove("hidden--left");
    this._navCircle.classList.remove("hidden--right");
    this._switchBackground.classList.remove("hidden--top");
  }

  hideThemesView() {
    this._navArrow.classList.add("hidden--left");
    this._navCircle.classList.add("hidden--right");
    this._switchBackground.classList.add("hidden--top");
  }
}

export default new ThemesView();
