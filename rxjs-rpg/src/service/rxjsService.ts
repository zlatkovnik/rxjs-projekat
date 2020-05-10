import { fromEvent, interval, timer, Observable, zip, of, from, merge } from "rxjs";
import { debounceTime, switchMap, map, tap, delay, takeUntil, take, concatMap } from "rxjs/operators";
import { ICharacterDb, fetchAllCharactersDb, fetchCharacterCount, fetchCharacterDb } from "../models/CharacterDb";
import { fetchCharacter, ICharacter, mapToCharacter } from "../models/Character";
import { fetchArmor } from "../models/Armor";
import { fetchRace } from "../models/Race";
import { fetchWeapon } from "../models/Weapon";

export function checkForDuplicateNameObservable(nameContainer: HTMLInputElement) {
  return fromEvent(nameContainer, "input").pipe(
    debounceTime(500),
    switchMap(async () => await fetchAllCharactersDb()),
    map((characters: ICharacterDb[]) => characters.map((character) => character.name).includes(nameContainer.value))
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
  ).pipe(map(([race, armor, weapon]) => mapToCharacter(characterDb, race, armor, weapon)));
}

export function randomCharacterObservable() {
  return from(fetchCharacterCount()).pipe(
    map((count) => Math.floor(Math.random() * count) + 1),
    switchMap((id) => fetchCharacterDb(id)),
    switchMap((characterDb) => zipIntoCharacterObservable(characterDb))
  );
}

export function randomIntervalObservable(ms: number) {
  return interval(0).pipe(concatMap((i) => of(i).pipe(delay(1000 + Math.random() * ms))));
}

export function intervalUntilClickObservable(button: HTMLButtonElement, ms: number) {
  const click$ = fromEvent(button, "click");
  return interval(ms).pipe(takeUntil(click$));
}

//S obzirom da ne mogu Promise<any[]> da spreadujem moram ovako

export function mergeAllCharactersObservable(count: number) {
  const ids = Array.from(Array(count).keys()).map((x) => x + 1);
  const characters$ = from(ids.map((id) => fetchCharacter(id)));
  return merge(characters$);
}

export function allWeaponsObservable(count: number) {
  const ids = Array.from(Array(count).keys()).map((x) => x + 1);
  const weapons$ = from(ids.map((id) => fetchWeapon(id)));
  return from(weapons$);
}

export function allArmorsObservable(count: number) {
  const ids = Array.from(Array(count).keys()).map((x) => x + 1);
  const armor$ = from(ids.map((id) => fetchArmor(id)));
  return from(armor$);
}
