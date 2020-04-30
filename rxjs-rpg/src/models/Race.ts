import { RACE_PATH } from "../util/paths";

export default class Race {
  id: number;
  name: string;
  hp: number;
  attack: number;
  defence: number;

  static async getRaces() {
    return fetch(RACE_PATH).then((res) => res.json());
  }
}
