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
  containerSelector,
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
});

const userProfileData = new UserInfo({
  userName: profileName,
  userInfo: profileDescription,
  userPic: profileAvatar
});

// Секция карточек
const section = new Section({
  renderer: (data) => {
    const makeNewCard = makeCard(data);
    section.addItem(makeNewCard);
  }
}, containerSelector);

Promise.all([
  api.getUserInfo(),
  api.getInitialCards(),
])
  .then(([userData, initialCardsData]) => {
    userProfileData.setUserInfo(userData);
    userProfileData.setUserPic(userData);
    userId = userData._id;
    section.renderSection(initialCardsData);
  })
.catch((err) => console.log(err));

const popupDeleteSubmit = new PopupWithSubmit(popupWithSubmitSelector);
popupDeleteSubmit.setEventListeners();

const popupWithImage = new PopupWithImage(popupWithImageSelector);
popupWithImage.setEventListeners();

// Функция создания каждой отдельной карточки
function makeCard (data) {
  const card = new Card(data, cardSelector, {
    //Функционал открытия картинки в полный размер
    handleCardClick: () => {
      popupWithImage.open(data)
    },
    //Функционал удаления карточки
    handleCardDelete: (cardId) => {
      console.log(cardId);
      popupDeleteSubmit.setSubmitAction(() => {
        api.deleteCard(cardId)
        .then(res => card.removeCard())
        .then(() => popupDeleteSubmit.close())
        .catch((err) => console.log(err));
      });
      popupDeleteSubmit.open(data);
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
    }, userId: userId
  });
  const cardElement = card.generateCard();

  return cardElement;
}

////////////////////////////////////////////////////////////////////
//   Попап профайла - заполнение, очистка и пр.  ///////////////////
////////////////////////////////////////////////////////////////////
const popupEdProf = new PopupWithForm(popupEdProfSelector,
  {handleFormSubmit: (formData) => {
    profileSubmitButton.textContent = 'Сохранение...';
      api.editUserInfo(formData)
        .then((newUserData) => {
          userProfileData.setUserInfo(newUserData);
        })
        .then(() => popupEdProf.close())
        .catch((err) => console.log(err))
        .finally(() => {profileSubmitButton.textContent = 'Сохранить'})
      },
  handleDefaultFormValues: () => {
      const defaultUserData = userProfileData.getUserInfo();

      nameInput.value = defaultUserData.name;
      jobInput.value = defaultUserData.info;

      profileFormValidator.enabledSubmitBtn(popupSubmitDisabledSelector);

      profileFormValidator.hideError(nameInput);
      profileFormValidator.hideError(jobInput);
    }
  });
//Попап профайла - слушатель
popupEdProf.setEventListeners();

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
        section.addNewItem(card);
      })
      .then(() => popupAddPic.close())
      .catch((err) => console.log(err))
      .finally(() => {cardSubmitButton.textContent = 'Создать'})
    },
  handleDefaultFormValues: () => {
    cardFormValidator.hideError(cardNameInput);
    cardFormValidator.hideError(cardDescriptionInput);
    cardFormValidator.hideError(formCard.querySelector(validationConfig.inputSelector));
  }
});
// Попап добавления картинки - слушатель
popupAddPic.setEventListeners();

cardOpenButton.addEventListener('click', () => {
  popupAddPic.open();
  cardFormValidator.disableSubmitBtn(popupSubmitDisabledSelector);
});
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
        userProfileData.setUserPic(data);
      })
      .then(() => popupEditAvatar.close())
      .catch((err) => console.log(err))
      .finally(() => {avatarSubmitButton.textContent = 'Сохранить'})
    },
  handleDefaultFormValues: () => {
    avatarFormValidator.hideError(formAvatar.querySelector(validationConfig.inputSelector));
    }
})
// Попап изменения аватара - слушатель
popupEditAvatar.setEventListeners();

avatarEditButton.addEventListener('click', () => {
  popupEditAvatar.open();
  avatarFormValidator.disableSubmitBtn(popupSubmitDisabledSelector);
})
// Попап изменения аватара - валидация
const avatarFormValidator = new FormValidator(validationConfig, formAvatar);
avatarFormValidator.enableValidation();