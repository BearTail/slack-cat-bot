import { KATAKANA_ANIMALS } from '../constants/Animals';
import { CAT_BREEDS } from '../constants/Cats';
import { FORTUNRS } from '../constants/Fortunes';
import { fetchImageUrls } from '../clients/flicker';
import { postImages } from '../clients/slack';
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
      await postImages([result.url], result.message);
    }
  } catch (e) {
    console.log(`error occurred: ${e}`);
  }
}

async function getAnimalOmikujiResult(): Promise<OmikujiResult | null> {
  const animal = randomSelect(KATAKANA_ANIMALS);
  const animalSearchText = animalSearchableText(animal);
  const animalImageUrls = await fetchImageUrls(animalSearchText);

  if (animalImageUrls.length === 0) {
    return null;
  }

  return {
    message: `今日の動物は${animal}で、あなたの運勢は${randomSelect(FORTUNRS)}です\n今日のラッキーにゃんこは${randomSelect(CAT_BREEDS)}だよ`,
    animal,
    url: animalImageUrls[0],
  };
}
