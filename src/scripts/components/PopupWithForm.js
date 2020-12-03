import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit, handleProfileValues}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._handleProfileValues = handleProfileValues;
  }

  open() {
    super.open();
    this._handleProfileValues();
  }

  close() {
    super.close();
    this._form.reset();
    delete this._formValues;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }  

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      console.log('submit Form');
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }
}