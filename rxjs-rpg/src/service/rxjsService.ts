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
  concatMap,
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
  fetchAllCharacters,
} from "../models/DTOs/Character";
import { WEAPON_PATH, ARMOR_PATH, RACE_PATH } from "../util/paths";
import { fetchArmor, fetchAllArmors } from "../models/Armor";
import { fetchRace } from "../models/Race";
import { fetchWeapon, fetchAllWeapons } from "../models/Weapon";

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

export function randomIntervalObservable(ms: number) {
  return interval(0).pipe(
    concatMap((i) => of(i).pipe(delay(1000 + Math.random() * ms)))
  );
}

export function zipObservables(
  interval: Observable<any>,
  attack: Observable<any>
) {
  return zip(
    interval.pipe(map((_) => Date.now())),
    attack.pipe(map((_) => Date.now()))
  ).pipe(map(([start, end]) => end - start));
}

export function intervalUntilClickObservable(
  button: HTMLButtonElement,
  ms: number
) {
  const click$ = fromEvent(button, "click");
  return interval(ms).pipe(takeUntil(click$));
}

export function mergeAllCharactersObservable(count: number) {
  const ids = Array.from(Array(count).keys()).map((x) => x + 1);
  const characters$ = of(ids.map((id) => fetchCharacter(id)));
  return merge(characters$);
}

export function allItemsObservable() {
  return merge(from(fetchAllArmors()), from(fetchAllWeapons()));
}
