import {
  fromEvent,
  interval,
  timer,
  Observable,
  zip,
  of,
  from,
  merge,
} from "rxjs";
import { fromFetch } from "rxjs/fetch";
import {
  debounceTime,
  switchMap,
  map,
  tap,
  delay,
  mergeMap,
  takeUntil,
  take,
  finalize,
} from "rxjs/operators";
import {
  ICharacterDb,
  fetchAllCharactersDb,
  fetchCharacterCount,
  fetchCharacterDb,
} from "../models/CharacterDb";
import {
  fetchCharacter,
  ICharacter,
  fetchRandomCharacter,
  mapToCharacter,
} from "../models/DTOs/Character";
import { WEAPON_PATH, ARMOR_PATH, RACE_PATH } from "../util/paths";
import { fetchArmor } from "../models/Armor";
import { fetchRace } from "../models/Race";
import { fetchWeapon } from "../models/Weapon";

export function checkForDuplicateNameObservable(
  nameContainer: HTMLInputElement
) {
  return fromEvent(nameContainer, "input").pipe(
    debounceTime(500),
    switchMap(async () => await fetchAllCharactersDb()),
    map((characters: ICharacterDb[]) =>
      characters
        .map((character) => character.name)
        .includes(nameContainer.value)
    )
  );
}

export function pollingObservable(ms: number): Observable<ICharacter> {
  return timer(0, ms).pipe(switchMap((_) => randomCharacterObservable()));
}

export function countDownObservable(ms: number) {
  return timer(0, ms).pipe(
    take(6),
    map((number) => (6 - 1 - number).toString())
  );
}

export function zipIntoCharacterObservable(characterDb: ICharacterDb) {
  return zip(
    from(fetchRace(characterDb.raceId)),
    from(fetchArmor(characterDb.armorId)),
    from(fetchWeapon(characterDb.weaponId))
  ).pipe(
    map(([race, armor, weapon]) =>
      mapToCharacter(characterDb, race, armor, weapon)
    )
  );
}

export function randomCharacterObservable() {
  return from(fetchCharacterCount()).pipe(
    map((count) => Math.floor(Math.random() * count) + 1),
    switchMap((id) => fetchCharacterDb(id)),
    switchMap((characterDb) => zipIntoCharacterObservable(characterDb))
  );
}

export function mergeInputsObservable(
  button: HTMLButtonElement,
  body: HTMLElement
) {
  const click$ = fromEvent(button, "onclick");
  const press$ = fromEvent(body, "keydown");

  return merge(click$, press$).pipe(tap((ev) => console.log(ev)));
}
