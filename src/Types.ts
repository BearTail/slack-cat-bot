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
  'ネテルニャンコ': 'sleeping cat',
  'コネコ': 'cute kitten',
  'パンダ': 'giant panda china -red', // レッサーパンダが検索で引っかからないように
  'ペンギン': 'penguin',
  'チーター': 'cheetah',
  'キツネ': 'fox',
  'キリン': 'giraffe',
};

export type AnimalEnglish = ValueOf<AnimalMapsType>;
export type AnimalKana = keyof AnimalMapsType;

export type Fortune = '大吉' | '吉' | '中吉' | '小吉' | '末吉' | '凶（あと少し待てば大吉）';
export type CatBreed = 'アメリカンショートヘア' | 'マンチカン' | '三毛猫' | 'スコティッシュホールド' | 'ノルウェージャンフォレスト' | 'ロシアンブルー' | 'ブリティッシュショートヘア' | 'ラグドール' | 'くろねこ' | 'ベンガルにゃんこ' | 'メインクーン' | 'サイベリアン';

export interface SlackResponseBody {
  statusCode: number;
  message: string;
}

export interface OmikujiResult {
  message: string;
  animal: AnimalKana;
  url: string;
}
