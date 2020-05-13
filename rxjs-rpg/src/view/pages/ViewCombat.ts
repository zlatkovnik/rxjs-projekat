import { ICharacter, updateCharacter } from "../../models/Character";
import renderCard from "../components/ViewCard";
import hpBarTemplate from "../templates/hpBarTemplate";
import {
  countDownObservable,
  randomCharacterObservable,
  randomIntervalObservable,
  intervalUntilClickObservable,
} from "../../service/rxjsService";
import { Subscription } from "rxjs";

export default class ViewCombat {
  container: HTMLElement;
  myCharacter: ICharacter;
  enemyCharacter: ICharacter;

  myHp: number;
  enemyHp: number;

  infoLabel: HTMLElement;
  button: HTMLButtonElement;

  countdownSubscriber: Subscription;
  randomIntervalSubscription: Subscription;
  clickSubscription: Subscription;

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
    myCharacterContainer.innerHTML = renderCard(this.myCharacter);
    this.container.appendChild(myCharacterContainer);

    const myBar = document.createElement("div");
    myBar.innerHTML = hpBarTemplate(
      "my-bar",
      this.myCharacter.hp,
      this.myCharacter.hp
    );
    myCharacterContainer.appendChild(myBar);
  }

  renderMiddle() {
    const middle = document.createElement("div");
    middle.className = "d-flex flex-column align-items-center col-4";
    this.container.appendChild(middle);

    this.infoLabel = document.createElement("p");
    this.infoLabel.className = "h2 pb-5";
    middle.appendChild(this.infoLabel);

    this.button = document.createElement("button");
    this.button.className = "btn btn-primary btn-lg";
    this.button.innerHTML = "Press to start combat";
    middle.appendChild(this.button);
    this.button.onclick = this.handleStart;
  }

  async renderEnemy(enemy: ICharacter) {
    //Trenutan hp
    this.enemyCharacter = enemy;
    this.enemyHp = enemy.hp;
    this.myHp = this.myCharacter.hp;

    const enemyCharacterContainer = document.createElement("div");
    enemyCharacterContainer.innerHTML = "<h1>Loading enemy...</h1>";
    enemyCharacterContainer.className = "col-4";
    this.container.appendChild(enemyCharacterContainer);

    enemyCharacterContainer.innerHTML = renderCard(enemy);

    const enemyBar = document.createElement("div");
    enemyBar.innerHTML = hpBarTemplate("enemy-bar", enemy.hp, enemy.hp);
    enemyCharacterContainer.appendChild(enemyBar);
  }

  cleanUp() {
    this.container.innerHTML = "";
    if (this.countdownSubscriber) this.countdownSubscriber.unsubscribe();
    if (this.randomIntervalSubscription)
      this.randomIntervalSubscription.unsubscribe();
    if (this.clickSubscription) this.clickSubscription.unsubscribe();
  }

  handleStart = (ev: any) => {
    const button = ev.target;
    button.disabled = true;
    button.innerHTML = "Get ready";
    this.countdownSubscriber = countDownObservable(500).subscribe(
      (number: string) => (this.infoLabel.innerHTML = number),
      (err) => console.log(err),
      () => {
        this.handleReset();
        this.startCombat();
      }
    );
  };

  startCombat() {
    this.randomIntervalSubscription = randomIntervalObservable(5000).subscribe(
      () =>
        (this.clickSubscription = intervalUntilClickObservable(
          this.button,
          500
        ).subscribe(
          (v) => {
            this.myHp -=
              this.enemyCharacter.attack *
              0.3 *
              (1 - this.myCharacter.defence / 100);
            this.setBarWidth("my-bar", this.myHp, this.myCharacter.hp);
            this.checkIfLose();
            this.handleAttackPrompt();
          },
          (err) => console.log(err),
          () => {
            this.enemyHp -=
              this.myCharacter.attack * (1 - this.enemyCharacter.defence / 100);
            this.setBarWidth("enemy-bar", this.enemyHp, this.enemyCharacter.hp);
            this.checkIfWin();
            this.handleReset();
          }
        ))
    );
  }

  checkIfWin() {
    if (this.enemyHp <= 0) {
      this.clickSubscription.unsubscribe();
      this.randomIntervalSubscription.unsubscribe();
      this.handleWin();
    }
  }

  checkIfLose() {
    if (this.myHp <= 0) {
      this.clickSubscription.unsubscribe();
      this.randomIntervalSubscription.unsubscribe();
      console.log(this.randomIntervalSubscription, this.clickSubscription);
      this.handleLose();
    }
  }

  async handleWin() {
    //Ovde sam stavio await jer this.infoLabel.innerHTML ne zeli da se promeni drugacije
    await updateCharacter(this.myCharacter);
    await updateCharacter(this.enemyCharacter);
    this.infoLabel.innerHTML = "You win! To play again click on combat.";
    this.myCharacter.gold += 5 + this.enemyCharacter.gold;
    this.enemyCharacter.gold = 0;
    this.button.innerHTML = "Winner";
  }

  async handleLose() {
    await updateCharacter(this.myCharacter);
    await updateCharacter(this.enemyCharacter);
    this.infoLabel.innerHTML = "You lose, select another character.";
    this.myCharacter.gold = 0;
    this.enemyCharacter.gold += this.enemyCharacter.gold;
    this.button.innerHTML = "Loser";
  }

  handleAttackPrompt() {
    this.infoLabel.innerHTML = "Hurry attack!";
    this.button.disabled = false;
    this.button.className = "btn btn-danger btn-lg";
    this.button.innerHTML = "NOW!";
  }

  handleReset() {
    this.infoLabel.innerHTML = "Wait for prompt";
    this.button.onclick = null;
    this.button.className = "btn btn-secondary btn-lg";
    this.button.innerHTML = "Get ready";
  }

  setBarWidth(id: string, value: number, max: number) {
    const bar = <HTMLDivElement>document.querySelector(`#${id}`);
    bar.style.width = `${(value / max) * 100}%`;
    bar.innerHTML = Math.floor(value).toString();
  }
}
