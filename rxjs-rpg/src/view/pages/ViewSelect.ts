import renderCard from "../components/ViewCard";
import { ICharacter } from "../../models/Character";
import { mergeAllCharactersObservable } from "../../service/rxjsService";
import { fetchCharacterCount } from "../../models/CharacterDb";

export default class ViewSelect {
  container: HTMLElement;
  setSelectedCharacter: Function;
  constructor(parent: HTMLElement, setSelectedCharacter: Function) {
    this.container = document.createElement("div");
    this.container.className = "row align-items-center";
    parent.appendChild(this.container);

    this.setSelectedCharacter = setSelectedCharacter;
  }

  async render() {
    this.container.innerHTML = "<h1>Loading...</h1>";
    const count = await fetchCharacterCount();
    mergeAllCharactersObservable(count).subscribe(async (character) => this.renderCharacter(await character));
    this.container.innerHTML = "";
  }

  renderCharacter(character: ICharacter) {
    const col = document.createElement("div");
    col.className = "col-6 col-lg-3";
    this.container.appendChild(col);
    col.innerHTML = renderCard(character);

    const button = document.createElement("button");
    button.value = character.id.toString();
    button.className = "cbtn btn btn-primary btn-lg";
    button.id = "c" + character.id.toString();
    button.innerHTML = "Select";
    button.onclick = (ev) => this.handleSelect(ev, character);
    col.appendChild(button);
  }

  cleanUp() {
    this.container.innerHTML = "";
  }

  handleSelect(ev: MouseEvent, character: ICharacter) {
    this.setSelectedCharacter(character);
    this.setSelected(character);
  }

  setSelected(character: ICharacter) {
    const buttons: HTMLButtonElement[] = Array.from(document.querySelectorAll(".cbtn"));
    buttons.forEach((btn) => {
      btn.disabled = false;
      btn.innerHTML = "Select";
      btn.className = "cbtn btn btn-primary btn-lg";
    });
    const selectedButton = buttons.filter((btn) => btn.id === `c${character.id.toString()}`);
    selectedButton[0].disabled = false;
    selectedButton[0].innerHTML = "Chosen";
    selectedButton[0].className = "cbtn btn btn-secondary btn-lg";
  }
}
