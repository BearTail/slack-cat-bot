import { CatMapsType, CatKana } from '../types/Cat';

export const CatBreeds = <const>[
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
];

export const CatMaps: CatMapsType = {
  'マヌルニャンコ': 'manul cat',
  'アメリカンショートヘア': 'American shorthair cat',
  'マンチカン': 'Munchkin cat',
  'チャウシー': 'Chausie cat',
  'スコティッシュホールド': 'Scottish Fold cat',
  'ノルウェージャンフォレスト': 'Norwegian Forest Cat',
  'ロシアンブルー': 'Russian Blue cat',
  'ブリティッシュショートヘア': 'British Shorthair cat',
  'ラグドール': 'Ragdoll cat',
  'くろねこ': 'black kitten',
  'ベンガルにゃんこ': 'Bengal cat',
  'メインクーン': 'Maine Coon',
  'サイベリアン': 'Siberian cat',
};

export const CatsKana = Object.keys(CatMaps) as CatKana[];
