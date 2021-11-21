import View from "./View";

class FilmView extends View {
  render() {
    const container = document.createElement("div");
    container.textContent = "FavoritesView";
    this.getRoot.append(container);
  }
}

export default FilmView;
