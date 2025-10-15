/**
 * Prototype: functions to filter Leaflet keyboard events - for keyboard accessibility.
 *
 * @see https://codepen.io/nfreear/pen/XJXJZLa
 */

export function isClickEnterOrSpace (event) {
  const origEv = event.originalEvent ?? event;
  if (origEv.type === 'click') { return true; }
  if (origEv.key && (origEv.key === 'Enter' || origEv.key === ' ')) {
    return true;
  }
  return false;
}

export function isRealInteractive (element) {
  return /(A|BUTTON|INPUT)/.test(element.tagName);
}

export default isClickEnterOrSpace;
