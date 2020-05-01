import { Page } from "../util/pages";
import navbarTemplate from "./templates/navbarTemplate";

export default function renderNavbar(
  parent: HTMLElement,
  currentPage: Page,
  renderPage: Function
) {
  const div = document.createElement("div");
  div.innerHTML = navbarTemplate();
  parent.appendChild(div);
}

function handleClick(ev: any, renderPage: Function) {
  renderPage(ev.target.value);
}
