import { IOrder } from "../models/interfaces";
import { parseOrder } from "../models/parsers";

export default class ViewQueue {
  container: HTMLElement;
  constructor(parent: HTMLElement) {
    //Kontejner gde se nalaze nove narudzbenice
    this.container = document.createElement("div");
    this.container.className = "col-sm d-flex flex-column";
    parent.appendChild(this.container);
  }

  render(orders: IOrder[]) {
    orders.forEach((order) => {
      const btn = document.createElement("button");
      btn.className = "btn btn-secondary m-2";
      btn.innerHTML = parseOrder(order);
      this.container.appendChild(btn);
    });
  }
}
