import { Popup } from './Popup.js';

export class PopupWithSubmit extends Popup {
    constructor(popupSelector, formSubmitPopup) {
        super(popupSelector);
        this._formSubmitPopup = formSubmitPopup;
        this._form = this._popup.querySelector('.popup__form');
        this._closeButton = this._popup.querySelector('.popup__close');
        this._submitButton = this._form.querySelector('.popup__save');
        this._submitButtonText = this._submitButton.value;
    }

    loadSubmit(text) {
        this._submitButton.value = text;
    }

    resetLoadSubmit() {
        this._submitButton.value = this._submitButtonText;
    }

    setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
          this._formSubmitPopup(evt, this._item);
        });
        this._closeButton.addEventListener('click', () => {
          this.close();
        })
    }

    open(item) {
        this._item = item;
        super.open();
    }

}