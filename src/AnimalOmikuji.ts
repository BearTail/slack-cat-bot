import { randomSelect } from './Util';
import { ANIMALS_KANA, animalSearchableText } from './Animal';
import { OmikujiResult, AnimalKana, Fortune, CatBreed } from './Types';
import { fetchAnimalImageUrl } from './FlickerApi';

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
  return randomSelect(ANIMALS_KANA);
}

function selectFortune(): Fortune {
  const fortunes: Fortune[] = [
    '大吉',
    '大吉',
    '大吉',
    '大吉',
    '吉',
    '吉',
    '吉',
    '中吉',
    '小吉',
    '末吉',
    '凶（あと少し待てば大吉）',
  ];

  return randomSelect(fortunes);
}

function selectCat(): CatBreed {
  const cats: CatBreed[] = [
    'アメリカンショートヘア',
    'マンチカン',
    '三毛猫',
    'スコティッシュホールド',
    'ノルウェージャンフォレスト',
    'ロシアンブルー',
    'ブリティッシュショートヘア',
    'ラグドール',
    'くろねこ',
  ];

  return randomSelect(cats);
}
