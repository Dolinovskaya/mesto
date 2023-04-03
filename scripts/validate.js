const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}

// ф-ция, которая добавляет полю ввода класс с ошибкой,
// выводит сообщения об ошибке
const showInputError = (object, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(object.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(object.errorClass);
};

// ф-ция, которая удаляет полю ввода класс с ошибкой,
// скрывает сообщение об ошибке
const hideInputError = (object, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(object.inputErrorClass);
  errorElement.classList.remove(object.errorClass);
  errorElement.textContent = '';
};

// ф-ция, которая меняет состояние поля ввода взависимости от валидности
const checkInputValidity = (object, formElement, inputElement, formButton) => {
  if (!inputElement.validity.valid) {
    showInputError(object, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(object, formElement, inputElement);
  }
};

// ф-ция, которая проверяет валидность поля
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// ф-ция, которая меняет состояние кнопки взависимости от валиндности полей ввода
const toggleButtonState = (object, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(object.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(object.inactiveButtonClass);
  }
};

// ф-ция добавления обработчиков всем полям формы
const setEventListeners = (object, formElement) => {
  const formInputs = Array.from(formElement.querySelectorAll(object.inputSelector));
  const formButton = formElement.querySelector(object.submitButtonSelector);

  toggleButtonState(object, formInputs, formButton);

  formInputs.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(object, formElement, inputElement);
      toggleButtonState(object, formInputs, formButton);
    });
  });
};

// ф-ция добавления обработчиков  всем формам
const enableValidation = (object) => {
  const formList = Array.from(document.querySelectorAll(object.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(object, formElement);
  });

};

// вызов функции валидации форм
enableValidation(validationConfig);

// ф-ция, которая удаляет невалидные состояния полей ввода и кнопки
const resetInputError = (object, formElement) => {
  formElement.querySelectorAll(object.inputSelector).forEach((inputElement) => {
    const formInputs = Array.from(formElement.querySelectorAll(object.inputSelector));
    const formButton = formElement.querySelector(object.submitButtonSelector);
    if (!inputElement.validity.valid) {
      hideInputError(object, formElement, inputElement)
      toggleButtonState(object, formInputs, formButton);
    }
  })
};
