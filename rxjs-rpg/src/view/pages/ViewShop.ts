import renderCard from "../components/ViewCard";
import {
  fetchAllCharacters,
  ICharacter,
  changeWeapon,
  changeArmor,
  updateCharacter,
} from "../../models/Character";
import {
  allWeaponsObservable,
  allArmorsObservable,
} from "../../service/rxjsService";
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
    allWeaponsObservable(weaponCount).subscribe(async (promise) =>
      this.renderWeapon(await promise)
    );
    allArmorsObservable(armorCount).subscribe(async (promise) =>
      this.renderArmor(await promise)
    );
    this.container.innerHTML = "";
  }

  renderWeapon(weapon: IWeapon) {
    const col = document.createElement("div");
    col.className = "col-6 col-lg-3";
    this.container.appendChild(col);
    renderWeaponCard(col, weapon);

    const button = document.createElement("button");
    button.value = weapon.id.toString();
    button.className = "wbtn btn btn-primary btn-lg";
    button.innerHTML = "Select";
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
    this.container.appendChild(col);
    renderArmorCard(col, armor);

    const button = document.createElement("button");
    button.value = armor.id.toString();
    button.className = "abtn btn btn-primary btn-lg";
    button.innerHTML = "Select";
    button.id = `a${armor.id.toString()}`;
    button.onclick = (ev) => this.handleSelectArmor(ev, armor);
    col.appendChild(button);

    if (this.myCharacter.armor.id === armor.id) {
      button.className = "abtn btn btn-secondary btn-lg";
      button.innerHTML = "Choosen";
      button.disabled = true;
    }
  }

  handleSelectArmor(ev: MouseEvent, armor: IArmor) {
    changeArmor(this.myCharacter, armor);
    updateCharacter(this.myCharacter);

    const buttons: HTMLButtonElement[] = Array.from(
      document.querySelectorAll(".abtn")
    );
    buttons.forEach((button) => {
      button.className = "abtn btn btn-primary btn-lg";
      button.innerHTML = "Select";
      button.disabled = false;
    });
    const button = buttons.filter(
      (btn) => btn.id === `a${armor.id.toString()}`
    );
    button[0].className = "abtn btn btn-secondary btn-lg";
    button[0].disabled = true;
    button[0].innerHTML = "Choosen";
  }

  handleSelectWeapon(ev: MouseEvent, weapon: IWeapon) {
    changeWeapon(this.myCharacter, weapon);
    updateCharacter(this.myCharacter);

    const buttons: HTMLButtonElement[] = Array.from(
      document.querySelectorAll(".wbtn")
    );
    buttons.forEach((button) => {
      button.className = "wbtn btn btn-primary btn-lg";
      button.innerHTML = "Select";
      button.disabled = false;
    });
    const button = buttons.filter(
      (btn) => btn.id === `w${weapon.id.toString()}`
    );
    button[0].className = "wbtn btn btn-secondary btn-lg";
    button[0].disabled = true;
    button[0].innerHTML = "Choosen";
  }

  cleanUp() {
    this.container.innerHTML = "";
  }
}
