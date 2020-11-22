import { placesCards } from './imageMassive.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const elements = document.querySelector('.elements');
const template = document.querySelector('.template');

const profilePopup = document.querySelector('.popup__profile');
const profileOpenButton = document.querySelector('.profile__edit');
const profileClose = document.querySelector('.popup__close_profile');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileNameInput = document.querySelector('.popup__input_name-profile');
const profileDescriptionInput = document.querySelector('.popup__input_description-profile');

const cardPopup = document.querySelector('.popup__card');
const cardOpenButton = document.querySelector('.button_add_card');
const cardClose = document.querySelector('.popup__close_card');
const cardNameInput = document.querySelector('.popup__input_name-card');
const cardDescriptionInput = document.querySelector('.popup__input_url-card');

const imagePopup = document.querySelector('.popup__image');
const imageClose = document.querySelector('.popup__close_image');
const imageName = document.querySelector('.popup__image-name');
const imagePlace = document.querySelector('.popup__image-place');


const openImagePopup = (name, link) => {
  imagePlace.src = link;
  imagePlace.alt = name;
  imageName.innerText = name;
  addPopup(imagePopup);
};

const addItem = (name, link) => {
  const listItem = new Card(name, link, template, openImagePopup);
  const list = listItem.renderCard();
  elements.append(list);
}

placesCards.forEach(item => addItem(item.name, item.link));

// Функция сохранения НОВОЙ Карточки //
const submitCard = (event) => {
  event.preventDefault();
  const addNewItem = (name, link) => {
    const listItem = new Card(name, link, template, openImagePopup);
    const list = listItem.renderCard();
    elements.prepend(list);
  }
  addNewItem(cardNameInput.value, cardDescriptionInput.value);
  cardNameInput.value = '';
  cardDescriptionInput.value = '';
  closePopup(cardPopup);
}

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  submitButtonClass: 'popup__save_invalid',
  inputErrorClass: 'popup__input_invalid'
}

const formUser = document.querySelector('.popup__form_user');
const newformUser = new FormValidator(validationConfig, formUser);
newformUser.enableValidation();

const formCard = document.querySelector('.popup__form_place');
const newformCard = new FormValidator(validationConfig, formCard);
newformCard.enableValidation();


// Ф-ция закрытия попапа по Esc //
const closePopupByEsc = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(evt.currentTarget.querySelector('.popup_opened'));
  }
}

// Ф-ция открытия попапа + возможность закрыть попап по Esc //
const addPopup = (popupType) => {
  popupType.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

// Ф-ция закрытия попапа //
const closePopup = (popupType) => {
  popupType.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

// Ф-ция дизейбла кнопки Создать попапа добавления карточек //
const disableButtonState = (popupType) => {
  popupType.querySelector('.popup__save').classList.add(validationConfig.submitButtonClass);
  popupType.querySelector('.popup__save').disabled = true;
}

// Функция переноса в попап данных профайла при открытии попапа Name //
function fillProfilePopupInputs() {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

// Функция сохранения Профайла //
function submitProfile(event) {
  event.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profilePopup);
}

// Обработчик открытия попапа //
profileOpenButton.addEventListener('click', () => {
  fillProfilePopupInputs();
  newformUser.clearInputErrors(profilePopup);
  addPopup(profilePopup);
});
cardOpenButton.addEventListener('click', () => {
  cardNameInput.value = '';
  cardDescriptionInput.value = '';
  newformCard.clearInputErrors(cardPopup);
  addPopup(cardPopup);
  //disableButtonState(cardPopup);
});

// Обработчик закрытия попапа без сохранения //
profileClose.addEventListener('click', () => {
  closePopup(profilePopup);
});
profilePopup.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    closePopup(profilePopup);
  };
});

cardClose.addEventListener('click', () => {
  closePopup(cardPopup);
});
cardPopup.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    closePopup(cardPopup);
  };
});

imageClose.addEventListener('click', () => closePopup(imagePopup));
imagePopup.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    closePopup(imagePopup);
  };
});

// Обработчик сохранения //
profilePopup.addEventListener('submit', submitProfile);
cardPopup.addEventListener('submit', submitCard);