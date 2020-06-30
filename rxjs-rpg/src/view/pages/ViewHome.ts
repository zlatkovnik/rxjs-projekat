import renderCard from "../components/ViewCard";
import { pollingObservable } from "../../service/rxjsService";
import { Subscription } from "rxjs";

export default class ViewHome {
  container: HTMLElement;
  subscriber: Subscription;
  constructor(parent: HTMLElement) {
    this.container = document.createElement("div");
    parent.appendChild(this.container);
  }

  async render() {
    this.subscriber = pollingObservable(5000).subscribe((character) => {
      this.container.innerHTML = renderCard(character, 20);
    });
  }

  cleanup() {
    if (this.subscriber) this.subscriber.unsubscribe();
    this.container.innerHTML = "";
  }
}
