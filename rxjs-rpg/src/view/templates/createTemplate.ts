import { IRace } from "../../models/Race";

function fillOptions(races: IRace[]): string {
  let string: string = "";
  races.forEach((race) => (string += `<option value="${race.id.toString()}">${race.name}</option>`));
  return string;
}

const createTemplate = (races: IRace[]) => `
<div class="row mt-5">
    <div class="col-6">
        <h1>Create character</h1>
        <div class="form-group">
            <input id="create-name" class="form-control" placeholder="Character name" />
            <small id="create-name-error" class="form-text text-danger"></small>
        </div>
        <div class="input-group mb-3">
            <label class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">race</label>
            </label>
            <select id="create-race" class="custom-select">
            ${fillOptions(races)}
            </select>
        </div>
        <button id="create-submit" class="btn btn-primary w-100">Submit</button>
    </div>
</div>
`;

export default createTemplate;
