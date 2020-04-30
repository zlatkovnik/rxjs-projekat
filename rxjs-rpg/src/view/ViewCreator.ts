import { IRace, getRaces } from "../models/Race";
import { ICharacterDb, createCharacter } from "../models/CharacterDb";

export default class ViewCreator {
  container: HTMLElement;
  racesPromise: Promise<IRace[]>;
  constructor(parent: HTMLElement) {
    const row = document.createElement("div");
    row.className = "row";
    parent.appendChild(row);

    this.container = document.createElement("div");
    this.container.className = "d-flex flex-column";
    this.container.innerHTML = "<h1>Loading...</h1>";
    row.appendChild(this.container);

    this.racesPromise = getRaces();
  }

  async render() {
    const races = await this.racesPromise.catch((err) =>
      console.log(err.message)
    );
    this.container.innerHTML = "";

    const header = document.createElement("h3");
    header.className = "text-center";
    header.innerHTML = "Create character";
    this.container.appendChild(header);

    const nameContainer = document.createElement("div");
    nameContainer.className = "input-group mb-3";
    this.container.appendChild(nameContainer);

    const nameLabel = document.createElement("div");
    nameLabel.className = "input-group-prepend";
    nameLabel.innerHTML = '<span class="input-group-text">name</span>';
    nameContainer.appendChild(nameLabel);

    const nameInput = document.createElement("input");
    nameInput.placeholder = "Character name";
    nameInput.className = "form-control";
    nameContainer.appendChild(nameInput);

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
    //@ts-ignore
    races.forEach((race) => {
      const option = document.createElement("option");
      option.text = race.name;
      option.value = race.id.toString();
      raceInput.add(option);
    });
    raceContainer.appendChild(raceInput);

    const button = document.createElement("button");
    button.className = "btn btn-primary";
    button.innerHTML = "Submit";
    button.onclick = (ev) => this.handleSubmit(nameInput, raceInput);
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
    createCharacter(character).catch((err) =>
      console.log(
        "Error occured while inserting character in database",
        err.message
      )
    );
  }
}
