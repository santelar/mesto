let popup = document.querySelector('.popup');
let popupProfile = document.querySelector('.popup_profile');
let popupCard = document.querySelector('.popup_card');
let profileOpenButton = document.querySelector('.profile__edit');
let popupClose = document.querySelector('.popup__close');
let cardOpenButton = document.querySelector('.button_add_card');
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
  if popup.classList.contains('.card popup') {
    formProfileHandler ()
  }
  popupType.classList.toggle('popup_opened');
}


// Функция сохранения //
function formSubmitHandler (event) {
  event.preventDefault();
  name.textContent = nameInput.value;
  description.textContent = descriptionInput.value;
  popupToggle ();
}



// Обработчик открытия попапа //
profileOpenButton.addEventListener('click', () => popupToggle(popupProfile));
cardOpenButton.addEventListener('click', () => popupToggle(popupCard));

// Обработчик закрытия попапа без сохранения //
popupClose.addEventListener('click', () => popupToggle(popupProfile));

// Обработчик сохранения //
popupProfile.addEventListener('submit', formSubmitHandler);


