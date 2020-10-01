let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__edit');
let popupCloseButton = popup.querySelector('.popup__close');
let name = document.querySelector('.profile__name');
let description = document.querySelector('.profile__description');
let nameInput = popup.querySelector('.popup__edit_name');
let descriptionInput = popup.querySelector('.popup__edit_description');
let popupSaveButton = popup.querySelector('.popup__save');

// Функция переноса в попап данных профайла при открытии попапа //
function formOpenHandler () {
  nameInput.value = document.getElementsByClassName("profile__name")['0'].textContent;
  descriptionInput.value = document.getElementsByClassName("profile__description")['0'].textContent;
}

// Функция переключения класса попапа //
let popupToggle = function () {
  if (popup.classList.contains('popup_opened') !== true) {
    popup.classList.toggle('popup_opened');
    formOpenHandler ();
  } else {
    popup.classList.toggle('popup_opened');
  }
}

// Функция закрытия попапа при клике вне попапа //
let closePopup = function (event) {
  if (event.target !== event.currentTarget) return
  popupToggle(event);
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
popup.addEventListener('click', closePopup);

// Обработчик сохранения //
popup.addEventListener('submit', formSubmitHandler);