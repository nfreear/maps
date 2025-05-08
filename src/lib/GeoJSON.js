export class HTTPError extends Error {}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#custom_error_types,
export class GeoJSONError extends Error {
  constructor(message, options) {
    // Need to pass `options` as the second parameter to install the "cause" property.
    super(message, options);

    // Maintains proper stack trace for where our error was thrown (non-standard)
    /* if (Error.captureStackTrace) {
      Error.captureStackTrace(this, GeoJsonError);
    } */

    this.name = 'GeoJSONError';
  }
}

/** A lightweight class to fetch and parse GeoJson. It uses assertions.
 */
export class GeoJSON {
  constructor () {
    this.throwOnAssert = true;
  }

  set fromString (jsonStr) {
    this._data = this._assertFeatureCollection(JSON.parse(jsonStr));
  }

  set throwOnAssert (boolThrow) { this._throwOnAssert = !!boolThrow; }

  get features () { return [...this._data.features]; }

  async fetch (urlOrRequestObj, options) {
    // const OPT = { ...{ mode: 'no-cors' }, options };
    const resp = await fetch(urlOrRequestObj, options);
    this._assert(resp.ok, `GeoJSON file not found (${resp.status} HTTP) - fetch: ${resp.url}`, HTTPError);
    this._data = this._assertFeatureCollection(await resp.json());
    return resp;
  }

  eachFeature (callbackFN) {
    this._assert(typeof callbackFN === 'function', 'eachFeature() - Expecting a function.');
    this.features.forEach(({ type, properties, geometry }, idx) => {
      const GEOM = this._assertFeature({ type, properties, geometry });
      callbackFN({type, properties, geometry }, idx);
    });
  }

  _assertFeatureCollection (DATA) {
    this._assert(DATA.type === 'FeatureCollection', 'Expecting a "FeatureCollection" type.');
    this._assert(Array.isArray(DATA.features), 'Expecting a "features" array.');
    this._assert(DATA.features.length > 0, 'Expecting at least one feature in the "features" array.');
    this._assert(DATA.features[0].type === 'Feature', 'Expecting the "Feature" type.');
    return DATA;
  }

  _assertFeature ({ type, properties, geometry }, idx) {
    this._assert(type === 'Feature', `Expecting the "Feature" type. Index: ${idx}`);
    this._assert(geometry.type === 'Point', `Only the "Point" geometry is currently supported. Index: ${idx}`);
    this._assert(Array.isArray(geometry.coordinates), `"geometry.coordinates" should be an array. Index: ${idx}`);
    this._assert(geometry.coordinates.length >= 2, `"geometry.coordinates" should have two (or 3) members. Index: ${idx}`);
    return this._assertCoordinateRange(geometry.coordinates, idx);
  }

  _assertCoordinateRange (coord, idx) {
    const [ lon, lat ] = coord;
    this._assert(parseFloat(lon) >= -180 && parseFloat(lon) <= 180, `Longitude out of range: ${lon} (${idx}))`);
    this._assert(parseFloat(lat) >= -180 && parseFloat(lat) <= 180, `Latitude out of range: ${lat} (${idx}))`);
    return [ parseFloat(lon), parseFloat(lat) ];
  }

  _assert (assertion, message, errorConstructor = GeoJSONError) {
    if (!assertion && this._throwOnAssert) {
      throw new errorConstructor(message);
	  }
	  console.assert(assertion, message);
  }

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter,
  filter (callbackFN) {
    console.assert(typeof callbackFN === 'function', 'filter() - Expecting a function.');
    return this.features.filter(callbackFN);
  }
}

export default GeoJSON;
