import Routes from "@/core/constants/routes";
import View from "./View";
import renderFilmComponent from "@/core/components/filmComponent";

class FilmsView extends View {
  #filmsContainer;
  static #Text = {
    SeeFavoriteFilms: "See Favorite Films",
    Title: "All Films",
  };

  constructor(root) {
    super(root);
    this.#filmsContainer = null;
  }

  get renderSeeFavoriteButton() {
    const container = document.createElement("div");
    container.className = "film-cards-container__links-block";

    const seeFavoritesButton = document.createElement("a");
    seeFavoritesButton.href = `#${Routes.Favorites}`;
    seeFavoritesButton.className =
      "link-button film-cards-container__link-button";
    seeFavoritesButton.textContent = FilmsView.#Text.SeeFavoriteFilms;

    container.append(seeFavoritesButton);

    return container;
  }

  #renderFilms(filmModels = []) {
    this.#filmsContainer = document.createElement("div");
    this.#filmsContainer.className = "film-cards-container";
    filmModels.forEach((filmModel) => {
      const filmHTML = renderFilmComponent({
        filmModel,
        handleFavoriteButtonClick: this.getHandleFavoriteButtonClick,
        handleFilmLinkClick: this.getHandleFilmLinkClick,
      });
      this.#filmsContainer.append(filmHTML);
    });
  }

  update(filmModels = []) {
    this.#renderFilms(filmModels);
  }

  render(filmModels = []) {
    const container = document.createElement("div");
    container.className = "films-container";

    container.innerHTML = `
      <h1 class="film-cards-container__title">
        ${FilmsView.#Text.Title}
      </h1>
        ${this.renderSeeFavoriteButton.outerHTML}
    `;
    this.#renderFilms(filmModels);

    container.append(this.#filmsContainer);
    this.getRoot.append(container);
  }
}

export default FilmsView;
