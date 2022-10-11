import * as model from "./model.js";
import { getJSON } from "./requestAPI.js";
import entryView from "./views/entryView.js";
import resultsView from "./views/resultsView.js";
import themesView from "./views/themesView.js";
import background from "./backgrounds/background.js";

const controlCitySearch = async function (data) {
  try {
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

      console.log(model.state.forecast);
    }

    if (model.state.currentView === "resultsView") {
      // Render on the page
      resultsView.renderData(model.state);
    }

    // Save information about background in app state
    console.log(
      `${background.getBackgroundObject(model.state)} KURWA DZIALAJ `
    );
    model.updateBackground(background.getBackgroundObject(model.state));

    console.log(model.state.background);
    // Set background
    resultsView.setBackground(model.state);
  } catch (e) {
    throw new Error(`${e}: Couldn't find such city D:`);
  }
};

const controlShowEntryView = function () {
  if (model.state.currentView === "resultsView") {
    // Update app state
    model.updateViewState("entryView");

    resultsView.hideResultsView();

    entryView.showEntryView();
  }

  if (model.state.currentView === "themesView") {
    model.updateViewState("entryView");

    themesView.hideThemesView();

    entryView.showEntryView();
  }
};

const controlShowThemesView = function () {
  // Update app state
  model.updateViewState("themesView");

  entryView.hideEntryView();

  themesView.showThemesView();
};

const controlBackground = function () {
  background.getBackground(model.state);
};

const init = function () {
  entryView.addHandlerSubmit(controlCitySearch);
  entryView.addHandlerLinkClick(controlShowThemesView);
  resultsView.addHandlerShowTheme(controlCitySearch);
  resultsView.addHandlerHideTheme(controlShowEntryView);
  themesView.addHandlerThemeSubmit(controlBackground);
};

init();
