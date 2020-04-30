import { IRace } from "../Race";
import { IWeapon } from "../Weapon";
import { IArmor } from "../Armor";
import { ICharacterDb } from "../CharacterDb";
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

export interface ICharacter {
  id: number;
  name: string;
  gold: number;
  race: string;
  image: string;
  hp: number;
  attack: number;
  defence: number;
  weapon: IWeapon;
  armor: IArmor;
}

export async function fetchById(id: number) {
  fromFetch(CHARACTER_PATH + `/${id}`)
    .pipe(
      switchMap(async (res) => await res.json()),
      switchMap(async (characterDb: ICharacterDb) => {
        const [race, armor, weapon] = await fetchItems(characterDb);
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

export async function fetchItems(character: ICharacterDb) {
  return Promise.all([
    fetch(RACE_PATH + `/${character.raceId}`),
    fetch(ARMOR_PATH + `/${character.armorId}`),
    fetch(WEAPON_PATH + `/${character.weaponId}`),
  ]).then((res) => Promise.all(res.map((r) => r.json())));
}

export function changeWeapon(character: ICharacter, weapon: IWeapon) {
  character.attack = character.attack - character.weapon.attack + weapon.attack;
  character.weapon = weapon;
}

export function changeArmor(character: ICharacter, armor: IArmor) {
  character.defence =
    character.defence - character.armor.defence + armor.defence;
  character.armor = armor;
}
