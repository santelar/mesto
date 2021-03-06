import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit, handleDefaultFormValues}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._handleDefaultFormValues = handleDefaultFormValues;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    
  }
  
  open() {
    super.open();
    this._handleDefaultFormValues();
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
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
    });
  }

  close() {
    super.close();
    this._form.reset();
    delete this._formValues;
  }
}