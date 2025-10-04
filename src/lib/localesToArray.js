/**
 * Convert a module object containing locales/translations into an array of locale objects.
 *
 * (No dependency on Leaflet or `Leaflet.I18n` class.)
 *
 * @see https://github.com/nfreear/elements/blob/main/src/util/defineMyElements.js
 * @param {Object} localesMod -
 * @return {Array}
 */

const codeKeyRegex = /^code_([a-z]{2})$/;
const codeValueRegex = /^[a-z]{2}(-[a-zA-Z]{2,4})?$/;

export function localesToArray (localesMod) {
  console.assert(typeof localesMod === 'object', '"localesMod" param - Expecting a module object.');

  const translations = [];

  Object.entries(localesMod).forEach(([ key, value ]) => {
    // Security: check for expected types.
    console.assert(typeof value === 'string' || typeof value === 'object', 'Expecting string or object');

    const M = key.match(codeKeyRegex);
    if (M) {
      const id = M[1];
      const locale = localesMod[`locale_${id}`];

      // Security: check for expected types.
      console.assert(typeof value === 'string', `Expecting string value: ${value}`);
      console.assert(codeValueRegex.test(value), `Expecting locale code: ${value}`);
      console.assert(locale && typeof locale === 'object', 'Expecting locale object');

      translations.push({ code: value, id, locale });
    }
  });
  console.assert(translations.length >= 2, 'Expecting at least 2 locales!');

  // console.debug('Translations:', translations, localesMod);
  // console.log('Mod:', mod.Symbol.toString());

  return translations;
}

export default localesToArray;
