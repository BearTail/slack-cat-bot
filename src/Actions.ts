import { getAnimalOmikujiResult } from './AnimalOmikuji';
import { selectRandomCat, catSearchableText } from './Cat';
import { fetchAnimalImageUrl } from './FlickerApi';
import { postImageToSlack } from './SlackApi';
import { AnimalEnglish } from './Types';

/*
 * ランダムにニャンコを抽出します
 */
export async function randomCat(): Promise<void> {
  const cat = selectRandomCat();
  const searchableText = catSearchableText(cat)
  const imageUrl = await fetchAnimalImageUrl(searchableText);

  if (imageUrl === null) {
    console.log('no images found!');
    return;
  }

  try {
    await postImageToSlack(imageUrl, cat);
  } catch (e) {
    console.log(`error occurred: ${e}`);
  }
}

/*
 * 動物おみくじを引いて、slackに結果を投稿します
 */
export async function drawAnimalOmikuji(): Promise<void> {
  try {
    const result = await getAnimalOmikujiResult();

    if (result) {
      await postImageToSlack(result.url, result.message);
    }
  } catch (e) {
    console.log(`error occurred: ${e}`);
  }
}

/*
 * 動物の写真をランダムで選択し、slackに画像を投稿します
 */
export async function randomAnimal(animal: AnimalEnglish): Promise<void> {
  const imageUrl = await fetchAnimalImageUrl(animal);

  if (imageUrl === null) {
    console.log('no images found!');
    return;
  }

  try {
    await postImageToSlack(imageUrl);
  } catch (e) {
    console.log(`error occurred: ${e}`);
  }
}
