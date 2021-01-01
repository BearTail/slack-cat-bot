import { KanaAnimals } from '../constants/Animals';
import { CatBreeds } from '../constants/Cats';
import { Fortunes } from '../constants/Fortunes';
import { fetchAnimalImageUrl } from '../clients/flicker';
import { postImage } from '../clients/slack';
import { OmikujiResult } from '../types/OmikujiResult';
import { animalSearchableText } from '../utils/searchableText';
import { randomSelect } from '../utils/utils';

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

async function getAnimalOmikujiResult(): Promise<OmikujiResult | null> {
  const animal = randomSelect(KanaAnimals);
  const animalSearchText = animalSearchableText(animal);
  const animalImageUrl = await fetchAnimalImageUrl(animalSearchText);

  if (!animalImageUrl) {
    return null;
  }

  return {
    message: `今日の動物は${animal}で、あなたの運勢は${randomSelect(Fortunes)}です\n今日のラッキーにゃんこは${randomSelect(CatBreeds)}だよ`,
    animal,
    url: animalImageUrl,
  };
}
