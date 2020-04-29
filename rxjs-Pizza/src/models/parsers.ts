import { IOrder, IPizza, IPizzaType, ITopping } from "./interfaces";
import { getOrderPrice } from "../service/util";

export function parseOrder(order: IOrder): string {
  return `${order.pizzas.map((pizza) =>
    parsePizza(pizza)
  )}</br>Ukupno: ${getOrderPrice(order)} dinara`;
}

function parsePizza(pizza: IPizza): string {
  return `${parsePizzaType(
    pizza.type
  )} sa:</br>${pizza.toppings.map((topping) => parseTopping(topping))}`;
}

function parsePizzaType(pizzaType: IPizzaType): string {
  return `${pizzaType.name}, ${pizzaType.price} dinara`;
}

function parseTopping(topping: ITopping): string {
  return `<small>${topping.name}, ${topping.price} dinara</small>`;
}
