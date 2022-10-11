import background from "../backgrounds/background.js";

class ResultsView {
  _data;
  _background = document.querySelector("#background");

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

  _weather = document.querySelector("#info-weather");
  _pressure = document.querySelector("#info-pressure");
  _humidity = document.querySelector("#info-humidity");
  _wind = document.querySelector("#info-wind");
  _sunrise = document.querySelector("#info-sunrise");
  _sunset = document.querySelector("#info-sunset");

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

  renderData(data) {
    this._temperature.textContent = data.forecast.temperature;
    this._location.textContent = data.forecast.location;
    this._country.textContent = data.forecast.country;
    this._date.textContent = data.forecast.date;
    this._time.textContent = data.forecast.time;
    this._timezone.textContent = data.forecast.timezone;

    this._weather.textContent = data.forecast.weather;
    this._pressure.textContent = data.forecast.pressure;
    this._humidity.textContent = data.forecast.humidity;
    this._wind.textContent = data.forecast.wind;
    this._sunrise.textContent = data.forecast.sunrise;
    this._sunset.textContent = data.forecast.sunset;
    console.log("Updated info");
  }

  showResultsView() {
    this._weatherInfo.classList.remove("hidden--bottom");
    this._navArrow.classList.remove("hidden--left");
    this._searchLoadedForm.classList.remove("hidden--top");
  }

  hideResultsView() {
    this._weatherInfo.classList.add("hidden--bottom");
    this._navArrow.classList.add("hidden--left");
    this._searchLoadedForm.classList.add("hidden--top");
  }

  setBackground(state) {
    console.log(state);
    background.clearBackgrounds();

    if (state.background.thunder) {
      background.renderThunder();
    }

    if (state.background.isPrecipitation) {
      background.renderPrecipitation(state);
    }

    background.renderBackground(state);
  }
}

export default new ResultsView();
