import Routes from "@/core/constants/routes";
import View from "./View";
import renderFilmComponent from "@/core/components/filmComponent";

class FilmsView extends View {
  static #Text = {
    SeeFavoriteFilms: "See Favorite Films",
    Title: "All Films",
  };

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

  render(filmModels = []) {
    const container = document.createElement("div");
    container.className = "films-container";

    container.innerHTML = `
      <h1 class="film-cards-container__title">
        ${FilmsView.#Text.Title}
      </h1>
        ${this.renderSeeFavoriteButton.outerHTML}
    `;
    const filmsContainer = document.createElement("div");
    filmsContainer.className = "film-cards-container";
    filmModels.forEach((filmModel) => {
      const filmHTML = renderFilmComponent({ filmModel });
      filmsContainer.append(filmHTML);
    });

    container.append(filmsContainer);

    this.getRoot.append(container);
  }
}

export default FilmsView;
