import { randomSelect } from './Util';
import { ANIMALS_KANA, animalSearchableText } from './Animal';
import { OmikujiResult, AnimalKana, Fortune } from './Types';
import { fetchAnimalImageUrl } from './FlickerApi';

export function omikujiRequested(text: string): boolean {
  return text === 'おみくじ';
}

export async function getOmikujiResult(): Promise<OmikujiResult | null> {
  const animal = selectAnimal();
  const animalSearchText = animalSearchableText(animal);
  const animalImageUrl = await fetchAnimalImageUrl(animalSearchText);

  if (!animalImageUrl) {
    return null;
  }

  return {
    message: `今日の動物は${animal}で、あなたの運勢は${selectFortune()}です！`,
    animal,
    url: animalImageUrl,
  };
}

function selectAnimal(): AnimalKana {
  return randomSelect(ANIMALS_KANA);
}

function selectFortune(): Fortune {
  const fortunes: Fortune[] = [
    '大吉',
    '吉',
    '中吉',
    '小吉',
    '末吉',
    '凶',
    '大凶',
  ];

  return randomSelect(fortunes);
}
