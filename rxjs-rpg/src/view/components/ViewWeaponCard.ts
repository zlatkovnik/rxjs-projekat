import notFoundTemplate from "../templates/notFoundTemplate";
import itemCardTemplate from "../templates/itemCardTemplate";
import { getImageLink } from "../../util/misc";
import { IWeapon } from "../../models/Weapon";

export default function renderWeaponCard(
  parent: HTMLElement,
  weapon: IWeapon | null
) {
  if (weapon) {
    const image = getImageLink("Weapon");
    const { name, attack, cost } = weapon;
    parent.innerHTML = itemCardTemplate(image, "Weapon", name, attack, 0, cost);
  } else {
    parent.innerHTML = notFoundTemplate();
  }
  return parent;
}
