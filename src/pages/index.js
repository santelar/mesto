//import './index.css';

import { Api } from '../scripts/components/Api.js';
//import { initialCards } from '../scripts/utils/initialCards.js';
import { Section } from '../scripts/components/Section.js';
import { Card } from '../scripts/components/Card.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { PopupWithSubmit } from '../scripts/components/PopupWithSubmit.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import {
  elements,
  template,
  profilePopup,
  profileAvatarContainer,
  profileAvatar,
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
  avatarPopup,
  formAvatar,
  popupAvatarInput,
  validationConfig
} from '../scripts/utils/constants.js';
//let userId = null;

// ///// Запуск валидации форм
const profileFormValidator = new FormValidator(validationConfig, formUser);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(validationConfig, formCard);
cardFormValidator.enableValidation();
const avatarFormValidator = new FormValidator(validationConfig, formAvatar);
avatarFormValidator.enableValidation();

// Api - идентификация
const api = new Api({
  serverUrl: "https://mesto.nomoreparties.co/v1/cohort-18",
  headers: {
    authorization: 'eaa08385-02d1-499c-a13e-a2b5f60e8932',
    "content-type": "application/json",
  }
});

// Рендер начальных карточек
api.getInitialCards().then((cards) => {
  renderInitialCards(cards);
  }
);

// Рендер карточек с сервера
const renderInitialCards = (cards) => {
  const section = new Section({
    items: cards,
    renderer: (item) => {
      const card = new Card (item, template,
        {handleCardClick: (name, link) => {
          popupWithImage.open(name, link);
          },
        likeCardHandler: () => {
          const likeCard = card.likeCard();
          const whatsIp = likeCard ? api.unlikeCard(card.getIdCard()):
            api.likeCard(card.getIdCard());

            whatsIp.then(data => {
              card.setLikes(data.likes)
              card.renderLikes();
            });
        },
        deleteCardHandler: () => {
          popupConfirm.open(card);
        }
      }, item._id);
      const cardElement = card.generateCard();
      section.addItem(cardElement);
    }
  }, elements);
  section.renderSection();
}

// Получаем с сервера данные пользователя
api.getUserInfo().then((data => {
  profileName.textContent = data.name;
  profileDescription.textContent = data.about;
  profileAvatar.src = data.avatar;
}));

// ///////////////////////////////////////////////
// //////// Экземпляры классов ///////////////////
// ///////////////////////////////////////////////

// ///// Попап аватара: Обработчики и листенеры ////////
// Обработчик открытия попапа аватара
profileAvatarContainer.addEventListener('click', function() {
  popupEditAvatar.open();
  avatarFormValidator.resetForm();
  popupEditAvatar.resetWaitSubmitButton();
})
// Обработчик редактирования аватара
const formSubmitAvatar = (evt) => {
  evt.preventDefault();
  profileAvatar.src = popupAvatarInput.value;
  popupEditAvatar.waitSubmitButton('Сохранение...');
  api.editUserAvatar(popupAvatarInput.value)
    .finally(() => {
      popupEditAvatar.close();
    });
}
// Листенеры по аватару
const popupEditAvatar = new PopupWithForm('.popup__avatar', formSubmitAvatar);
popupEditAvatar.setEventListeners();


// ///// Попап профайла: Обработчики и листенеры ////////
// Обработчик открытия попапа профайла
const userInfo = new UserInfo({
  profileName: profileName,
  profileDescription: profileDescription
});
profileOpenButton.addEventListener('click', function() {
  popupEditProfile.open();
  profileFormValidator.resetForm();
  popupEditProfile.resetloadSubmit();
  const currentInfo = userInfo.getUserInfo();

  profileNameInput.value = currentInfo.name;
  profileDescriptionInput.value = currentInfo.description;
});
// Обработчик редактирования профиля
const formSubmitProfile = (event) => {
  event.preventDefault();

  const info = {
    name: profileNameInput.value,
    description: profileDescriptionInput.value
  }
  popupEditProfile.loadSubmit('Сохранение...')
  api.editUserInfo(info.name, info.description)
    .finally(() => {
      userInfo.setUserInfo(info);
      popupEditProfile.close();
    });
}
// Листенеры по профайлу
const popupEditProfile = new PopupWithForm('.popup__profile', formSubmitProfile)
popupEditProfile.setEventListeners();


// ///// Попап карточки: Обработчик и листенеры ////////
// Обработчик открытия попапа добавления карточки
cardOpenButton.addEventListener('click', function() {
  popupAddCard.open();
  cardFormValidator.resetForm();
  popupAddCard.resetWaitSubmitButton();
})
// Обработчик добавления карточки
const formSubmitCard = (evt) => {
  evt.preventDefault();
  const titleCard = cardNameInput.value;
  const linkCard = cardDescriptionInput.value;
  api.addCard(titleCard, linkCard)
    .then(dataCard=> {
    const card = new Card (dataCard, template,  
      {
        handleCardClick: (name, link) => {
          popupWithImage.open(name, link);
        },
        likeCardHandler: () => {
          const likedCard = card.likedCard();
          const resultApi = likedCard ? api.unlikeCard(card.getIdCard()) : api.likeCard(card.getIdCard());
    
          resultApi.then(data => {
              card.setLikes(data.likes) // перезагрузка лайков
              card.renderLikes();
            });
        },
        deleteCardHandler: () => {
          popupConfirm.open(card);
        }
      }, dataCard._id);
    const cardElement = card.generateCard();
    elements.prepend(cardElement);
  });
  popupAddCard.close();
}
// Листенеры по добавлению карточек
const popupAddCard = new PopupWithForm('.popup__card', formSubmitCard)
popupAddCard.setEventListeners();


// ///// Попап полного изображения: Листенеры ////////
//Листенеры полного изображения
const popupWithImage = new PopupWithImage('.popup__image');
popupWithImage.setEventListeners();


// ///// Попап подтверждения (confirm): Обработчики и листенеры ////////
// Обработчик подтверждения
const formConfirm = (evt, card) => {
  evt.preventDefault();

  popupConfirm.loadSubmit('Удаление...');
  api.deleteCard(card.getIdCard())
    .then(response => {
      card.deleteCard();
    }).finally(() => {
      popupConfirm.close();
      popupConfirm.resetLoadSubmit();
    });
}
// Листенеры по подтверждению
const popupConfirm = new PopupWithSubmit('.popup__confirm', (evt, card) => {
    formConfirm(evt, card)
  }
)
popupConfirm.setEventListeners();