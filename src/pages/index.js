import './index.css';

import { initialItems } from '../scripts/utils/initialItems.js';
import { Section } from '../scripts/components/Section.js';
import { Card } from '../scripts/components/Card.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import {
  elements,
  template,
  profilePopup,
  formUser,
  profileOpenButton,
  profileName,
  profileDescription,
  profileNameInput,
  profileDescriptionInput,
  cardPopup,
  formCard,
  cardOpenButton,
  cardNameInput,
  cardDescriptionInput,
  validationConfig
} from '../scripts/utils/constants.js';


// ///// Запуск валидации
const profileFormValidator = new FormValidator(validationConfig, formUser);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(validationConfig, formCard);
cardFormValidator.enableValidation();

// ///// Шаблоны функций:

// ///// Шаблон - Попап большой картинки
const popupWithImage = new PopupWithImage('.popup__image');
popupWithImage.setEventListeners();

// /////Шаблон - Отрисовка карточки
function renderCard (data) {
  const newCard = new Card (data, template, () => {
    popupWithImage.open(data)
  });
  const cardElement = newCard.generateCard();
  return cardElement;
}

// ///// Шаблон - Кнопка сабмит
function handleSubmitButton (popup, buttonSelector) {
  submitButton = popup.querySelector(buttonSelector);
  return submitButton;
}

// ///// Секция - отрисовка массива карточек
const section = new Section({
  items: initialItems,
  renderer: (data) => {
    const renderNewCard = renderCard (data);
    section.addItem(renderNewCard);
  }
}, elements);
section.renderSection();


// ///// Создание новой карточки
const newPopupCardForm = new PopupWithForm('.popup__card',
  {handleFormSubmit: (data) => {
    const renderNewCard = renderCard (data);
    section.addNewItem(renderNewCard);
  },
  handleProfileValues: () => {
    cardFormValidator.hideError(formCard, cardNameInput);
    cardFormValidator.hideError(formCard, cardDescriptionInput);
  }
});
newPopupCardForm.setEventListeners();

cardOpenButton.addEventListener('click', () => {
  newPopupCardForm.open();
  
  cardFormValidator.clearInputErrors();
});


// ///// Форма Профайла - Переназначение имени/профессии
const userData = new UserInfo({
  profileName: profileName,
  profileDescription: profileDescription
});

const profilePopupWithForm = new PopupWithForm('.popup__profile',
  {handleFormSubmit: (formData) => {
    const newUserData = userData.setUserInfo(formData);
  },
  handleProfileValues: () => {
    const openProfileData = userData.getUserInfo();
    profileNameInput.value = openProfileData.name;
    profileDescriptionInput.value = openProfileData.description;

    profileFormValidator.clearInputErrors();
  }
});
profilePopupWithForm.setEventListeners();
profileOpenButton.addEventListener('click', () => {
  profilePopupWithForm.open();
});