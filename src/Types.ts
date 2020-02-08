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

export interface OmikujiResult {
  message: string;
  animal: AnimalKana;
  url: string;
}

export type CatMapsType = {
  'マヌルニャンコ': 'manul cat';
  'アメリカンショートヘア': 'American shorthair cat';
  'マンチカン': 'Munchkin cat';
  'チャウシー': 'Chausie cat',
  'スコティッシュホールド': 'Scottish Fold cat';
  'ノルウェージャンフォレスト': 'Norwegian Forest Cat';
  'ロシアンブルー': 'Russian Blue cat';
  'ブリティッシュショートヘア': 'British Shorthair cat';
  'ラグドール': 'Ragdoll cat';
  'くろねこ': 'black kitten';
  'ベンガルにゃんこ': 'Bengal cat';
  'メインクーン': 'Maine Coon';
  'サイベリアン': 'Siberian cat';
};

export type CatEnglish = ValueOf<CatMapsType>;
export type CatKana = keyof CatMapsType;
