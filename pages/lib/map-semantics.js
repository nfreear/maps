
const mapStyle = document.querySelector('#mapStyle');
const mapRegion = document.querySelector('#mapRegion');

const panButton = mapRegion.querySelector('#panButton');
const controlsGroup = mapRegion.querySelector('#controlsGroup');
const pinsGroup = mapRegion.querySelector('#pinsGroup');
const mapDialog = mapRegion.querySelector('dialog');
const dlgOutput = mapDialog.querySelector('output');
const dlgHeading = mapDialog.querySelector('h2, h3');

pinsGroup.addEventListener('click', (ev) => {
  const label = ev.target.textContent;

  if (hasButtonIsh(ev)) {
    dlgHeading.textContent = label;
    dlgOutput.value = pinContent(ev);

    if (hasStyle()) {
      mapDialog.showModal();
      ev.preventDefault();
    }
    else if (hasButton(ev)) {
      mapDialog.showModal();
    }
  }
  console.debug('Pin click:', label, hasStyle(), ev);
});

controlsGroup.addEventListener('click', (ev) => {
  ev.preventDefault();

  const label = ev.target.textContent;

  if (hasButton(ev)) {
    dlgOutput.value = ev.target.textContent;
    mapDialog.showModal();
  }
  console.debug('Control click:', label, ev);
});

panButton.addEventListener('keyup', (ev) => {
  if (/(Arrow|\+|-|Tab)/.test(ev.key)) {
    console.debug('Pan button:', ev.type, ev.key, ev);
  }
});

console.debug('Pins:', pinsGroup.querySelectorAll('button, summary'));
console.debug('Controls:', controlsGroup.elements);

mapStyle.addEventListener('change', (ev) => {
  document.body.dataset.mapStyle = ev.target.value;
});

document.body.dataset.mapStyle = true;

function hasStyle () {
  return document.body.dataset.mapStyle !== 'false';
}

function hasButtonIsh (event) {
  return event.target.closest('button') || event.target.closest('summary');
}

function hasButton (event) {
  // Was: if(ev.target.tagName === 'BUTTON')
  return event.target.closest('button');
}

function pinContent (event) {
  if (hasButton(event)) {
    return event.target.textContent; // return early.
  }
  const detailsElem = event.target.closest('details');
  const detailsBody = detailsElem.querySelector('& > :not(summary)');
  console.assert(detailsBody, '<details> body should exist;')
  return detailsBody.textContent;
}
