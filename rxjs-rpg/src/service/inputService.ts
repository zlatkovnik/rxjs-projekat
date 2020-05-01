import { fromEvent } from "rxjs";
import { debounceTime, switchMap, map } from "rxjs/operators";
import { ICharacterDb, fetchAllCharacters } from "../models/CharacterDb";

export function checkForDuplicateName(
  nameContainer: HTMLInputElement,
  fn: Function
) {
  fromEvent(nameContainer, "input")
    .pipe(
      debounceTime(500),
      switchMap(async () => await fetchAllCharacters()),
      map((characters: ICharacterDb[]) =>
        characters
          .map((character) => character.name)
          .includes(nameContainer.value)
      )
    )
    .subscribe((bool) => fn(bool));
}
