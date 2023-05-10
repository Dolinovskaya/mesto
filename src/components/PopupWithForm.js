import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submintFunction) {
    super(popupSelector);
    this._submitFunction = submintFunction;
    this._form = this._popup.querySelector('.form');
    this._inputs = this._form.querySelectorAll('.form__input');
  }

  _getInputValues() {
    this._values = {};
    this._inputs.forEach(input => {
      this._values[input.name] = input.value;
    })
    return this._values;
  }

  setInputValue(userData) {
    this._inputs.forEach(input => {
      input.value = userData[input.name];
    })
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFunction(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
