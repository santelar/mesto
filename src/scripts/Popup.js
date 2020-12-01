export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handlerOverlayClose(evt) {
    if (evt.target !== this._popup)
      return;
    this.close();
  }

  open() {
    console.log('open form');
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this._popup.querySelector('.popup__close')
      .addEventListener('click', this.close.bind(this));
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    document.addEventListener('click', this._handlerOverlayClose.bind(this));
  }

}