import * as model from "./model.js";
import { getJSON } from "./requestAPI.js";
import entryView from "./views/entryView.js";
import resultsView from "./views/resultsView.js";
import themesView from "./views/themesView.js";
import background from "./backgrounds/background.js";

// Searching city
const controlCitySearch = async function (data) {
  try {
    // Query API with city data
    const result = await getJSON(data);

    if (!result) {
      model.state.currentView === "entryView" && entryView.renderErrorMessage();
      model.state.currentView === "resultsView" &&
        resultsView.renderErrorMessage();
      throw new Error("Weather for such localization not found. Try again.");
    }

    // Save the result in the state
    model.saveForecastData(model.createForecastObject(result));

    // If we use input first time
    if (model.state.currentView === "entryView") {
      entryView.hideEntryView();

      resultsView.renderData(model.state);

      resultsView.showResultsView();

      // Change current view in app state
      model.updateViewState("resultsView");
    }

    // Create background information acording to app state data and store it
    model.updateBackground(background.validateForecastData(model.state));

    background.renderBackground(model.state);

    // If we use the input for second time
    if (model.state.currentView === "resultsView") {
      resultsView.renderData(model.state);
    }
  } catch (e) {
    console.error(`Something went wrong: ${e}`);
  }
};

// Starting up with localization allowed
const controlLoadImageBackground = async function (
  coords,
  givenAccessToLocalization
) {
  try {
    if (givenAccessToLocalization) {
      const result = await getJSON(coords, false);

      model.saveForecastData(model.createForecastObject(result));

      model.updateBackground(background.validateForecastData(model.state));

      background.renderBackground(model.state, true);
    } else {
      background.renderDefaultBackground();
    }
  } catch (e) {
    throw new Error("Somethine went wrong: " + e);
  }
};

// Switch to entryView
const controlShowEntryView = function () {
  if (model.state.currentView === "themesView") {
    themesView.hideThemesView();
    themesView.clearInputs();
  }

  if (model.state.currentView === "resultsView") resultsView.hideResultsView();

  model.updateViewState("entryView");

  entryView.showEntryView(model.state);

  // (true) to render image instead of normal one (for entryView)
  background.renderBackground(model.state, true);
};

// Switch to themesView
const controlShowThemesView = function () {
  model.updateViewState("themesView");

  entryView.hideEntryView();

  themesView.showThemesView(model.state);

  background.renderBackground(model.state, themesView.checkSwitchState());
};

// After theme form submittion
const controlFormBackgroundChange = function (formData) {
  model.updateBackground(
    background.validateFormData(
      formData.weatherRadioButtonValue,
      formData.timeRadioButtonValue
    )
  );
  background.renderBackground(model.state);
};

// Button switching background between gradient and image
const controlSwitchBackground = function (boolRenderImageVersion) {
  background.renderBackground(model.state, boolRenderImageVersion);
};

const init = function () {
  entryView.addHandlerQueryByLocalization(controlLoadImageBackground);
  entryView.addHandlerSubmit(controlCitySearch);
  entryView.addHandlerLinkClick(controlShowThemesView);

  resultsView.addHandlerShowTheme(controlCitySearch);
  resultsView.addHandlerHideTheme(controlShowEntryView);

  themesView.addHandlerThemeSubmit(controlFormBackgroundChange);
  themesView.addHandlerSwitchBackground(controlSwitchBackground);
};

init();
