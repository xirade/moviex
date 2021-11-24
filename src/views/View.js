class View {
  #handleFavoriteButtonClick;
  #root;

  constructor(root) {
    this.#root = root;
    this.#handleFavoriteButtonClick = null;
  }

  get getRoot() {
    return this.#root;
  }

  get getHandleFavoriteButtonClick() {
    return this.#handleFavoriteButtonClick;
  }

  set setHandleFavoriteButtonClick(handleFavoriteButtonClick) {
    this.#handleFavoriteButtonClick = handleFavoriteButtonClick;
  }

  update() {}

  render() {}
}

export default View;
