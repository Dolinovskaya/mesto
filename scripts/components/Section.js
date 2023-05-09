export default class Section {
  constructor({ items, renderer }, cardsContainerSelector) {
    this._initialArray = items;
    this._renderer = renderer;
    this._cardsContainer = document.querySelector(cardsContainerSelector);
  }

  renderItems() {
    this._initialArray.forEach((item) => {
      this._cardsContainer.append(this._renderer(item));
    });
  }

  addItem(data) {
    this._cardsContainer.prepend(this._renderer(data));
  }
}
