import Race from "../Race";
//import Item from "../Item";
import Weapon from "../Weapon";
import Armor from "../Armor";
import CharacterDb from "../CharacterDb";
import {
  CHARACTER_PATH,
  ARMOR_PATH,
  WEAPON_PATH,
  RACE_PATH,
} from "../../util/paths";

import { pipe, of, from } from "rxjs";
import { switchMap } from "rxjs/operators";
import { fromFetch } from "rxjs/fetch";
import { getImageLink } from "../../util/misc";

export default class Character {
  id: number;
  name: string;
  gold: number;
  race: string;
  image: string;
  hp: number;
  attack: number;
  defence: number;
  //items?: Item[];
  weapon: Weapon;
  armor: Armor;

  static async fetchById(id: number) {
    fromFetch(CHARACTER_PATH + `/${id}`)
      .pipe(
        switchMap(async (res) => await res.json()),
        switchMap(async (characterDb: CharacterDb) => {
          const [race, armor, weapon] = await Character.fetchItems(characterDb);
          // const character: Character = {
          //   id: characterDb.id,
          //   image: getImageLink(race.name),
          //   armor: armor,
          //   weapon: weapon,
          //   attack: race.attack + weapon.attack,
          //   defence: race.defence + armor.defence,
          //   gold: characterDb.gold,
          //   hp: race.hp,
          //   name: characterDb.name,
          //   race: race.name,
          // };
          // return character;
        })
      )
      .subscribe(async (character) => {});
  }

  static async fetchItems(character: CharacterDb) {
    return Promise.all([
      fetch(RACE_PATH + `/${character.raceId}`),
      fetch(ARMOR_PATH + `/${character.armorId}`),
      fetch(WEAPON_PATH + `/${character.weaponId}`),
    ]).then((res) => Promise.all(res.map((r) => r.json())));
  }

  static changeWeapon(character: Character, weapon: Weapon) {
    character.attack =
      character.attack - character.weapon.attack + weapon.attack;
    character.weapon = weapon;
  }

  changeArmor(character: Character, armor: Armor) {
    character.defence =
      character.defence - character.armor.defence + armor.defence;
    character.armor = armor;
  }
}
