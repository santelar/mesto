import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector, cardSelector) {
    super(popupSelector);
    this._cardSelector = cardSelector;
  }

  open() {
    this._popupSelector.querySelector('.popup__image-place').src = this._cardSelector._link;
    this._popupSelector.querySelector('.popup__image-place').alt = this._cardSelector._name;
    this._popupSelector.querySelector('.popup__image-name').innerText = this._cardSelector._name;
    super.open();
  }

}