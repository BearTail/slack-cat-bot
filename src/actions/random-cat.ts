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
  const imageUrls = await fetchImageUrls(searchableText, count);

  if (imageUrls.length === 0) {
    console.log('no images found!');
    return;
  }

  try {
    await postImages(imageUrls, `${catText}だよ`);
  } catch (e) {
    console.log(`error occurred: ${e}`);
  }
}

function multipleRequest(text: string): boolean {
  ['詰合せ', '詰め合わせ', 'つめあわせ'].forEach((multiple) => {
    if (text.includes(multiple)) return true;
  })

  return false;
}

function extractCat(text: string): string | null {
  const katakanaText = hiraganaToKatakana(text);

  if (katakanaText === 'ナンデモイイカラニャンコクレ') {
    return randomSelect(KANA_CATS);
  }

  ['', 'クレ', 'ホシイ', '欲シイ', 'クダサイ', '下サイ', 'タリナイ', '足リナイ'].forEach((suffix) => {
    Object.keys(CAT_MAPS).forEach((kanaAnimal) => {
      if (katakanaText === `${kanaAnimal}${suffix}`) return kanaAnimal;
      if (katakanaText === `${kanaAnimal}詰メ合ワセ${suffix}`) return kanaAnimal;
      if (katakanaText === `${kanaAnimal}詰合セ${suffix}`) return kanaAnimal;
      if (katakanaText === `${kanaAnimal}ツメアワセ${suffix}`) return kanaAnimal;
    })

    if (katakanaText === `にゃんこ${suffix}`) return randomSelect(KANA_CATS);
  });

  return null;
}
