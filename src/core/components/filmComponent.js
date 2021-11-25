import InFavoritesImage from "@/assets/icons/heart-outlined.png";
import NotInFavoritesImage from "@/assets/icons/heart.png";
import Routes from "@/core/constants/routes";

const renderFilmComponent = ({
  filmModel,
  handleFavoriteButtonClick,
  handleFilmLinkClick,
}) => {
  const container = document.createElement("div");
  container.className = "film-card";
  container.innerHTML = `
    <span class="film-card__year">
      ${filmModel.getYear}
    </span>
  `;

  const filmLink = document.createElement("a");
  filmLink.id = `link_${filmModel.getId}`;
  filmLink.innerHTML = `
    <span class="film-card__title">
      ${filmModel.getTitle}
    </span>
    <img class="film-card__poster" src="${filmModel.getPoster}"
    alt="${filmModel.getTitle}"
    />
  `;

  const button = document.createElement("button");
  button.className = "film-card__button";
  const img = document.createElement("img");
  img.className = "film-card__button-img";
  img.src = `${
    filmModel.getIsFavorite ? InFavoritesImage : NotInFavoritesImage
  }`;

  filmLink.addEventListener("click", async () => {
    if (handleFilmLinkClick) {
      await handleFilmLinkClick(filmModel.getId);
      filmLink.href = `#${Routes.getFilmId}`;
    }
  });

  button.addEventListener("click", async (e) => {
    if (handleFavoriteButtonClick) {
      await handleFavoriteButtonClick(filmModel.getIsFavorite, filmModel.getId);
      img.src = filmModel.getIsFavorite
        ? InFavoritesImage
        : NotInFavoritesImage;
      const favoriteContainer = e.currentTarget.closest(".favorite-container");
      if (favoriteContainer && filmModel.getIsFavorite) {
        container.remove();
        const filmCardsContainer = favoriteContainer.lastChild;
        if (!filmCardsContainer.children.length) {
          const defaultText = document.createElement("span");
          defaultText.textContent = "No favorite films...";
          filmCardsContainer.append(defaultText);
        }
      }
    }
  });

  button.append(img);
  container.prepend(filmLink);
  container.append(button);

  return container;
};

export default renderFilmComponent;
