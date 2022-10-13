class EntryView {
  _background = document.querySelector("#background");
  _searchForm = document.querySelector(".search");
  _searchInput = document.querySelector(".search__input-city");
  _navLink = document.querySelector(".nav__link");

  _errorMessage = "Sorry, your city was not found, please try again.";
  _errorContainer = document.querySelector("#entry-view-error-container");
  _errorText = document.querySelector("#entry-view-error-container p");

  constructor() {
    this.showEntryView();
  }

  renderErrorMessage() {
    this._errorContainer.classList.remove("hidden");
    this._errorText.textContent = this._errorMessage;
  }

  _hideErrorMessage() {
    this._errorContainer.classList.add("hidden");
  }

  addHandlerQueryByLocalization(handler) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (pos) {
          const coords = {
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          };
          handler(coords, true);
        },
        function () {
          handler({}, false);
        }
      );
    }
  }

  addHandlerSubmit(handler) {
    this._searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = this._searchInput.value;
      if (!data) return;
      this._searchInput.value = "";
      handler(data);
    });
  }

  addHandlerLinkClick(handler) {
    this._navLink.addEventListener("click", handler);
  }

  showEntryView() {
    this._searchForm.classList.remove("hidden");
  }

  hideEntryView() {
    this._searchForm.classList.add("hidden");
    this._hideErrorMessage();
  }
}

export default new EntryView();
