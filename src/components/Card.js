export default class Card {
  constructor(dataCard, templateSelector, zoomPhoto, openDeletePopup, changeLike) {
    this._data = dataCard;
    this._name = dataCard.name;
    this._link = dataCard.link;
    this._myId = dataCard.my_id;
    this._ownerId = dataCard.owner._id;
    this._cardId = dataCard._id;
    this._likes = dataCard.likes;
    this._likesLength = dataCard.likes.length;
    this._templateSelector = templateSelector;
    this._zoomPhoto = zoomPhoto;
    this._openDeletePopup = openDeletePopup;
    this._changeLike = changeLike;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.place').cloneNode(true);
    return cardElement;
  }

  // метод открытия попапа увеличения картинки
  _handlePhotoClick = () => {
    this._zoomPhoto(this._data);
  }

  // методы для удаления карточки
  _hasTrashButton() {
    if (this._myId !== this._ownerId) {
      this._trashElement.remove();
    }
  }

  _handleTrashClick = () => {
    this._openDeletePopup({card: this, cardId: this._cardId});
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  //  методы для добавления лайка
  _handleLikeClick = () => {
    this._changeLike(this._likeElement, this._cardId);
  }

  _checkLikesStatus() {
    this._likes.forEach(item => {
      if (item._id === this._myId) {
        this._likeElement.classList.add('place__like-button_active')
        return
      }
    });
    this._likeCounterElement.textContent = this._likesLength;
  }

  toggelLike(likes) {
    this._likeElement.classList.toggle('place__like-button_active');
    this._likeCounterElement.textContent = likes.length;
  }

  // метод добавления обработчиков событий
  _setEventListeners() {
    this._likeElement.addEventListener('click', this._handleLikeClick);
    this._trashElement.addEventListener('click', this._handleTrashClick);
    this._photoElement.addEventListener('click', this._handlePhotoClick);
  }

  createCard() {
    this._element = this._getTemplate();

    this._photoElement = this._element.querySelector('.place__photo');
    this._titleElement = this._element.querySelector('.place__title');
    this._likeElement = this._element.querySelector('.place__like-button');
    this._likeCounterElement = this._element.querySelector('.place__like-counter');
    this._trashElement = this._element.querySelector('.place__trash-button');


    this._photoElement.src = this._link;
    this._photoElement.alt = this._name;
    this._titleElement.textContent = this._name;

    this._hasTrashButton();
    this._checkLikesStatus();
    this._setEventListeners();

    return this._element;
  }
}
