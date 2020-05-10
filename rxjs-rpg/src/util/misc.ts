const human = require("../assets/races/human.jpg");
const orc = require("../assets/races/orc.jpg");
const elf = require("../assets/races/elf.jpg");
const dwarf = require("../assets/races/dwarf.jpg");
const undead = require("../assets/races/undead.jpg");
const dflt = require("../assets/races/default.png");

const weapon = require("../assets/items/weapon.jpg");
const armor = require("../assets/items/armor.jpg");

export function getImageLink(race: string): string {
  switch (race) {
    case "Human":
      return human.default;
    case "Orc":
      return orc.default;
    case "Elf":
      return elf.default;
    case "Dwarf":
      return dwarf.default;
    case "Undead":
      return undead.default;
    case "Weapon":
      return weapon.default;
    case "Armor":
      return armor.default;
    default:
      return dflt.default;
  }
}
