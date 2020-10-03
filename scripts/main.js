let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__edit');
let popupCloseButton = popup.querySelector('.popup__close');
let name = document.querySelector('.profile__name');
let description = document.querySelector('.profile__description');
let nameInput = popup.querySelector('.popup__name');
let descriptionInput = popup.querySelector('.popup__description');

// Функция переноса в попап данных профайла при открытии попапа //
function formOpenHandler () {
  nameInput.value = name.textContent;
  descriptionInput.value = description.textContent;
}

// Функция переключения класса попапа //
let popupToggle = function () {
  if (popup.classList.contains('popup_opened') !== true) {
    formOpenHandler ();
  }
  popup.classList.toggle('popup_opened');
}

// Функция сохранения //
function formSubmitHandler (event) {
  event.preventDefault();
  name.textContent = nameInput.value;
  description.textContent = descriptionInput.value;
  popupToggle ();
}

// Обработчик открытия попапа //
popupOpenButton.addEventListener('click', popupToggle);

// Обработчик закрытия попапа без сохранения //
popupCloseButton.addEventListener('click', popupToggle);

// Обработчик сохранения //
popup.addEventListener('submit', formSubmitHandler);