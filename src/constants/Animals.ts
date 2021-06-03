import { KatakanaAnimal } from '../types/Animal';

export const ANIMAL_MAPS = {
  'ユキヒョウ': 'snow leopard',
  'トラ': 'tiger',
  'ホワイトタイガー': 'white tiger',
  'シロクマ': 'polar bear',
  'クマ': 'brown bear',
  'ワンコ': 'dog',
  'マヌルニャンコ': 'manul cat',
  'カワウソ': 'otter',
  'シロネコ': 'white cat animal',
  'ネテルチーター': 'sleeping cheetah',
  '寝テルチーター': 'sleeping cheetah',
  'チーター': 'cheetah',
  'ネテルライオン': 'sleeping lion',
  '寝テルライオン': 'sleeping lion',
  'ライオン': 'lion',
  'パンダ': 'giant panda china -red', // レッサーパンダが検索で引っかからないように
  'ペンギン': 'penguin',
  'キツネ': 'fox',
  'キリン': 'giraffe',
};

export const KATAKANA_ANIMALS = Object.keys(ANIMAL_MAPS) as KatakanaAnimal[];
