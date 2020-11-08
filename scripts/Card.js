import { template, addPopup, imagePopup } from './index.js';

export class Card {
  constructor(data, name, link, template) {
    this._name = data.name;
    this._link = data.link;
    this._template = template;
  }

  _openImage() {
    this._element.querySelector('.card__image').addEventListener('click', () => {
      document.querySelector('.popup__image-place').src = this._link;
      document.querySelector('.popup__image-name').alt = this._name;
      document.querySelector('.popup__image-place').innerText = this._name;
      addPopup(imagePopup);
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

  renderCard(elements) {
    this._element = template.content.cloneNode(true);

    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name;
    this._element.querySelector('.card__title').innerText = this._name;
    
    this._openImage();
    this._handleLike();
    this._deleteCard();

    elements.append(this._element);
  }
}
