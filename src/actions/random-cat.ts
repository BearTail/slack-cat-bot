import { hiraganaToKatakana, randomSelect } from '../utils/utils';
import { fetchImageUrls } from '../clients/flicker';
import { postImages } from '../clients/slack';
import { CAT_MAPS, KATAKANA_CATS } from '../constants/Cats';
import { catSearchableText } from '../utils/searchableText';

/*
 * ランダムにニャンコを抽出します
 */
export async function randomCat(text: string): Promise<void> {
  const catText = extractCat(text);
  if (!catText) return;

  if (Math.random() <= 0.05) {
    await postImages([], `${catText}あげない🐈`);
    return;
  }

  const searchableText = catSearchableText(catText);
  const count = multipleRequest(text) ? 3 : 1;

  try {
    const imageUrls = await fetchImageUrls(searchableText, count);

    if (imageUrls.length === 0) {
      console.log('no images found!');
      return;
    }

    const suffix = randomSelect(['だよ', 'ほしいんでしょ？', '足りてる？', '仕上がってるよ'])
    await postImages(imageUrls, `${catText}${suffix}`);
  } catch (e) {
    console.log(`error occurred: ${e}`);
  }
}

function multipleRequest(text: string): boolean {
  for (const multiple of ['いっぱい', '詰合せ', '詰め合わせ', 'つめあわせ']) {
    if (text.includes(multiple)) return true;
  }

  return false;
}

function extractCat(text: string): string | null {
  const katakanaText = hiraganaToKatakana(text).replace(/\s/g, '');

  for (const katakanaCat of Object.keys(CAT_MAPS)) {
    const regex = new RegExp(katakanaCat + "(|イッパイ|詰メ合ワセ|詰合セ|ツメアワセ)(|クレ|ホシイ|欲シイ|ホシイデス|欲シイデス|ヲクダサイ|クダサイ|ヲ下サイ|下サイ|タリナイ|足リナイ)(|！|！！|！！！)$")
    if (regex.test(katakanaText)) return katakanaCat;
  }

  const randamRegex = new RegExp(/ニャンコ(|イッパイ|詰メ合ワセ|詰合セ|ツメアワセ)(|クレ|ホシイ|欲シイ|ホシイデス|欲シイデス|ヲクダサイ|クダサイ|ヲ下サイ|下サイ|タリナイ|足リナイ)(|！|！！|！！！)$/)
  if (randamRegex.test(katakanaText)) return randomSelect(KATAKANA_CATS);

  return null;
}
