import View from "./View";
import renderFilmComponent from "@/core/components/filmComponent";

class FilmView extends View {
  #renderFilms(filmModels = []) {
    this.#filmsContainer = document.createElement("div");
    this.#filmsContainer.className = "film-cards-container";

    filmModels.forEach((filmModel) => {
      const filmHTML = renderFilmComponent({
        filmModel,
        handleFavoriteButtonClick: this.getHandleFavoriteButtonClick,
      });
      this.#filmsContainer.append(filmHTML);
    });
  }

  render(filmModels = []) {
    const container = document.createElement("div");
    container.className = "film-container";

    this.#renderFilms(filmModels);

    container.append(this.#filmsContainer);
    this.getRoot.append(container);
  }
}
export default FilmView;
