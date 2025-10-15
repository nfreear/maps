import { Map, Layer } from 'leaflet';
import { isClickEnterOrSpace, isRealInteractive } from './eventFilter.js';

/**
 * Prototype: base mixin for Leaflet V2, with utility methods.
 */
export const baseLeafletMixin = {
  getLeafletId () {
    console.assert(this instanceof Layer, 'Expecting Layer-derived class.');
    console.assert(typeof this._leaflet_id === 'number', 'Expecting a Leaflet ID');
    return this._leaflet_id;
  },

  getMapContainerElem () {
    console.assert(this._map instanceof Map, 'Expecting a _map');
    console.assert(this._map._container instanceof HTMLElement, 'Expecting a map container');
    return this._map._container;
  },

  _assertThisIsLayer () {
    console.assert(this instanceof Layer, 'Expecting Layer-derived class.');
    console.assert(this.getElement() instanceof HTMLElement, 'Expecting an _icon');
  }
};

/**
 * Prototype: A mixin to add a `bindPopover()` method to `Layer`.
 *
 * @see https://codepen.io/nfreear/pen/gbPGWxg
 */
export const bindPopoverMixin = {
  __proto__: baseLeafletMixin, // Warning! (or we could use Object.setPrototypeOf to set the prototype here)

  bindPopover (content) {
    // this._initIcon();
		// this.update();
    super._assertThisIsLayer();
    console.debug('bindPopover:', content, this);

    this.getElement().setAttribute('popovertarget', `popover_id_${super.getLeafletId()}`);

    const popoverElem = document.createElement('div');
    popoverElem.id = `popover_id_${super.getLeafletId()}`;
    popoverElem.innerHTML = content;
    popoverElem.setAttribute('popover', '');

    super.getMapContainerElem().appendChild(popoverElem);

    // Only needed for non-<button> & non-<input>.
    if (!isRealInteractive(this.getElement())) {
      this.on('click keypress', (ev) => {
        if (isClickEnterOrSpace(ev)) {
          popoverElem.togglePopover();
          popoverElem.setAttribute('tabindex', -1);
          popoverElem.focus();
        }
        console.debug('Toggle popover:', ev.type, ev);
      });
    }

    return this; // Allow method chaining.
  }
};

export function applyBindPopoverMixin () {
  Object.assign(Layer.prototype, bindPopoverMixin);
}

export default applyBindPopoverMixin;
