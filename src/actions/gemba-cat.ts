import { randomSelect } from '../utils/utils';
import { postImage } from '../slack/api';
import { GEMBA_CAT_URLS } from '../collections/gemba-cat';

export async function gembaCat(text: string): Promise<void> {
  if (text !== '現場にゃんこ' && text !== '現場猫') {
    return;
  }

  const cat_url = randomSelect(GEMBA_CAT_URLS);
  await postImage(cat_url, '', '@genbaneko_bot');
}
