import { ICharacter } from "../models/DTOs/Character";
import cardTemplate from "./templates/cardTemplate";
import notFoundTemplate from "./templates/notFoundTemplate";

export default function renderCard(
  parent: HTMLElement,
  character: ICharacter | null
) {
  const div = document.createElement("div");
  parent.appendChild(div);
  if (character) {
    const { name, gold, attack, defence, image, race, hp } = character;
    div.innerHTML = cardTemplate(image, name, race, gold, hp, attack, defence);
  } else {
    div.innerHTML = notFoundTemplate();
  }
}
