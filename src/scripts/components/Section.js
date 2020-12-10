export class Section {
  constructor({items, renderer}, container) {
    this._initiaCards = items;
    this._renderer = renderer;
    this._container = container;
  }

  addItem (element) {
    this._container.append(element);
  }

  addNewItem (element) {
    this._container.prepend(element);
  }

  clear() {
    this._container.innerHTML = '';
  }

  renderSection () {
    this.clear();
    this._initialCards.forEach(item => {
      this._renderer(item);
    });
  }




}