import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
    constructor(popupSelector, submintFunction) {
      super(popupSelector);
      this._submitFunction = submintFunction;
      this._submitButton = this._popup.querySelector('.form__submit-button');
    }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._submitFunction(this._element);
      this.close();
    });
  }

  open = (element) => {
    super.open();
    this._element = element;
  }
}


