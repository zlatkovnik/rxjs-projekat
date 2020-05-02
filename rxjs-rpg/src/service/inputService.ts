import { fromEvent, interval, timer } from "rxjs";
import { debounceTime, switchMap, map, tap } from "rxjs/operators";
import {
  ICharacterDb,
  fetchAllCharactersDb,
  fetchCharacterCount,
} from "../models/CharacterDb";
import { fetchCharacter } from "../models/DTOs/Character";

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

export function pollingObservable(ms: number) {
  return timer(0, ms).pipe(
    switchMap(async (_) => await fetchCharacterCount()),
    switchMap(
      async (id) => await fetchCharacter(Math.floor(Math.random() * id))
    )
  );
}
