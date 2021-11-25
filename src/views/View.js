class View {
  #handleFavoriteButtonClick;
  #handleFilmLinkClick;
  #root;

  constructor(root) {
    this.#root = root;
    this.#handleFavoriteButtonClick = null;
    this.#handleFilmLinkClick = null;
  }

  get getRoot() {
    return this.#root;
  }

  get getHandleFavoriteButtonClick() {
    return this.#handleFavoriteButtonClick;
  }

  get getHandleFilmLinkClick() {
    return this.#handleFilmLinkClick;
  }
  set setHandleFilmLinkClick(handleFilmLinkClick) {
    this.#handleFilmLinkClick = handleFilmLinkClick;
  }

  set setHandleFavoriteButtonClick(handleFavoriteButtonClick) {
    this.#handleFavoriteButtonClick = handleFavoriteButtonClick;
  }

  update() {}

  render() {}
}

export default View;
