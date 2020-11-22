export class Card {
  constructor(data, template) {
    this._name = data.name;
    this._link = data.link;
    //this._handleCardClick = handleCardClick;
    this._template = template;
  }

  _setEventListeners () {
      this._element.querySelector('.button__like').addEventListener('click', (event) => {
      event.target.classList.toggle('button__like_activ');
    });
     this._element.querySelector('.button__delete').addEventListener('click', (event) => {
      event.target.closest('.card').remove();
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