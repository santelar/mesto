export class Card {
  constructor(name, link, template, openImagePopup) {
    this._name = name;
    this._link = link;
    this._template = template;
    this._openImagePopup = openImagePopup;
  }

  _openImage() {
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._openImagePopup(this._name, this._link);
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

    return this._element;
  }
}
