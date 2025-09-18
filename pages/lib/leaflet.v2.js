import MOD, { Map, Marker, TileLayer, version } from 'dist:Leaflet.v2';

/**
 *
 * @see https://leafletjs.com/2025/05/18/leaflet-2.0.0-alpha.html
 * @see https://leafletjs.com/reference-2.0.0.html
 * @see https://github.com/Leaflet/Leaflet/pull/9845
 */
function leafletAppV2 () {
  const map = new Map('map', {
    center: [51.505, -0.09],
    zoom: 13
  });

  const tiles = new TileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  })
  .addTo(map);

  const marker = new Marker([51.5, -0.09], {
    alt: 'Marker A: Sterry Street, London, SE1.'
  })
  .on('click', (ev) => {
    console.log('Marker click:', ev);
    alert('Marker click!');
  })
  .addTo(map);

  // marker._shadow.addEventListener('click', (ev) => alert('Click'));

  document.querySelector('#version').textContent = version; // `Leaflet version: ${version}`;
  document.querySelector('#ua').textContent = navigator.userAgent;

  console.log('> Leaflet V2:', version, map, marker, MOD);
}

export default leafletAppV2;
