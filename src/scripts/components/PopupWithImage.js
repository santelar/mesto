import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imagePlace = this._popup.querySelector('.popup__image-place');
    this._imageName = this._popup.querySelector('.popup__image-name');
  }

  open(data) {
    super.open();
    this._imagePlace.src = data.link;
    this._imagePlace.alt = data.name;
    this._imageName.textContent = data.name;

    //this._imagePlace.setAttribute('src', this._link);
    //this._imagePlace.textContent = this._name;
  }
}