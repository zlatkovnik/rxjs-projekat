import { RACE_PATH } from "../util/paths";

export interface IRace {
  id: number;
  name: string;
  hp: number;
  attack: number;
  defence: number;
}

export async function fetchRace(id: number): Promise<IRace> {
  return fetch(RACE_PATH + `/${id}`).then((res) => res.json());
}

export async function fetchAllRaces(): Promise<IRace[]> {
  return fetch(RACE_PATH).then((res) => res.json());
}
