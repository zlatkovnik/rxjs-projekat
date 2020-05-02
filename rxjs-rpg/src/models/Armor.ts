import { ARMOR_PATH } from "../util/paths";

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
