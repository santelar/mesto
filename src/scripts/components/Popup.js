export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handlerOverlayClose(evt) {
    if (evt.target !== evt.currentTarget) {
      return;
    }
    this.close();
  }

  open() {
    console.log('open form');
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this._popup.querySelector('.popup__close')
      .addEventListener('click', this.close.bind(this));
    this._popup.addEventListener('mousedown', this._handlerOverlayClose.bind(this));
  }

}