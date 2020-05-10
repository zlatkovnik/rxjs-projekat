import notFoundTemplate from "../templates/notFoundTemplate";
import itemCardTemplate from "../templates/itemCardTemplate";
import { IArmor } from "../../models/Armor";
import { getImageLink } from "../../util/misc";

export default function renderArmorCard(armor: IArmor | null): string {
  if (armor) {
    const image = getImageLink("Armor");
    const { name, defence, cost } = armor;
    return itemCardTemplate(image, "Armor", name, 0, defence, cost);
  } else {
    return notFoundTemplate();
  }
}
