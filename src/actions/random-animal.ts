import { fetchImageUrls } from '../clients/flicker';
import { postImages } from '../clients/slack';
import { ANIMAL_MAPS } from '../constants/Animals';
import { hiraganaToKatakana } from '../utils/utils';
import { animalSearchableText } from '../utils/searchableText';

/*
 * 動物の写真をランダムで選択し、slackに画像を投稿します
 */
export async function randomAnimal(text: string): Promise<void> {
  const animalText = extractAnimal(text)
  if (!animalText) return;

  const animal = animalSearchableText(animalText);
  const count = multipleRequest(text) ? 3 : 1;

  try {
    const imageUrls = await fetchImageUrls(animal, count);

    if (imageUrls.length === 0) {
      console.log('no images found!');
      return;
    }

    await postImages(imageUrls);
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

function extractAnimal(text: string): string | null {
  const katakanaText = hiraganaToKatakana(text).replace(/\s/g, '');

  for (const suffix of ['', 'クレ', 'ホシイ', '欲シイ', 'ヲクダサイ', 'クダサイ', 'ヲ下サイ', '下サイ', 'タリナイ', '足リナイ']) {
    for (const kanaAnimal of Object.keys(ANIMAL_MAPS)) {
      if (katakanaText === `${kanaAnimal}${suffix}`) return kanaAnimal;
      if (katakanaText === `${kanaAnimal}詰メ合ワセ${suffix}`) return kanaAnimal;
      if (katakanaText === `${kanaAnimal}詰合セ${suffix}`) return kanaAnimal;
      if (katakanaText === `${kanaAnimal}ツメアワセ${suffix}`) return kanaAnimal;
    }
  }

  return null;
}
