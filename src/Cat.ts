import { hiraganaToKatakana, randomSelect } from './Util';
import { CatEnglish, CatMapsType, CatKana } from './Types';

const CAT_MAPPS: CatMapsType = {
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

export function selectRandomCat(): CatKana {
  return randomSelect(CAT_KANA);
}

// 型の指定方法
export const CAT_KANA = Object.keys(CAT_MAPPS) as CatKana[];

export function randomCatRequested(text: string): boolean {
  return [
    'ナンデモイイカラニャンコクレ',
    'ニャンコクレ',
    'ランダムニャンコ',
    'ニャンコホシイ',
    'ニャンコタリナイ',
  ].includes(hiraganaToKatakana(text));
}

export function catSearchableText(text: string): CatEnglish {
  return CAT_MAPPS[hiraganaToKatakana(text)];
}
