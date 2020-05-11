import { ICharacter, changeWeapon, changeArmor, updateCharacter } from "../../models/Character";
import { allWeaponsObservable, allArmorsObservable } from "../../service/rxjsService";
import { fetchWeaponCount, IWeapon } from "../../models/Weapon";
import { fetchArmorCount, IArmor } from "../../models/Armor";
import renderWeaponCard from "../components/ViewWeaponCard";
import renderArmorCard from "../components/ViewArmorCard";

export default class ViewShop {
  container: HTMLElement;

  myCharacter: ICharacter;
  constructor(parent: HTMLElement, character: ICharacter) {
    this.container = document.createElement("div");
    this.container.className = "row align-items-center";
    parent.appendChild(this.container);

    this.myCharacter = character;
  }

  async render() {
    this.container.innerHTML = "<h1>Loading...</h1>";
    const weaponCount = await fetchWeaponCount();
    const armorCount = await fetchArmorCount();
    allWeaponsObservable(weaponCount).subscribe(async (promise) => this.renderWeapon(await promise));
    allArmorsObservable(armorCount).subscribe(async (promise) => this.renderArmor(await promise));
    this.container.innerHTML = "";
  }

  renderWeapon(weapon: IWeapon) {
    const col = document.createElement("div");
    col.className = "col-6 col-lg-3";
    col.innerHTML = renderWeaponCard(weapon);
    this.container.appendChild(col);

    const button = document.createElement("button");
    button.value = weapon.id.toString();
    if (this.myCharacter.gold >= weapon.cost) {
      button.className = "wbtn btn btn-primary btn-lg";
      button.innerHTML = "Select";
    } else {
      button.className = "wbtn btn btn-warning btn-lg";
      button.innerHTML = "Not enough gold";
      button.disabled = true;
    }
    button.id = `w${weapon.id.toString()}`;
    button.onclick = (ev) => this.handleSelectWeapon(ev, weapon);
    col.appendChild(button);

    if (this.myCharacter.weapon.id === weapon.id) {
      button.className = "wbtn btn btn-secondary btn-lg";
      button.innerHTML = "Choosen";
      button.disabled = true;
    }
  }

  renderArmor(armor: IArmor) {
    const col = document.createElement("div");
    col.className = "col-6 col-lg-3";
    col.innerHTML = renderArmorCard(armor);
    this.container.appendChild(col);

    const button = document.createElement("button");
    button.value = armor.id.toString();

    if (this.myCharacter.gold >= armor.cost) {
      button.className = "abtn btn btn-primary btn-lg";
      button.innerHTML = "Select";
    } else {
      button.className = "abtn btn btn-warning btn-lg";
      button.innerHTML = "Not enough gold";
      button.disabled = true;
    }

    button.id = `a${armor.id.toString()}`;
    button.onclick = (ev) => this.handleSelectArmor(ev, armor);
    col.appendChild(button);

    if (this.myCharacter.armor.id === armor.id) {
      button.className = "abtn btn btn-secondary btn-lg";
      button.innerHTML = "Chosen";
      button.disabled = true;
    }
  }

  handleSelectArmor(ev: MouseEvent, armor: IArmor) {
    if (this.myCharacter.gold < armor.cost) return;

    this.myCharacter.gold -= armor.cost;
    changeArmor(this.myCharacter, armor);
    updateCharacter(this.myCharacter);
    this.setChosen(armor.id, "a", armor.cost);
  }

  handleSelectWeapon(ev: MouseEvent, weapon: IWeapon) {
    if (this.myCharacter.gold < weapon.cost) return;

    this.myCharacter.gold -= weapon.cost;
    changeWeapon(this.myCharacter, weapon);
    updateCharacter(this.myCharacter);
    this.setChosen(weapon.id, "w", weapon.cost);
  }

  setChosen(id: number, type: string, cost: number) {
    const buttons: HTMLButtonElement[] = Array.from(document.querySelectorAll(`.${type}btn`));
    buttons.forEach((button) => {
      if (this.myCharacter.gold >= cost) {
        button.className = type + "btn btn btn-primary btn-lg";
        button.innerHTML = "Select";
        button.disabled = false;
      } else {
        button.className = type + "btn btn btn-warning btn-lg";
        button.innerHTML = "Not enough gold";
        button.disabled = true;
      }
    });
    const button = buttons.filter((btn) => btn.id === type + id.toString());
    button[0].className = type + "btn btn btn-secondary btn-lg";
    button[0].disabled = true;
    button[0].innerHTML = "Chosen";
  }

  cleanUp() {
    this.container.innerHTML = "";
  }
}
