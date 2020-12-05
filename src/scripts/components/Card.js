export class Card {
  constructor(data, template, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._template = template;
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
