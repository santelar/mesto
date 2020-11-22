export class Card {
  constructor(name, link, template, openImagePopup) {
    this._name = name;
    this._link = link;
    this._template = template;
    this._openImagePopup = openImagePopup;
  }

  _setEventListeners() {
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._openImagePopup(this._name, this._link);
    });
      this._element.querySelector('.button__like').addEventListener('click', (event) => {
      event.target.classList.toggle('button__like_activ');
    });
     this._element.querySelector('.button__delete').addEventListener('click', (event) => {
      event.target.closest('.card').remove();
    });
  }

  renderCard() {
    this._element = this._template.content.cloneNode(true);

    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name;
    this._element.querySelector('.card__title').innerText = this._name;

    this._setEventListeners();
    
    return this._element;
  }
}