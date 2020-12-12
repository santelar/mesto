export class FormValidator {
  constructor(validationConfig, _formElement) {
    this.validationConfig = validationConfig;
    this._formElement = _formElement;
    this._buttonElement = this._formElement.querySelector(this.validationConfig.submitButtonSelector);
    this._inputElements = Array.from(this._formElement.querySelectorAll(this.validationConfig.inputSelector))
    this._errorClassActive = validationConfig.errorClassActive;
    this._inputErrorClass = validationConfig.inputErrorClass;
  }

  _showError(_formElement, _input) {
    this._errorElement = this._formElement.querySelector(`#${_input.id}-error`);
    this._errorElement.textContent = _input.validationMessage;
    _input.classList.add(this.validationConfig.inputErrorClass);
  }
  
  hideError(_formElement, _input) {
    this._errorElement = this._formElement.querySelector(`#${_input.id}-error`);
    this._errorElement.textContent = '';
    _input.classList.remove(this.validationConfig.inputErrorClass);
  }
  
  _checkInputValidity(_formElement, _input) {
    if (_input.checkValidity()) {
      this.hideError(_formElement, _input);
    } else {
      this._showError(_formElement, _input);
    }    
  }
  
  _toggleButtonState() {
    if (this._formElement.checkValidity()) {
      this._buttonElement.classList.remove(this.validationConfig.submitButtonClass);
      this._buttonElement.disabled = false;
    } else {
      this._buttonElement.classList.add(this.validationConfig.submitButtonClass);
      this._buttonElement.disabled = true;
    }
  }
  
  _setEventListeners() {
    this._inputElements.forEach((_input) => {
      _input.addEventListener('input', (event) => {
        this._checkInputValidity(this._formElement, event.target);
        this._toggleButtonState(this._formElement, this._buttonElement);
      });
    });
  }

  clearInputErrors() {
      this._inputElements.forEach((_input) => {
        this.hideError(this._formElement, _input);
      });
    this._toggleButtonState(this._formElement, this._buttonElement);
  }

  
  _checkSubmitButton() {
    const submitButton = this._formElement.querySelector(this.validationConfig.submitButtonSelector);
    this._toggleButtonState(this._inputElements, submitButton);
  }

  resetForm() {
    const errorElements = Array.from(this._formElement.querySelectorAll(this.validationConfig.errorClass));
    errorElements.forEach((item) => {
      item.textContent = "";
      item.classList.remove(this._errorClassActive);
    });
    this._inputElements.forEach((item) => {
      item.classList.remove(this._inputErrorClass);
    })
    this._formElement.reset();
    this._checkSubmitButton();
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}


//resetForm();