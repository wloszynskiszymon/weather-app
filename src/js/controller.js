import * as model from "./model.js";
import { getJSON } from "./requestAPI.js";
import entryView from "./views/entryView.js";
import resultsView from "./views/resultsView.js";

const controlCitySearch = async function (data) {
  try {
    // Query API with city data
    const result = await getJSON(data);

    // Save the result in the state
    model.state.forecast = model.createForecastObject(result);

    // Render on the page
    resultsView.renderData(model.state);

    console.log(model.state.forecast);
  } catch (e) {
    throw new Error(`${e}: Couldn't find such city D:`);
  }
};

const controlShowResultsView = function () {
  console.log("Show info container!");
};

const init = function () {
  entryView.loadEntryView();
  entryView.addHandlerSubmit(controlCitySearch);
  resultsView.addHandlerShowTheme(controlShowResultsView);
};

init();
