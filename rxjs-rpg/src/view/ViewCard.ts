class ViewCard {
  container: HTMLElement;
  constructor(parent: HTMLElement) {
    this.container = document.createElement("div");
    this.container.className = "card";
    parent.appendChild(this.container);
  }

  render() {}
}
