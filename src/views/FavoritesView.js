import renderFilmComponent from "../core/components/filmComponent";
import Routes from "../core/constants/routes";
import View from "./View";

class FavoritesView extends View {
  static #Text = {
    Title: "Your Favorite Films",
    SeeAllFilmsButtonText: "See All Films",
  };

  render(favoriteFilmModels = []) {
    const container = document.createElement("div");
    container.className = "favorite-container";
    container.innerHTML = `
      <h1 class="film-cards-container__title">
        ${FavoritesView.#Text.Title}
      </h1>
      <div class="film-cards-container__links-block">
        <a class="link-button film-cards-container__link-button" 
        href="#${Routes.Main}"">
        ${FavoritesView.#Text.SeeAllFilmsButtonText}
        </a>
      </div>
    `;

    const filmsContainer = document.createElement("div");
    filmsContainer.className = "film-cards-container";
    favoriteFilmModels.forEach((filmModel) => {
      const filmHTML = renderFilmComponent({ filmModel });
      filmsContainer.append(filmHTML);
    });

    container.append(filmsContainer);
    this.getRoot.append(container);
  }
}

export default FavoritesView;
