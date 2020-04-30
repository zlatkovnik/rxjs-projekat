import ViewCreator from "./ViewCreator";
import { ICharacter, getCharacterObservable } from "../models/DTOs/Character";
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
    this.currentPage = Page.Create;

    //Home
    this.home = new ViewHome(this.container);

    //Character creator
    this.creator = new ViewCreator(this.container);

    //Character cards
  }

  async render() {
    switch (this.currentPage) {
      case Page.Home:
        this.home.render();
        break;
      case Page.Create:
        this.creator.render();
        break;
      default:
        break;
    }
  }
}
