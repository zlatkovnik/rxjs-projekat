import { subscribeForOrders, fetchOrder } from "../service/orderService";
import ViewQueue from "./ViewQueue";
import { IOrder } from "../models/interfaces";

export default class View {
  orders: IOrder[];
  queues: ViewQueue;
  container: HTMLElement;
  constructor(parent: HTMLElement) {
    this.orders = [];

    //Kontejner gde se sve nalazi
    this.container = document.createElement("div");
    this.container.className = "container";
    parent.appendChild(this.container);

    //Kontejner gde se nalazi interfejs
    const progressRow = document.createElement("div");
    progressRow.className = "row";
    this.container.appendChild(progressRow);
    this.queues = new ViewQueue(progressRow);

    //subscribeForOrders(this.addOrder);
  }

  async render() {
    this.orders = await Promise.all(
      [1, 2, 3, 4, 5].map((num) => fetchOrder(num))
    );
    this.queues.render(this.orders);
  }

  addOrder = (order: IOrder) => {};
}
