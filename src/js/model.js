export const state = {
  forecast: {},
  background: {
    background: "first-entry",
    weather: "cloudy",
    timeOfDay: "morning",
    isPrecipitation: true,
    precipitation: "snow",
    thunder: false,
  },
  loadedCity: "false",
  themeNavOpened: "false",
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

  const settings = { hour: "2-digit", minute: "2-digit" };

  const _sunrise = new Date(calcTime(data.sys.sunrise)).toLocaleTimeString(
    [],
    settings
  );
  // .toLocaleTimeString([], settings)
  const _sunset = new Date(calcTime(data.sys.sunset)).toLocaleTimeString(
    [],
    settings
  );

  return {
    location: data.name,
    temperature: Math.round(data.main.temp),
    humidity: Math.round(data.main.temp),
    pressure: data.main.pressure,
    wind: Math.round(data.wind.speed),
    sunrise: _sunrise,
    sunset: _sunset,
    weather: data.weather[0].main,
    icon: data.weather[0].icon,
  };
};
