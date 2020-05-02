import { Page } from "../util/pages";
import renderNavbar from "./components/ViewNavbar";
import ViewHome from "./pages/ViewHome";
import ViewCreator from "./pages/ViewCreator";
import ViewSelect from "./pages/ViewSelect";
import { ICharacter } from "../models/DTOs/Character";
import ViewCombat from "./pages/ViewCombat";

export default class View {
  navbarContainer: HTMLDivElement;
  contentContainer: HTMLDivElement;

  viewHome: ViewHome;
  viewCreator: ViewCreator;
  viewSelect: ViewSelect;
  viewCombat: ViewCombat;

  myCharacter: ICharacter | null;

  constructor(parent: HTMLElement) {
    this.navbarContainer = document.createElement("div");
    parent.appendChild(this.navbarContainer);
    this.contentContainer = document.createElement("div");
    this.contentContainer.className = "container";
    parent.appendChild(this.contentContainer);
    //Pages
    this.viewHome = new ViewHome(this.contentContainer);
    this.viewCreator = new ViewCreator(this.contentContainer);
    this.viewSelect = new ViewSelect(this.contentContainer, this.setCharacter);
    //Props
    this.myCharacter = null;
  }

  render() {
    renderNavbar(this.navbarContainer, this.renderPage);
    this.renderPage(Page.Home);
  }

  renderPage = (page: string) => {
    this.cleanUp();
    switch (page) {
      case Page.Home:
        this.viewHome.render();
        break;
      case Page.Create:
        this.viewCreator.render();
        break;
      case Page.Select:
        this.viewSelect.render();
        break;
      case Page.Combat:
        this.viewCombat.render();
        break;
      default:
        break;
    }
  };

  cleanUp() {
    this.viewHome.cleanup();
    this.viewCreator.cleanUp();
    this.viewSelect.cleanUp();
    if (this.viewCombat) this.viewCombat.cleanUp();
  }

  setCharacter = (character: ICharacter) => {
    this.myCharacter = character;
    this.viewCombat = new ViewCombat(this.contentContainer, this.myCharacter);

    //Ovo su elementi sa navbara
    const characterLabel = document.querySelector("#nav-character");
    characterLabel.innerHTML = character.name;

    const combatButton = document.querySelector("#nav-combat");
    combatButton.innerHTML = "Combat";
  };
}
