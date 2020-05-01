import { ICharacter } from "../models/DTOs/Character";
import ViewCard from "./ViewCard";

export default class ViewHome {
  container: HTMLElement;
  myCharacter: ICharacter;
  constructor(parent: HTMLElement, myCharacter: ICharacter) {
    this.myCharacter = myCharacter;
    this.container = document.createElement("div");
    this.container.className = "container";
    parent.appendChild(this.container);
  }

  render() {
    const card = new ViewCard(this.container, this.myCharacter);
    card.render();
  }
}
