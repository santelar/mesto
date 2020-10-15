let popup = document.querySelector('.popup');
let profilePopup = document.querySelector('.popup_profile');
let cardPopup = document.querySelector('.popup_card');
let profileOpenButton = document.querySelector('.profile__edit');
let cardOpenButton = document.querySelector('.button_add_card');
let profileClose = document.querySelector('popup__close_profile');
let cardClose = document.querySelector('popup__close_card');
let name = document.querySelector('.profile__name');
let description = document.querySelector('.profile__description');
let nameInput = document.querySelector('.popup__name');
let descriptionInput = document.querySelector('.popup__description');
let saveProfile = document.querySelector('popup__save');
let formProfile = document.querySelector('popup__form');

const placesCards = [
  { name: 'Москва', link: './images/moscow.jpg'},
  { name: 'Байкал', link: './images/baykal.jpg'},
  { name: 'Екатеринбург', link: './images/ekaterinburg.jpg'},
  { name: 'Камчатка', link: './images/kamchatka.jpg'},
  { name: 'Роща улица Желаний', link: './images/roscha_ulitsa_zhelaniy.jpg'},
  { name: 'Карелия', link: './images/karelia.jpg'}
]; 
const template = document.querySelector('.template');
let elements = document.querySelector('.elements');

const getItems = (data) => {
  const card = template.content.cloneNode(true);
  card.querySelector('.card__title').innerText = data.name;
  card.querySelector('.card__image').setAttribute('src', data.link);
  card.querySelector('.card__image').setAttribute('alt', data.name);
  elements.prepend(card);
};

const renderList = () => {
  const items = placesCards.map(element => getItems(element));
};

renderList ();










// Функция переноса в попап данных профайла при открытии попапа Name //
function formProfileHandler () {
  nameInput.value = name.textContent;
  descriptionInput.value = description.textContent;
}

let popupToggle = (popupType) => {
  popupType.classList.toggle('popup_opened');
}


// Функция сохранения //
function formSubmitHandler (submitType) {
  //popupType.preventDefault(); //??????????????????????????????????
  name.textContent = nameInput.value;
  description.textContent = descriptionInput.value;
  popupToggle ();
}



// Обработчик открытия попапа //
profileOpenButton.addEventListener('click', () => {
  popupToggle(profilePopup);
  formProfileHandler ();
  });
cardOpenButton.addEventListener('click', () => popupToggle(cardPopup));

// Обработчик закрытия попапа без сохранения //
popup.addEventListener('click', popupToggle);
cardClose.addEventListener('click', () => popupToggle(cardPopup));

// Обработчик сохранения //
popup.addEventListener('submit', () => formSubmitHandler(formProfile));


