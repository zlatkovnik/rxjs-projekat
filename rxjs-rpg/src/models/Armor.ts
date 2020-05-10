import { ARMOR_PATH, ARMOR_COUNT_PATH } from "../util/paths";

export interface IArmor {
  id: number;
  name: string;
  defence: number;
  cost: number;
}

export async function fetchArmor(id: number): Promise<IArmor> {
  return fetch(ARMOR_PATH + `/${id}`).then((res) => res.json());
}

export async function fetchAllArmors(): Promise<IArmor[]> {
  return fetch(ARMOR_PATH).then((res) => res.json());
}

export async function fetchArmorCount(): Promise<number> {
  return fetch(ARMOR_COUNT_PATH)
    .then((res) => res.json())
    .then((data) => data.count);
}
