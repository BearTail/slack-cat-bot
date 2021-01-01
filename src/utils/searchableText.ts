import { ANIMAL_MAPS } from '../constants/Animals';
import { CAT_MAPS } from '../constants/Cats';
import { AnimalEnglish } from '../types/Animal';
import { CatEnglish } from '../types/Cat';
import { hiraganaToKatakana } from './utils';

export function animalSearchableText(text: string): AnimalEnglish {
  return ANIMAL_MAPS[hiraganaToKatakana(text)] as AnimalEnglish;
}

export function catSearchableText(text: string): CatEnglish {
  return CAT_MAPS[hiraganaToKatakana(text)];
}
