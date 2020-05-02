import { ICharacter, fetchCharacter } from "../models/DTOs/Character";
import { Page } from "../util/pages";
import renderHome from "./ViewHome";
import renderNavbar from "./ViewNavbar";
import renderCreator from "./ViewCreator";
import pageTemplate from "./templates/pageTemplate";
import renderSelect from "./ViewSelect";

export default function render(parent: HTMLElement) {
  parent.innerHTML = pageTemplate();

  const container = document.querySelector("#container");
  const navbar = <HTMLElement>document.querySelector("#navbar");
  renderNavbar(navbar, Page.Home, renderPage);
}

const renderPage = async (page: string) => {
  const container = <HTMLElement>document.querySelector("#container");
  container.innerHTML = "";
  switch (page) {
    case Page.Home:
      renderHome(container);
      break;
    case Page.Create:
      renderCreator(container);
      break;
    case Page.Select:
      renderSelect(container);
      break;
    default:
      break;
  }
};
