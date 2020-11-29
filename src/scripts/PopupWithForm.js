import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupSelector.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
  }
  
  close() {
    super.close();
    this._form.reset();
    delete this._formData;
  }

  _getInputValues() {
    console.log(this._popupSelector);
    this._formData = {};
    this._inputList.forEach(input => {
      this._formData[input.name] = input.value;
    });
    return this._formValues;
  }  

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
    
  }


}