import { ANIMAL_MAPS } from '../constants/Animals';
import { CAT_MAPS } from '../constants/Cats';
import { hiraganaToKatakana } from './utils';

export function animalSearchableText(text: string): string {
  return ANIMAL_MAPS[hiraganaToKatakana(text)];
}

export function catSearchableText(text: string): string {
  return CAT_MAPS[hiraganaToKatakana(text)];
}
