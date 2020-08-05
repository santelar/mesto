let formElement = document.querySelector('.popup__container');

function formSubmitHandler (evt) {
  evt.preventDefault();
}

let nameInput = popup.querySelector('.popup__edit-name');
let descriptionInput = popup.querySelector('.popup__edit-description');


let name = document.querySelector('.profile__name');
let description = document.querySelector('.profile__description');

name.textContent(('nameInput').value);

console.log(name);
// Получите значение полей из свойства value


    // Вставьте новые значения с помощью textContent
//}



formElement.addEventListener('submit', formSubmitHandler);