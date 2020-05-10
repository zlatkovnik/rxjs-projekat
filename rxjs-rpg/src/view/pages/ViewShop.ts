import renderCard from "../components/ViewCard";
import { fetchAllCharacters, ICharacter } from "../../models/DTOs/Character";
import { allItemsObservable } from "../../service/rxjsService";

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
    allItemsObservable().subscribe((items) => console.log(items));
    this.container.innerHTML = "";

    // characters.forEach((char) => {
    //   const col = document.createElement("div");
    //   col.className = "col-6 col-lg-3";
    //   this.container.appendChild(col);
    //   renderCard(col, char);
    // });
  }

  cleanUp() {
    this.container.innerHTML = "";
  }
}
