import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
    constructor(popupSelector, submintFunction) {
      super(popupSelector);
      this._submitFunction = submintFunction;
      this._submitButton = this._popup.querySelector('.form__submit-button');
      this._submitButtonDefaultText = this._submitButton.textContent;

    }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._submitButton.textContent = 'Удаление...';
      this._submitFunction({ card: this._element, cardId: this._elementId });
    });
  }

  returnSubmitButtonDefaultText() {
    this._submitButton.textContent = this._submitButtonDefaultText;
  }

  open = ({ card, cardId }) => {
    super.open();
    this._element = card;
    this._elementId = cardId;
  }
}


