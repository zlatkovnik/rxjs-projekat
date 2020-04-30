import { CHARACTER_PATH } from "../util/paths";

export default class CharacterDb {
  id?: number;
  name: string;
  gold: number;
  raceId: number;
  //itemIds: number[];
  weaponId: number;
  armorId: number;

  static async fetchCharacter(id: number): Promise<CharacterDb> {
    return fetch(CHARACTER_PATH + `/${id}`).then((res) => res.json());
  }

  static async createCharacter(character: CharacterDb) {
    return fetch(CHARACTER_PATH, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(character),
    });
  }
}
