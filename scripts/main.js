let popup = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__close')
let template = document.querySelector('.template');
let elements = document.querySelector('.elements');

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

//Массив картинок//
const placesCards = [
  { name: 'Москва', link: './images/moscow.jpg'},
  { name: 'Байкал', link: './images/baykal.jpg'},
  { name: 'Екатеринбург', link: './images/ekaterinburg.jpg'},
  { name: 'Камчатка', link: './images/kamchatka.jpg'},
  { name: 'Роща улица Желаний', link: './images/roscha_ulitsa_zhelaniy.jpg'},
  { name: 'Карелия', link: './images/karelia.jpg'}
 ]; 
//Ф-ция создания блока картинки из темплейта, ф-ция удаления, ф-ция лайка//
function getItems (data) {
  const card = template.content.cloneNode(true);
  card.querySelector('.card__title').innerText = data.name;
  card.querySelector('.card__image').src = data.link;
  card.querySelector('.card__image').alt = data.name;
  card.querySelector('.button__like').addEventListener('click', (event) => {
  event.target.classList.toggle('button__like_activ');
  });
  card.querySelector('.button__delete').addEventListener('click', (event) => {
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

//Добавление/удаление класса попапа popup_opened//
let popupToggle = (popupType) => {
  popupType.classList.toggle('popup_opened');
};

// Функция переноса в попап данных профайла при открытии попапа Name //
function formProfileHandler () {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
};

// Функция сохранения Профайла//
function submitProfile () {
  
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  popupToggle (profilePopup);
};

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
};

// Обработчик открытия попапа //
profileOpenButton.addEventListener('click', () => {
  popupToggle(profilePopup);
  formProfileHandler ();
  });
cardOpenButton.addEventListener('click', () => popupToggle(cardPopup));

// Обработчик закрытия попапа без сохранения //
profileClose.addEventListener('click', () => popupToggle(profilePopup));
cardClose.addEventListener('click', () => {
  popupToggle(cardPopup);
  cardNameInput.value = '';
  cardDescriptionInput.value = '';
});

// Обработчик сохранения //
profilePopup.addEventListener('submit', submitProfile);
cardPopup.addEventListener('submit', submitCard);