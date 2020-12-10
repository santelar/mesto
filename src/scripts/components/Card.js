export class Card {
  constructor({name, link, likes, owner}, userId, template, {handleCardClick, likeCardHandler, deleteCardHandler}, cardId) {
    this._titleCard = name;
    this._linkCard = link;
    this._template = template;
    this._cardId = cardId;
    this._countLikes = likes;
    this._userId = userId;
    this._ownerId = owner._id;
  }

  _likeCard() {
    this._element.querySelector('.button__like').classList.toggle('button__like_activ');
  }

  _removeCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._element.querySelector('.button__like').addEventListener('click', this._likeCard.bind(this));
    this._element.querySelector('.button__delete').addEventListener('click', this._removeCard.bind(this));
    this._element.querySelector('.card__image').addEventListener('click', this._handleCardClick);
  }

  getIdCard() {
    return this._cardId;
  }

  generateCard() {
    this._element = this._template.content
    .querySelector('.card').cloneNode(true);
    
    this._setEventListeners();

    this._img = this._element.querySelector('.card__image');
    this._img.src = this._link;
    this._img.alt = this._name;
    this._element.querySelector('.card__title').innerText = this._name;
    return this._element;
  }

}
