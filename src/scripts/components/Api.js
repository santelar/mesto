export class Api {
    constructor(config) {
      this._url = config.baseUrl;
      this._headers = config.headers;
      this._cardsUrl = config.cardsUrl;
      this._likesUrl = config.likesUrl;
      this._usersUrl = config.usersUrl;
      this._userUrl = config.userUrl;
      this._avatarUrl = config.avatarUrl;
      this._check = (res) => {if (res.ok) { return res.json() }
        return Promise.reject(`Ошибка: ${res.status}`)}
    }

    // Получить массив карточек с сервера
    getInitialCards() {
        return fetch(`${this._url}${this._cardsUrl}`, {
            method: 'GET',
        headers: this._headers,
        })
        .then(this._check);
    };

    // Добавить карточку на сервер
        addCard(data) {
        return fetch(`${this._url}${this._cardsUrl}`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then(this._check);
    };


    // Получить данные пользователя
    getUserInfo() {
        return fetch(`${this._url}${this._usersUrl}${this._userUrl}`, {
          method: 'GET',
          headers: this._headers,
        })
        .then(this._check);
    }

    // Изменить данные пользователя
    editUserInfo(data) {
        return fetch(`${this._url}${this._usersUrl}${this._userUrl}`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
            name: data.name,
            about: data.info
          })
        })
        .then(this._check);
    }

    // Изменить аватар
    editUserPic(data) {
        return fetch(`${this._url}${this._usersUrl}${this._avatarUrl}`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
            avatar: data.link,
          })
        })
        .then(this._check);
    }

    // Удалить карточку
    deleteCard(cardId) {
        return fetch(`${this._url}${this._cardsUrl}/${cardId}`, {
          method: 'DELETE',
          headers: this._headers,
        })
        .then(this._check);
    }

    // Постановка лайка карточке
    likeCard(card) {
        return fetch(`${this._url}${this._cardsUrl}/likes/${card._id}`, {
          method: 'PUT',
          headers: this._headers,
          body: JSON.stringify({
            likes: card.owner
          })
        })
        .then(this._check);
    }

    // Удаление лайка карточке
    unlikeCard(card) {
        return fetch(`${this._url}${this._cardsUrl}/likes/${card._id}`, {
          method: 'DELETE',
          headers: this._headers,
        })
        .then(this._check);
    }

}