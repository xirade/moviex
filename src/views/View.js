class View {
  #root;

  constructor(root) {
    this.#root = root;
  }

  get getRoot() {
    return this.#root;
  }

  update() {}

  render() {}
}

export default View;
