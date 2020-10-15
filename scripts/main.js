let popup = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__close')

let profilePopup = document.querySelector('.popup__profile');
let profileOpenButton = document.querySelector('.profile__edit');
let profileClose = document.querySelector('.popup__close_profile');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let profileNameInput = document.querySelector('.popup__name_profile');
let profileDescriptionInput = document.querySelector('.popup__description_profile');

let cardPopup = document.querySelector('.popup__card');
let cardOpenButton = document.querySelector('.button_add_card');
let cardClose = document.querySelector('.popup__close_card');
let cardNameInput = document.querySelector('.popup__name_card');
let cardDescriptionInput = document.querySelector('.popup__description_card');
let cardSave = document.querySelector('.popup__save_Card');

let template = document.querySelector('.template');
let elements = document.querySelector('.elements');

//Массив и его звгрузка на страницу//
const placesCards = [
  { name: 'Карелия', link: './images/karelia.jpg'},
  { name: 'Роща улица Желаний', link: './images/roscha_ulitsa_zhelaniy.jpg'},
  { name: 'Камчатка', link: './images/kamchatka.jpg'},
  { name: 'Екатеринбург', link: './images/ekaterinburg.jpg'},
  { name: 'Байкал', link: './images/baykal.jpg'},
  { name: 'Москва', link: './images/moscow.jpg'}
]; 
const getItems = (data) => {
  const card = template.content.cloneNode(true);
  card.querySelector('.card__title').innerText = data.name;
  card.querySelector('.card__image').src = data.link;
  card.querySelector('.card__image').alt = data.name;
  elements.prepend(card);
  
};
const renderList = () => {
  const items = placesCards.map(element => getItems(element));

  };
renderList ();

// Функция переноса в попап данных профайла при открытии попапа Name //
function formProfileHandler () {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
};

//Добавление класса попапа//
let popupAdd = (popupType) => {
  popupType.classList.add('popup_opened');
};
//Удаление класса попапа//
let popupRemove = (popupType) => {
  popupType.classList.remove('popup_opened');
};

// Функция сохранения Профайла//
function submitProfile (event) {
  event.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  popupRemove (profilePopup);
};

//Функция сохранения Карточки//
const submitCard = (getItems) => {
  card.querySelector('.card__title').innerText = cardNameInput;
  card.querySelector('.card__image').src = cardDescriptionInput;
  card.querySelector('.card__image').alt = cardNameInput;
  elements.prepend(card);
};
submitCard ();



// Обработчик открытия попапа //
profileOpenButton.addEventListener('click', () => {
  popupAdd(profilePopup);
  formProfileHandler ();
  });
cardOpenButton.addEventListener('click', () => popupAdd(cardPopup));

// Обработчик закрытия попапа без сохранения //
profileClose.addEventListener('click', () => popupRemove(profilePopup));
cardClose.addEventListener('click', () => popupRemove(cardPopup));

// Обработчик сохранения //
profilePopup.addEventListener('submit', submitProfile);
cardSave.addEventListener('submit', submitCard);