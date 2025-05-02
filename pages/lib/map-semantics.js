
const mapStyle = document.querySelector('#mapStyle');

const mapRegion = document.querySelector('#mapRegion');
const panButton = mapRegion.querySelector('#panButton');
const controlsGroup = mapRegion.querySelector('#controlsGroup');
const pinsGroup = mapRegion.querySelector('#pinsGroup');
const pinsDialog = mapRegion.querySelector('dialog');
const dlgOutput = pinsDialog.querySelector('output');

pinsGroup.addEventListener('click', (ev) => {
  ev.preventDefault();
  if (ev.target.tagName === 'BUTTON') {
    dlgOutput.value = ev.target.textContent;
    pinsDialog.showModal();
  }
});

controlsGroup.addEventListener('click', (ev) => {
  ev.preventDefault();
  if (ev.target.tagName === 'BUTTON') {
    dlgOutput.value = ev.target.textContent;
    pinsDialog.showModal();
  }
});

panButton.addEventListener('keyup', (ev) => {
  if (/(Arrow|\+|-|Tab)/.test(ev.key)) {
    console.debug('Pan button:', ev.type, ev.key, ev);
  }
});

console.debug('Pins:', pinsGroup.elements);
console.debug('Controls:', controlsGroup.elements);

mapStyle.addEventListener('change', (ev) => {
  document.body.dataset.mapStyle = ev.target.value;
});

document.body.dataset.mapStyle = true;
