import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(card) {
    this._popup.querySelector('.popup__image-place').src = card._link;
    this._popup.querySelector('.popup__image-place').alt = card._name;
    this._popup.querySelector('.popup__image-name').innerText = card._name;
    super.open();
  }
}