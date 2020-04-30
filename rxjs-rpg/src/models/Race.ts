import { RACE_PATH } from "../util/paths";

export interface IRace {
  id: number;
  name: string;
  hp: number;
  attack: number;
  defence: number;
}
export async function getRaces() {
  return fetch(RACE_PATH).then((res) => res.json());
}
