/**
 * Demo: build locales, using JSON.stringify()!
 */

import * as locales from '../locale/index.js';
import localesToArray from './localesToArray.js';

const DEV = true;
const translations = localesToArray(locales);

const localeJsStr = localesJsTemplate(translations, DEV);

console.log(localeJsStr);

function localesJsTemplate (translations, DEV) {
  return `
export const locales = ${JSON.stringify(translations, null, DEV ? 2 : null)};

export default locales;`;
}
