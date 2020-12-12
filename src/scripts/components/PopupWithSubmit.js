import { Popup } from './Popup.js';

export class PopupWithSubmit extends Popup {
    constructor(popupSelector, { handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');

        //this._closeButton = this._popup.querySelector('.popup__close');
    }

    setEventListeners({ data, cardElement }) {
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();

            this._handleFormSubmit({ data, cardElement });
            this.close();
        })
    }


}