import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(name, link, popupSelector) {
    super(popupSelector);
    this._link = link;
    this._name = name;
  }

  open() {
    console.log('pwi open');
    this._popupSelector.querySelector('.popup__image-place').src = this._link;
    this._popupSelector.querySelector('.popup__image-place').alt = this._name;
    this._popupSelector.querySelector('.popup__image-name').innertext = this._name;
    super.open();
  }

}
/*
const addCardHandler = (evt) => {
  evt.preventDefault();
  const newPlace = new Card(placeDescInput.value,
  placeImgInput.value, '.elements__template', () => {
    const image = new PopupWithImage(newPlace,
    imageFullSize);
    image.setEventListeners();
    image.open();
  });
  cardPosition.prepend(newPlace.create());
  placePopup.close();
}
*/