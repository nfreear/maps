/**
 * Convert a module object containing locales/translations into an array of locale objects.
 *
 * (No dependency on Leaflet or `Leaflet.I18n` class.)
 *
 * @see https://github.com/nfreear/elements/blob/main/src/util/defineMyElements.js
 * @param {Object} localesMod -
 * @return {Array}
 */

const keyRegex = /^locale_([a-z]{2})$/;
const codeRegex = /^[a-z]{2}(-[a-zA-Z]{2,4})?$/;

export function localesToArray (localesMod) {
  console.assert(typeof localesMod === 'object', '"localesMod" param - Expecting a module object.');

  const translations = [];

  Object.entries(localesMod).forEach(([ key, locale ]) => {
    // Security: check for expected types.
    console.assert(typeof locale === 'object', 'Expecting locale object');

    const M = key.match(keyRegex);
    if (M) {
      const id = M[1];
      const code = locale._localeCode;
      // const locale = localesMod[`locale_${id}`];

      // Security: check for expected types.
      // console.assert(typeof value === 'string', `Expecting string value: ${value}`);
      console.assert(codeRegex.test(code), `Expecting locale code: ${locale}`);
      // console.assert(locale && typeof locale === 'object', 'Expecting locale object');

      translations.push({ code, id, locale });
    } else {
      throw new Error('Unexpected locale key');
    }
  });
  console.assert(translations.length >= 2, 'Expecting at least 2 locales!');

  // console.debug('Translations:', translations, localesMod);
  // console.log('Mod:', mod.Symbol.toString());

  return translations;
}

export default localesToArray;
