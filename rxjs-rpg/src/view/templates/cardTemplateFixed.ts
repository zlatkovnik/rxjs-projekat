const cardTemplateFixed = (
  sizeInRem: number,
  image: string,
  name: string,
  race: string,
  gold: number,
  hp: number,
  attack: number,
  defence: number
) =>
  `<div class="card mt-5" style="width: ${sizeInRem}rem;">
    <img class="card-img-top" src="${image}" alt="Card image cap">
    <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <p class="card-text">${race}</p>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">gold: ${gold}</li>
        <li class="list-group-item">hp: ${hp}</li>
        <li class="list-group-item">attack: ${attack}</li>
        <li class="list-group-item">defence: ${defence}</li>
    </ul>
</div>`;

export default cardTemplateFixed;
