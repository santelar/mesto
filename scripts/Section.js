export class Section {
  constructor({data, renderer}, containerSelector) {
    this._initialItems = data;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  addItem (element) {
    this._container.append(element);
  }

  renderSection () {
    this._initialItems.forEach(item => this._renderer(item));
  }

}