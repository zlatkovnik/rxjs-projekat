import ViewCreator from "./ViewCreator";
import { ICharacter, fetchById } from "../models/DTOs/Character";
import { getImageLink } from "../util/misc";

export default class View {
  container: HTMLElement;
  creator: ViewCreator;

  myCharacter: ICharacter;

  constructor(parent: HTMLElement) {
    this.container = document.createElement("div");
    this.container.className = "container";
    parent.appendChild(this.container);

    //Character creator
    const createContainer = document.createElement("div");
    createContainer.className = "row";
    this.container.appendChild(createContainer);
    this.creator = new ViewCreator(createContainer);

    //Character cards
  }

  render() {
    fetchById(1);
    this.creator.render();
  }
}
