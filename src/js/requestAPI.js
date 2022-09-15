const API_KEY = "5614087c1b4e3b8884b8ec32fd8a2151";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const createWeatherAPICall = function (city) {
  return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5614087c1b4e3b8884b8ec32fd8a2151&units=metric`;
};

export const getJSON = async function (city) {
  try {
    const apiCall = createWeatherAPICall(city);
    const res = await Promise.race([fetch(apiCall), timeout(5)]);
    const data = await res.json();
    console.log(data);
  } catch (e) {
    throw new Error(e);
  }
};
