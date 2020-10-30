const template = document.querySelector('.template');
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
const imagePlace = document.querySelector('.popup__image-place');
const imageName = document.querySelector('.popup__image-name');

// Ф-ция закрытия попапа по Esc //
const closePopupByEsc = (evt) => {
  if (evt.key === 'Escape') {
  removePopup(evt.currentTarget.querySelector('.popup_opened'));
  }
}

// Ф-ция открытия попапа + возможность закрыть попап по Esc //
const addPopup = (popupType) => {
  popupType.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

// Ф-ция закрытия попапа //
const removePopup = (popupType) => {
  popupType.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

// Ф-ция дизейбла попапа добавления карточек //
const disableButtonState = (popupType) => {
  popupType.querySelector('.popup__save').classList.add('popup__save_invalid');
  popupType.querySelector('.popup__save').disabled = true;
}

// Ф-ция создания блока картинки из темплейта, ф-ция удаления, ф-ция лайка //
function getItems (data) {
  const card = template.content.cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  card.querySelector('.card__title').innerText = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  card.querySelector('.button__like').addEventListener('click', (event) => {
    event.target.classList.toggle('button__like_activ');
  });

  card.querySelector('.button__delete').addEventListener('click', (event) => {
    event.target.closest('.card').remove();
  });

  cardImage.addEventListener('click', () => {
    imagePlace.src = data.link;
    imageName.textContent = data.name;
    imagePlace.alt = data.name;
    addPopup(imagePopup);
  });

  return card;
}

// Ф-ция разбивки массива на элементы и отрисовка элементов массива //
const renderList = () => {
  const items = placesCards.map(element => getItems(element));
  elements.append(...items);
};
renderList ();

// Функция переноса в попап данных профайла при открытии попапа Name //
function fillProfilePopupInputs () {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

// Функция сохранения Профайла //
function submitProfile (event) {
  event.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  removePopup(profilePopup);
}

// Функция сохранения НОВОЙ Карточки //
const submitCard = (event) => {
  event.preventDefault();
  const newCard = getItems({
    name: cardNameInput.value,
    link: cardDescriptionInput.value
  });
  elements.prepend(newCard);
  cardNameInput.value = '';
  cardDescriptionInput.value = '';
  removePopup(cardPopup);
}

// Обработчик открытия попапа //
profileOpenButton.addEventListener('click', () => {
  addPopup(profilePopup);
  fillProfilePopupInputs ();
});
cardOpenButton.addEventListener('click', () => {
  cardNameInput.value = '';
  cardDescriptionInput.value = '';
  addPopup(cardPopup);
  disableButtonState(cardPopup);
});

// Обработчик закрытия попапа без сохранения //
profileClose.addEventListener('click', () => {
  removePopup(profilePopup);
});
profilePopup.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    removePopup(profilePopup);
  };
});

cardClose.addEventListener('click', () => {
  removePopup(cardPopup);
});
cardPopup.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    removePopup(cardPopup);
  };
});

imageClose.addEventListener('click', () => removePopup(imagePopup));
imagePopup.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    removePopup(imagePopup);  
  };
});

// Обработчик сохранения //
profilePopup.addEventListener('submit', submitProfile);
cardPopup.addEventListener('submit', submitCard);