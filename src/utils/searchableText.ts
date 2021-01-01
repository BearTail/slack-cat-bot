import { AnimalMaps } from '../constants/Animals';
import { CatMaps } from '../constants/Cats';
import { AnimalEnglish, CatEnglish } from '../Types';
import { hiraganaToKatakana } from './utils';

export function animalSearchableText(text: string): AnimalEnglish {
  return AnimalMaps[hiraganaToKatakana(text)] as AnimalEnglish;
}

export function catSearchableText(text: string): CatEnglish {
  return CatMaps[hiraganaToKatakana(text)];
}
