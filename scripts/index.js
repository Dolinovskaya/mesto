const initialCards = [
  {
    title: 'Бергамо, Италия',
    alt: 'вид на Бергамо',
    src: './images/Bergamo.jpg'
  },
  {
    title: 'Южный Тироль, Италия',
    alt: 'озеро окруженное горами',
    src: './images/South-Tyrol.jpg'
  },
  {
    title: 'Джайпур, Индия',
    alt: 'высокое красное здание с множеством окон',
    src: './images/Jaipur.jpg'
  },
  {
    title: 'Сидней, Австралия',
    alt: 'Сиднейский дом оперы в ясную погоду',
    src: './images/Sydney.jpg'
  },
  {
    title: 'Алгарве, Португалия',
    alt: 'вид на океан с вершины скалы',
    src: './images/Algarve.jpg'
  },
  {
    title: 'Пустыня Намиб',
    alt: 'пустыня Намиб на закате',
    src: './images/Namib.jpg'
  }
]

// объявление всех попапов
const popupProfileEditElement = document.querySelector('.popup_for_profile-edit');
const popupPlaceAddElement = document.querySelector('.popup_for_place-add');
const popupImageZoomElement = document.querySelector('.popup_for_image-zoom');

// обявление кнопок открытия для попапа редактирования профиля и попапа добавления карточек
const popupProfileEditOpenButtonElement = document.querySelector('.profile__edit-button');
const popupPlaceAddOpenButtonElement = document.querySelector('.profile__add-button');

// объявление всех кнопок закрытия попапов
const popupProfileEditCloseButtonElement = popupProfileEditElement.querySelector('.popup__close-button');
const popupPlaceAddCloseButtonElement = popupPlaceAddElement.querySelector('.popup__close-button');
const popupImageZoomCloseButtonElement = popupImageZoomElement.querySelector('.popup__close-button');

// переменные для формы редактирования профиля
let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__job');

const formProfileEditElement = document.querySelector('.form_for_profile-edit');
let nameProfileInput = formProfileEditElement.querySelector('.form__input_text_name');
let jobProfileInput = formProfileEditElement.querySelector('.form__input_text_job');

// переменные для формы добавления карточек
const formPlaceAddElement = document.querySelector('.form_for_place-add');
let namePlaceInput = formPlaceAddElement.querySelector('.form__input_text_place');
let linkPlaceInput = formPlaceAddElement.querySelector('.form__input_text_link');


// универсальная ф-ция открытия попапа
const openPopup = function (popup) {
  popup.classList.add('popup_opened');
}

// универсальная ф-ция закрытия попапа
const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
}

// вызов открытия/закрытия попапа редактирования профиля при нажатии кнопок
popupProfileEditOpenButtonElement.addEventListener('click', function () {
  openPopup(popupProfileEditElement)
  nameProfileInput.value = nameProfile.textContent;
  jobProfileInput.value = jobProfile.textContent;
});
popupProfileEditCloseButtonElement.addEventListener('click', function () {
  closePopup(popupProfileEditElement)
});

// вызов открытия/закрытия попапа добавления карточки при нажатии кнопок
popupPlaceAddOpenButtonElement.addEventListener('click', function () {
  openPopup(popupPlaceAddElement)
});
popupPlaceAddCloseButtonElement.addEventListener('click', function () {
  closePopup(popupPlaceAddElement)
});

// ф-ция сохранения редактирования профиля
function handleFormProfileEditSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameProfileInput.value;
  jobProfile.textContent = jobProfileInput.value;
  closePopup(popupProfileEditElement);
}

// вызов ф-ции сохранения профиля при нажатии на кнопку
formProfileEditElement.addEventListener('submit', handleFormProfileEditSubmit);

// объявление шаблона фото-каточек и их места хранения
const cardTemplate = document.querySelector('.template').content;
const cards = document.querySelector('.places');

//  ф-ция добавления лайка
const addLike = function (evt) {
  evt.target.classList.toggle('place__like-button_active');
}

// ф-ция удаления карточки
const deleteCard = function (evt) {
  evt.target.closest('.place').remove();
}

// ф-ция открытия попапа увеличения картинки
const zoomPhoto = function (item) {
  popupImageZoomElement.querySelector('.popup__caption').textContent = item.title;
  popupImageZoomElement.querySelector('.popup__image').src = item.src;
  popupImageZoomElement.querySelector('.popup__image').alt = item.alt;
  openPopup(popupImageZoomElement);
}

// вызов закрытия попапа увеличнения картинки
popupImageZoomCloseButtonElement.addEventListener('click', function () {
  closePopup(popupImageZoomElement)
});

// ф-ция создания карточки
const createCard = function (item) {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.place__title').textContent = item.title;
  cardElement.querySelector('.place__photo').src = item.src;
  cardElement.querySelector('.place__photo').alt = item.alt;

  cardElement.querySelector('.place__like-button').addEventListener('click', addLike);
  cardElement.querySelector('.place__trash-button').addEventListener('click', deleteCard);
  cardElement.querySelector('.place__photo').addEventListener('click', function () {
    zoomPhoto(item);
  });

  return (cardElement)
}

// добавление исходных карточек
initialCards.forEach(function (initialCards) {
  cards.append(createCard(initialCards));
});

// ф-ция добавления новой карточки
const renderCard = function () {
  const item = {
    title: namePlaceInput.value,
    alt: namePlaceInput.value,
    src: linkPlaceInput.value
  };
  const newcard = createCard(item);
  cards.prepend(newcard);
}

// ф-ция сохранения новой картинки
function handlePlaceAddFormSubmit(evt) {
  evt.preventDefault();
  renderCard()

  closePopup(popupPlaceAddElement);

  namePlaceInput.value = '';
  linkPlaceInput.value = '';
}

// вызов ф-ции сохранения новых картинок при нажатии
formPlaceAddElement.addEventListener('submit', handlePlaceAddFormSubmit);

