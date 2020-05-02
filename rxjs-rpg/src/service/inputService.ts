import { fromEvent, interval, timer, Observable } from "rxjs";
import { debounceTime, switchMap, map, tap } from "rxjs/operators";
import {
  ICharacterDb,
  fetchAllCharactersDb,
  fetchCharacterCount,
} from "../models/CharacterDb";
import { fetchCharacter, ICharacter } from "../models/DTOs/Character";

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
  return timer(0, ms).pipe(
    switchMap(async (_) => await fetchCharacterCount()),
    switchMap(
      async (count) =>
        await fetchCharacter(Math.floor(Math.random() * count) + 1)
    )
  );
}
