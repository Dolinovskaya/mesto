import "./index.css";
import {
  popupPlaceAddOpenButton,
  popupProfileEditOpenButton,
  popupAvatarEditOpenButton,
  templateSelector,
  cardsContainerSelector,
  popupAvatarSelector,
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

const userInfo = new UserInfo(profileConfig);

// попап редактирования профиля
const popupProfile = new PopupWithForm(popupProfileSelector, (data) => {
  api.setUserInfo(data)
    .then(res => {
      userInfo.setUserInfo({
        userName: res.name,
        userJob: res.about,
        userAvatar: res.avatar
      });
      popupProfile.close();
    })
    .catch(error => console.error(`Ошибка при редактировании профиля ${error}`))
    .finally(() => popupProfile.returnSubmitButtonDefaultText());

});
popupProfile.setEventListeners();

// попап редактирования аватара
const popupAvatar = new PopupWithForm(popupAvatarSelector, (data) => {
  api.setUserAvatar(data)
    .then(res => {
      userInfo.setUserInfo({
        userName: res.name,
        userJob: res.about,
        userAvatar: res.avatar
      });
      popupAvatar.close();
    })
    .catch(error => console.error(`Ошибка при редактировании аватара ${error}`))
    .finally(() => popupAvatar.returnSubmitButtonDefaultText());
});
popupAvatar.setEventListeners();

// попап добавления карточки
const popupAddPlace = new PopupWithForm(popupPlaceSelector, (data) => {
  api.addNewCard(data)
    .then(dataCard => {
      dataCard.my_id = userInfo.getUserId();
      section.addItem(dataCard);
      popupAddPlace.close();
    })
    .catch(error => console.error(`Ошибка при создании новой карточки ${error}`))
    .finally(() => popupAddPlace.returnSubmitButtonDefaultText());
});
popupAddPlace.setEventListeners();

// попап удаления карточки
const popupDeleteCard = new PopupDeleteCard('.popup_for_delete', ({ card, cardId }) => {
  api.deleteCard(cardId)
    .then(res => {
      card.removeCard();
      popupDeleteCard.close();
    })
    .catch(error => console.error(`Ошибка при удалении карточки ${error}`))
    .finally(() => popupDeleteCard.returnSubmitButtonDefaultText());
});
popupDeleteCard.setEventListeners();

// попап увеличения картинки
const popupImage = new PopupWithImage(popupImageSelector);
popupImage.setEventListeners();

// добавление карточек
const section = new Section({
  renderer: (item) => {
    // создаю экземпляр карточки
    const card = new Card(item, templateSelector, popupImage.open, popupDeleteCard.open, (likeElement, cardId) => {
      if (likeElement.classList.contains('place__like-button_active')) {
        api.deleteLike(cardId)
          .then(res => {
           card.toggelLike(res.likes)
          })
          .catch(error => console.error(`Ошибка при удалении лайка ${error}`))
      } else {
        api.addLike(cardId)
          .then(res => {
            card.toggelLike(res.likes)
          })
          .catch(error => console.error(`Ошибка при добавлении лайка ${error}`))
      }
    });
    const cardElement = card.createCard(); // создаю карточку и возвращаю наружу
    return cardElement;
  }
}, cardsContainerSelector)

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

// вызов открытия попапа редактирования аватара при нажатии кнопки
popupAvatarEditOpenButton.addEventListener('click', function () {
  formValidators['formAvatar'].resetValidation();
  popupAvatar.open()
});

// загрузка исходных данных
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([dataUser, dataCards]) => {
    dataCards.forEach(card => { card.my_id = dataUser._id });
    userInfo.setUserInfo({
      userName: dataUser.name,
      userJob: dataUser.about,
      userAvatar: dataUser.avatar
    });
    userInfo.setUserId(dataUser._id);
    section.renderItems(dataCards);
  })
    .catch(error => console.error(`Ошибка при загрузке исходных данных ${error}`))
    .finally();
