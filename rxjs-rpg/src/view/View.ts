import ViewCreator from "./ViewCreator";
import { ICharacter, fetchCharacter } from "../models/DTOs/Character";
import { Page } from "../util/pages";
import ViewHome from "./ViewHome";

export default class View {
  container: HTMLElement;
  currentPage: Page;

  creator: ViewCreator;
  home: ViewHome;

  myCharacter: ICharacter;

  constructor(parent: HTMLElement) {
    //Kontejner div
    this.container = document.createElement("div");
    this.container.className = "container";
    parent.appendChild(this.container);
    //Default stranica
    this.currentPage = Page.Home;
  }

  async render() {
    this.myCharacter = await fetchCharacter(2);
    switch (this.currentPage) {
      case Page.Home:
        this.home = new ViewHome(this.container, this.myCharacter);
        this.home.render();
        break;
      case Page.Create:
        this.creator = new ViewCreator(this.container);
        this.creator.render();
        break;
      default:
        break;
    }
  }
}
