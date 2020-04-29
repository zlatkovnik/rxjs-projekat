import {
  PIZZA_URL,
  DRINK_URL,
  LOCATION_URL,
  TOPPING_URL,
  randomFromArray,
} from "./util";
import { from, interval, of, timer } from "rxjs";
import { switchMap, mapTo } from "rxjs/operators";
import { IOrder, IPizza } from "../models/interfaces";
import { OrderState } from "../models/enums";

export async function fetchOrder(id: number) {
  return await createRandomOrder(id);
}

export function subscribeForOrders(addOrder: CallableFunction) {}

async function createRandomOrder(id: number): Promise<IOrder> {
  return Promise.all([
    fetch(PIZZA_URL),
    fetch(TOPPING_URL),
    fetch(DRINK_URL),
    fetch(LOCATION_URL),
  ]).then(async ([pizzas, toppings, drinks, locations]: Response[]) => {
    const pizzaType = await pizzas.json().then((data) => randomFromArray(data));
    const topping = await toppings.json().then((data) => randomFromArray(data));
    const drink = await drinks.json().then((data) => randomFromArray(data));
    const location = await locations
      .json()
      .then((data) => randomFromArray(data));
    const pizza: IPizza = { type: pizzaType, toppings: [topping] };
    const order: IOrder = {
      id: id,
      pizzas: [pizza],
      drinks: [drink],
      location: location,
      state: OrderState.Pending,
    };
    return order;
  });
}
