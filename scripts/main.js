const template = document.querySelector('.template');
const elements = document.querySelector('.elements');

const profilePopup = document.querySelector('.popup__profile');
const profileOpenButton = document.querySelector('.profile__edit');
const profileClose = document.querySelector('.popup__close_profile');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileNameInput = document.querySelector('.popup__name_profile');
const profileDescriptionInput = document.querySelector('.popup__description_profile');

const cardPopup = document.querySelector('.popup__card');
const cardOpenButton = document.querySelector('.button_add_card');
const cardClose = document.querySelector('.popup__close_card');
const cardNameInput = document.querySelector('.popup__name_card');
const cardDescriptionInput = document.querySelector('.popup__description_card');

const imagePopup = document.querySelector('.popup__image');
const imageClose = document.querySelector('.popup__close_image');

//Массив картинок//
const placesCards = [
  { name: 'Москва', link: './images/moscow.jpg'},
  { name: 'Байкал', link: './images/baykal.jpg'},
  { name: 'Крым', link: './images/crimea.jpg'},
  { name: 'Санкт-Петербург', link: './images/piter.jpg'},
  { name: 'Роща улица Желаний', link: './images/roscha_ulitsa_zhelaniy.jpg'},
  { name: 'Карелия', link: './images/karelia.jpg'}
 ]; 

 //Добавление/удаление класса попапа popup_opened//
 const popupToggle = (popupType) => {
  popupType.classList.toggle('popup_opened');
};

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

  card.querySelector('.card__image').addEventListener('click', () => {
  document.querySelector('.popup__image-place').src = data.link;
  document.querySelector('.popup__image-name').textContent = data.name;
  document.querySelector('.popup__image-place').alt = data.name;
  popupToggle(imagePopup);
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

// Функция сохранения Профайла//
function submitProfile (event) {
  event.preventDefault();
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
imageClose.addEventListener('click', () => popupToggle(imagePopup));

// Обработчик сохранения //
profilePopup.addEventListener('submit', submitProfile);
cardPopup.addEventListener('submit', submitCard);