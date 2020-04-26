export default class View {
  orders: IOrder[];
  container: HTMLElement;
  constructor(parent: HTMLElement) {
    this.container = document.createElement("div");
    parent.appendChild(this.container);
    this.orders = [];
  }

  render() {
    this.container.innerHTML = "Hello world";
  }
}
