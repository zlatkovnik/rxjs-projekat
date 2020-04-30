import { CHARACTER_PATH } from "../util/paths";

export interface ICharacterDb {
  id?: number;
  name: string;
  gold: number;
  raceId: number;
  weaponId: number;
  armorId: number;
}

export async function fetchCharacter(id: number): Promise<ICharacterDb> {
  return fetch(CHARACTER_PATH + `/${id}`).then((res) => res.json());
}

export async function createCharacter(character: ICharacterDb) {
  return fetch(CHARACTER_PATH, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(character),
  });
}
