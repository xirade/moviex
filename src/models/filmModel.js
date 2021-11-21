class FilmModel {
  #poster;
  #title;
  #year;
  #imdbID;
  #isFavorite;

  constructor(filmData) {
    this.#poster = filmData.Poster;
    this.#title = filmData.Title;
    this.#year = filmData.Year;
    this.#imdbID = filmData.imdbID;
    this.#isFavorite = false;
  }

  get getPoster() {
    return this.#poster;
  }

  get getTitle() {
    return this.#title;
  }

  get getYear() {
    return this.#year;
  }

  get getId() {
    return this.#imdbID;
  }

  get getIsFavorite() {
    return this.#isFavorite;
  }

  set setIsFavorite(isFavorite) {
    this.#isFavorite = isFavorite;
  }
}

export default FilmModel;
