/**
 *
 * @see https://en.wikipedia.org/wiki/Web_Mercator_projection
 * @see https://openlayers.org/en/latest/examples/es2015-custom-element-a11y.html
 * @see https://openlayers.org/en/latest/examples/geojson.html
 */

import * as M from 'ol.js';
/* import Map from 'ol/Map.js';
import View from 'ol/View.js'; */
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';
import TileDebug from 'ol/source/TileDebug.js';

// import GeoJSON from 'ol/format/GeoJSON.js';
import MyGeoJSON from '../../src/lib/GeoJSON.js';
import ButtonPin from '../../src/lib/ButtonPin.js';

/* import Point from 'ol/geom/Point.js';
import Icon from 'ol/style/Icon.js';
import Style from 'ol/style/Style.js';

import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js'; */

// setTimeout(() => olMap(), 5000);

// const jsonUrl = 'https://github.com/nfreear/elements/blob/main/demo/data/landmarks.geo.json';
const jsonUrl = '../data/landmarks.geo.json';

export default async function openLayersMap () {
  console.debug('module:', M, window.ol);

  const { Map, View, Feature, Overlay, proj } = window.ol;
  const { fromLonLat } = proj;

  // https://openlayers.org/doc/faq.html#why-is-my-map-centered-on-the-gulf-of-guinea-or-africa-the-ocean-null-island-
  const londonLonLat = [-0.1257, 51.508]; // Washington [-77.036667, 38.895];
  const londonWebMercator = fromLonLat(londonLonLat);

  const edinburghLonLat = [ -3.19648000, 55.95206000 ];
  const edinburghWebMercator = fromLonLat(edinburghLonLat);

  console.debug('location Web Mercator:', londonWebMercator);

  const mapElem = document.querySelector('#map');

  const map = new Map({
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
      new TileLayer({
        source: new TileDebug(),
      }),
    ],
    target: mapElem, // 'map',
    view: new View({
      center: londonWebMercator, // [-0.1257, 51.508], // [0, 0],
      zoom: 11,
    }),
  });

  /* const startMarker = new Feature({
    type: 'icon',
    geometry: new Point([0, 0]), // route.getFirstCoordinate()),
  });

  const styles = {
    'icon': new Style({
          image: new Icon({
            anchor: [0.5, 1],
            src: 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Map_pin_icon.svg'
            // src: 'data/icon.png',
      }),
    }),
  };

  const vectorLayer = new VectorLayer({
    source: new VectorSource({
      features: [ startMarker, ],
    }),
    style: function (feature) {
      return styles[feature.get('type')];
    },
  });

  map.addLayer(vectorLayer); */

  const dialog = document.querySelector('dialog');

  const geoJson = new MyGeoJSON();
  await geoJson.fetch(jsonUrl);

  geoJson.eachFeature((feature, idx) => {
    // console.debug('Feature:', idx, geometry, properties);
    const { properties, geometry } = feature;
    const { name, popupContent } = properties;
    const [ lon, lat ] = geometry.coordinates;
    const posWebMercator = fromLonLat([ lon, lat ]);

    const pinOverlay = new ButtonPin({ // new Overlay({
      // element: pinButton,
      feature,
      position: posWebMercator,
      onclick: (ev) => {
        const { feature } = ev.detail;
        const { popupContent } = feature.properties;

        console.debug('Pin click:', feature, ev);

        dialog.textContent = popupContent;
        dialog.showModal();
      }
    });

    map.addOverlay(pinOverlay);

    pinOverlay.postProcess();

    console.debug('Add feature:', idx, pinOverlay.getPosition(), properties);
  });
}
