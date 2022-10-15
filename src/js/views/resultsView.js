class ResultsView {
  _data;
  _background = document.querySelector("#background");

  _errorMessage = "Sorry, your city was not found, please try again.";
  _errorContainer = document.querySelector("#results-view-error-container");
  _errorText = document.querySelector("#results-view-error-container p");

  _navArrow = document.querySelector(".nav__arrow");
  _weatherInfo = document.querySelector(".info__container");
  _searchLoadedForm = document.querySelector(".search-loaded");
  _searchLoadedInput = document.querySelector(".search-loaded__input-city");

  _temperature = document.querySelector("#info-temperature");
  _location = document.querySelector("#info-location");
  _country = document.querySelector("#info-country");
  _date = document.querySelector("#info-date");
  _time = document.querySelector("#info-time");
  _timezone = document.querySelector("#info-timezone");
  _timepart = document.querySelector("#info-time-part");

  _weatherIcon = document.querySelector("#info-weather-icon");
  _weather = document.querySelector("#info-weather");
  _pressure = document.querySelector("#info-pressure");
  _humidity = document.querySelector("#info-humidity");
  _wind = document.querySelector("#info-wind");
  _sunrise = document.querySelector("#info-sunrise");
  _sunset = document.querySelector("#info-sunset");

  renderErrorMessage() {
    this._errorContainer.classList.remove("hidden");
    this._errorText.textContent = this._errorMessage;
  }

  _hideErrorMessage() {
    this._errorContainer.classList.add("hidden");
  }

  addHandlerShowTheme(handler) {
    this._searchLoadedForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = this._searchLoadedInput.value;
      if (!data) return;
      this._searchLoadedInput.value = "";
      handler(data);
    });
  }

  addHandlerHideTheme(handler) {
    this._navArrow.addEventListener("click", handler);
  }

  renderData(state) {
    this._hideErrorMessage();
    if (state.forecast.location.length > 10) {
      this._location.textContent = state.forecast.location.slice(0, 7) + "...";
      this._location.title = state.forecast.location;
    } else {
      this._location.textContent = state.forecast.location;
    }
    this._temperature.textContent = state.forecast.temperature;
    this._country.textContent = state.forecast.country;
    this._date.textContent = state.forecast.date;
    this._time.textContent = state.forecast.time;
    this._timezone.textContent = state.forecast.timezone;
    this._timepart.textContent = state.background.time;

    this._weatherIcon.src = `https://openweathermap.org/img/wn/${state.forecast.icon}@2x.png`;

    this._weather.textContent = state.forecast.weather;
    this._pressure.textContent = state.forecast.pressure;
    this._humidity.textContent = state.forecast.humidity;
    this._wind.textContent = state.forecast.wind;
    this._sunrise.textContent = state.forecast.sunrise;
    this._sunset.textContent = state.forecast.sunset;
  }

  showResultsView() {
    this._weatherInfo.classList.remove("hidden--bottom");
    this._navArrow.classList.remove("hidden--left");
    this._searchLoadedForm.classList.remove("hidden--top");
  }

  hideResultsView() {
    this._hideErrorMessage();
    this._weatherInfo.classList.add("hidden--bottom");
    this._navArrow.classList.add("hidden--left");
    this._searchLoadedForm.classList.add("hidden--top");
  }
}

export default new ResultsView();
