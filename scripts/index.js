import initialCards from "./initialCards.js";
import Card from "./card.js";
import FormValidator from "./FormValidator.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";

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

// переменные для формы редактирования профиля
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');

const formProfileEditElement = document.forms['formProfileInfo'];
const nameProfileInput = formProfileEditElement.querySelector('.form__input_text_name');
const jobProfileInput = formProfileEditElement.querySelector('.form__input_text_job');

// переменные для формы добавления карточек
const formPlaceAddElement = document.forms['formPlaceInfo'];
const namePlaceInput = formPlaceAddElement.querySelector('.form__input_text_place');
const linkPlaceInput = formPlaceAddElement.querySelector('.form__input_text_link');

// шаблон фото-каточек и их место хранения
const templateSelector = '.template';
const cardsContainerSelector = '.places';
const cards = document.querySelector('.places');

const profileConfig = {
  profileNameSelector: '.profile__name',
  profileJobSelector: '.profile__job'
}

// данные для валидации форм
const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__input_type_error', // для поля ввода (для input)
  errorClass: 'form__input-error_active' // для span
}

const popupProfile = new Popup('.popup_for_profile-edit');
popupProfile.setEventListeners();

const popupImage = new PopupWithImage('.popup_for_image-zoom');
popupImage.setEventListeners();

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, templateSelector, popupImage.open); // создаю экземпляр карточки
    const cardElement = card.createCard(); // создаю карточку и возвращаю наружу
    return cardElement;
  }
}, cardsContainerSelector)

cardsList.renderItems();

const userInfo = new UserInfo(profileConfig);
console.log(userInfo);

// ф-ция добавления новой карточки
const createNewCard = function () {
  const newItem = {
    title: namePlaceInput.value,
    alt: namePlaceInput.value,
    src: linkPlaceInput.value
  };

  const newCardElement = createCard(newItem);
  cards.prepend(newCardElement); // добавляю в DOM
}

// ф-ция сохранения новой картинки
function handlePlaceAddFormSubmit(evt) {
  evt.preventDefault();
  createNewCard()

  // closePopup(popupPlaceAddElement);

  formPlaceAddElement.reset();
}

// ф-ция сохранения редактирования профиля
function handleFormProfileEditSubmit(evt) {
  evt.preventDefault();

  nameProfile.textContent = nameProfileInput.value;
  jobProfile.textContent = jobProfileInput.value;

  // closePopup(popupProfileEditElement);
}

const formValidators = {}

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
// получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name')

   // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);

// добавление исходных карточек
// initialCards.forEach((item) => {
//   const cardElement = createCard(item);
//   cards.append(cardElement); // добавляю в DOM
// });

// вызов открытия попапа добавления карточки при нажатии кнопок
popupPlaceAddOpenButtonElement.addEventListener('click', function () {
  formPlaceAddElement.reset();
  formValidators['formPlaceInfo'].resetValidation();
  // formPlaceAdd.resetValidation();

  // openPopup(popupPlaceAddElement);
});

// вызов ф-ции сохранения новых картинок при нажатии
formPlaceAddElement.addEventListener('submit', handlePlaceAddFormSubmit);

// вызов открытия попапа редактирования профиля при нажатии кнопок
popupProfileEditOpenButtonElement.addEventListener('click', function () {
  formProfileEditElement.reset();
  formValidators['formProfileInfo'].resetValidation();
  // formProfileEdit.resetValidation();

  popupProfile.open();
  // openPopup(popupProfileEditElement);

  nameProfileInput.value = nameProfile.textContent;
  jobProfileInput.value = jobProfile.textContent;
});

// вызов ф-ции сохранения профиля при нажатии на кнопку
formProfileEditElement.addEventListener('submit', handleFormProfileEditSubmit);


