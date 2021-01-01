import { hiraganaToKatakana, randomSelect } from './utils/utils';
import { CatEnglish, CatKana } from './Types';
import { CatMaps, CatsKana } from './constants/Cats';

export function selectRandomCat(): CatKana {
  return randomSelect(CatsKana);
}

export function catSearchableText(text: string): CatEnglish {
  return CatMaps[hiraganaToKatakana(text)];
}
