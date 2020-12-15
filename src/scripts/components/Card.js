export class Card {
  constructor(data, cardSelector, { handleCardClick, handleCardDelete, 
    handleCardLike, handleCardUnlike, userId}) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._link = data.link;
    this._likesLength = data.likes.length;
    this._likes = data.likes;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
    this._handleCardUnlike = handleCardUnlike;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._cardId = data._id;
  }

  _handleCardClick() {
    this._handleCardClick();
  }

  isLiked() {
    return this._likes.find(({ _id }) => _id === this._userId);
  }

  updateLikes(newLikesData) {
    this._likes = newLikesData;
  }

  getIdCard() {
    return this._cardId;
  }

  _handleLikes() {
    if (this.isLiked()) {
      this._handleCardUnlike();
      this._cardLike.classList.remove('button__like_activ');
    } else {
      this._handleCardLike();
      this._cardLike.classList.add('button__like_activ');
    }
  }

  _setEventListeners() {
    this._cardDelete.addEventListener('click', () => {this._handleCardDelete(this._cardId, )});
    this._cardLike.addEventListener('click', this._handleLikes.bind(this));
    this._cardImage.addEventListener('click', this._handleCardClick);
  }

  
  removeCard() {
    this._element.remove();
  }
  
  generateCard() {
    console.log(this._cardId);
    this._element = document.querySelector(this._cardSelector)
    .content.querySelector('.card').cloneNode(true);

    this._cardImage = this._element.querySelector('.card__image');
    this._cardLike = this._element.querySelector('.button__like');
    this._cardDelete = this._element.querySelector('.card__trash');


    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.card__like-counter').textContent = this._likesLength;
    this._element.querySelector('.card__title').textContent = this._name;

    if (this.isLiked()) {
      this._cardLike.classList.add('button__like_activ');
    } else {
      this._cardLike.classList.remove('button__like_activ');
    }

    if (this._ownerId === this._userId) {
      this._cardDelete.classList.add('card__trash_visible');
    };

    this._setEventListeners();

    return this._element;
  }


}
