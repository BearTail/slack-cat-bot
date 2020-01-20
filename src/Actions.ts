import * as lambda from 'aws-lambda';

import { getAnimalOmikujiResult } from './AnimalOmikuji';
import { fetchAnimalImageUrl } from './FlickerApi';
import { postImageToSlack } from './SlackApi';
import { AnimalEnglish } from './Types';

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
export async function randomAnimal(event: lambda.APIGatewayProxyEvent): Promise<void> {
  if (!event.body) {
    return;
  }

  const eventBody = JSON.parse(event.body);
  const animal: AnimalEnglish = eventBody.animalEnglish;

  if (!animal) {
    return;
  }

  const imageUrl = await fetchAnimalImageUrl(animal);

  if (imageUrl === null) {
    console.log('no image found!');
    return;
  }

  try {
    await postImageToSlack(imageUrl);
  } catch (e) {
    console.log(`error occurred: ${e}`);
  }
}
