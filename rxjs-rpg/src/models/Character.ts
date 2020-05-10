import { IRace } from "./Race";
import { IWeapon } from "./Weapon";
import { IArmor } from "./Armor";
import {
  ICharacterDb,
  fetchCharacterDb,
  fetchAllCharactersDb,
  fetchCharacterCount,
  mapToCharacterDB,
} from "./CharacterDb";
import {
  CHARACTER_PATH,
  ARMOR_PATH,
  WEAPON_PATH,
  RACE_PATH,
} from "../util/paths";

import { getImageLink } from "../util/misc";

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

export async function fetchCharacter(id: number) {
  return fetchCharacterDb(id).then(async (character: ICharacterDb) => {
    const [race, armor, weapon] = await fetchItems(character);
    return mapToCharacter(character, race, armor, weapon);
  });
}

export async function fetchRandomCharacter() {
  return fetchCharacterCount().then((count) =>
    fetchCharacter(Math.floor(Math.random() * count) + 1)
  );
}

export async function fetchRandomCharacterExcept(id: number) {
  const characterCount = await fetchCharacterCount();
  const ids = Array.from(Array(characterCount).keys())
    .map((x) => x + 1)
    .filter((num) => num != id);
  return fetchCharacter(ids[Math.floor(Math.random() * ids.length)]);
}

export async function fetchAllCharacters() {
  const characterCount = await fetchCharacterCount();
  const ids = Array.from(Array(characterCount).keys()).map((x) => x + 1);
  const promises = ids.map((id) => fetchCharacter(id));
  const characters = await Promise.all(promises);
  return characters;
}

export async function fetchItems(character: ICharacterDb) {
  return Promise.all([
    fetch(RACE_PATH + `/${character.raceId}`),
    fetch(ARMOR_PATH + `/${character.armorId}`),
    fetch(WEAPON_PATH + `/${character.weaponId}`),
  ]).then((res) => Promise.all(res.map((r) => r.json())));
}

export function mapToCharacter(
  characterDb: ICharacterDb,
  race: IRace,
  armor: IArmor,
  weapon: IWeapon
): ICharacter {
  const character: ICharacter = {
    id: characterDb.id,
    image: getImageLink(race.name),
    armor: armor,
    weapon: weapon,
    attack: race.attack + weapon.attack,
    defence: race.defence + armor.defence,
    gold: characterDb.gold,
    hp: race.hp,
    name: characterDb.name,
    race: race.name,
  };
  return character;
}

export async function updateCharacter(character: ICharacter) {
  const characterDb = await mapToCharacterDB(character);
  fetch(CHARACTER_PATH + `/${characterDb.id.toString()}`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(characterDb),
  }).catch((err) => console.log(err));
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
