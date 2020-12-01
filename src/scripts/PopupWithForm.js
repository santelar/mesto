import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit, clearFormValues}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._clearFormValues = clearFormValues;
    
  }

  _hideErrors() {
    this._inputErrors = Array.from(this._popup.querySelectorAll('.error'));
    this._inputErrors.forEach((item) => {
      item.textContent = '';
    });
    this._inputsWithErrors = Array.from(this._inputList);
    this._inputsWithErrors.forEach((errorInput) => {
      errorInput.classList.remove('popup__input_invalid');
    });
  }

  open() {
    super.open();
    this._hideErrors();
    this._clearFormValues();
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
    return this._formValues
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