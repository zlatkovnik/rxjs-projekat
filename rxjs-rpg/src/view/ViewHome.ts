import { ICharacter } from "../models/DTOs/Character";
import renderCard from "./ViewCard";
import { pollingObservable } from "../service/inputService";

export default function renderHome(parent: HTMLElement) {
  const container = document.createElement("div");
  parent.appendChild(container);

  const polling$ = pollingObservable(5000);
  polling$.subscribe((char) => {
    container.innerHTML = "";
    renderCard(container, char);
  });
}

//TODO UNSUBSCRIBE
