const navbarTemplate = () => `
<nav class="d-flex navbar navbar-expand-lg navbar-dark bg-dark">
  <p class="navbar-brand">Rxjs rpg</p>
  <button value="home" class="nav-el navbar-brand btn btn-outline-light btn-lg ml-3">Home</button>
  <button value="create" class="nav-el navbar-brand btn btn-dark btn-lg ml-3">Create</button>
  <button value="select" class="nav-el navbar-brand btn btn-dark btn-lg ml-3">Select</button>
  <button id="nav-combat" value="combat" class="nav-el navbar-brand btn btn-dark btn-lg ml-3"></button>
  <button id="nav-shop" value="shop" class="nav-el navbar-brand btn btn-dark btn-lg ml-3"></button>
  <div class="mr-auto nav-el navbar-brand"></div>
  <p id="nav-character" class="navbar-brand">Select your character</p>
</nav>
`;

export default navbarTemplate;
