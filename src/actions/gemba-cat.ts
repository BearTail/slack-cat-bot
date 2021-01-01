import { randomSelect } from '../utils/utils';
import { postImages } from '../clients/slack';
import { GEMBA_CAT_URLS } from '../constants/GembaCats';

export async function gembaCat(text: string): Promise<void> {
  if (text !== '現場にゃんこ' && text !== '現場猫') {
    return;
  }

  const cat_url = randomSelect(GEMBA_CAT_URLS);
  await postImages([cat_url], '', '@genbaneko_bot');
}
