import { hiraganaToKatakana } from './Util';
import { AnimalEnglish, AnimalMapsType, AnimalKana } from './Types';

const ANIMAL_MAPPS: AnimalMapsType = {
  'ライオン': 'lion',
  'ユキヒョウ': 'snow leopard',
  'トラ': 'tiger',
  'ホワイトタイガー': 'white tiger',
  'クマ': 'brown bear',
  'シロクマ': 'polar bear',
  'ワンコ': 'dog',
  'マヌルニャンコ': 'manul cat',
  'カワウソ': 'otter',
  'ニャンコ': 'cat',
  'ネテルニャンコ': 'sleeping cat',
  'コネコ': 'cute kitten',
  'パンダ': 'giant panda china -red', // レッサーパンダが検索で引っかからないように
  'ペンギン': 'penguin',
  'チーター': 'cheetah',
  'キツネ': 'fox',
  'キリン': 'giraffe',
};

// 型の指定方法
export const ANIMALS_KANA = Object.keys(ANIMAL_MAPPS) as AnimalKana[];

export function animalRequested(text: string): boolean {
  return Object.keys(ANIMAL_MAPPS).includes(hiraganaToKatakana(text));
}

export function animalSearchableText(text: string): AnimalEnglish {
  return ANIMAL_MAPPS[hiraganaToKatakana(text)];
}
