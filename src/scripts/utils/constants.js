export const elements = document.querySelector('.elements');
export const template = document.querySelector('.template');

export const profilePopup = document.querySelector('.popup__profile');
export const profileAvatarContainer = document.querySelector('.profile__avatar-container');
export const profileAvatar = document.querySelector('.profile__avatar');
export const formUser = document.querySelector('.popup__form_user');
export const profileOpenButton = document.querySelector('.profile__edit');
export const profileName = document.querySelector('.profile__name');
export const profileDescription = document.querySelector('.profile__description');
export const profileNameInput = document.querySelector('.popup__input_name-profile');
export const profileDescriptionInput = document.querySelector('.popup__input_description-profile');

export const cardPopup = document.querySelector('.popup__card');
export const formCard = document.querySelector('.popup__form_place');
export const cardOpenButton = document.querySelector('.button_add_card');
export const cardNameInput = document.querySelector('.popup__input_name-card');
export const cardDescriptionInput = document.querySelector('.popup__input_url-card');

export const avatarPopup = document.querySelector('.popup__avatar');
export const formAvatar = document.querySelector('.popup__form_avatar');
export const popupAvatarInput = document.querySelector('.popup__input_name-avatar');

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  submitButtonClass: 'popup__save_invalid',
  inputErrorClass: 'popup__input_invalid'
}