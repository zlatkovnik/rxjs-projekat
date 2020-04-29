import { IOrder } from "../models/interfaces";

export const BASE_URL = "http://localhost:3000/";
export const PIZZA_URL = "http://localhost:3000/pizzaTypes/";
export const TOPPING_URL = "http://localhost:3000/toppings/";
export const DRINK_URL = "http://localhost:3000/drinks/";
export const LOCATION_URL = "http://localhost:3000/locations/";

export function randomFromArray(array: any[]) {
  if (!array) return null;
  return array[Math.floor(Math.random() * array.length)];
}

export function getOrderPrice(order: IOrder): number {
  if (!order) return 0;
  let sum = 0;
  order.pizzas.forEach((pizza) => {
    sum += pizza.type.price;
    pizza.toppings.forEach((topping) => (sum += topping.price));
  });
  order.drinks.forEach((drink) => (sum += drink.price));
  return sum;
}
