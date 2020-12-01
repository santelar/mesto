import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(data) {
    this._popup.querySelector('.popup__image-place').src = data._link;
    this._popup.querySelector('.popup__image-place').alt = data._name;
    this._popup.querySelector('.popup__image-name').innerText = data._name;
    super.open();
  }
}