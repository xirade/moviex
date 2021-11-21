import InFavoritesImage from "@/assets/icons/heart-outlined.png";
import NotInFavoritesImage from "@/assets/icons/heart.png";

const renderFilmComponent = ({ filmModel }) => {
  const container = document.createElement("div");
  container.className = "film-card";
  container.innerHTML = `
    <span class="film-card__title">
      ${filmModel.getTitle}
    </span>
    <img class="film-card__poster" src="${filmModel.getPoster}"
    alt="${filmModel.getTitle}"
    />
    <span class="film-card__year">
      ${filmModel.getYear}
    </span>
    <button class="film-card__button">
      <img class="film-card__button-img" src="${
        filmModel.getIsFavorite ? InFavoritesImage : NotInFavoritesImage
      }" />
  `;
  return container;
};

export default renderFilmComponent;
