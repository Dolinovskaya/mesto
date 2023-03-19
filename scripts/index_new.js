// popups
const popupProfileEditElement = document.querySelector('.popup__profile-edit');
const popupPlaceAddElement = document.querySelector('.popup__place-add');
const popupImageZoomElement = document.querySelector('.popup__image-zoom');

// popups open button
const popupProfileEditOpenButtonElement = document.querySelector('.profile__edit-button');
const popupPlaceAddOpenButtonElement = document.querySelector('.profile__add-button');
const popupImageZoomOpenButtonElement = document.querySelector('.place__photo');

console.log(popupImageZoomOpenButtonElement);

// popups close button
const popupProfileEditCloseButtonElement = popupProfileEditElement.querySelector('.popup__close-button');
const popupPlaceAddCloseButtonElement = popupPlaceAddElement.querySelector('.popup__close-button');
const popupImageZoomCloseButtonElement = popupImageZoomElement.querySelector('.popup__close-button');

console.log(popupProfileEditCloseButtonElement, popupPlaceAddCloseButtonElement, popupImageZoomCloseButtonElement);

// ф-ция открытия попапа
const openPopup = function (popup) {
  popup.classList.add('popup_opened');
}

// ф-ция закрытия попапа
const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
}

// вызов открытия/закрытия попапа при нажатии кнопок
popupProfileEditOpenButtonElement.addEventListener('click', function () {
  openPopup(popupProfileEditElement)
});
popupProfileEditCloseButtonElement.addEventListener('click', function () {
  closePopup(popupProfileEditElement)
});

popupPlaceAddOpenButtonElement.addEventListener('click', function () {
  openPopup(popupPlaceAddElement)
});
popupPlaceAddCloseButtonElement.addEventListener('click', function () {
  closePopup(popupPlaceAddElement)
});

popupImageZoomOpenButtonElement.addEventListener('click', function () {
  openPopup(popupImageZoomElement)
});
popupImageZoomCloseButtonElement.addEventListener('click', function () {
  closePopup(popupImageZoomElement)
});


