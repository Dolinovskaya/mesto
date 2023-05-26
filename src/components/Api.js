export default class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
    this._authorization = options.headers.authorization;
  }

  _checkResponse(res) {
    if (res.ok) {
          return res.json();
        }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // загрузка информации о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._authorization
      }
    })
      .then(this._checkResponse);
  }

  // редактирование профиля
  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.userName,
        about: data.userJob
      })
    })
      .then(this._checkResponse);
  }

  // обновление аватара пользователя
  setUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatarLink
      })
    })
      .then(this._checkResponse);
  }

  // загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._authorization
      }
    })
      .then(this._checkResponse);
  }

  // добавление новой карточки
  addNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.placeTitle,
        link: data.placeLink
      })
    })
      .then(this._checkResponse);
  }
  // постановка лайка
  addLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization
      }
    })
      .then(this._checkResponse);
  }

  // снятие лайка
  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    })
      .then(this._checkResponse);
  }

  // удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    })
      .then(this._checkResponse);
  }
}
