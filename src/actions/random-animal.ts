import { fetchImageUrl } from '../clients/flicker';
import { postImages } from '../clients/slack';
import { ANIMAL_MAPS } from '../constants/Animals';
import { hiraganaToKatakana } from '../utils/utils';
import { animalSearchableText } from '../utils/searchableText';

/*
 * 動物の写真をランダムで選択し、slackに画像を投稿します
 */
export async function randomAnimal(text: string): Promise<void> {
  if (!animalRequested(text)) {
    return;
  }

  const animal = animalSearchableText(text);
  if (!animal) {
    return;
  }

  const imageUrl = await fetchImageUrl(animal);

  if (imageUrl === null) {
    console.log('no images found!');
    return;
  }

  try {
    await postImages([imageUrl]);
  } catch (e) {
    console.log(`error occurred: ${e}`);
  }
}

function animalRequested(text: string): boolean {
  const katakanaText = hiraganaToKatakana(text);

  ['', 'クレ', 'ホシイ', '欲シイ', 'クダサイ', '下サイ', 'タリナイ', '足リナイ'].forEach((suffix) => {
    Object.keys(ANIMAL_MAPS).forEach((kanaAnimal) => {
      if (katakanaText === `${kanaAnimal}${suffix}`) return true;
    })
  });

  return false;
}
