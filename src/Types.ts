type ValueOf<T> = T[keyof T];

export type AnimalMapsType = {
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
  'パンダ': 'panda',
  'ペンギン': 'penguin',
  'チーター': 'cheetah',
  'キツネ': 'fox',
  'キリン': 'giraffe',
};

export type AnimalEnglish = ValueOf<AnimalMapsType>;
export type AnimalKana = keyof AnimalMapsType;

export interface SlackResponseBody {
  statusCode: number;
  message: string;
}

export interface OmikujiResult {
  message: string;
  animal: AnimalKana;
  url: string;
}
