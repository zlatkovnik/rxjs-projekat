import { CHARACTER_PATH, CHARACTER_COUNT_PATH } from "../util/paths";

export interface ICharacterDb {
  id?: number;
  name: string;
  gold: number;
  raceId: number;
  weaponId: number;
  armorId: number;
}

export async function fetchCharacterDb(id: number): Promise<ICharacterDb> {
  return fetch(CHARACTER_PATH + `/${id}`).then((res) => res.json());
}

export async function fetchAllCharactersDb(): Promise<ICharacterDb[]> {
  return fetch(CHARACTER_PATH).then((res) => res.json());
}

export async function fetchCharacterCount(): Promise<number> {
  return fetch(CHARACTER_COUNT_PATH)
    .then((res) => res.json())
    .then((data) => data.count);
}

export async function createCharacter(character: ICharacterDb) {
  await incrementCharacterCount();
  return fetch(CHARACTER_PATH, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(character),
  });
}

async function incrementCharacterCount() {
  const count = await fetchCharacterCount();
  return fetch(CHARACTER_COUNT_PATH, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ count: count + 1 }),
  });
}
