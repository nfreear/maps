import { I18n } from 'local:Leaflet.i18n';
import * as localesModule from 'local:Locales';
// Was: import { code_fr, locale_fr, code_zh, locale_zh } from 'local:Locale';
import localesToArray from 'local:localesToArray';

/**
 * Register and set a chosen locale and set of translation strings.
 *
 * (Depends on `Leaflet.I18n` class)
 *
 * @see https://github.com/simon04/Leaflet/blob/i18n/src/core/I18n.js
 */
export function registerAndSetLocale () {
  const locales = localesToArray(localesModule);

  const langCode = langFromUrlParam(); // 'zh-CN';
  if (!langCode) {
    return;
  }

  const foundLocale = locales.find(({ code }) => code === langCode);

  // Register all locales and set the chosen locale.
  locales.forEach(({ code, locale }) => I18n.registerLocale(code, locale));

  I18n.setLocale(foundLocale.code);

  document.querySelector('#locale').textContent = foundLocale.code;

  console.log('Registered locales:', locales, [ I18n ]);
  console.log('Set locale:', foundLocale.code);

  return foundLocale;
}

/**
 * Extract a language/locale code from a URL parameter.
 * @example `/map.html?lang=fr`
 * @return {String}
 */
export function langFromUrlParam (paramName = 'lang', localeRegex = /^(fr|zh-CN)$/, defLang = 'en') {
  const params = new URL(window.location).searchParams;
  let langCode = params.get(paramName);
  if (langCode && localeRegex.test(langCode)) {
    console.debug('langFromUrlParam - Supported:', langCode);
  } else if (langCode) {
    console.warn('langFromUrlParam - Not supported:', langCode);
    langCode = defLang;
  } else {
    console.warn('langFromUrlParam - Not found:', langCode);
    langCode = defLang;
  }

  return langCode;
}

export default registerAndSetLocale;
