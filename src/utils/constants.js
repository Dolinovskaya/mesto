// кнопки открытия для попапа добавления карточек, попапа редактирования профиля и аватараб
const popupPlaceAddOpenButton = document.querySelector('.profile__add-button');
const popupProfileEditOpenButton = document.querySelector('.profile__edit-button');
const popupAvatarEditOpenButton = document.querySelector('.profile__avatar-container');

// селектор шаблона и контейнера для хранения
const templateSelector = '.template';
const cardsContainerSelector = '.places';

// селектора попапов
const popupAvatarSelector = '.popup_for_avatar';
const popupProfileSelector = '.popup_for_profile-edit';
const popupPlaceSelector = '.popup_for_place-add';
const popupImageSelector = '.popup_for_image-zoom';

const profileConfig = {
  profileNameSelector: '.profile__name',
  profileJobSelector: '.profile__job',
  profileAvatarSelector: '.profile__avatar'
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

export {
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
}
