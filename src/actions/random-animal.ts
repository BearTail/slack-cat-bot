import { fetchImageUrls } from '../clients/flicker';
import { postImages } from '../clients/slack';
import { ANIMAL_MAPS } from '../constants/Animals';
import { hiraganaToKatakana } from '../utils/utils';
import { animalSearchableText } from '../utils/searchableText';

/*
 * 動物の写真をランダムで選択し、slackに画像を投稿します
 */
export async function randomAnimal(text: string): Promise<void> {
  const animalText = extractAnimal(text)
  if (!animalText) return;

  const animal = animalSearchableText(animalText);
  const count = multipleRequest(text) ? 3 : 1;

  try {
    const imageUrls = await fetchImageUrls(animal, count);

    if (imageUrls.length === 0) {
      console.log('no images found!');
      return;
    }

    await postImages(imageUrls);
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

function extractAnimal(text: string): string | null {
  const katakanaText = hiraganaToKatakana(text).replace(/\s/g, '');

  for (const kanaAnimal of Object.keys(ANIMAL_MAPS)) {
    const regex = new RegExp(kanaAnimal + "(|イッパイ|詰メ合ワセ|詰合セ|ツメアワセ)(|クレ|ホシイ|欲シイ|ホシイデス|欲シイデス|ヲクダサイ|クダサイ|ヲ下サイ|下サイ|タリナイ|足リナイ)(|！|！！|！！！)$")
    if (regex.test(katakanaText)) return kanaAnimal;
  }

  return null;
}
