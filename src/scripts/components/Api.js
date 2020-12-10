export class Api {
    constructor(serverUrl, headers) {
        this._serverUrl = serverUrl;
        this._headers = headers;
    }

    // Получить массив карточек с сервера
    getInitialCards() {
        return fetch(`${this._serverUrl}/cards`, {
            method: "GET",
            headers: this._headers
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject("Произошла ошибка");
        })
        .catch(error => {
            console.log(error);
        })
    }

    // Добавить карточку на сервер
    addCard(name, link) {
        return fetch(`${this._serverUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject("Произошла ошибка");
        })
        .catch(error => {
            console.log(error);
        })
    }

    // Получить данные пользователя
    getUserInfo() {
        return fetch(`${this._serverUrl}/users/me`, {
            method: "GET",
            headers: this._headers,
        }).then((res) => {
            if (res.ok) {
                return res.json();
        }   
            return Promise.reject("Произошла ошибка");
        })
        .catch(error => {
            console.log(error);
        })
    }

    // Изменить данные пользователя
    editUserInfo(name, description) {
        return fetch(`${this._serverUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: description
             })
        }).then((res) => {
            if (res.ok) {
                return res.json();
        }   
            return Promise.reject("Произошла ошибка");
        })
        .catch(error => {
            console.log(error);
        })
    }

    // Удалить карточку
     deleteCard(cardId) {
        return fetch(`${this._serverUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then((res) => {
            if (res.ok) {
                return res.json();
        }   
            return Promise.reject("Произошла ошибка");
        })
        .catch(error => {
            console.log(error);
        })
    }

    // Отредактировать аватар пользователя
    editUserAvatar(urlAvatar) {
        return fetch(`${this._serverUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: urlAvatar
            })
        }).then((res) => {
            if (res.ok) {
                return res.json();
        }   
            return Promise.reject("Произошла ошибка");
        })
        .catch(error => {
            console.log(error);
        })
    }

    // Постановка лайка карточке
    likeCard(cardId) {
        return fetch(`${this._serverUrl}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this._headers,
        }).then((res) => {
            if (res.ok) {
                return res.json();
        }   
            return Promise.reject("Произошла ошибка");
        })
        .catch(error => {
            console.log(error);
        })
    }

    // Удаление лайка карточке
    unlikeCard(cardId) {
        return fetch(`${this._serverUrl}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then((res) => {
            if (res.ok) {
                return res.json();
        }   
            return Promise.reject("Произошла ошибка");
        })
        .catch(error => {
            console.log(error);
        })
    }

}