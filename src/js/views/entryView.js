import "../model.js";

class EntryView {
  _searchForm = document.querySelector(".search");

  constructor() {}

  toggleWindow() {
    this._searchForm.classList.toggle("hidden");
  }

  loadEntryView() {
    this._searchForm.classList.remove("hidden");
    console.log("loadEntryView() - works!");
  }

  addHandlerSubmit(handler) {
    this._searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.toggleWindow();
      const data = document.querySelector(".search__input-city").value;
      handler(data);
    });
  }
}

export default new EntryView();
