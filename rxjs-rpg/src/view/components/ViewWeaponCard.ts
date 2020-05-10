import notFoundTemplate from "../templates/notFoundTemplate";
import itemCardTemplate from "../templates/itemCardTemplate";
import { getImageLink } from "../../util/misc";
import { IWeapon } from "../../models/Weapon";

export default function renderWeaponCard(weapon: IWeapon | null): string {
  if (weapon) {
    const image = getImageLink("Weapon");
    const { name, attack, cost } = weapon;
    return itemCardTemplate(image, "Weapon", name, attack, 0, cost);
  } else {
    return notFoundTemplate();
  }
}
