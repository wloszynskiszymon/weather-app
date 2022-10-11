import { state } from "../model";

class Background {
  _background = document.querySelector("#background");
  _precipitation = document.querySelector("#atmospheric-fall");
  _thunder = document.querySelector("#thunder");

  _backgroundObject = {
    background: "",
    weather: "",
    time: "",
    isPrecipitation: false,
    precipitation: "",
    thunder: false,
  };

  _time = {
    morning: "morning",
    day: "day",
    evening: "evening",
    night: "night",
  };

  _backgrounds = {
    cloudy: "cloudy",
    scatteredCloudy: "cloudy-scattered",
    sunny: "sunny",
    rainy: "rainy",
    snowy: "snowy",
  };

  renderThunder() {
    this._thunder.classList.add("thunder");
  }

  renderPrecipitation(state) {
    this._precipitation.classList.add(state.background.precipitation);
  }

  renderBackground(state) {
    this._background.classList.add(state.background.background);
  }

  clearBackgrounds() {
    [this._thunder, this._precipitation, this._background].forEach((bg) => {
      bg.removeAttribute("class");
    });
  }

  /* 
 ID data according to:
 https://openweathermap.org/weather-conditions
 */
  _validateWeather(state) {
    const ID = +state.forecast.weatherID;
    //  200 - 699:
    //  200 - 299 -> rainy (and thunder)
    //  200 - 599 -> rainy (and rain)
    //  600 - 699 -> snowy (and snow)
    if (ID >= 200 && ID < 700) {
      this._backgroundObject.isPrecipitation = true;

      ID < 300
        ? (this._backgroundObject.thunder = true)
        : (this._backgroundObject.thunder = false);

      ID >= 600
        ? (this._backgroundObject.weather = this._backgrounds.snowy)
        : (this._backgroundObject.weather = this._backgrounds.rainy);

      return true;
    }

    // 800 -> sunny
    if (ID === 800) {
      this._backgroundObject.weather = this._backgrounds.sunny;
    }
    // 801, 802 -> scattered-cloudy
    else if (ID === 801 || ID == 802) {
      this._backgroundObject.weather = this._backgrounds.scatteredCloudy;
    }
    // 803, 804 -> cloudy
    else if (ID === 803 || ID === 804) {
      this._backgroundObject.weather = this._backgrounds.cloudy;
    } else {
      // All remaining (mist, fog, tornado etc.) -> scattered-cloudy
      this._backgroundObject.weather = this._background.scatteredCloudy;
    }
    this._backgroundObject.isPrecipitation = false;
    this._backgroundObject.thunder = false;
    return true;
  }

  _validateTime(state) {
    const time = +state.forecast.time.slice(0, 2);

    let sunriseHour = +state.forecast.sunrise.slice(0, 2);
    const sunriseMinute = +state.forecast.sunrise.slice(3, 5);

    let sunsetHour = +state.forecast.sunset.slice(0, 2);
    const sunsetMinute = +state.forecast.sunset.slice(3, 5);

    // Round minutes to full hours
    sunriseMinute >= 30 ? (sunriseHour += 1) : sunriseHour;
    sunsetMinute >= 30 ? (sunsetHour += 1) : sunsetHour;

    // console.log(`For morning: Between ${sunriseHour} and 12 // (${time})`);
    // console.log(`For day: Between 12 and ${sunsetHour - 2} // (${time})`);
    // console.log(
    //   `For evening: Between ${sunsetHour - 2} and ${sunsetHour} // (${time})`
    // );
    // console.log(
    //   `For night: Between ${sunsetHour} and ${sunriseHour} // (${time})`
    // );

    if (time >= sunriseHour && time < 12) {
      this._backgroundObject.time = this._time.morning;
      return true;
    }

    if (time >= 12 && time < sunsetHour - 2) {
      this._backgroundObject.time = this._time.day;
      return true;
    }

    if (time >= sunsetHour - 2 && time <= sunsetHour) {
      this._backgroundObject.time = this._time.evening;
      return true;
    }

    if (time > sunsetHour || time < sunriseHour) {
      this._backgroundObject.time = this._time.night;
      return true;
    }

    return false;
  }

  _validatePrecipitation(state) {
    if (this._backgroundObject.weather === "rainy") {
      this._backgroundObject.precipitation = `rain--${this._backgroundObject.time}`;
      return true;
    } else if (precipitation === "snowy") {
      this._backgroundObject.precipitation = `snow--${this._backgroundObject.time}`;
      return true;
    } else {
      return false;
    }
  }

  _setBackgroundInObject() {
    this._backgroundObject.background = `${this._backgroundObject.weather}-${this._backgroundObject.time}`;
  }

  getBackgroundObject(state, doValidation = true) {
    if (doValidation) {
      if (this._validateWeather(state)) {
        if (this._validateTime(state)) {
          this._setBackgroundInObject();
          if (this._backgroundObject.isPrecipitation) {
            this._validatePrecipitation(state);
          }
          return this._backgroundObject;
        }
      }

      //   return {
      //     background: this.generateBackground(weather, time),
      //     weather: weather,
      //     time: time,
      //     isPrecipitation: true,
      //     precipitation: "snow--morning",
      //     thunder: false,
      //   };
    }

    // background = `${this.generateBackground(this.validateWeather, "morning")}`;
  }
}

export default new Background();
