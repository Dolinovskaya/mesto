import {
  initialCards,
  popupProfileEditOpenButton,
  popupPlaceAddOpenButton,
  templateSelector,
  cardsContainerSelector,
  popupProfileSelector,
  popupPlaceSelector,
  popupImageSelector,
  profileConfig,
  validationConfig
} from "../utils/constants.js";
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupDeleteCard from "../components/PopupDeleteCard.js";
import FormValidator from "../components/FormValidator.js";

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: '28464ccd-87b6-479c-8918-28fde9ddc83d',
    'Content-Type': 'application/json'
  }
});

console.log(api);

const userInfo = new UserInfo(profileConfig);

// попап увеличения картинки
const popupImage = new PopupWithImage(popupImageSelector);
popupImage.setEventListeners();

// попап редактирования профиля
const popupProfile = new PopupWithForm(popupProfileSelector, (data) => {
  userInfo.setUserInfo(data);
});
popupProfile.setEventListeners();

// попап добавления карточки
const popupAddPlace = new PopupWithForm(popupPlaceSelector, (data) => {
  section.addItem(data);
});
popupAddPlace.setEventListeners();

// попап редактирования аватара
const popupAvatar = new PopupWithForm('.popup_for_avatar', (data) => {
  document.querySelector('.profile__avatar').src = data.link;
});
popupAvatar.setEventListeners();

// попап удаления карточки
const popupDeleteCard = new PopupDeleteCard('.popup_for_delete', (element) => {
  element.removeCard()
});
popupDeleteCard.setEventListeners();


// добавление карточек
const section = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, templateSelector, popupImage.open, popupDeleteCard.open); // создаю экземпляр карточки
    const cardElement = card.createCard(); // создаю карточку и возвращаю наружу
    return cardElement;
  }
}, cardsContainerSelector)

section.renderItems();

// Включение валидации
const formValidators = {}

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

// вызов открытия попапа добавления карточки при нажатии кнопки
popupPlaceAddOpenButton.addEventListener('click', function () {
  formValidators['formPlaceInfo'].resetValidation();
  popupAddPlace.open();
});

// вызов открытия попапа редактирования профиля при нажатии кнопки
popupProfileEditOpenButton.addEventListener('click', function () {
  formValidators['formProfileInfo'].resetValidation();
  popupProfile.setInputValue(userInfo.getUserInfo());
  popupProfile.open();
});

const popupAvatarEditOpenButton = document.querySelector('.profile__avatar-container');

popupAvatarEditOpenButton.addEventListener('click', function () {
  formValidators['formAvatar'].resetValidation();
  popupAvatar.open()
});

