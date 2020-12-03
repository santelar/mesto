import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(data) {
    super.open();
    this._link = data.link;
    this._name = data.name;

    this._imagePlace = this._popup.querySelector('.popup__image-place');
    this._imagePlace.setAttribute('src', this._link);

    this._imageName = this._popup.querySelector('.popup__image-name');
    this._imagePlace.textContent = this._name;
  }
}