import { ICharacter } from "../../models/Character";
import cardTemplate from "../templates/cardTemplate";
import notFoundTemplate from "../templates/notFoundTemplate";
import itemCardTemplate from "../templates/itemCardTemplate";
import { IArmor } from "../../models/Armor";
import { getImageLink } from "../../util/misc";

export default function renderArmorCard(
  parent: HTMLElement,
  armor: IArmor | null
) {
  if (armor) {
    const image = getImageLink("Armor");
    const { name, defence, cost } = armor;
    parent.innerHTML = itemCardTemplate(image, "Armor", name, 0, defence, cost);
  } else {
    parent.innerHTML = notFoundTemplate();
  }
  return parent;
}
