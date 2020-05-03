import renderCard from "../components/ViewCard";
import { fetchAllCharacters, ICharacter } from "../../models/DTOs/Character";

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
    const characters = await fetchAllCharacters();
    this.container.innerHTML = "";

    characters.forEach((char) => {
      const col = document.createElement("div");
      col.className = "col-6 col-lg-3";
      this.container.appendChild(col);
      renderCard(col, char);

      const button = document.createElement("button");
      button.value = char.id.toString();
      button.className = "btn btn-primary btn-lg";
      button.innerHTML = "Select";
      button.onclick = (ev) => this.handleSelect(ev, char);
      col.appendChild(button);
    });
  }

  cleanUp() {
    this.container.innerHTML = "";
  }

  handleSelect(ev: MouseEvent, character: ICharacter) {
    this.setSelectedCharacter(character);
  }

  handleDelete(ev: MouseEvent, character: ICharacter) {}
}
