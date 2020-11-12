import { addPopup } from './index.js';

export class Card {
  constructor(data, name, link) {
    this._name = data.name;
    this._link = data.link;
    this._template = document.querySelector('.template');
  }

  _openImage() {
    this._element.querySelector('.card__image').addEventListener('click', () => {
      document.querySelector('.popup__image-place').src = this._link;
      document.querySelector('.popup__image-name').alt = this._name;
      document.querySelector('.popup__image-place').innerText = this._name;
      addPopup(document.querySelector('.popup__image'));
    });
  }

  _handleLike() {
    this._element.querySelector('.button__like').addEventListener('click', (event) => {
    event.target.classList.toggle('button__like_activ');
    });
  }

  _deleteCard() {
    this._element.querySelector('.button__delete').addEventListener('click', (event) => {
    event.target.closest('.card').remove();
    });
  }

  renderCard() {
     this._element = this._template.content.cloneNode(true);

    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name;
    this._element.querySelector('.card__title').innerText = this._name;
    
    this._openImage();
    this._handleLike();
    this._deleteCard();

    const elements = document.querySelector('.elements');
    elements.prepend(this._element);
  }
}
