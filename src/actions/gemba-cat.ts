import { randomSelect } from '../utils/utils';
import { postImage } from '../slack/api';
import { GEMBA_CATS } from '../collections/gemba-cat';

export async function gembaCat(text: string): Promise<void> {
  if (text !== '現場にゃんこ' && text !== '現場猫') {
    return;
  }

  const cat = randomSelect(GEMBA_CATS);
  await postImage(cat.url, cat.message, cat.title);
}
