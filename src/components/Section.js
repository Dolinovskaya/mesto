export default class Section {
  constructor({ renderer }, cardsContainerSelector) {
    this._renderer = renderer;
    this._cardsContainer = document.querySelector(cardsContainerSelector);
  }

  renderItems(items) {
    items.forEach((item) => {
      this._cardsContainer.append(this._renderer(item));
    });
  }

  addItem(data) {
    this._cardsContainer.prepend(this._renderer(data));
  }
}
