import { IRace, fetchAllRaces } from "../models/Race";
import { ICharacterDb, createCharacter } from "../models/CharacterDb";
import { checkForDuplicateNameObservable } from "../service/inputService";
import createTemplate from "./templates/createTemplate";

export default async function renderCreator(parent: HTMLElement) {
  const container = document.createElement("div");
  parent.appendChild(container);
  container.innerHTML = "<h1>Loading...</h1>";

  const races = await fetchAllRaces();
  container.innerHTML = createTemplate(races);

  const submit: HTMLButtonElement = document.querySelector("#create-submit");
  submit.onclick = handleSubmit;

  const nameInput: HTMLInputElement = document.querySelector("#create-name");
  checkForDuplicateNameObservable(nameInput).subscribe((bool) =>
    setNameError(bool)
  );
}

const handleSubmit = () => {
  const nameInput: HTMLInputElement = document.querySelector("#create-name");
  const raceInput: HTMLSelectElement = document.querySelector("#create-race");

  const character: ICharacterDb = {
    name: nameInput.value,
    raceId: parseInt(raceInput.value),
    gold: 0,
    armorId: 1,
    weaponId: 1,
  };
  createCharacter(character).catch((err) =>
    console.log("Error creating character", err.message)
  );
};

const setNameError = (bool: boolean) => {
  const errorLabel = document.querySelector("#create-name-error");
  if (bool)
    errorLabel.innerHTML =
      "A character with that name already exists, change it if you want.";
  else errorLabel.innerHTML = "";
};
