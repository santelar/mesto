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
  //elements,
  //template,
  cardListSelector,
  popupWithSubmitSelector,
  cardSelector,
  likesCounterSelector,
  popupWithImageSelector,
  popupEdProfSelector,
  popupSubmitDisabledSelector,
  popupAddPicSelector,
  popupEditAvatarSelector,
  userId,
  profilePopup,
  profileAvatarContainer,
  profileAvatar,
  formUser,
  profileOpenButton,
  profileName,
  profileDescription,
  nameInput,
  jobInput,
  profileSubmitButton,
  cardPopup,
  formCard,
  cardOpenButton,
  cardNameInput,
  cardDescriptionInput,
  cardSubmitButton,
  avatarPopup,
  avatarEditButton,
  formAvatar,
  popupAvatarInput,
  avatarSubmitButton,
  validationConfig
} from '../scripts/utils/constants.js';


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
      cardList.addNewItem(makeNewCard);
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

////////////////////////////////////////////////////////////////////
//   Попап профайла - заполнение, очистка и пр.  ///////////////////
////////////////////////////////////////////////////////////////////
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

      editProfileFormValidator.hideInputError(formUser, nameInput);
      editProfileFormValidator.hideInputError(formUser, jobInput);
    }
  });
  popupEdProf.setEventListeners();
//Попап профайла - слушатель
profileOpenButton.addEventListener('click', () => {
  popupEdProf.open();
});
//Попап профайла - валидация
const profileFormValidator = new FormValidator(validationConfig, formUser);
profileFormValidator.enableValidation();


////////////////////////////////////////////////////////////////////
//   Попап добавления карточки - заполнение, очистка и пр.  ////////
////////////////////////////////////////////////////////////////////
const popupAddPic = new PopupWithForm(popupAddPicSelector,
  {handleFormSubmit: (data) => {
    cardSubmitButton.textContent = 'Сохранение...';
    api.addCard(data)
      .then((cardElement) => {
        const makeNewCard = makeCard(cardElement);
        return makeNewCard
      })
      .then((card) => {
        cardList.addItem(card);
      })
      .catch((err) => console.log(err))
      .finally(() => {cardSubmitButton.textContent = 'Создать'})
    },
  handleDefaultFormValues: () => {
    cardFormValidator.hideInputError(formCard, cardNameInput);
    cardFormValidator.hideInputError(formCard, cardDescriptionInput);
    cardFormValidator.hideInputError(formCard,
      formCard.querySelector(validationConfig.inputSelector));
  }
});
// Попап добавления картинки - слушатель
cardOpenButton.addEventListener('click', () => {
  popupAddPic.open();
  cardSubmitButton.classList.add(popupSubmitDisabledSelector);
  cardSubmitButton.disabled = true;
});
popupAddPic.setEventListeners();
// Попап добавления картинки - валидация
const cardFormValidator = new FormValidator(validationConfig, formCard);
cardFormValidator.enableValidation();


////////////////////////////////////////////////////////////////////
//   Попап изменения аватара - заполнение, изм. надписи и пр.  /////
////////////////////////////////////////////////////////////////////
const popupEditAvatar = new PopupWithForm(popupEditAvatarSelector, {
  handleFormSubmit: (formData) => {
    avatarSubmitButton.textContent = 'Сохранение...';
    const newPic = api.editUserPic(formData);
    newPic
      .then((data) => {
        userData.setUserPic(data);
      })
      .catch((err) => console.log(err))
      .finally(() => {avatarSubmitButton.textContent = 'Сохранить'})
    },
  handleDefaultFormValues: () => {
    avatarFormValidator.hideInputError(formAvatar,
      formAvatar.querySelector(validationConfig.inputSelector));
    }
})
// Попап изменения аватара - слушатель
avatarEditButton.addEventListener('click', () => {
  popupEditAvatar.open();
  avatarSubmitButton.classList.add(popupSubmitDisabledSelector);
  avatarSubmitButton.disabled = true;
})
popupEditAvatar.setEventListeners();
// Попап изменения аватара - валидация
const avatarFormValidator = new FormValidator(validationConfig, formAvatar);
avatarFormValidator.enableValidation();