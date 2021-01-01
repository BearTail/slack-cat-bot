import { hiraganaToKatakana } from './utils/utils';
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
  'シロネコ': 'white cat animal',
  'クロネコ': 'black cat animal',
  'ニャンコ': 'cat animal',
  'ネテルニャンコ': 'sleeping cat',
  '寝テルニャンコ': 'sleeping cat',
  'ネテルチーター': 'sleeping cheetah',
  '寝テルチーター': 'sleeping cheetah',
  'ネテルライオン': 'sleeping lion',
  '寝テルライオン': 'sleeping lion',
  'コネコ': 'cute kitten',
  'パンダ': 'giant panda china -red', // レッサーパンダが検索で引っかからないように
  'ペンギン': 'penguin',
  'チーター': 'cheetah',
  'キツネ': 'fox',
  'キリン': 'giraffe',
  'モッフモフ': 'fluffy cats',
  'モフモフ': 'fluffy cats',
};

// 型の指定方法
export const ANIMALS_KANA = Object.keys(ANIMAL_MAPPS) as AnimalKana[];

export function animalRequested(text: string): boolean {
  return Object.keys(ANIMAL_MAPPS).includes(hiraganaToKatakana(text));
}

export function animalSearchableText(text: string): AnimalEnglish {
  return ANIMAL_MAPPS[hiraganaToKatakana(text)];
}
