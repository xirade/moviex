import FilmView from "@/views/FilmView";
import Routes from "@/core/constants/routes";

class Router {
  #controller;
  #routes;
  #root;
  #targetView;

  constructor(routes, root) {
    this.#routes = routes;
    this.#controller = null;
    this.#root = root;
    this.#targetView = null;
  }

  set setController(controller) {
    this.#controller = controller;
  }

  get getRouteInfo() {
    const { location } = window;
    let { hash } = location;
    const filteredHash = hash.slice(1);
    return {
      routeName: hash ? filteredHash : Routes.Main,
      routeId: hash.split("/")[1],
    };
  }

  async updateView() {
    const routeInfo = this.getRouteInfo;
    const paramsForRender = await this.#controller.getViewParams(
      routeInfo.routeName,
      routeInfo.routeId
    );
    if (this.#targetView) {
      this.#targetView.update(...paramsForRender);
    }
  }

  async #hashChange() {
    const routeInfo = this.getRouteInfo;
    const TargetView = this.#routes[routeInfo.routeName] || FilmView;
    if (TargetView) {
      this.#root.innerHTML = "";
      const paramsForRender = await this.#controller.getViewParams(
        routeInfo.routeName,
        routeInfo.routeId
      );
      this.#targetView = new TargetView(this.#root);

      this.#targetView.setHandleFavoriteButtonClick =
        this.#controller.handleFavoriteButtonClick.bind(this.#controller);
      this.#targetView.setHandleFilmLinkClick =
        this.#controller.handleFilmLinkClick.bind(this.#controller);

      this.#targetView.render(...paramsForRender);
    }
  }

  init() {
    window.addEventListener("hashchange", this.#hashChange.bind(this));
    this.#hashChange()
  }
}

export default Router;
