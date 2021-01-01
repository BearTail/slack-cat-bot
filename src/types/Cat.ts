type ValueOf<T> = T[keyof T];

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
