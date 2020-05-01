import { ICharacter } from "../models/DTOs/Character";
import renderCard from "./ViewCard";

export default function renderHome(
  parent: HTMLElement,
  myCharacter: ICharacter
) {
  const container = document.createElement("div");
  container.className = "container";
  parent.appendChild(container);

  const row = document.createElement("div");
  row.className = "row";
  container.appendChild(row);

  renderCard(row, myCharacter);
}
