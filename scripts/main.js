let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__edit');
let popupCloseButton = popup.querySelector('.popup__close');
let name = document.querySelector('.profile__name');
let description = document.querySelector('.profile__description');
let nameInput = popup.querySelector('.popup__edit-name');
let descriptionInput = popup.querySelector('.popup__edit-description');
let popupSaveButton = popup.querySelector('.popup__save');

// Функция переключения класса попапа
let popupToggle = function () {
  popup.classList.toggle('popup_opened');
}

// Функция закрытия попапа при клике вне попапа
let closePopup = function (event){
  if (event.target !== event.currentTarget) return
  popupToggle(event);
}

// Функция переноса в попап данных профайла при открытии попапа
function formOpenHandler (evt) {
  evt.preventDefault();
  nameInput.value = document.getElementsByTagName("h1")['0'].textContent;
  descriptionInput.value = document.getElementsByTagName("h3")['0'].textContent;
}

// Обработчик открытия попапа
popupOpenButton.addEventListener('click', formOpenHandler);
popupOpenButton.addEventListener('click', popupToggle);

// Обработчик закрытия попапа без сохранения
popupCloseButton.addEventListener('click', popupToggle);
popup.addEventListener('click', closePopup);

// Функция сохранения
function formSubmitHandler (evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  description.textContent = descriptionInput.value;
}

// Обработчик сохранения
popupSaveButton.addEventListener('click', formSubmitHandler);
popupSaveButton.addEventListener('click', closePopup);