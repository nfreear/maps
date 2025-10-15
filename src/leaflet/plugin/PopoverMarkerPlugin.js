// Add "leaflet" to your "importmap".
import { DomUtil, Layer, LatLng, Map, Util } from 'leaflet'; // Was: 'local:Leaflet.i18n';

/**
 * Prototype: interactive marker with keyboard accessibility and popover.
 * Uses the Popover API and CSS anchor.
 *
 * @copyright © Nick Freear, 10-Oct-2025.
 * @since Leaflet V2.
 * @example const pmarker = new PopoverMarker([51.5, -0.09], {
 *   ...
 * })
 * .addTo(map);
 */
export class PopoverMarker extends Layer {
  #imgSrc = 'https://unpkg.com/leaflet@2.0.0-alpha.1/dist/images/marker-icon-2x.png';
  #latlng;
  #map;
  #containerElem;
  #popoverElem;

  static {
		// @section
		// @aka PopoverMarker options
		this.setDefaultOptions({
      anchor: true,
      // Text alternative for interactive marker (default: "Marker")
      alt: 'Marker',
      content: 'Hello world!',
      pane: 'markerPane',
    });
  }

  constructor (latlng, options) {
    console.assert(latlng, 'latlng is required');
    super();

    console.debug('PopoverMarker.ctor:', latlng, options);

    Util.setOptions(this, options);
		this.#latlng = new LatLng(latlng);
    // this.#latlng = latlng;
  }

  setContent (content) {
    console.assert(typeof content === 'string', 'Expecting a string.'); // Or, HTMLElement?
    this.options.content = content;
    return this;
  }

  onAdd (map) {
    console.assert(map instanceof Map, 'Expecting a map instance.');
    this.#map = map;

    this.#containerElem = this.#createElements();

    const pos = this.#map.latLngToLayerPoint(this.#latlng).round();
    // this._setPos(pos);
    DomUtil.setPosition(this.#containerElem, pos);
    DomUtil.setPosition(this.#popoverElem, pos);

    this.#applyAnchorStyle();

    this.getPane().appendChild(this.#containerElem);

    console.debug('PopoverMarker.onAdd:', pos, this);
  }

  get leafletId () {
    console.assert(this._leaflet_id, 'Expecting a leaflet ID.');
    return this._leaflet_id;
  }

  get #popoverTargetId () {
    return `popover-target-${this.leafletId}`;
  }

  get #anchorId () {
    return `--popover-anchor-${this.leafletId}`;
  }

  #applyAnchorStyle () {
    if (this.options.anchor) {
      this.#containerElem.classList.add('anchor-popover');
      this.#containerElem.style.anchorName = this.#anchorId;
      this.#popoverElem.style.positionAnchor = this.#anchorId;
    }
  }

  #createElements () {
    const containerEl = document.createElement('div');
    const popoverEl = document.createElement('div');

    popoverEl.textContent = this.options.content;
    popoverEl.id = this.#popoverTargetId;
    popoverEl.setAttribute('popover', '');

    containerEl.appendChild(this.#createMarkerElement());
    containerEl.appendChild(popoverEl);

    containerEl.classList.add('leaflet-popover-marker');

    this.#popoverElem = popoverEl;

    return containerEl;
  }

  #createMarkerElement () {
    const inputElem = document.createElement('input'); // Was: 'button'

    // inputElem.textContent = '·'; // &middot;
    inputElem.type = 'image';
    inputElem.src = this.#imgSrc;
    inputElem.setAttribute('aria-label', this.options.alt);
    inputElem.setAttribute('popovertarget', this.#popoverTargetId);
    inputElem.setAttribute('popovertargetaction', 'toggle');
    inputElem.style.height = '41px';

    return inputElem;
  }

  #setPos(pos) {
    DomUtil.setPosition(this.#containerElem, pos);

    // this._zIndex = pos.y + this.options.zIndexOffset;
    // this._resetZIndex();
  }
}

export default PopoverMarker;
