import * as model from "./model.js";
import { getJSON } from "./requestAPI.js";
import entryView from "./views/entryView.js";
import resultsView from "./views/resultsView.js";
import themesView from "./views/themesView.js";
import background from "./backgrounds/background.js";

const controlCitySearch = async function (data) {
  // Query API with city data
  const result = await getJSON(data);

  // console.log(result);
  // if (!result || (Array.isArray(data) && result.length === 0)) {
  //   console.log("WRONG CITY AOAOAO");
  //   return;
  // }

  // Save the result in the state
  model.state.forecast = model.createForecastObject(result);

  if (model.state.currentView === "entryView") {
    // Hide entry view
    entryView.hideEntryView();

    // Render on the page
    resultsView.renderData(model.state);

    // Show theme
    resultsView.showResultsView();

    // Change current view in app state
    model.updateViewState("resultsView");
  }

  // Save information about background in app state

  model.updateBackground(background.validateForecastData(model.state));

  // Set background
  background.renderBackground(model.state);

  if (model.state.currentView === "resultsView") {
    // Render on the page
    resultsView.renderData(model.state);
  }
};

const controlShowEntryView = function () {
  if (model.state.currentView === "themesView") themesView.hideThemesView();

  if (model.state.currentView === "resultsView") resultsView.hideResultsView();

  model.updateViewState("entryView");

  entryView.showEntryView();

  background.clearBackgrounds(true);
};

const controlShowThemesView = function () {
  // Update app state
  model.updateViewState("themesView");

  entryView.hideEntryView();

  themesView.showThemesView();
};

const controlBackground = function (
  weatherRadioButtonValue,
  timeRadioButtonValue
) {
  model.updateBackground(
    background.validateFormData(weatherRadioButtonValue, timeRadioButtonValue)
  );

  background.renderBackground(model.state);
};

const init = function () {
  entryView.addHandlerSubmit(controlCitySearch);
  entryView.addHandlerLinkClick(controlShowThemesView);
  resultsView.addHandlerShowTheme(controlCitySearch);
  resultsView.addHandlerHideTheme(controlShowEntryView);
  themesView.addHandlerThemeSubmit(controlBackground);
};

init();
