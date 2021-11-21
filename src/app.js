import "@/index.css";

import Router from "@/core/router/router";
import FilmsService from "@/core/service/filmsService";
import FilmsController from "@/controller/filmsController";
import FilmsView from "@/views/FilmsView";
import FavoritesView from "@/views/FavoritesView";
import FilmView from "@/views/FilmView";
import Routes from "@/core/constants/routes";

const routes = {
  [Routes.Main]: FilmsView,
  [Routes.Favorites]: FavoritesView,
  [Routes.Film]: FilmView,
};
const root = document.getElementById("root");
const router = new Router(routes, root);
const filmsService = new FilmsService();
const controller = new FilmsController(router, filmsService);
router.setController = controller;
controller.init();
