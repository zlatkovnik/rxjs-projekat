import { IRace, fetchAllRaces } from "../../models/Race";
import { ICharacterDb, createCharacter } from "../../models/CharacterDb";
import { checkForDuplicateNameObservable } from "../../service/rxjsService";
import createTemplate from "../templates/createTemplate";
import { Subscription } from "rxjs";

export default class ViewCreator {
  container: HTMLElement;
  subscriber: Subscription;
  constructor(parent: HTMLElement) {
    this.container = document.createElement("div");
    parent.appendChild(this.container);
  }

  async render() {
    this.container.innerHTML = "<h1>Loading...</h1>";
    const races = await fetchAllRaces();

    this.container.innerHTML = createTemplate(races);

    const submit: HTMLButtonElement = document.querySelector("#create-submit");
    submit.onclick = this.handleSubmit;

    const nameInput: HTMLInputElement = document.querySelector("#create-name");
    this.subscriber = checkForDuplicateNameObservable(nameInput).subscribe((bool) => this.setNameError(bool));
  }

  cleanUp() {
    if (this.subscriber) this.subscriber.unsubscribe();
    this.container.innerHTML = "";
  }

  handleSubmit = () => {
    const nameInput: HTMLInputElement = document.querySelector("#create-name");
    const raceInput: HTMLSelectElement = document.querySelector("#create-race");

    const character: ICharacterDb = {
      name: nameInput.value,
      raceId: parseInt(raceInput.value),
      gold: 0,
      armorId: 1,
      weaponId: 1,
    };
    nameInput.value = "";
    createCharacter(character).catch((err) => console.log("Error creating character", err.message));
  };

  setNameError = (bool: boolean) => {
    const errorLabel = document.querySelector("#create-name-error");
    const submit = <HTMLButtonElement>document.querySelector("#create-submit");
    if (bool) {
      submit.disabled = true;
      errorLabel.innerHTML = "A character with that name already exists";
    } else {
      submit.disabled = false;
      errorLabel.innerHTML = "";
    }
  };
}
