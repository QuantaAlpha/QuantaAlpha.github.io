import { readFileSync } from 'node:fs';

const appJs = readFileSync(new URL('../app.js', import.meta.url), 'utf8');

function fail(message) {
  throw new Error(message);
}

if (!appJs.includes("applyLanguage(localStorage.getItem('qa-lang') || 'zh')")) {
  fail('app.js: first-time visitors should default to Chinese');
}

function extractTranslation(key) {
  const match = appJs.match(new RegExp(`${key}: '([\\s\\S]*?)',\\n`));
  if (!match) fail(`app.js: missing translation key ${key}`);
  return match[1]
    .replace(/<[^>]+>/g, '')
    .replace(/\\'/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

const englishLimits = {
  qaP1: 190,
  qaP2: 180,
  qaP3: 280,
  qaWiki: 160,
};

for (const [key, maxLength] of Object.entries(englishLimits)) {
  const text = extractTranslation(key);
  if (text.length > maxLength) {
    fail(`app.js: English ${key} is too long for the product layout (${text.length} > ${maxLength})`);
  }
}

console.log('Language checks passed.');
