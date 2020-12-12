export class Card {
  constructor({name, link, likes, owner}, template, {handleCardClick, 
    likeCardHandler, deleteCardHandler}, cardId) {
    this._titleCard = name;
    this._linkCard = link;
    this._template = template;
    this._cardId = cardId;
    this._countLikes = likes;
    //this._userId = userId;
    this._ownerId = owner._id;
    this._handleCardClick = handleCardClick;
    this._likeCardHandler = likeCardHandler;
    this._deleteCardHandler = deleteCardHandler;
  }

  _setEventListeners() {
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._titleCard, this._linkCard);
    })
    this._deleteIcon.addEventListener('click', () => {
      this._deleteCardHandler();
    })
    this._likeButton.addEventListener('click', () => {
      this._likeCardHandler();
    })
  }

  generateCard() {
    this._element = this._template.content
    .querySelector('.card').cloneNode(true);

    this._likeButton = this._element.querySelector('.button__like');
    this._image = this._view.querySelector('.card__image');
    this._deleteIcon = this._view.querySelector('.button__delete');
    if (this._ownerId !== this._userId) {
      this._deleteIcon.remove();
    }
  
    this._likes = this._element.querySelector('.card__like-counter');
    this._image.src = this._linkCard;
    this._image.alt = this._titleCard;
    this._element.querySelector('.card__title').textContent = this._titleCard;
    this.renderLikes();
    this._setEventListeners();
 
    return this._element;
  }

  getIdCard() {
    return this._cardId;
  }
 /*
  likedCard() {
    return this._countLikes.some(like => {
      return like._id === this._userId;
    });
  }

  renderLikes() {
    this._likes.textContent = this._countLikes.length;
    this.showLikes(this._userId)
  }

  showLikes() {
    if (this.likedCard(this._userId)) {
      this._likeButton.classList.add('button__like_activ');
    } else {
      this._likeButton.classList.remove('button__like_activ');
    }
  }

  setLikes(listLikes) {
    this._countLikes = listLikes;
  }
  */

  deleteCard() {
    this._deleteIcon.closest('.card').remove();
  }


}
