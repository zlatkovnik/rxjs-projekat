import {
  ICharacter,
  fetchRandomCharacter,
  fetchRandomCharacterExcept,
} from "../../models/DTOs/Character";
import renderCard from "../components/ViewCard";
import hpBarTemplate from "../templates/hpBarTemplate";
import {
  countDownObservable,
  mergeInputsObservable,
  randomCharacterObservable,
} from "../../service/inputService";

export default class ViewCombat {
  container: HTMLElement;
  myCharacter: ICharacter;

  myHp: number;
  enemyHp: number;

  infoLabel: HTMLElement;
  constructor(parent: HTMLElement, character: ICharacter) {
    this.container = document.createElement("div");
    this.container.className = "d-flex align-items-center row";
    parent.appendChild(this.container);

    this.myCharacter = character;
  }

  async render() {
    this.renderCharacter();
    this.renderMiddle();
    randomCharacterObservable().subscribe((enemy) => this.renderEnemy(enemy));
  }

  renderCharacter() {
    const myCharacterContainer = document.createElement("div");
    myCharacterContainer.className = "col-4";
    renderCard(myCharacterContainer, this.myCharacter);
    this.container.appendChild(myCharacterContainer);

    const myBar = document.createElement("div");
    myBar.innerHTML = hpBarTemplate(this.myCharacter.hp, this.myCharacter.hp);
    myCharacterContainer.appendChild(myBar);
  }

  renderMiddle() {
    const middle = document.createElement("div");
    middle.className = "d-flex flex-column align-items-center col-4";
    this.container.appendChild(middle);

    this.infoLabel = document.createElement("p");
    this.infoLabel.className = "h2 pb-5";
    middle.appendChild(this.infoLabel);

    const button = document.createElement("button");
    button.className = "btn btn-primary btn-lg";
    button.innerHTML = "Press to start combat";
    middle.appendChild(button);
    button.onclick = this.handleStart;
  }

  async renderEnemy(enemy: ICharacter) {
    const enemyCharacterContainer = document.createElement("div");
    enemyCharacterContainer.innerHTML = "<h1>Loading enemy...</h1>";
    enemyCharacterContainer.className = "col-4";
    this.container.appendChild(enemyCharacterContainer);

    enemyCharacterContainer.innerHTML = "";
    renderCard(enemyCharacterContainer, enemy);

    const enemyBar = document.createElement("div");
    enemyBar.innerHTML = hpBarTemplate(enemy.hp, enemy.hp);
    enemyCharacterContainer.appendChild(enemyBar);
  }

  cleanUp() {
    this.container.innerHTML = "";
  }

  handleStart = (ev: any) => {
    ev.target.disabled = true;
    ev.target.innerHTML = "Get ready";
    countDownObservable(1000).subscribe(
      (v: string) => (this.infoLabel.innerHTML = v),
      (err) => console.log(err),
      () => {
        this.infoLabel.innerHTML = "Wait for prompt";
        ev.target.disabled = false;
      }
    );
  };
}
