const itemCardTemplate = (image: string, type: string, name: string, attack: number, defence: number, cost: number) =>
  `<div class="card mt-5">
        <img class="card-img-top" src="${image}" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">${type}</p>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">cost: ${cost}</li>
            <li class="list-group-item">attack: ${attack}</li>
            <li class="list-group-item">defence: ${defence}</li>
        </ul>
    </div>`;

export default itemCardTemplate;
