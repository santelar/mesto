export class Section {
  constructor({items, renderer}, container) {
    this._initialItems = items;
    this._renderer = renderer;
    this._container = container;
  }

  addItem (element) {
    this._container.append(element);
  }

  addNewItem (element) {
    this._container.prepend(element);
  }

  renderSection () {
    this._initialItems.forEach(item => this._renderer(item));
  }

}