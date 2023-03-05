const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');

let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__job');

const formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.form__input_text_name');
let jobInput = formElement.querySelector('.form__input_text_job');
const formSubmitButtonElement = formElement.querySelector('.form__submit-button');

// ф-ция, кот открывает попап
const openPopup = function () {
  popupElement.classList.add("popup_opened");
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

// ф-ция, кот закрывает попап
const closePopup = function () {
  popupElement.classList.remove("popup_opened");
}

// вызываем ф-ции при нажатии кнопок
popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup)

// ф-ция сохранения значений полей
function handleFormSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);
