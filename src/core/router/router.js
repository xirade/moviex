import FilmsView from "@/views/FilmsView";
import Routes from "@/core/constants/routes";

class Router {
  #controller;
  #routes;
  #root;

  constructor(routes, root) {
    this.#routes = routes;
    this.#controller = null;
    this.#root = root;
  }

  set setController(controller) {
    this.#controller = controller;
  }

  get getRouteInfo() {
    const { location } = window;
    const { hash } = location;

    return {
      routeName: hash ? hash.slice(1) : `#${Routes.Main}`,
    };
  }

  #hashChange() {
    const routeInfo = this.getRouteInfo;
    console.log(routeInfo.routeName);
    const TargetView = this.#routes[routeInfo.routeName] || FilmsView;
    if (TargetView) {
      this.#root.innerHTML = "";
      const paramsForRender = this.#controller.getViewParams(
        routeInfo.routeName
      );
      const targetView = new TargetView(this.#root);
      targetView.render(...paramsForRender);
    }
  }

  init() {
    window.addEventListener("hashchange", this.#hashChange.bind(this));
    this.#hashChange();
  }
}

export default Router;
