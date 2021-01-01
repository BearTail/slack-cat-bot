import { hiraganaToKatakana, randomSelect } from '../utils/utils';
import { fetchAnimalImageUrl } from '../clients/flicker';
import { postImage } from '../clients/slack';
import { CatsKana } from '../constants/Cats';
import { catSearchableText } from '../utils/searchableText';

/*
 * ランダムにニャンコを抽出します
 */
export async function randomCat(text: string): Promise<void> {
  if (!randomCatRequested(text)) {
    return;
  }

  const cat = randomSelect(CatsKana);
  const searchableText = catSearchableText(cat)
  const imageUrl = await fetchAnimalImageUrl(searchableText);

  if (imageUrl === null) {
    console.log('no images found!');
    return;
  }

  try {
    await postImage(imageUrl, `${cat}だよ`);
  } catch (e) {
    console.log(`error occurred: ${e}`);
  }
}

function randomCatRequested(text: string): boolean {
  return [
    'ナンデモイイカラニャンコクレ',
    'ニャンコクレ',
    'ニャンコクダサイ',
    'ランダムニャンコ',
    'ニャンコホシイ',
    'ニャンコタリナイ',
  ].includes(hiraganaToKatakana(text));
}
