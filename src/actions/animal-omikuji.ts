import { getAnimalOmikujiResult } from '../AnimalOmikuji';
import { postImage } from '../slack/client';

/*
 * 動物おみくじを引いて、slackに結果を投稿します
 */
export async function drawAnimalOmikuji(text: string): Promise<void> {
  if (text !== 'おみくじ') {
    return;
  }

  try {
    const result = await getAnimalOmikujiResult();

    if (result) {
      await postImage(result.url, result.message);
    }
  } catch (e) {
    console.log(`error occurred: ${e}`);
  }
}
