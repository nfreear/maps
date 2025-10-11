// Add "leaflet" to your "importmap".
import { Control, I18n, Map } from 'leaflet';

/**
 * Prototype: Plugin to add links to skip over markers, and over an entire Leaflet map.
 * @copyright © Nick Freear, 23-Sep-2025.
 */
export class SkipLinkPlugin extends Control {
  #map;

  static {
		// @section
		// @aka Control.Zoom options
		this.setDefaultOptions({
			// @option position: String = 'topleft'
			// The position of the control (one of the map corners). Possible values are `'topleft'`,
			// `'topright'`, `'bottomleft'` or `'bottomright'`
			position: 'topleft',

			// @option zoomInText: String = '<span aria-hidden="true">+</span>'
			// The text set on the 'zoom in' button.
			controlId: 'leaflet-control',

      afterId: 'leaflet-after',
		});
	}

	onAdd(map) {
    console.assert(map instanceof Map, 'Expecting a map instance.');
    this.#map = map;
    const { options } = this;
    const container = document.createElement('div');
    container.classList.add('leaflet-control-skip');
		// const container = DomUtil.create('div', 'leaflet-control-skip');

    const mapElem = map._container;
    const controlElem = map._controlContainer;
    const markerPane = map._panes.markerPane;

    console.assert(mapElem, 'Expecting a map container.');
    console.assert(controlElem, 'Expecting a controls container.');

    controlElem.id = this.#makeId(options.controlId);

    const afterElem = this.#createAfterElem();
    const skipLinkContainer = this.#createSkipLinkContainer(controlElem, afterElem);

    mapElem.after(afterElem);
    mapElem.before(skipLinkContainer);

    console.debug('Skip link plugin:', mapElem, this);

    return container;
  }

  #createSkipLink (label, id) {
    const linkElem = document.createElement('a');
    // linkElem.classList.add('leaflet-skip-link-plugin');
    linkElem.textContent = label;
    linkElem.href = `#${id}`;
    return linkElem;
  }

  #createSkipLinkContainer (controlElem, afterElem) {
    const containerElem = document.createElement('div');
    containerElem.classList.add('leaflet-skip-link-plugin');

    // Skip over markers - to controls.
    const skipToControls = this.#createSkipLink(I18n.translate('Skip to controls'), controlElem.id);
    // Skip the entire map.
    const skipOverMap = this.#createSkipLink(I18n.translate('Skip over map'), afterElem.id);

    containerElem.appendChild(skipToControls);
    containerElem.appendChild(skipOverMap);
    return containerElem;
  }

  #createAfterElem () {
    const afterElem = document.createElement('span');
    afterElem.classList.add('leaflet-skip-link-plugin-dest');
    afterElem.id = this.#makeId(this.options.afterId);
    return afterElem;
  }

  /** @todo Append random part??
   */
  #makeId (id) {
    console.assert(this.#map._leaflet_id, 'Expecting a Leaflet ID.');
    return `${id}-${this.#map._leaflet_id}`;
  }
}

export default SkipLinkPlugin;
