export class Card {
  constructor(name, link, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._handleCardClick = handleCardClick;
    this._template = document.querySelector(templateSelector);
  }

    _setEventListeners () {
      this._element.querySelector('.button__like').addEventListener('click', (event) => {
      event.target.classList.toggle('button__like_activ');
    });
     this._element.querySelector('.button__delete').addEventListener('click', (event) => {
      event.target.closest('.card').remove();
    });
      this._element.querySelector('.card__image').addEventListener('click', () => {
        console.log('click on image');
        this._handleCardClick();
    });

  }

  generateCard() {
    this._element = this._template
    .content
    .cloneNode(true);

    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name;
    this._element.querySelector('.card__title').innerText = this._name;

    this._setEventListeners();
    
    return this._element;
  }

}