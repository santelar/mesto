let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__edit');
let popupCloseButton = popup.querySelector('.popup__close');


let popupToggle = function () {
  popup.classList.toggle('popup_opened');
}

let closePopup = function (event){
    if (event.target !== event.currentTarget) return
    popupToggle(event);
  }
//popupToggle();

popupOpenButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);
popup.addEventListener('click', closePopup);

//let root = document.querySelector('.root');
//let popupRemove = function () {
//    popup.classList.remove('popup_opened');
//  }
//root.addEventListener('click', popupRemove, true);


