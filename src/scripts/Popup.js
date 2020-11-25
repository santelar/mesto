export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  _handleEscClose (evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  open () {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  close () {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners () {
    this._popupSelector.querySelector('.popup__close')
    .addEventListener('click', this.close.bind(this));
  };

}