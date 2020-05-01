import { ICharacter } from "../models/DTOs/Character";

export default class ViewCard {
  container: HTMLElement;
  character: ICharacter;
  constructor(parent: HTMLElement, character: ICharacter) {
    this.container = document.createElement("div");
    this.container.style.maxWidth = "400px";
    this.container.className = "card";
    parent.appendChild(this.container);
    this.character = character;
  }

  render() {
    const image = document.createElement("img");
    image.src = this.character.image;
    image.className = "card-img-top";
    image.alt = "Card image";
    this.container.appendChild(image);

    const body = document.createElement("div");
    body.className = "card-body";
    this.container.appendChild(body);

    const name = document.createElement("h5");
    name.className = "card-title";
    name.innerHTML = this.character.name;
    body.appendChild(name);

    const race = document.createElement("p");
    race.innerHTML = this.character.race;
    race.className = "card-text";
    body.appendChild(race);

    const list = document.createElement("ul");
    list.className = "list-group list-group-flush";
    this.container.appendChild(list);

    const gold = document.createElement("li");
    gold.innerHTML = "gold: " + this.character.gold.toString();
    gold.className = "list-group-item";
    list.appendChild(gold);

    const hp = document.createElement("li");
    hp.innerHTML = "hp: " + this.character.hp.toString();
    hp.className = "list-group-item";
    list.appendChild(hp);

    const attack = document.createElement("li");
    attack.innerHTML = "attack: " + this.character.attack.toString();
    attack.className = "list-group-item";
    list.appendChild(attack);

    const defence = document.createElement("li");
    defence.innerHTML = "defence: " + this.character.defence.toString();
    defence.className = "list-group-item";
    list.appendChild(defence);
  }
}
