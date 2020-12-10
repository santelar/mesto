import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitPopup) {
    super(popupSelector);
    this._formSubmitPopup = formSubmitPopup;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._closeButton = this._popup.querySelector('.popup__close');
    this._submitButton = this._form.querySelector('.popup__save');
    this._submitButtonText = this._submitButton.value;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    //return this._formValues;
  }  

  loadSubmit(text) {
    this._submitButton.value = text;
  }

  resetLoadSubmit() {
    this._submitButton.value = this._submitButtonText;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      //evt.preventDefault();
      //console.log('submit Form');
      this._formSubmitPopup(evt);
    });
    this._closeButton.addEventListener('click', () => {
      this.close();
    });
  }
}