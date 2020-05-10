const hpBarTemplate = (id: string, value: number, max: number) => `
<div class="progress">
  <div id="${id}" class="progress-bar" role="progressbar" style="width: ${(value / max) * 100}%;">${value}</div>
</div>
`;

export default hpBarTemplate;
