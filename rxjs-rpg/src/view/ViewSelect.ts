import { fetchAllRaces } from "../models/Race";
import renderCard from "./ViewCard";
import { fetchAllCharacters } from "../models/DTOs/Character";

export default async function renderSelect(parent: HTMLElement) {
  const container = document.createElement("div");
  parent.appendChild(container);

  const characters = await fetchAllCharacters();
}
