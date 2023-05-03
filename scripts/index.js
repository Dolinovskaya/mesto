import initialCards from "./initialCards.js";
import Card from "./card.js";
import FormValidator from "./FormValidator.js";

// объявление всех попапов
const popups = document.querySelectorAll('.popup');
const popupProfileEditElement = document.querySelector('.popup_for_profile-edit');
const popupPlaceAddElement = document.querySelector('.popup_for_place-add');
const popupImageZoomElement = document.querySelector('.popup_for_image-zoom');

// обявление кнопок открытия для попапа редактирования профиля и попапа добавления карточек
const popupProfileEditOpenButtonElement = document.querySelector('.profile__edit-button');
const popupPlaceAddOpenButtonElement = document.querySelector('.profile__add-button');

// переменные для попапа увеличения картинки
const captionPopupImageZoom = popupImageZoomElement.querySelector('.popup__caption');
const photoPopupImageZoom = popupImageZoomElement.querySelector('.popup__image');

export { captionPopupImageZoom, photoPopupImageZoom, popupImageZoomElement, openPopup };

// переменные для формы редактирования профиля
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');

const formProfileEditElement = document.querySelector('.form_for_profile-edit');
const nameProfileInput = formProfileEditElement.querySelector('.form__input_text_name');
const jobProfileInput = formProfileEditElement.querySelector('.form__input_text_job');

// переменные для формы добавления карточек
const formPlaceAddElement = document.querySelector('.form_for_place-add');
const namePlaceInput = formPlaceAddElement.querySelector('.form__input_text_place');
const linkPlaceInput = formPlaceAddElement.querySelector('.form__input_text_link');

// шаблон фото-каточек и их место хранения
const templateSelector = '.template';
const cards = document.querySelector('.places');

// данные для валидации форм
const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__input_type_error', // для поля ввода (для input)
  errorClass: 'form__input-error_active' // для span
}

// ф-ция открытия попапа
const openPopup = function (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByClickEscape);
};

// ф-ция закрытия попапа
const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByClickEscape);
};

// ф-ция закрытия попапа ESC
const closePopupByClickEscape = function (evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};

// универсальное закрытие попапов
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    // закрытие на оверлей
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }

    // закрытие на крестик
    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup)
    }
  })
})

// ф-ция сохранения редактирования профиля
function handleFormProfileEditSubmit(evt) {
  evt.preventDefault();

  nameProfile.textContent = nameProfileInput.value;
  jobProfile.textContent = jobProfileInput.value;

  closePopup(popupProfileEditElement);
}


// вызов открытия попапа редактирования профиля при нажатии кнопок
popupProfileEditOpenButtonElement.addEventListener('click', function () {
  formProfileEditElement.reset();
  formProfileEdit.resetInputError();

  openPopup(popupProfileEditElement);

  nameProfileInput.value = nameProfile.textContent;
  jobProfileInput.value = jobProfile.textContent;
});

// вызов ф-ции сохранения профиля при нажатии на кнопку
formProfileEditElement.addEventListener('submit', handleFormProfileEditSubmit);

// создаю экземпляр формы профиля и применяю валидацию
const formProfileEdit = new FormValidator(validationConfig, formProfileEditElement);
formProfileEdit.enableValidation();

// вызов открытия попапа добавления карточки при нажатии кнопок
popupPlaceAddOpenButtonElement.addEventListener('click', function () {
  formPlaceAddElement.reset();
  formPlaceAdd.resetInputError();

  openPopup(popupPlaceAddElement);
});

// создаю экземпляр формы добавления карточек и применяю валидацию
const formPlaceAdd = new FormValidator(validationConfig, formPlaceAddElement);
formPlaceAdd.enableValidation();

// добавление исходных карточек
initialCards.forEach((item) => {
  const card = new Card(item, templateSelector); // создаю экземпляр карточки
  const cardElement = card.createCard(); // создаю карточку и возвращаю наружу

  cards.append(cardElement); // добавляю в DOM
});

// ф-ция добавления новой карточки
const createNewCard = function () {
  const newItem = {
    title: namePlaceInput.value,
    alt: namePlaceInput.value,
    src: linkPlaceInput.value
  };

  const newСard = new Card(newItem, templateSelector); // создаю экземпляр карточки
  const newCardElement = newСard.createCard(); // создаю карточку и возвращаю наружу

  cards.prepend(newCardElement); // добавляю в DOM
}

// ф-ция сохранения новой картинки
function handlePlaceAddFormSubmit(evt) {
  evt.preventDefault();
  createNewCard()

  closePopup(popupPlaceAddElement);

  formPlaceAddElement.reset();
}

// вызов ф-ции сохранения новых картинок при нажатии
formPlaceAddElement.addEventListener('submit', handlePlaceAddFormSubmit);

// ф-ция открытия попапа увеличения картинки
// const zoomPhoto = function (item) {
//   captionPopupImageZoom.textContent = item.title;
//   photoPopupImageZoom.src = item.src;
//   photoPopupImageZoom.alt = item.alt;
//   openPopup(popupImageZoomElement);
// }
