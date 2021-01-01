import { hiraganaToKatakana, randomSelect } from '../utils/utils';
import { fetchImageUrl } from '../clients/flicker';
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
  const imageUrl = await fetchImageUrl(searchableText);

  if (imageUrl === null) {
    console.log('no images found!');
    return;
  }

  try {
    await postImages([imageUrl], `${catText}だよ`);
  } catch (e) {
    console.log(`error occurred: ${e}`);
  }
}

function extractCat(text: string): string | null {
  const katakanaText = hiraganaToKatakana(text);

  if (katakanaText === 'ナンデモイイカラニャンコクレ') {
    return randomSelect(KANA_CATS);
  }

  ['', 'クレ', 'ホシイ', '欲シイ', 'クダサイ', '下サイ', 'タリナイ', '足リナイ'].forEach((suffix) => {
    Object.keys(CAT_MAPS).forEach((kanaAnimal) => {
      if (katakanaText === `${kanaAnimal}${suffix}`) return kanaAnimal;
    })

    if (katakanaText === `にゃんこ${suffix}`) return randomSelect(KANA_CATS);
  });

  return null;
}
