import { AnimalKana, AnimalMapsType } from '../types/Animal';

export const ANIMAL_MAPS: AnimalMapsType = {
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

export const KANA_ANIMALS = Object.keys(ANIMAL_MAPS) as AnimalKana[];
