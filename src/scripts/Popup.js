export class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handlerOverlayClose(evt) {
    if (evt.target !== this._popupSelector)
      return;
    this.close();
  }

  open() {
    console.log('open form');
    this._popupSelector.classList.add('popup_opened');
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this._popupSelector.querySelector('.popup__close')
      .addEventListener('click', this.close.bind(this));
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    document.addEventListener('click', this._handlerOverlayClose.bind(this));
  }

}