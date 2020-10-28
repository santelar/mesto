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

 //Добавление/удаление класса попапа popup_opened//
 const popupToggle = (popupType) => {
  popupType.classList.toggle('popup_opened');
}

 //Для закрытия попапа по ESC//
 const popupRemove = (popupType) => {
  popupType.classList.remove('popup_opened');
 }

//Ф-ция создания блока картинки из темплейта, ф-ция удаления, ф-ция лайка//
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
  popupToggle(imagePopup);
  });

  return card;
}

//Ф-ция разбивки массива на элементы и отрисовка элементов массива//
const renderList = () => {
  const items = placesCards.map(element => getItems(element));
  elements.append(...items);
};
renderList ();

// Функция переноса в попап данных профайла при открытии попапа Name //
function formProfileHandler () {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

// Функция сохранения Профайла//
function submitProfile (event) {
  event.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  popupToggle (profilePopup);
}

//Функция сохранения НОВОЙ Карточки//
const submitCard = (event) => {
  event.preventDefault();
  const newCard = getItems({
    name: cardNameInput.value,
    link: cardDescriptionInput.value
  });
  elements.prepend(newCard);
  cardNameInput.value = '';
  cardDescriptionInput.value = '';
  popupToggle(cardPopup);
}

// Обработчик открытия попапа //
profileOpenButton.addEventListener('click', () => {
  popupToggle(profilePopup);
  formProfileHandler ();
});
cardOpenButton.addEventListener('click', () => popupToggle(cardPopup));

//Закрытие попапа по ESC//
document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    popupRemove(profilePopup);
    popupRemove(cardPopup);
  }
});

// Обработчик закрытия попапа без сохранения //
profileClose.addEventListener('click', () => {
  popupToggle(profilePopup);
});
profilePopup.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {popupToggle(profilePopup)
  };
});

cardClose.addEventListener('click', () => {
  popupToggle(cardPopup);
  cardNameInput.value = '';
  cardDescriptionInput.value = '';
});
cardPopup.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {popupToggle(cardPopup)
  };
});

imageClose.addEventListener('click', () => popupToggle(imagePopup));
imagePopup.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {popupToggle(imagePopup)
  };
});

// Обработчик сохранения //
profilePopup.addEventListener('submit', submitProfile);
cardPopup.addEventListener('submit', submitCard);