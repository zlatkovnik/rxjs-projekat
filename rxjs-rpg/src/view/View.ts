import { Page } from "../util/pages";
import renderNavbar from "./pages/ViewNavbar";
import renderCreator from "./pages/ViewCreator";
import renderSelect from "./pages/ViewSelect";
import ViewHome from "./pages/ViewHome";
import ViewCreator from "./pages/ViewCreator";
import ViewSelect from "./pages/ViewSelect";

export default class View {
  navbarContainer: HTMLDivElement;
  contentContainer: HTMLDivElement;

  viewHome: ViewHome;
  viewCreator: ViewCreator;
  viewSelect: ViewSelect;

  constructor(parent: HTMLElement) {
    this.navbarContainer = document.createElement("div");
    parent.appendChild(this.navbarContainer);
    this.contentContainer = document.createElement("div");
    this.contentContainer.className = "container";
    parent.appendChild(this.contentContainer);
    //Pages
    this.viewHome = new ViewHome(this.contentContainer);
    this.viewCreator = new ViewCreator(this.contentContainer);
    this.viewSelect = new ViewSelect(this.contentContainer);
  }

  render() {
    renderNavbar(this.navbarContainer, Page.Home, this.renderPage);
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
      default:
        break;
    }
  };

  cleanUp() {
    this.viewHome.cleanup();
    this.viewCreator.cleanUp();
    this.viewSelect.cleanUp();
  }
}
