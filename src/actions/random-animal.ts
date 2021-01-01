import { fetchAnimalImageUrl } from '../clients/flicker';
import { postImage } from '../clients/slack';
import { AnimalMaps } from '../constants/Animals';
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

  const imageUrl = await fetchAnimalImageUrl(animal);

  if (imageUrl === null) {
    console.log('no images found!');
    return;
  }

  try {
    await postImage(imageUrl);
  } catch (e) {
    console.log(`error occurred: ${e}`);
  }
}

function animalRequested(text: string): boolean {
  return Object.keys(AnimalMaps).includes(hiraganaToKatakana(text));
}
