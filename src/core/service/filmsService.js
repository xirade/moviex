import EnvData from "@/core/constants/envData";
import FilmModel from "@/models/filmModel";
import loader from "@/core/components/loader";
import StorageKeys from "@/core/constants/storageKeys";
import { removeFilmById, getFilmById } from "@/core/utils/films";

class FilmsService {
  #storage;
  #loader;
  static #DefaultSearchValue = "Marvel";

  static #Urls = {
    Main: (searchByName = FilmsService.#DefaultSearchValue) =>
      `https://www.omdbapi.com/?s=${searchByName}&apikey=${EnvData.FilmsApiKey}`,
    FilmById: (filmId) =>
      `https://www.omdbapi.com/?i=${filmId}&apikey=${EnvData.FilmsApiKey}`,
  };

  static #convertFilmModelToFilm(filmModels = []) {
    return filmModels.map((filmModel) => {
      return {
        Poster: filmModel.getPoster,
        Title: filmModel.getTitle,
        Year: filmModel.getYear,
        imdbID: filmModel.getId,
        isFavorite: filmModel.getIsFavorite,
      };
    });
  }

  static #setFavoriteValuesForFilmModels(allFilms, favoriteFilms) {
    if (!favoriteFilms) {
      return allFilms;
    } else {
      const films = allFilms.map((filmModel) => {
        const isFavorite = favoriteFilms.some(
          (favoriteFilmModel) => favoriteFilmModel.imdbID === filmModel.getId
        );
        filmModel.setIsFavorite = isFavorite;
        return filmModel;
      });
      return films;
    }
  }

  static #convertFilmToFilmModel(films) {
    return films.map((filmData) => {
      return new FilmModel({
        Poster: filmData.Poster,
        Title: filmData.Title,
        Year: filmData.Year,
        imdbID: filmData.imdbID,
        isFavorite: filmData.isFavorite,
      });
    });
  }

  constructor() {
    this.#storage = window.localStorage;
    this.#loader = loader();
  }

  async getFilms() {
    document.querySelector("#root").append(this.#loader);
    try {
      const response = await fetch(FilmsService.#Urls.Main());
      const data = await response.json();
      const filmModels = FilmsService.#convertFilmToFilmModel(data.Search);
      const favoriteFilms = JSON.parse(
        this.#storage.getItem(StorageKeys.Favorites)
      );
      return FilmsService.#setFavoriteValuesForFilmModels(
        filmModels,
        favoriteFilms
      );
    } catch (error) {
      return {
        error: error.message,
      };
    } finally {
      this.#loader.remove();
    }
  }

  getFilm(allFilms, filmId) {
    const targetFilm = getFilmById(allFilms, filmId);
    if (targetFilm) {
      return targetFilm;
    }
  }

  getFavoritesFilms() {
    return new Promise((resolve) => {
      const localStorageData = this.#storage.getItem(StorageKeys.Favorites);
      const favoriteFilms = JSON.parse(localStorageData) || [];
      resolve(FilmsService.#convertFilmToFilmModel(favoriteFilms));
    });
  }

  saveFilms(favorites = []) {
    return new Promise((resolve) => {
      const convertedFavorites =
        FilmsService.#convertFilmModelToFilm(favorites);
      const stringify = JSON.stringify(convertedFavorites);
      this.#storage.setItem(StorageKeys.Favorites, stringify);
      resolve();
    });
  }

  async addFilmToFavorites(allFilms, favorites, filmId) {
    const targetFilm = getFilmById(allFilms, filmId);
    if (targetFilm) {
      targetFilm.setIsFavorite = true;
      const finalFavoritesFilms = [...favorites, targetFilm];
      await this.saveFilms(finalFavoritesFilms);
    }
  }

  async removeFilmFromFavorites(allFilms, favorites, filmId) {
    const targetFilm = getFilmById(allFilms, filmId);
    if (targetFilm) {
      targetFilm.setIsFavorite = false;
      const finalFavoritesFilms = removeFilmById(favorites, filmId);
      await this.saveFilms(finalFavoritesFilms);
    }
  }
}

export default FilmsService;
