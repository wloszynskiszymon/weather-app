class ResultsView {
  _data;
  _navArrow = document.querySelector(".nav__arrow");
  _weatherInfo = document.querySelector(".info__container");
  _searchLoadedForm = document.querySelector(".search-loaded");
  _searchForm = document.querySelector(".search");

  _temperature = document.querySelector("#info-temperature");
  _location = document.querySelector("#info-location");
  _date = document.querySelector("#info-date");
  _time = document.querySelector("#info-time");

  _weather = document.querySelector("#info-weather");
  _pressure = document.querySelector("#info-pressure");
  _humidity = document.querySelector("#info-humidity");
  _wind = document.querySelector("#info-wind");
  _sunrise = document.querySelector("#info-sunrise");
  _sunset = document.querySelector("#info-sunset");

  _toggleWindow() {
    this._weatherInfo.classList.toggle("hidden--bottom");
  }

  addHandlerShowTheme(handler) {
    this._searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._weatherInfo.classList.remove("hidden--bottom");
      this._navArrow.classList.remove("hidden--left");
      this._searchLoadedForm.classList.remove("hidden--top");
      handler();
    });
  }

  renderData(data) {
    this._temperature.textContent = data.forecast.temperature;
    this._location.textContent = data.forecast.location;
    this._date.textContent = "10 Oct 2022";
    this._time.textContent = "21:37";

    this._weather.textContent = data.forecast.weather;
    this._pressure.textContent = data.forecast.pressure;
    this._humidity.textContent = data.forecast.humidity;
    this._wind.textContent = data.forecast.wind;
    this._sunset.textContent = data.forecast.sunset;
    this._sunrise.textContent = data.forecast.sunrise;
    console.log("Updated info");
  }
}

export default new ResultsView();
