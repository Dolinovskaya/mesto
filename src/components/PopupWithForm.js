import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submintFunction) {
    super(popupSelector);
    this._submitFunction = submintFunction;
    this._form = this._popup.querySelector('.form');
    this._inputs = this._form.querySelectorAll('.form__input');
    this._submitButton = this._form.querySelector('.form__submit-button');
    // this._submitButtonDefaultText = this._submitButton.textContent;
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
      this._submitButton.textContent = 'Cохранение...';
      this._submitFunction(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  returnSubmitButtonDefaultText() {
    this._submitButton.textContent = this._submitButtonDefaultText;
  }
}
