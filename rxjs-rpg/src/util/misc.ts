const human = require("../assets/races/human.jpg");
const orc = require("../assets/races/orc.jpg");
const elf = require("../assets/races/elf.jpg");
const dwarf = require("../assets/races/dwarf.jpg");
const undead = require("../assets/races/undead.jpg");
const dflt = require("../assets/races/default.png");

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
    default:
      return dflt.default;
  }
}
