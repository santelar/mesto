//Ф-ция - показать ошибку + подчеркнуто красным//
function showError(formElement, input, {inputErrorClass}) {
  const errorElement = formElement.querySelector(`#${input.id}-error`);
  errorElement.textContent = input.validationMessage;
  input.classList.add(inputErrorClass);
}

//Ф-ция - убрать ошибку + убрать красную черту//
function hideError(formElement, input, {inputErrorClass}) {
  const errorElement = formElement.querySelector(`#${input.id}-error`);
  errorElement.textContent = '';
  input.classList.remove(inputErrorClass);
}

//Ф-ция проверки валидности - Ошибки показать/убрать//
function checkInputValidity(formElement, input, {...rest}) {
  if (input.checkValidity()) {
    hideError(formElement, input, {...rest});
  } else {
    showError(formElement, input, {...rest});
  }    
}

//Ф-ция переключения состояния кнопки Сохранить//
function toggleButtonState(formElement, buttonElement, {submitButtonClass}) {
  if (formElement.checkValidity()) {
    buttonElement.classList.remove(submitButtonClass);
    buttonElement.disabled = false;
  } else {
    buttonElement.classList.add(submitButtonClass);
    buttonElement.disabled = true;
  }
}

//Ф-ция - создание массива инпутов из формы и применение валидации к каждому //
function setEventListeners(formElement, {inputSelector, submitButtonSelector, ...rest}) {
  const inputElements = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  inputElements.forEach((input) => {
    input.addEventListener('input', (evt) => {
      checkInputValidity(formElement, evt.target, {...rest});
      toggleButtonState(formElement, buttonElement, {...rest});
    });
  });
}

//Ф-ция - создание массива форм из верстки и далее запуск ф-ции инпутов//
function enableValidation({formSelector, ...rest}) {
  const formElements = Array.from(document.querySelectorAll(formSelector));
  formElements.forEach(form => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form, {...rest});
  });
}

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  submitButtonClass: 'popup__save_invalid',
  inputErrorClass: 'popup__input_invalid'
}

// Запуск валидации//
enableValidation(validationConfig);