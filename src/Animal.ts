import { hiraganaToKatakana } from 'Util';
import { AnimalType, AnimalMapsType } from './Types';

const ANIMAL_MAPPS: AnimalMapsType = {
  'ライオン': 'lion',
  'ユキヒョウ': 'snow leopard',
  'トラ': 'tiger',
  'シロトラ': 'white tiger',
  'クマ': 'brown bear',
  'シロクマ': 'polar bear',
  'ワンコ': 'dog',
  'マヌルニャンコ': 'manul cat',
  'マヌル': 'manul cat',
  'カワウソ': 'otter',
  'ニャンコ': 'cat',
  'パンダ': 'panda',
  'ペンギン': 'penguin',
  'チーター': 'cheetah',
  'ガオー': 'lion',
  'キツネ': 'fox',
  'キリン': 'giraffe',
  'ウサギ': 'rabit',
};

export function animalSearchableText(text: string | null): AnimalType | null {
  if (text === null) {
    return null;
  }

  return ANIMAL_MAPPS[hiraganaToKatakana(text)];
}
