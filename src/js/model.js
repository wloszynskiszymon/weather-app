import { TIME_FORMAT, DATE_FORMAT } from "./helpers";

export const state = {
  forecast: {
    sunrise: "08:12",
    sunset: "18:29",
    time: "23:04",
    weatherID: 245,
  },
  background: {
    background: "first-entry",
    weather: "cloudy",
    time: "morning",
    isPrecipitation: true,
    precipitation: "snow--morning",
    thunder: false,
  },

  themeForm: {},

  currentView: "entryView",
};

export const createForecastObject = function (data) {
  const calcTime = function (time) {
    return (time + data.timezone + getTimezone()) * 1000;
  };

  console.log(data);

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
