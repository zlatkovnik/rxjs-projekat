import { fetchAllRaces } from "../../models/Race";
import renderCard from "../components/ViewCard";
import { fetchAllCharacters } from "../../models/DTOs/Character";

export default class ViewSelect {
  container: HTMLElement;
  constructor(parent: HTMLElement) {
    this.container = document.createElement("div");
    parent.appendChild(this.container);
  }

  async render() {
    const characters = await fetchAllCharacters();
  }

  cleanUp() {
    this.container.innerHTML = "";
  }
}
