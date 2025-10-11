// Use a local clone of https://github.com/simon04/Leaflet, on the `i18n` branch.
import { Map, Marker, TileLayer, Control, I18n, version } from 'leaflet'; // Was: 'local:Leaflet.i18n';
import registerAndSetLocale from 'local:registerAndSetLocale';

import { PopoverMarker, SkipLinkPlugin } from 'leaflet-plugins';
import { fixMapContainer } from 'leaflet.a11y';

/**
 * Trying out the new `I18n` class in Leaflet v2 alpha.
 *
 * @see https://leafletjs.com/2025/05/18/leaflet-2.0.0-alpha.html
 * @see https://leafletjs.com/reference-2.0.0.html
 * @see https://github.com/Leaflet/Leaflet/pull/9845
 */

function leafletI18nApp () {
  //.
  const locale = registerAndSetLocale();

  const map = new Map('map', {
    center: [51.505, -0.09],
    zoom: 13
  });

  fixMapContainer(map, {
    name: 'My TEST',
  });

  const skipPlugin = new SkipLinkPlugin().addTo(map);

  const tiles = new TileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    X_attribution: I18n.translate('© {link}OpenStreetMap{endlink}', {
      link: '<a href="http://www.openstreetmap.org/copyright">',
      endlink: '</a>',
    }),
  })
  .addTo(map);

  const marker = new Marker([51.5, -0.09], {
    alt: I18n.translate('Marker: {name}', { name: 'Sterry Street, London, SE1.' }),
    title: I18n.translate('Marker: {name}', { name: 'Sterry Street, London, SE1.' }),
  })
  .on('click', (ev) => {
    console.log('Marker click:', ev);
    alert('click');
  })
  .bindPopup(I18n.translate('Hello world!'))
  .addTo(map);

  const pmarker = new PopoverMarker([51.515, -0.098])
    .setContent("Hello, I'm a popover!")
    .addTo(map);

  const scale = new Control.Scale().addTo(map);
  const layers = new Control.Layers().addTo(map);

  document.querySelector('#version').textContent = version; // `Leaflet version: ${version}`;
  document.querySelector('#ua').textContent = navigator.userAgent;
  document.querySelector('#locale').textContent = locale.code;
  document.querySelector('#map').setAttribute('lang', locale.code);

  console.log('>> Leaflet i18n:', version, map, marker);
}

export default leafletI18nApp;
