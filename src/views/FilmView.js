import View from "./View";
import renderFilmComponent from "@/core/components/filmComponent";
import Routes from "@/core/constants/routes";

class FilmView extends View {
  #filmContainer;
  static #Text = {
    SeeAllFilmsButtonText: "Back To All Films",
  };
  #renderFilm(filmModel) {
    this.#filmContainer = document.createElement("div");
    this.#filmContainer.className = "film-cards-container";
    const filmHTML = renderFilmComponent({
      filmModel,
      handleFavoriteButtonClick: this.getHandleFavoriteButtonClick,
      handleFilmLinkClick: this.getHandleFilmLinkClick,
    });
    this.#filmContainer.append(filmHTML);
  }

  update(filmModel) {
    this.#renderFilm(filmModel);
  }

  render(filmModel) {
    const container = document.createElement("div");
    container.className = "film-container";
    container.innerHTML = `
      <h1 class="film-cards-container__title">
        ${filmModel.getTitle}
      </h1>
      <div class="film-cards-container__links-block">
        <a class="link-button film-cards-container__link-button" 
        href="#${Routes.Main}">
        ${FilmView.#Text.SeeAllFilmsButtonText}
        </a>
      </div>
    `;

    this.#renderFilm(filmModel);

    container.append(this.#filmContainer);
    this.getRoot.append(container);
  }
}
export default FilmView;
