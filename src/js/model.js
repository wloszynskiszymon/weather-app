import { TIME_FORMAT, DATE_FORMAT } from "./helpers";

export const state = {
  //  Info from API
  forecast: {},
  // Background info
  background: {},

  currentView: "entryView",
};

export const createForecastObject = function (data) {
  const calcTime = function (time) {
    return (time + data.timezone + getTimezone()) * 1000;
  };

  const getTimezone = function () {
    const date = new Date();
    const offset = date.getTimezoneOffset() * 60;
    return offset;
  };

  const now = function () {
    const time = Date.now() + getTimezone(data) * 1000 + data.timezone * 1000;
    return new Date(time).toLocaleTimeString([], TIME_FORMAT);
  };

  let _timezone = (getTimezone() + data.timezone) / 60 / 60;
  if (_timezone === 0) {
    _timezone = "";
  } else {
    _timezone = `(${_timezone > 0 ? "+" : ""}${_timezone})`;
  }

  const _sunrise = new Date(calcTime(data.sys.sunrise)).toLocaleTimeString(
    [],
    TIME_FORMAT
  );
  const _sunset = new Date(calcTime(data.sys.sunset)).toLocaleTimeString(
    [],
    TIME_FORMAT
  );

  let _weather;

  if (data.weather[0].id === 801 || data.weather[0].id == 802) {
    _weather = data.weather[0].description;
    _weather = _weather.charAt(0).toUpperCase() + _weather.slice(1);
  } else {
    _weather = data.weather[0].main;
  }

  return {
    temperature: Math.round(data.main.temp),
    location: data.name,
    country: data.sys.country,
    time: now(),
    date: new Date().toLocaleDateString("en-AU", DATE_FORMAT),
    humidity: Math.round(data.main.temp),
    pressure: data.main.pressure,
    wind: Math.round(data.wind.speed),
    timezone: _timezone,
    sunrise: _sunrise,
    sunset: _sunset,
    weatherID: data.weather[0].id,
    weather: _weather,
    icon: data.weather[0].icon,
  };
};

export const updateViewState = function (view) {
  state.currentView = view;
};

export const updateBackground = function (background) {
  state.background = background;
};

export const saveThemeFormData = function (data) {
  state.themeForm = data;
};

export const saveForecastData = function (data) {
  state.forecast = data;
};

// IF ever needed:)
// export const updateRootVariable = function () {
//   const nightColor = "rgba(255, 255, 255, 0.05)";
//   const dayColor = "rgba(0, 0, 0, 0.15)";
//   const root = document.querySelector(":root");
//   root.style.setProperty("--info-bg", nightColor);
// };
