import { AnimalEnglish } from '../Types';
import { animalSearchableText, animalRequested } from '../Animal';

import { fetchAnimalImageUrl } from '../flicker/api';
import { postImage } from '../slack/client';

/*
 * 動物の写真をランダムで選択し、slackに画像を投稿します
 */
export async function randomAnimal(text: string): Promise<void> {
  if (!animalRequested(text)) {
    return;
  }

  const animal = animalSearchableText(text) as AnimalEnglish | null;
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
