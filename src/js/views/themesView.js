class ThemesView {
  _navArrow = document.querySelector(".nav__arrow");
  _navCircle = document.querySelector(".nav__circle");
  _navCricleCheckbox = document.querySelector(".nav__circle-checkbox");

  _switchBackground = document.querySelector(".switch");
  _switchBackgroundCheckbox = document.querySelector(".switch__checkbox");

  _backgroundInfoText = document.querySelector(".background__text");

  _themeForm = document.querySelector(".theme");
  _allInputs = document.querySelectorAll(".theme__input");
  _themeSubmitButton = document.querySelector("#theme-submit-button");
  _weatherRadioButton;
  _timeRadioButton;

  _formData = {};

  constructor() {
    this._addHandlerOpenForm();
    this._addHandlerCheckInputs();
  }

  addHandlerThemeSubmit(handler) {
    this._themeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._navCricleCheckbox.checked = false;
      this._toggleThemesForm();
      // When user did not allow giving localization the button appears after form submit
      this._switchBackground.classList.remove("display-none");
      this._switchBackground.classList.remove("hidden--top");

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

  _addHandlerCheckInputs() {
    this._allInputs.forEach((input) => {
      input.addEventListener("change", (e) => {
        if (
          document.querySelector('.theme__input[name="weather"]:checked') &&
          document.querySelector('.theme__input[name="time"]:checked')
        )
          this._themeSubmitButton.classList.remove("disabled");
      });
    });
  }

  clearInputs() {
    this._allInputs.forEach((input) => {
      input.checked = false;
    });
  }

  _toggleThemesForm() {
    this._themeForm.classList.toggle("hidden--bottom--theme");
    this._navArrow.classList.toggle("hidden--left");
    this._switchBackground.classList.toggle("hidden--top");
    this._switchBackgroundCheckbox.checked = false;
    this._backgroundInfoText.classList.toggle("hidden");
  }

  showThemesView(state = {}) {
    this._navArrow.classList.remove("hidden--left");
    this._navCircle.classList.remove("hidden--right");
    this._switchBackgroundCheckbox.checked = false;

    // If localization allowed
    if (state.background.background) {
      this._themeSubmitButton.classList.remove("disabled");
      this._switchBackground.classList.remove("hidden--top");
      this._switchBackground.classList.remove("display-none");

      state.background.thunder
        ? (document.querySelector("#thunderstorm").checked = true)
        : (document.querySelector(
            `#${state.background.weather}`
          ).checked = true);

      document.querySelector(`#${state.background.time}`).checked = true;
    } else {
      this._themeSubmitButton.classList.add("disabled");
    }
  }

  hideThemesView() {
    this._navArrow.classList.add("hidden--left");
    this._navCircle.classList.add("hidden--right");
    this._switchBackground.classList.add("hidden--top");
    this._switchBackgroundCheckbox.checked = false;
  }
}

export default new ThemesView();
