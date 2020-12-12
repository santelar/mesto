import './index.css';

import { Api } from '../scripts/components/Api.js';
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
  cardListSelector,
  popupWithSubmitSelector,
  cardSelector,
  likesCounterSelector,
  popupWithImageSelector,
  popupEdProfSelector,



  userID,
  profilePopup,
  profileAvatarContainer,
  profileAvatar,
  formUser,
  profileOpenButton,
  profileName,
  profileDescription,
  profileNameInput,
  profileDescriptionInput,
  profileSubmitButton,
  cardPopup,
  formCard,
  cardOpenButton,
  cardNameInput,
  cardDescriptionInput,
  cardSubmitButton,
  avatarPopup,
  formAvatar,
  popupAvatarInput,
  avatarSubmitButton,
  validationConfig
} from '../scripts/utils/constants.js';

// ///// Запуск валидации форм
const profileFormValidator = new FormValidator(validationConfig, formUser);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(validationConfig, formCard);
cardFormValidator.enableValidation();
const avatarFormValidator = new FormValidator(validationConfig, formAvatar);
avatarFormValidator.enableValidation();

// Api - идентификация
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-18',
  cardsUrl: '/cards',
  usersUrl: '/users',
  userUrl: '/me',
  avatarUrl: '/me/avatar',
  headers: {
    authorization: 'eaa08385-02d1-499c-a13e-a2b5f60e8932',
    'Content-Type': 'application/json'
  }
}).then(res => res.json())
.then((result) => {
  console.log(result);
}); 

// Api - подгрузка данных
const initialUserInfo = api.getUserInfo();
initialUserInfo
  .then((user) => {
    profileName.textContent = user.name;
    profileDescription.textContent = user.about;
    profileAvatar.src = user.avatar;
    userId = user._id;
  })
  .catch((err) => console.log(err));

// Секция карточек
  const cardList = new Section({
    renderer: (data) => {
      const makeNewCard = makeCard(data);
      cardList.addItemsDefault(makeNewCard);
    }
  }, cardListSelector);

// Рендерим карточки
  const renderCards = api.getInitialCards();
  renderCards
    .then((data) => {
      cardList.renderItems(data);
  })
    .catch((err) => console.log(err));

const popupDeleteSubmit = new PopupWithSubmit(popupWithSubmitSelector, {
  handleFormSubmit: ({data, cardElement}) => {
    api.deleteCard(data._id)
    .then(cardElement.remove())
    .catch((err) => console.log(err));
  }
});

// Функция создания каждой отдельной карточки
function makeCard (data) {
  const card = new Card(data, cardSelector, {
    //Функционал открытия картинки в полный размер
    handleCardClick: () => {
      popupWithImage.open(data)
    },
    //Функционал удаления карточки
    handleCardDelete: (cardElement) => {
      popupDeleteSubmit.open(data);
      popupDeleteSubmit.setEventListeners({data, cardElement});
    },
    //Функционал лайка карточки
    handleCardLike: () => {
      api.likeCard(data)
        .then((res) => {
          const likesCounter = cardElement.querySelector(likesCounterSelector);
          likesCounter.textContent = res.likes.length;
          card.updateLikes(res.likes);
      })
    },
    //Функционал ан-лайка карточки
    handleCardUnlike: () => {
      api.unlikeCard(data)
        .then((res) => {
          const likesCounter = cardElement.querySelector(likesCounterSelector);
          likesCounter.textContent = res.likes.length;
          card.updateLikes(res.likes);
      })
    },
    userId: userId
  });
  const cardElement = card.generateCard();

  return cardElement;
}

//Попап картинки - наполнение данными
const popupWithImage = new PopupWithImage(popupWithImageSelector);
popupWithImage.setEventListeners();
const userData = new UserInfo({
  userName: profileName,
  userInfo: profileDescription,
  userPic: profileAvatar,
});

//Работа формы - заполнение, очистка и пр.
const popupEdProf = new PopupWithForm(popupEdProfSelector,
  {handleFormSubmit: (formData) => {
    profileSubmitButton.textContent = 'Сохранение...';
      api.editUserInfo(formData)
        .then((newUserData) => {
          userData.setUserInfo(newUserData);
        })
        .catch((err) => console.log(err))
        .finally(() => {profileSubmitButton.textContent = 'Сохранить'})
      },
  handleDefaultFormValues: () => {
      const defaultUserData = userData.getUserInfo();

      nameInput.value = defaultUserData.name;
      jobInput.value = defaultUserData.info;

      profileSubmitButton.classList.remove(popupSubmitDisabledSelector);
      profileSubmitButton.disabled = false;

      editProfileFormValidator.hideInputError(formElementEdProf, nameInput);
      editProfileFormValidator.hideInputError(formElementEdProf, jobInput);
    }
  });











/////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/*
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
*/