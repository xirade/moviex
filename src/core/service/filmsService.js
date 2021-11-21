import EnvData from "@/core/constants/envData";
import FilmModel from "@/models/filmModel";

class FilmsService {
  static #DefaultSearchValue = "Marvel";

  static #Urls = {
    Main: (searchByName = FilmsService.#DefaultSearchValue) =>
      `https://www.omdbapi.com/?s=${searchByName}&apikey=${EnvData.FilmsApiKey}`,
    FilmById: (filmId) =>
      `https://www.omdbapi.com/?i=${filmId}&apikey=${EnvData.FilmsApiKey}`,
  };

  async getFilms() {
    try {
      const response = await fetch(FilmsService.#Urls.Main());
      const data = await response.json();
      const filmModels = data.Search.map((filmData) => {
        return new FilmModel({
          Poster: filmData.Poster,
          Title: filmData.Title,
          Year: filmData.Year,
          imdbID: filmData.imdbID,
        });
      });
      return filmModels;
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }

  async saveFilms() {}

  async addFilmToFavorites() {}

  async removeFilmFromFavorites() {}
}

export default FilmsService;
