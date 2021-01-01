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
  const imageUrls = await fetchImageUrls(animal);

  if (imageUrls.length === 0) {
    console.log('no images found!');
    return;
  }

  try {
    await postImages(imageUrls);
  } catch (e) {
    console.log(`error occurred: ${e}`);
  }
}

function extractAnimal(text: string): string | null {
  const katakanaText = hiraganaToKatakana(text);

  ['', 'クレ', 'ホシイ', '欲シイ', 'クダサイ', '下サイ', 'タリナイ', '足リナイ'].forEach((suffix) => {
    Object.keys(ANIMAL_MAPS).forEach((kanaAnimal) => {
      if (katakanaText === `${kanaAnimal}${suffix}`) return kanaAnimal;
    })
  });

  return null;
}
