export default class FormValidator {
  constructor(data, form) {
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass; // для поля ввода (для input)
    this._errorClass = data.errorClass; // для span
    this._form = form;

    this._formInputs = form.querySelectorAll(this._inputSelector);
    this._formButton = form.querySelector(this._submitButtonSelector);
  }

  // метод, который добавляет полю ввода класс с ошибкой,
  // выводит сообщения об ошибке
  _showInputError(input, errorMessage) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  // метод, который удаляет полю ввода класс с ошибкой,
  // скрывает сообщение об ошибке
  _hideInputError (input) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  };

  // метод, который меняет состояние поля ввода взависимости от валидности
  _checkInputValidity(input) {
    if (!input.validity.valid) {
     this._showInputError(input, input.validationMessage);
    } else {
     this._hideInputError(input);
    }
  };

  // метод, который проверяет валидность поля
  _hasInvalidInput() {
    return Array.from(this._formInputs).some((input) => {
      return !input.validity.valid;
    });
  };

  // метод, который меняет состояние кнопки взависимости от валиндности полей ввода
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._formButton.classList.add(this._inactiveButtonClass);
      this._formButton.disabled = true;
    } else {
      this._formButton.classList.remove(this._inactiveButtonClass);
      this._formButton.disabled = false;
    }
  };

    // метод добавления обработчиков форме
  _setEventListeners() {
    this._toggleButtonState();

    this._formInputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  };


  enableValidation() {
    this._setEventListeners();
  }

  // метод, который удаляет невалидные состояния полей ввода и кнопки
  resetValidation() {
    this._formInputs.forEach((input) => {
      if (!input.validity.valid) {
        this._hideInputError(input);
        this._toggleButtonState();
      }
    })
  };
}
