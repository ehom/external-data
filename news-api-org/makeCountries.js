
const fs = require('fs');

const locales = [
  'en-US',
  'en-GB',
  'fr-FR',
  'de-CH',
  'zh-CN',
  'zh-HK',
  'zh-TW',
  'ja-JP',
  'ko-KR',
  'th-TH',
  'el-GR',
  'tr-TR',
  'pl-PL',
  'ru-RU',
  'he-IL'
];

const result = locales.reduce((accumulator, locale) => {
  const [language, country] = locale.split('-')
  const name = new Intl.DisplayNames(language, {type: "region"}).of(country);
  console.debug(name);
  accumulator[locale] = `${name} (${locale})`;
  return accumulator;
}, {});

console.log(result);

fs.writeFileSync('countries.json', JSON.stringify(result), {encoding: 'utf8'});
