import { initialItems } from './initialItems.js';
import { Section } from './Section.js';
import { Card } from './Card.js';
import { Popup } from './Popup.js';
import { PopupWithImage } from './PopupWithImage.js';
import { UserInfo } from './UserInfo.js';
import { FormValidator } from './FormValidator.js';

const elements = document.querySelector('.elements');

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

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  submitButtonClass: 'popup__save_invalid',
  inputErrorClass: 'popup__input_invalid'
}

const popupProfile = new Popup('.popup__profile');
const popupCard = new Popup('.popup__card');
const popupImage = new Popup('.popup__image');




const section = new Section({
  data: initialItems,
  renderer: (item) => {
    const card = new Card(item.name, item.link, () => {
      const imageBigSize = new PopupWithImage('.popup__image', card);
      imageBigSize.open();
      imageBigSize.setEventListeners();
      }, '.template');
    const cardElement = card.generateCard();
    section.addItem(cardElement);
  },
},
  elements
);

section.renderSection();

const submitCard = (event) => {
  event.preventDefault();
  const name = cardNameInput.value
  const link = cardDescriptionInput.value
  const newCard = new Card(name, link, () => {
    const newPopupWithImage = new PopupWithImage('.popup__image',newCard );
    newPopupWithImage.open();
    newPopupWithImage.setEventListeners();
    }, '.template');
  const list = newCard.generateCard();
  elements.prepend(list);
  popupCard.close();
}





//Запуск валидации
const formUser = document.querySelector('.popup__form_user');
const newformUser = new FormValidator(validationConfig, formUser);
newformUser.enableValidation();

const formCard = document.querySelector('.popup__form_place');
const newformCard = new FormValidator(validationConfig, formCard);
newformCard.enableValidation();

// Ф-ция дизейбла кнопки Создать попапа добавления карточек //
const disableButtonState = (popupType) => {
  popupType.querySelector('.popup__save').classList.add(validationConfig.submitButtonClass);
  popupType.querySelector('.popup__save').disabled = true;
}

// Обработчик открытия попапа //
const userInfo = new UserInfo({ profileName, profileDescription });
profileOpenButton.addEventListener('click', () => {
  newformUser.clearInputErrors(profilePopup);
  popupProfile.open();
  popupProfile.setEventListeners();
  const mainInfo = userInfo.getUserInfo();
  //profileNameInput.value = mainInfo.name;
  //profileDescriptionInput.value = mainInfo.description;
});
cardOpenButton.addEventListener('click', () => {
  cardNameInput.value = '';
  cardDescriptionInput.value = '';
  newformCard.clearInputErrors(cardPopup);
  popupCard.open();
  popupCard.setEventListeners();
  disableButtonState(cardPopup);
});

// Обработчик сохранения //
profilePopup.addEventListener('submit', () => {
  userInfo.setUserInfo()
});
cardPopup.addEventListener('submit', submitCard);