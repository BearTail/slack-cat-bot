import { hiraganaToKatakana, randomSelect } from '../utils/utils';
import { fetchImageUrls } from '../clients/flicker';
import { postImages } from '../clients/slack';
import { CAT_MAPS, KANA_CATS } from '../constants/Cats';
import { catSearchableText } from '../utils/searchableText';

/*
 * ランダムにニャンコを抽出します
 */
export async function randomCat(text: string): Promise<void> {
  const catText = extractCat(text);
  if (!catText) return;

  const searchableText = catSearchableText(catText);
  const count = multipleRequest(text) ? 3 : 1;

  try {
    const imageUrls = await fetchImageUrls(searchableText, count);

    if (imageUrls.length === 0) {
      console.log('no images found!');
      return;
    }

    await postImages(imageUrls, `${catText}だよ`);
  } catch (e) {
    console.log(`error occurred: ${e}`);
  }
}

function multipleRequest(text: string): boolean {
  for (const multiple of ['詰合せ', '詰め合わせ', 'つめあわせ']) {
    if (text.includes(multiple)) return true;
  }

  return false;
}

function extractCat(text: string): string | null {
  const katakanaText = hiraganaToKatakana(text).replace(/\s/g, '');

  if (katakanaText === 'ナンデモイイカラニャンコクレ') {
    return randomSelect(KANA_CATS);
  }

  for (const suffix of ['', 'クレ', 'ホシイ', '欲シイ', 'ヲクダサイ', 'クダサイ', 'ヲ下サイ', '下サイ', 'タリナイ', '足リナイ']) {
    for (const kanaCat of Object.keys(CAT_MAPS)) {
      if (katakanaText === `${kanaCat}${suffix}`) return kanaCat;
      if (katakanaText === `${kanaCat}詰メ合ワセ${suffix}`) return kanaCat;
      if (katakanaText === `${kanaCat}詰合セ${suffix}`) return kanaCat;
      if (katakanaText === `${kanaCat}ツメアワセ${suffix}`) return kanaCat;
    }

    if (katakanaText === `ニャンコ${suffix}`) return randomSelect(KANA_CATS);
    if (katakanaText === `ニャンコ詰メ合ワセ${suffix}`) return randomSelect(KANA_CATS);
    if (katakanaText === `ニャンコ詰合セ${suffix}`) return randomSelect(KANA_CATS);
    if (katakanaText === `ニャンコツメアワセ${suffix}`) return randomSelect(KANA_CATS);
  }

  return null;
}
