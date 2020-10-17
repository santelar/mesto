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

//Массив и его загрузка на страницу//
const placesCards = [
  { name: 'Москва', link: './images/moscow.jpg'},
  { name: 'Байкал', link: './images/baykal.jpg'},
  { name: 'Екатеринбург', link: './images/ekaterinburg.jpg'},
  { name: 'Камчатка', link: './images/kamchatka.jpg'},
  { name: 'Роща улица Желаний', link: './images/roscha_ulitsa_zhelaniy.jpg'},
  { name: 'Карелия', link: './images/karelia.jpg'}
 ]; 
//Ф-ция создания блока картинки из темплейта - на вход имя и линк//
const getItems = (data) => {
  const card = template.content.cloneNode(true);
  card.querySelector('.card__title').innerText = data.name;
  card.querySelector('.card__image').src = data.link;
  card.querySelector('.card__image').alt = data.name;
  //card.querySelector('.button_like').addEventListener('click', cardLike);
  card.querySelector('.button_delete').addEventListener('click', (event) => {
    event.target.closest('.card').remove();
  });
  return card;
  };

//Ф-ция разбивки массива на элементы и отрисовка элементов массива//
const renderList = (card) => {
  const items = placesCards.map(element => getItems(element));
  elements.append(...items);
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

//Функция сохранения Карточки
const submitCard = function (event) {
  event.preventDefault();
  const card = template.content.cloneNode(true);
  card.querySelector('.card__title').innerText = cardNameInput.value;
  card.querySelector('.card__image').src = cardDescriptionInput.value;
  elements.prepend(card);
  cardNameInput.value = '';
  cardDescriptionInput.value = '';
  popupRemove(cardPopup);
};


/*
const submitCard = (data) => {
const newCard = getItems = () => {
  card.querySelector('.card__title').innerText = cardNameInput.value;
  card.querySelector('.card__image').src = cardDescriptionInput.value;
  };
elements.prepend(newCard);
cardNameInput.value = '';
cardDescriptionInput.value = '';
popupRemove(cardPopup);
};*/


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
cardPopup.addEventListener('submit', submitCard);

//https://images.unsplash.com/photo-1602909543092-11fd98492545?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80