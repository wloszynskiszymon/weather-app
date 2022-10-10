const API_KEY = "5614087c1b4e3b8884b8ec32fd8a2151";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (city) {
  try {
    const apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const res = await Promise.race([fetch(apiCall), timeout(5)]);
    if (!res.ok) throw new Error(`Something went wrong, ${res.statusText}`);
    const data = await res.json();

    return data;
  } catch (e) {
    throw new Error(`Ops! ${e}`);
  }
};
