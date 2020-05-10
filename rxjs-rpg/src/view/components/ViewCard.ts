import { ICharacter } from "../../models/Character";
import cardTemplate from "../templates/cardTemplate";
import notFoundTemplate from "../templates/notFoundTemplate";
import cardTemplateFixed from "../templates/cardTemplateFixed";

export default function renderCard(character: ICharacter | null, sizeInRem: number = 0) {
  if (character) {
    const { name, gold, attack, defence, image, race, hp } = character;
    if (sizeInRem > 0) return cardTemplateFixed(sizeInRem, image, name, race, gold, hp, attack, defence);
    else return cardTemplate(image, name, race, gold, hp, attack, defence);
  } else {
    return notFoundTemplate();
  }
}
