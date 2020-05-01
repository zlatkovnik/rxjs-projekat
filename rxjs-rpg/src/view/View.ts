import ViewCreator from "./ViewCreator";
import { ICharacter, fetchCharacter } from "../models/DTOs/Character";
import { Page } from "../util/pages";
import renderHome from "./ViewHome";
import renderNavbar from "./ViewNavbar";

export default class View {
  container: HTMLElement;
  navbarContainer: HTMLElement;
  currentPage: Page;

  creator: ViewCreator;

  myCharacter: ICharacter;

  constructor(parent: HTMLElement) {
    this.navbarContainer = document.createElement("div");
    parent.appendChild(this.navbarContainer);
    //Kontejner div
    this.container = document.createElement("div");
    this.container.className = "container";
    parent.appendChild(this.container);
    //Default stranica
    this.currentPage = Page.Home;
  }

  async render() {
    //document.body.innerHTML = "";
    this.myCharacter = await fetchCharacter(1);

    renderNavbar(this.navbarContainer, this.currentPage, this.render);

    this.renderPage(this.currentPage);
  }

  renderPage(page: Page) {
    this.currentPage = page;
    switch (page) {
      case Page.Home:
        renderHome(this.container, this.myCharacter);
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
