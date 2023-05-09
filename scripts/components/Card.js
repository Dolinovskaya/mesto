export default class Card {
  constructor(data, templateSelector, zoomPhoto) {
    this._data = data;
    this._title = data.title;
    this._link = data.link;
    this._alt = data._alt;
    this._templateSelector = templateSelector;
    this._zoomPhoto = zoomPhoto;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.place').cloneNode(true);
    return cardElement;
  }

  createCard() {
    this._element = this._getTemplate();

    this._photoElement = this._element.querySelector('.place__photo');
    this._titleElement = this._element.querySelector('.place__title');
    this._likeElement = this._element.querySelector('.place__like-button');
    this._trashElement = this._element.querySelector('.place__trash-button');

    this._photoElement.src = this._link;
    this._photoElement.alt = this._alt;
    this._titleElement.textContent = this._title;

    this._setEventListeners();

    return this._element;
  }

  // метод добавления обработчиков событий
  _setEventListeners() {
    this._likeElement.addEventListener('click', this._handleLikeClick);
    this._trashElement.addEventListener('click', this._handleTrashClick);
    this._photoElement.addEventListener('click', this._handlePhotoClick);
  }

  //  метод добавления лайка
  _handleLikeClick = () => {
    this._likeElement.classList.toggle('place__like-button_active');
  }

  // метод удаления карточки
  _handleTrashClick = () => {
    this._element.remove();
  }

  // метод открытия попапа увеличения картинки
  _handlePhotoClick = () => {
    this._zoomPhoto(this._data);
  }
}
