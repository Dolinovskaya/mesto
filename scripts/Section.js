export default class Section {
  constructor({ items, renderer }, cardsContainerSelector) {
    this._initialArray = items;
    this.renderer = renderer;
    this._cardsContainer = document.querySelector(cardsContainerSelector);
  }

  renderItems() {
    this._initialArray.forEach((item) => {
      this._cardsContainer.append(this.renderer(item));
    });
  }

  addItem(element) {
    this._cardsContainer.prepend(element);
  }
}
