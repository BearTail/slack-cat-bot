import { hiraganaToKatakana } from './utils/utils';
import { AnimalEnglish } from './Types';
import { AnimalMaps } from './constants/Animals';

export function animalRequested(text: string): boolean {
  return Object.keys(AnimalMaps).includes(hiraganaToKatakana(text));
}

export function animalSearchableText(text: string): AnimalEnglish {
  return AnimalMaps[hiraganaToKatakana(text)];
}
