import { OrderState } from "./enums";

export interface IPizzaType {
  id: number;
  name: string;
  price: number;
  minutesToPrepare: number;
}

export interface ITopping {
  id: number;
  name: string;
  price: number;
}

export interface IPizza {
  type: IPizzaType;
  toppings: ITopping[];
}

export interface IDrink {
  id: number;
  name: string;
  price: number;
}

export interface ILocation {
  id: number;
  name: string;
  ETA: number;
  //Estimated time of arrival in minutes
}
export interface IOrder {
  id: number;
  pizzas: IPizza[];
  drinks?: IDrink[];
  location: ILocation;
  state: OrderState;
}
