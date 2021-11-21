import Routes from "@/core/constants/routes";

class FilmsController {
  #router;
  #service;
  #allFilms;
  #favoriteFilms;

  constructor(router, service) {
    this.#router = router;
    this.#service = service;

    this.#allFilms = [];
    this.#favoriteFilms = [];
  }

  getViewParams(routeName) {
    let paramsForRender = [];

    if (routeName === Routes.Main) {
      paramsForRender = [this.#allFilms];
    } else if (routeName === Routes.Favorites) {
      paramsForRender = [this.#favoriteFilms];
    } else if (routeName === Routes.Film) {
      paramsForRender = [];
    }

    return paramsForRender;
  }

  async init() {
    this.#allFilms = await this.#service.getFilms();
    this.#allFilms.forEach((filmModel) => {
      console.log("title", filmModel.getTitle);
    });
    this.#router.init();
  }
}

export default FilmsController;
