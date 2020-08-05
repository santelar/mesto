let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__edit');
let popupCloseButton = popup.querySelector('.popup__close');

let popupToggle = function () {
  popup.classList.toggle('popup_opened');
}

let closePopup = function (event){
  if (event.target !== event.currentTarget) return
  popupToggle(event);
}

popupOpenButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);
popup.addEventListener('click', closePopup);

let popupSaveButton = popup.querySelector('.popup__save');

function formSubmitHandler (evt) {
  evt.preventDefault();

let nameInput = popup.querySelector('.popup__edit-name');
let descriptionInput = popup.querySelector('.popup__edit-description');

let name = document.querySelector('.profile__name');
let description = document.querySelector('.profile__description');

name.textContent = nameInput.value;
description.textContent = descriptionInput.value;
}

popupSaveButton.addEventListener('click', formSubmitHandler);
popupSaveButton.addEventListener('click', popupToggle);