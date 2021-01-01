import { randomSelect } from './utils/utils';
import { animalSearchableText } from './Animal';
import { OmikujiResult, AnimalKana, Fortune, CatBreed } from './Types';
import { fetchAnimalImageUrl } from './flicker/client';
import { KanaAnimals } from './constants/Animals';
import { CatBreeds } from './constants/Cats';
import { Fortunes } from './constants/Fortunes';

export async function getAnimalOmikujiResult(): Promise<OmikujiResult | null> {
  const animal = selectAnimal();
  const animalSearchText = animalSearchableText(animal);
  const animalImageUrl = await fetchAnimalImageUrl(animalSearchText);

  if (!animalImageUrl) {
    return null;
  }

  return {
    message: `今日の動物は${animal}で、あなたの運勢は${selectFortune()}です\n今日のラッキーにゃんこは${selectCat()}だよ`,
    animal,
    url: animalImageUrl,
  };
}

function selectAnimal(): AnimalKana {
  return randomSelect(KanaAnimals);
}

function selectFortune(): Fortune {
  return randomSelect(Fortunes);
}

function selectCat(): CatBreed {
  return randomSelect(CatBreeds);
}
