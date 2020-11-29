import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = document.querySelector(popupSelector)
    .querySelector('.popup__form');
    
  }
  
  close() {
    super.close();
    this._form.reset();
    delete this._formData;
  }

  _getInputValues(popupSelector) {
    console.log('popupSelector  ' + popupSelector);
    console.log('this._form  ' + this._form);
    
    this._inputList = document.querySelector(popupSelector)
    .querySelector('.popup__form')
    .querySelectorAll('.popup__input');
    console.log('this._inputList  ' + this._inputList);
    
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[name] = input.value;
    });
    console.log('this._inputList  ' + this._inputList);
    console.log('this._formValues  ' + this._formValues);
    return this._formValues;

  }  

  setEventListeners(popupSelector) {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      console.log('submit Form');
      this._handleFormSubmit();
      this._getInputValues(popupSelector);
      this.close();
    });
    
  }


}