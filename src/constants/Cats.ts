import { KatakanaCat } from '../types/Cat';

export const CAT_BREEDS = <const>[
  'アメリカンショートヘア',
  'マンチカン',
  '三毛猫',
  'スコティッシュホールド',
  'ノルウェージャンフォレスト',
  'ロシアンブルー',
  'ブリティッシュショートヘア',
  'ラグドール',
  'くろねこ',
  'ベンガルにゃんこ',
  'メインクーン',
  'サイベリアン',
  'ラガマフィン',
  'ペルシャにゃんこ',
];

export const CAT_MAPS = {
  'ネテルニャンコ': 'sleeping cat',
  '寝テルニャンコ': 'sleeping cat',
  'マヌルニャンコ': 'manul cat',
  'アメリカンショートヘア': 'American shorthair cat',
  'マンチカン': 'Munchkin cat',
  'チャウシー': 'Chausie cat',
  'スコティッシュホールド': 'Scottish Fold cat',
  'ノルウェージャンフォレストキャット': 'Norwegian Forest Cat',
  'ノルウェージャンフォレスト': 'Norwegian Forest Cat',
  'ノルウェー': 'Norwegian Forest Cat',
  'ロシアンブルー': 'Russian Blue cat',
  'ブリティッシュショートヘア': 'British Shorthair cat',
  'ラグドール': 'Ragdoll cat',
  'クロネコ': 'black cat animal',
  'ベンガルニャンコ': 'Bengal cat',
  'メインクーン': 'Maine Coon',
  'サイベリアン': 'Siberian cat',
  'ラガマフィン': 'Ragamuffin cat',
  'ペルシャニャンコ': 'Persian cat',
  'ペルシャ': 'Persian cat',
  'モッフモフ': 'fluffy cat',
  'モフモフ': 'fluffy cat',
  '子猫': 'cute kitten',
  '子ネコ': 'cute kitten',
  'コネコ': 'cute kitten',
};

export const KATAKANA_CATS = Object.keys(CAT_MAPS) as KatakanaCat[];
