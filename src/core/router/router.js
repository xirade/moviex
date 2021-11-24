import FilmsView from "@/views/FilmsView";
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
    const { hash } = location;

    return {
      routeName: !hash ? Routes.Main : hash.slice(1),
    };
  }

  async updateView() {
    const routeInfo = this.getRouteInfo;
    const paramsForRender = await this.#controller.getViewParams(
      routeInfo.routeName
    );
    if (this.#targetView) {
      this.#targetView.update(...paramsForRender);
    }
  }

  async #hashChange() {
    const routeInfo = this.getRouteInfo;
    const TargetView = this.#routes[routeInfo.routeName] || FilmsView;
    if (TargetView) {
      this.#root.innerHTML = "";
      const paramsForRender = await this.#controller.getViewParams(
        routeInfo.routeName
      );
      this.#targetView = new TargetView(this.#root);
      this.#targetView.setHandleFavoriteButtonClick =
        this.#controller.handleFavoriteButtonClick.bind(this.#controller);
      this.#targetView.render(...paramsForRender);
    }
  }

  init() {
    window.addEventListener("hashchange", this.#hashChange.bind(this));
    this.#hashChange();
  }
}

export default Router;
