const Routes = {
  Main: "main",
  Favorites: "favorites",
  Film: "film",

  set setFilmId(film) {
    Routes.Film = `film/${film}`;
  },
  get getFilmId() {
    return Routes.Film;
  },
};
export default Routes;
