import { hiraganaToKatakana } from './utils/utils';
import { CatEnglish } from './Types';
import { CatMaps } from './constants/Cats';

export function catSearchableText(text: string): CatEnglish {
  return CatMaps[hiraganaToKatakana(text)];
}
