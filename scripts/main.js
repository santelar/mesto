let popup = document.querySelector('.popup');
let popupProfile = document.querySelector('.popup_profile');
let popupCard = document.querySelector('.popup_card');
let profileOpenButton = document.querySelector('.profile__edit');
let popupClose = document.querySelector('.popup__close');
let CardOpenButton = document.querySelector('.button_add_card');
let name = document.querySelector('.profile__name');
let description = document.querySelector('.profile__description');
let nameInput = document.querySelector('.popup__name');
let descriptionInput = document.querySelector('.popup__description');

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
  console.log(card);
};

const renderList = () => {
  const items = placesCards.map(element => getItems(element));
  
};

renderList ();










// Функция переноса в попап данных профайла при открытии попапа //
function formOpenHandler () {
  nameInput.value = name.textContent;
  descriptionInput.value = description.textContent;
}

// Функция переключения класса попапа //
let popupToggle = function () {
  if (popup.classList.contains('popup_opened') !== true) {
    formOpenHandler ();
  }
  popup.classList.toggle('popup_opened');
}

// Функция сохранения //
function formSubmitHandler (event) {
  event.preventDefault();
  name.textContent = nameInput.value;
  description.textContent = descriptionInput.value;
  popupToggle ();
}

CardOpenButton.addEventListener('click', popupToggle);

// Обработчик открытия попапа //
profileOpenButton.addEventListener('click', popupToggle);

// Обработчик закрытия попапа без сохранения //
popupClose.addEventListener('click', popupToggle);

// Обработчик сохранения //
popupProfile.addEventListener('submit', formSubmitHandler);


