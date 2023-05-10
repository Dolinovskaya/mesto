import firstImage from '../images/Bergamo.jpg';
import secondImage from '../images/South-Tyrol.jpg';
import thirdImage from '../images/Jaipur.jpg';
import fourthImage from '../images/Sydney.jpg';
import fifthImage from '../images/Algarve.jpg';
import sixthImage from '../images/Namib.jpg';

const initialCards = [
  {
    title: 'Бергамо, Италия',
    link: firstImage
  },
  {
    title: 'Южный Тироль, Италия',
    link: secondImage
  },
  {
    title: 'Джайпур, Индия',
    link: thirdImage
  },
  {
    title: 'Сидней, Австралия',
    link: fourthImage
  },
  {
    title: 'Алгарве, Португалия',
    link: fifthImage
  },
  {
    title: 'Пустыня Намиб',
    link: sixthImage
  }
]

// кнопки открытия для попапа редактирования профиля и попапа добавления карточек
const popupProfileEditOpenButton = document.querySelector('.profile__edit-button');
const popupPlaceAddOpenButton = document.querySelector('.profile__add-button');

// селектор шаблона и контейнера для хранения
const templateSelector = '.template';
const cardsContainerSelector = '.places';

// селектора попапов
const popupProfileSelector = '.popup_for_profile-edit';
const popupPlaceSelector = '.popup_for_place-add';
const popupImageSelector = '.popup_for_image-zoom';

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

export {
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
}
