import renderCard from "../components/ViewCard";
import { pollingObservable } from "../../service/rxjsService";
import { Subscription } from "rxjs";

export default class ViewHome {
  container: HTMLDivElement;
  subscriber: Subscription;
  constructor(parent: HTMLElement) {
    this.container = document.createElement("div");
    this.container.className = "row";
    parent.appendChild(this.container);
  }

  async render() {
    this.subscriber = pollingObservable(5000).subscribe((character) => {
      renderCard(this.container, character, 20);
    });
  }

  cleanup() {
    if (this.subscriber) this.subscriber.unsubscribe();
    this.container.innerHTML = "";
  }
}
