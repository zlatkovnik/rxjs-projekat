import renderCard from "../components/ViewCard";
import { pollingObservable } from "../../service/inputService";
import { Subscription } from "rxjs";

export default class ViewHome {
  container: HTMLDivElement;
  subscriber: Subscription;
  constructor(parent: HTMLElement) {
    this.container = document.createElement("div");
    parent.appendChild(this.container);
  }

  render() {
    this.subscriber = pollingObservable(5000).subscribe((character) => {
      this.container.innerHTML = "";
      renderCard(this.container, character);
    });
  }

  cleanup() {
    if (this.subscriber) this.subscriber.unsubscribe();
    this.container.innerHTML = "";
  }
}

//TODO UNSUBSCRIBE
