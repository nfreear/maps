/**
 * French locale / translation.
 *
 * @see https://github.com/nfreear/leaflet.plugins/blob/main/packages/Leaflet.translate/locale/fr.mjs
 * @see https://translate.google.com/?sl=auto&tl=fr&text=A%20JavaScript%20library%20for%20interactive%20maps%0A%C2%A9%20OpenStreetMap%20contributors%0AClose%20popup%0Amap%0AMarker%0AMap%20marker%0AZoom%20in%0AZoom%20out%0A%0AKeyboard%20shortcuts%0ALeft%20arrow%0AMove%20left%0A%0AFull%20Screen%0AExit%20Full%20Screen%0AView%20Fullscreen%0AShow%20me%20where%20I%20am%0ALocate%20Me%0A%0AHello%20world!%0AHello!%20I%E2%80%99m%20a%20translation%20test.%0AHello!%20I%E2%80%99m%20an%20accessibility%20and%20translation%20demonstration.%0AI%20am%20a%20standalone%20popup.%0A&op=translate;
 */

export const code_fr = 'fr';
export const file_fr = 'fr';
export const locale_fr = {
  _localeCode: 'fr',
  _localeName: 'Français',
  _localeNameEn: 'French',

  // Attribution - Leaflet, OpenStreetMap, ...
  'A JavaScript library for interactive maps': 'Une bibliothèque JavaScript pour cartes interactives',
  '© OpenStreetMap': '© Contributeurs d’OpenStreetMap',
  '© {OSM} contributors': '© Contributeurs d’{OSM}',
  'Map data © {OSM} contributors.': 'Données cartographiques © contributeurs {OSM}.',
  'Tiles from {name}.': 'Tuiles de {name}.',

  'OpenStreetMap contributors': 'Contributeurs d’OpenStreetMap',
  '© {link}OpenStreetMap{endlink} contributors': '© {link}OpenStreetMap{endlink} contributors!!',

  // Controls.
  'Close popup': 'Fermer', // Popup close button.
  map: 'carte', // mapContainerElem.ariaRoleDescription.
  Marker: 'Marqueur', // Default ALT text.
  'Marker A': 'Marqueur A',
  'Marker: {name}': 'Marqueur: “{name}”',
  'Zoom in': 'Agrandir',
  'Zoom out': 'Dézoomer',

  Layers: 'Couches', // Layers control.
  // Scale control.
  '{kilometers} km': '{kilometers} km',
  '{meters} m': '{meters} m',
  '{feet} ft': '{feet} ft',
  '{miles} mi': '{miles} mi',

  // Keyboard.
  'Keyboard shortcuts': 'Raccourcis clavier',
  'Left arrow': 'Flèche gauche',
  'Move left': 'Se déplacer à gauche',

  /** Third-party plugins.
   * @see https://github.com/brunob/leaflet.fullscreen
   * @see https://github.com/Leaflet/Leaflet.fullscreen
   * @see https://github.com/domoritz/leaflet-locatecontrol
   */
  'Full Screen': 'Plein écran',
  'Exit Full Screen': 'Quitter le mode plein écran',
  'View Fullscreen': 'Afficher en plein écran',
  'Exit Fullscreen': 'Quitter le mode plein écran',
  'Show me where I am': 'Montre-moi où je suis',
  'Locate Me': 'Localisez-moi',

  /** Example strings for Leafletjs.com, etc.
   * @see https://leafletjs.com/
   * @see https://leafletjs.com/examples/quick-start/
   * @see https://leafletjs.com/examples/accessibility/
   */
  'A pretty CSS popup.{br} Easily customizable.': 'Un joli popup CSS.{br} Facilement personnalisable.',
  'I am a standalone popup.': 'Je suis un popup autonome.',
  'You clicked the map at {latlng}': 'Vous avez cliqué sur la carte à {latlng}',
  'Kyiv, Ukraine is the birthplace of Leaflet!': 'Kiev, en Ukraine, est le berceau de Leaflet!',

  'Hello world!': 'Bonjour le monde!',
  'Hello! I’m a translation test.': 'Bonjour! Je suis un test de traduction.',
  'Hello! I’m an accessibility and translation demo.': 'Bonjour! Je suis une démonstration d’accessibilité et de traduction.',
};
