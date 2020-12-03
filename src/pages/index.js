import { initialItems } from '../scripts/utils/initialItems.js';
import { Section } from '../scripts/components/Section.js';
import { Card } from '../scripts/components/Card.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { FormValidator } from '../scripts/components/FormValidator.js';

const elements = document.querySelector('.elements');
const template = document.querySelector('.template');

const profilePopup = document.querySelector('.popup__profile');
const formUser = document.querySelector('.popup__form_user');

const profileOpenButton = document.querySelector('.profile__edit');
const profileClose = document.querySelector('.popup__close_profile');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileNameInput = document.querySelector('.popup__input_name-profile');
const profileDescriptionInput = document.querySelector('.popup__input_description-profile');
const popupSave = document.querySelector('.popup__save');
const popupSaveDisable = document.querySelector('.popup__save_invalid');

const cardPopup = document.querySelector('.popup__card');
const formCard = document.querySelector('.popup__form_place');
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
  
  const cardSubmitButton = formCard.querySelector('.popup__save');
  cardSubmitButton.classList.add(validationConfig.submitButtonClass);
  cardSubmitButton.disabled = true;
  cardFormValidator.hideError(formCard, formCard
    .querySelector(validationConfig.inputSelector));
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

    const profileSubmitButton = formUser.querySelector('.popup__save');
    profileSubmitButton.classList.remove(validationConfig.submitButtonClass);
    profileSubmitButton.disabled = false;
    profileFormValidator.hideError(formUser, profileNameInput);
    profileFormValidator.hideError(formUser, profileDescriptionInput);
  }
});
profilePopupWithForm.setEventListeners();
profileOpenButton.addEventListener('click', () => {
  profilePopupWithForm.open();
});