const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    submitButtonClass: 'popup__save_invalid',
    inputErrorClass: 'popup__input_invalid'
  }

class FormValidator {
    constructor(validationConfig) {
        this.validationConfig = validationConfig;
    }
}