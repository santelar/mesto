import { initialItems } from './initialItems.js';
import { Section } from './Section.js';
import { Card } from './Card.js';
import { Popup } from './Popup.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
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
const popupSave = document.querySelector('.popup__save');
const popupSaveDisable = document.querySelector('.popup__save_invalid');

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

// ///// Запуск валидации
const formUser = document.querySelector('.popup__form_user');
const newformUser = new FormValidator(validationConfig, formUser);
newformUser.enableValidation();

const formCard = document.querySelector('.popup__form_place');
const newformCard = new FormValidator(validationConfig, formCard);
newformCard.enableValidation();

// ///// Секция - отрисовка массива карточек
const section = new Section({
  data: initialItems,
  renderer: (item) => {
    const card = new Card(item, '.template', () => {
      const popupWithImage = new PopupWithImage('.popup__image');
      popupWithImage.open(card);
      popupWithImage.setEventListeners();
      });
    const cardElement = card.generateCard();
    section.addItem(cardElement);
  },
},
  elements
);
section.renderSection();

// ///// Создание новой карточки
const newPopupCardForm = new PopupWithForm('.popup__card',
  {handleFormSubmit: (data) => {
    const newCard = new Card(data, '.template', () => {
      popupWithImage.open(newCard);
      popupWithImage.setEventListeners();
    });
    const newCardElement = newCard.generateCard();
    elements.prepend(newCardElement);
    //newPopupCardForm.close();
  },
  clearFormValues: () => {
  }
});

cardOpenButton.addEventListener('click', () => {
  newPopupCardForm.open();
  newPopupCardForm.setEventListeners();
  
});


// ///// Форма Профайла
const userData = new UserInfo({
  profileName: profileName,
  profileDescription: profileDescription
});

const newPopupProfileForm = new PopupWithForm('.popup__profile',
  {handleFormSubmit: (data) => {
    const newUserData = userData.setUserInfo(data);
  },
  clearFormValues: () => {
    const openUserData = userData.getUserInfo();

    profileNameInput.value = openUserData.name;
    profileDescriptionInput.value = openUserData.description;
    popupSave.classList.remove(popupSaveDisable);
    popupSave.disabled = false;
  }
});
newPopupProfileForm.setEventListeners();

profileOpenButton.addEventListener('click', () => {
  newPopupProfileForm.open();
});