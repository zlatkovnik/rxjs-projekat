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

export async function fetchRaceIdByName(name: string): Promise<number> {
  return fetch(RACE_PATH + `?name=${name}`)
    .then((res) => res.json())
    .then((races: IRace[]) => races[0].id);
}
