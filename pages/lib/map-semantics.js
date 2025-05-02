
const mapStyle = document.querySelector('#mapStyle');

const mapRegion = document.querySelector('#mapRegion');
const panButton = mapRegion.querySelector('#panButton');
const controlsGroup = mapRegion.querySelector('#controlsGroup');
const pinsGroup = mapRegion.querySelector('#pinsGroup');
const mapDialog = mapRegion.querySelector('dialog');
const dlgOutput = mapDialog.querySelector('output');

pinsGroup.addEventListener('click', (ev) => {
  ev.preventDefault();
  if (hasButton(ev)) {
    dlgOutput.value = ev.target.textContent;
    mapDialog.showModal();
  }

  console.debug('Pin click:', ev);
});

controlsGroup.addEventListener('click', (ev) => {
  ev.preventDefault();
  if (hasButton(ev)) {
    dlgOutput.value = ev.target.textContent;
    mapDialog.showModal();
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

function hasButton (event) {
  // Was: if(ev.target.tagName === 'BUTTON')
  return event.target.closest('button');
}
