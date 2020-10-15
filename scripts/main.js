let popup = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__close')
let profilePopup = document.querySelector('.popup_profile');
let cardPopup = document.querySelector('.popup_card');
let profileOpenButton = document.querySelector('.profile__edit');
let cardOpenButton = document.querySelector('.button_add_card');
let profileClose = document.querySelector('.popup__close_profile');
let cardClose = document.querySelector('.popup__close_card');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let profileNameInput = document.querySelector('.popup__name');
let profileDescriptionInput = document.querySelector('.popup__description');
let saveProfile = document.querySelector('popup__save');
let profileForm = document.querySelector('popup__form');
const template = document.querySelector('.template');
let elements = document.querySelector('.elements');

//Массив и его звгрузка на страницу//
const placesCards = [
  { name: 'Москва', link: './images/moscow.jpg'},
  { name: 'Байкал', link: './images/baykal.jpg'},
  { name: 'Екатеринбург', link: './images/ekaterinburg.jpg'},
  { name: 'Камчатка', link: './images/kamchatka.jpg'},
  { name: 'Роща улица Желаний', link: './images/roscha_ulitsa_zhelaniy.jpg'},
  { name: 'Карелия', link: './images/karelia.jpg'}
]; 
const getItems = (data) => {
  const card = template.content.cloneNode(true);
  card.querySelector('.card__title').innerText = data.name;
  card.querySelector('.card__image').setAttribute('src', data.link);
  card.querySelector('.card__image').setAttribute('alt', data.name);
  elements.append(card);
};
const renderList = () => {
  const items = placesCards.map(element => getItems(element));
};
renderList ();

// Функция переноса в попап данных профайла при открытии попапа Name //
function formProfileHandler () {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

//Переключение класса попапа//
let popupAdd = (popupType) => {
  popupType.classList.add('popup_opened');
}
//Удаление касса попапа//
let popupRemove = (popupType) => {
  popupType.classList.remove('popup_opened');
}

// Функция сохранения Профайла//
function formSubmitHandler (event) {
  event.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  popupRemove (profilePopup);
}

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
profilePopup.addEventListener('submit', formSubmitHandler);


