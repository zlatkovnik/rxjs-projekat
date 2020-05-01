import { IRace, getRaces } from "../models/Race";
import { ICharacterDb, createCharacter } from "../models/CharacterDb";
import { checkForDuplicateName } from "../service/inputService";

export default class ViewCreator {
  container: HTMLElement;
  errorLabel: HTMLElement;
  constructor(parent: HTMLElement) {
    this.container = document.createElement("div");
    this.container.className = "d-flex flex-column p-5 m-5 border";
    this.container.style.maxWidth = "650px";
    this.container.innerHTML = "<h1>Loading...</h1>";
    parent.appendChild(this.container);
  }

  async render() {
    //Ucitavam rase iz baze
    this.container.innerHTML = "";
    const races = await getRaces().catch((err) => {
      this.container.innerHTML =
        '<p class="text-danger">No connection to server</p>';
      throw Error("No connection to server");
    });

    const header = document.createElement("h3");
    header.className = "text-center";
    header.innerHTML = "Create character";
    this.container.appendChild(header);

    const nameInput = this.renderNameInput();

    const raceInput = this.renderRaceInput(races);

    this.renderButton(nameInput, raceInput);
  }

  renderNameInput() {
    const nameContainer = document.createElement("div");
    nameContainer.className = "input-group mb-3";
    this.container.appendChild(nameContainer);

    this.errorLabel = document.createElement("p");
    this.container.appendChild(this.errorLabel);

    const nameLabel = document.createElement("div");
    nameLabel.className = "input-group-prepend";
    nameLabel.innerHTML = '<span class="input-group-text">name</span>';
    nameContainer.appendChild(nameLabel);

    const nameInput = document.createElement("input");
    nameInput.placeholder = "Character name";
    nameInput.className = "form-control";
    nameContainer.appendChild(nameInput);

    checkForDuplicateName(nameInput, this.setNameError);

    return nameInput;
  }

  renderRaceInput(races: IRace[]) {
    const raceContainer = document.createElement("div");
    raceContainer.className = "input-group mb-3";
    this.container.appendChild(raceContainer);

    const raceLabel = document.createElement("label");
    raceLabel.className = "input-group-prepend";
    raceLabel.innerHTML =
      '<label class="input-group-text" for="inputGroupSelect01">race</label>';
    raceContainer.appendChild(raceLabel);

    const raceInput = document.createElement("select");
    raceInput.className = "custom-select";
    races.forEach((race) => {
      const option = document.createElement("option");
      option.text = race.name;
      option.value = race.id.toString();
      raceInput.add(option);
    });
    raceContainer.appendChild(raceInput);

    return raceInput;
  }

  renderButton(nameInput: HTMLInputElement, raceInput: HTMLSelectElement) {
    const button = document.createElement("button");
    button.className = "btn btn-primary";
    button.innerHTML = "Submit";
    button.onclick = () => this.handleSubmit(nameInput, raceInput);
    this.container.appendChild(button);
  }

  handleSubmit(nameInput: HTMLInputElement, raceInput: HTMLSelectElement) {
    const character: ICharacterDb = {
      name: nameInput.value,
      raceId: parseInt(raceInput.value),
      gold: 0,
      armorId: 1,
      weaponId: 1,
    };
    createCharacter(character).catch((err) => {
      console.log(err.message);
      this.container.innerHTML =
        '<p class="text-danger">An error occured, try again</p>';
    });
  }

  setNameError = (bool: boolean) => {
    if (bool) {
      this.errorLabel.className = "text-secondary";
      this.errorLabel.innerHTML =
        "A character with that name already exists, change it if you want.";
    } else {
      this.errorLabel.innerHTML = "";
    }
  };
}
